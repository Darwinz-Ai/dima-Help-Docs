import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { globSync } from "glob";

import type { Manifest, ManifestGroup } from "../utils/types.js";
import { SUPPORTED_LOCALES, SUPPORTED_SERVICES } from "../utils/constants.js";

const SUPPORTED_PLATFORMS = ["web", "mobile"];

const DOCS_DIR = path.join(process.cwd(), "docs");
const MANIFESTS_DIR = path.join(process.cwd(), "manifests");

const formatLabel = (str: string): string =>
    str
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

function generateManifests() {
    SUPPORTED_LOCALES.forEach((locale) => {

        SUPPORTED_SERVICES.forEach((service) => {
            const serviceDir = path.join(DOCS_DIR, locale, service);

            if (!fs.existsSync(serviceDir)) return; // it shouldn't happen but just in case

            const groupsMap = new Map<string, ManifestGroup>();

            // Added posix: true to force forward slashes if glob supports it
            const files = globSync("**/*.md", { cwd: serviceDir, posix: true });

            files.forEach((file) => {
                const normalizedFile = file.replace(/\\/g, '/');

                const filePath = path.join(serviceDir, normalizedFile);
                const fileContent = fs.readFileSync(filePath, "utf-8");
                const { data } = matter(fileContent);

                const pathParts = normalizedFile.split("/");
                const cleanPath = `${locale}/${service}/${normalizedFile}`;
                const slug = normalizedFile.replace(/\.md$/, "");
                const docLabel = data.label || formatLabel(path.basename(normalizedFile, ".md"));

                const groupFolder = pathParts[0] ?? "";

                if (typeof groupFolder !== "string" || groupFolder.length === 0) return;

                // 1. Initialize Group
                if (!groupsMap.has(groupFolder)) {
                    groupsMap.set(groupFolder, {
                        label: formatLabel(groupFolder),
                        items: [],
                    });
                }

                const group = groupsMap.get(groupFolder) as ManifestGroup;

                // 2. Build Hierarchy
                if (pathParts.length === 2) {
                    group.items.push({
                        label: docLabel,
                        slug,
                        path: cleanPath,
                        description: data.description || "",
                    });
                } else if (pathParts.length === 3) {
                    const parentFolder = pathParts[1] ?? "";
                    const parentSlug = `${groupFolder}/${parentFolder}`;

                    let parentItem = group.items.find((item) => item.slug === parentSlug);

                    if (!parentItem) {
                        parentItem = {
                            label: formatLabel(parentFolder),
                            slug: parentSlug,
                            children: [],
                        };
                        group.items.push(parentItem);
                    }

                    if (!parentItem.children) parentItem.children = [];

                    parentItem.children.push({
                        label: docLabel,
                        slug,
                        path: cleanPath,
                        description: data.description || "",
                    });
                }
            });

            const manifest: Manifest = {
                locale,
                service,
                groups: Array.from(groupsMap.values()),
            };

            const outputFolder = path.join(MANIFESTS_DIR, locale);
            fs.mkdirSync(outputFolder, { recursive: true });

            const outputFile = path.join(outputFolder, `${service}.json`);
            fs.writeFileSync(outputFile, JSON.stringify(manifest, null, 2));

            console.log(`✅ Generated manifest: manifests/${locale}/${service}.json`);
        });
    });
}

generateManifests();