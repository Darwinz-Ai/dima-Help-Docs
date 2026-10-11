import fs from "fs";
import path from "path";
import crypto from "crypto";
import { spawnSync } from "child_process";
import { globSync } from "glob";

import {
    ALLOWED_MEDIA_EXTENSIONS,
    GCS_BUCKET,
    GCS_MEDIA_PREFIX,
    MEDIA_PUBLIC_BASE_URL,
    MEDIA_STAGING_DIR,
    SUPPORTED_LOCALES,
    SUPPORTED_PLATFORMS,
    SUPPORTED_SERVICES,
} from "../utils/constants.js";

/*
 * Uploads doc images and videos from the local staging folder to the GCS bucket.
 *
 * The staging folder mirrors the bucket: one folder per doc, named like the .md file.
 *   docs/en/audience-intelligence/web/brands/add-company.md
 *   _gcs-upload/en/audience-intelligence/web/brands/add-company/add-company-step-1.png
 *
 * Usage:
 *   npm run upload:images                                  # everything, all locales
 *   npm run upload:images -- --locale=ar                   # one locale
 *   npm run upload:images -- --doc=en/audience-intelligence/web/made-for-you/how-numbers-created
 *   npm run upload:images -- --dry-run                     # show what would happen, upload nothing
 *   npm run upload:images -- --overwrite                   # also replace files that changed
 *
 * Existing files are never replaced unless --overwrite is passed: the bucket has one URL per file
 * for every branch, so replacing one changes production immediately. Prefer a new name (-v2).
 */

const ROOT = process.cwd();
const DOCS_DIR = path.join(ROOT, "docs");
const STAGING_DIR = path.join(ROOT, MEDIA_STAGING_DIR);
const FILE_NAME_PATTERN = /^[a-z0-9][a-z0-9._-]*$/;
const IMAGE_SIZE_WARNING_BYTES = 2 * 1024 * 1024;

type Options = { dryRun: boolean; overwrite: boolean; locale: string | null; docs: string[] };
type MediaFile = { relPath: string; docPath: string; size: number; md5: string };
type RemoteObject = { name: string; md5_hash?: string; size?: number };

const normalizeDocArg = (value: string) =>
    value
        .replace(/\\/g, "/")
        .replace(/^\.?\//, "")
        .replace(new RegExp(`^(docs|${MEDIA_STAGING_DIR})/`), "")
        .replace(/\.md$/, "")
        .replace(/\/$/, "");

function parseArgs(argv: string[]): Options {
    const options: Options = { dryRun: false, overwrite: false, locale: null, docs: [] };

    for (const arg of argv) {
        const [key, value] = arg.split("=");
        if (key === "--dry-run") options.dryRun = true;
        else if (key === "--overwrite") options.overwrite = true;
        else if (key === "--locale" && value) options.locale = value;
        else if (key === "--doc" && value) options.docs.push(normalizeDocArg(value));
        else {
            console.error(`Unknown option: ${arg}`);
            process.exit(1);
        }
    }

    if (options.locale && !SUPPORTED_LOCALES.includes(options.locale)) {
        console.error(`Unsupported locale "${options.locale}". Use one of: ${SUPPORTED_LOCALES.join(", ")}`);
        process.exit(1);
    }

    return options;
}

// gcloud is a .cmd shim on Windows, so it has to run through the shell there.
// Every argument is a repo path or gs:// URI that passed the FILE_NAME_PATTERN check, so quoting is enough.
function gcloud(args: string[]) {
    const spawnOptions = { cwd: ROOT, encoding: "utf-8" as const, maxBuffer: 64 * 1024 * 1024 };
    const result = process.platform === "win32"
        ? spawnSync(`gcloud ${args.map((a) => `"${a}"`).join(" ")}`, { ...spawnOptions, shell: true })
        : spawnSync("gcloud", args, spawnOptions);
    if (result.error) throw result.error;
    return result;
}

const md5Base64 = (filePath: string) =>
    crypto.createHash("md5").update(fs.readFileSync(filePath)).digest("base64");

function collectFiles(options: Options) {
    const errors: string[] = [];
    const warnings: string[] = [];
    const files: MediaFile[] = [];

    if (!fs.existsSync(STAGING_DIR)) {
        console.error(`No ${MEDIA_STAGING_DIR}/ folder found at the repo root. Nothing to upload.`);
        process.exit(1);
    }

    for (const relPath of globSync("**/*", { cwd: STAGING_DIR, nodir: true, posix: true }).sort()) {
        const parts = relPath.split("/");
        const [locale, service, platform] = parts;
        const fileName = parts[parts.length - 1] ?? "";
        const docPath = parts.slice(0, -1).join("/"); // e.g. en/audience-intelligence/web/brands/add-company

        if (options.locale && locale !== options.locale) continue;
        if (options.docs.length && !options.docs.includes(docPath)) continue;
        if (fileName.startsWith(".")) continue; // .DS_Store and friends

        if (!SUPPORTED_LOCALES.includes(locale ?? "") || !SUPPORTED_SERVICES.includes(service ?? "") || !SUPPORTED_PLATFORMS.includes(platform ?? "")) {
            errors.push(`${relPath}: path must start with <locale>/<service>/<platform>/`);
            continue;
        }
        if (parts.length < 5) {
            errors.push(`${relPath}: files must sit in a folder named after their doc`);
            continue;
        }
        if (!fs.existsSync(path.join(DOCS_DIR, `${docPath}.md`))) {
            errors.push(`${relPath}: no matching doc at docs/${docPath}.md`);
            continue;
        }
        if (!FILE_NAME_PATTERN.test(fileName)) {
            errors.push(`${relPath}: use lowercase letters, numbers, "-", "_" or "." only (no spaces)`);
            continue;
        }
        if (!ALLOWED_MEDIA_EXTENSIONS.includes(path.extname(fileName).toLowerCase())) {
            errors.push(`${relPath}: unsupported type (allowed: ${ALLOWED_MEDIA_EXTENSIONS.join(" ")})`);
            continue;
        }

        const absPath = path.join(STAGING_DIR, relPath);
        const size = fs.statSync(absPath).size;
        if (!/\.(mp4|webm)$/i.test(fileName) && size > IMAGE_SIZE_WARNING_BYTES) {
            warnings.push(`${relPath}: ${(size / 1024 / 1024).toFixed(1)} MB, consider compressing it`);
        }

        files.push({ relPath, docPath, size, md5: md5Base64(absPath) });
    }

    return { files, errors, warnings };
}

function listRemote(files: MediaFile[]) {
    const remote = new Map<string, RemoteObject>();
    const locales = [...new Set(files.map((f) => f.relPath.split("/")[0]))];

    for (const locale of locales) {
        const result = gcloud([
            "storage", "objects", "list",
            `gs://${GCS_BUCKET}/${GCS_MEDIA_PREFIX}/${locale}/**`,
            "--format=json(name,md5_hash,size)",
        ]);
        if (result.status !== 0) {
            if (/matched no objects|One or more URLs matched no/i.test(result.stderr)) continue;
            console.error(`Could not list the bucket:\n${result.stderr}`);
            console.error("Check that you're signed in (gcloud auth login) and can access the bucket.");
            process.exit(1);
        }
        for (const obj of JSON.parse(result.stdout || "[]") as RemoteObject[]) {
            remote.set(obj.name, obj);
        }
    }

    return remote;
}

// Report image links in the affected docs that point at the bucket but don't exist there.
function findBrokenReferences(docPaths: string[], available: Set<string>) {
    const broken: string[] = [];
    const urlPattern = new RegExp(`${MEDIA_PUBLIC_BASE_URL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/([^\\s)"'>]+)`, "g");

    for (const docPath of docPaths) {
        const content = fs.readFileSync(path.join(DOCS_DIR, `${docPath}.md`), "utf-8");
        for (const match of content.matchAll(urlPattern)) {
            const objectPath = decodeURIComponent(match[1] ?? "");
            if (!available.has(objectPath)) broken.push(`docs/${docPath}.md -> ${objectPath}`);
        }
    }

    return broken;
}

function uploadImages() {
    const options = parseArgs(process.argv.slice(2));
    const { files, errors, warnings } = collectFiles(options);

    warnings.forEach((w) => console.warn(`  warning  ${w}`));
    if (errors.length) {
        errors.forEach((e) => console.error(`  error    ${e}`));
        console.error(`\n${errors.length} problem(s) found. Fix them before uploading; nothing was uploaded.`);
        process.exit(1);
    }
    if (!files.length) {
        console.log("No matching files to upload.");
        return;
    }

    const remote = listRemote(files);
    const toUpload: MediaFile[] = [];
    const changedSkipped: MediaFile[] = [];
    let unchanged = 0;

    for (const file of files) {
        const existing = remote.get(`${GCS_MEDIA_PREFIX}/${file.relPath}`);
        if (!existing) toUpload.push(file);
        else if (existing.md5_hash === file.md5) unchanged++;
        else if (options.overwrite) toUpload.push(file);
        else changedSkipped.push(file);
    }

    console.log(`\n${files.length} file(s) checked: ${toUpload.length} to upload, ${unchanged} already up to date, ${changedSkipped.length} changed but skipped.`);
    changedSkipped.forEach((f) => console.warn(`  skipped  ${f.relPath} (differs from the bucket; rename it, e.g. -v2, or pass --overwrite)`));

    // One gcloud call per doc folder keeps this fast.
    const byDoc = new Map<string, MediaFile[]>();
    toUpload.forEach((f) => byDoc.set(f.docPath, [...(byDoc.get(f.docPath) ?? []), f]));

    for (const [docPath, docFiles] of byDoc) {
        const destination = `gs://${GCS_BUCKET}/${GCS_MEDIA_PREFIX}/${docPath}/`;
        console.log(`\n${options.dryRun ? "[dry run] would upload" : "Uploading"} ${docFiles.length} file(s) to ${destination}`);
        docFiles.forEach((f) => console.log(`  ${MEDIA_PUBLIC_BASE_URL}/${f.relPath}`));

        if (options.dryRun) continue;
        const result = gcloud(["storage", "cp", ...docFiles.map((f) => path.posix.join(MEDIA_STAGING_DIR, f.relPath)), destination]);
        if (result.status !== 0) {
            console.error(`Upload failed for ${docPath}:\n${result.stderr}`);
            process.exit(1);
        }
    }

    const available = new Set([
        ...[...remote.keys()].map((name) => name.slice(GCS_MEDIA_PREFIX.length + 1)),
        ...toUpload.map((f) => f.relPath),
    ]);
    const broken = findBrokenReferences([...new Set(files.map((f) => f.docPath))], available);
    if (broken.length) {
        console.warn(`\n${broken.length} link(s) in these docs point to files that aren't in the bucket:`);
        broken.forEach((b) => console.warn(`  missing  ${b}`));
    }

    console.log(options.dryRun ? "\nDry run finished. Nothing was uploaded." : "\nDone.");
}

uploadImages();
