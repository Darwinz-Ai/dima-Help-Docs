import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { globSync } from "glob";

import type { Manifest, ManifestGroup } from "../utils/types.js";
import { GROUP_ORDER, SUPPORTED_LOCALES, SUPPORTED_SERVICES } from "../utils/constants.js";

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
            SUPPORTED_PLATFORMS.forEach((platform) => {

                const targetDir = path.join(DOCS_DIR, locale, service, platform);

                if (!fs.existsSync(targetDir)) return;

                const groupsMap = new Map<string, ManifestGroup>();
                const files = globSync("**/*.md", { cwd: targetDir, posix: true });

                files.forEach((file) => {
                    const normalizedFile = file.replace(/\\/g, '/');

                    const filePath = path.join(targetDir, normalizedFile);
                    const fileContent = fs.readFileSync(filePath, "utf-8");
                    const { data } = matter(fileContent);
                    const docOrder = typeof data.order === "number" ? data.order : 999;

                    const pathParts = normalizedFile.split("/");

                    const cleanPath = `${locale}/${service}/${platform}/${normalizedFile}`;

                    const slug = normalizedFile.replace(/\.md$/, "");
                    const docLabel = data.label || formatLabel(path.basename(normalizedFile, ".md"));

                    const groupFolder = pathParts[0] ?? "";

                    if (typeof groupFolder !== "string" || groupFolder.length === 0) return;

                    // Initialize Group
                    if (!groupsMap.has(groupFolder)) {
                        groupsMap.set(groupFolder, {
                            label: formatLabel(groupFolder),
                            items: [],
                        });
                    }

                    const group = groupsMap.get(groupFolder) as ManifestGroup;

                    // Build Hierarchy
                    if (pathParts.length === 2) {
                        group.items.push({
                            label: docLabel,
                            slug,
                            path: cleanPath,
                            description: data.description || "",
                            order: docOrder
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
                            order: docOrder
                        });
                    }
                });

                const sortedGroups = Array.from(groupsMap.values().map(group => {
                    // Sort items
                    group.items.sort((a, b) => (a.order || 999) - (b.order || 999))

                    // Sort nested children
                    group.items.forEach(item => {
                        if (item.children) item.children.sort((a, b) => (a.order || 999) - (b.order || 999));
                    });

                    return group;
                })).sort((a, b) => {
                    // Sort main groups based on group order constants
                    const indexA = GROUP_ORDER.indexOf(a.label);
                    const indexB = GROUP_ORDER.indexOf(b.label);

                    const posA = indexA !== -1 ? indexA : 999
                    const posB = indexB !== -1 ? indexB : 999

                    return posA - posB;
                })

                const manifest: Manifest = {
                    locale,
                    service,
                    platform,
                    groups: sortedGroups
                };

                const outputFolder = path.join(MANIFESTS_DIR, locale, service);
                fs.mkdirSync(outputFolder, { recursive: true });

                const outputFile = path.join(outputFolder, `${platform}.json`);
                fs.writeFileSync(outputFile, JSON.stringify(manifest, null, 2));

                console.log(`✅ Generated manifest: manifests/${locale}/${service}/${platform}.json`);
            });
        });
    });
}

generateManifests();