import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { globSync } from "glob";

import type { Manifest, ManifestGroup, SearchItem } from "../utils/types.js";
import { cleanMarkdownContent, formatLabel } from "../utils/helpers.js";
import { GROUP_ORDER, GROUP_TRANSLATIONS, SUPPORTED_LOCALES, SUPPORTED_PLATFORMS, SUPPORTED_SERVICES } from "../utils/constants.js";

const DOCS_DIR = path.join(process.cwd(), "docs");
const MANIFESTS_DIR = path.join(process.cwd(), "manifests");

function generateManifests() {
    SUPPORTED_LOCALES.forEach((locale) => {
        SUPPORTED_SERVICES.forEach((service) => {
            SUPPORTED_PLATFORMS.forEach((platform) => {

                const targetDir = path.join(DOCS_DIR, locale, service, platform);

                if (!fs.existsSync(targetDir)) return;

                const groupsMap = new Map<string, ManifestGroup>();
                const searchItems: SearchItem[] = []; // Collect search index items
                const files = globSync("**/*.md", { cwd: targetDir, posix: true });

                files.forEach((file) => {
                    const normalizedFile = file.replace(/\\/g, '/');

                    const filePath = path.join(targetDir, normalizedFile);
                    const fileContent = fs.readFileSync(filePath, "utf-8");
                    const { data, content } = matter(fileContent);
                    const docOrder = typeof data.order === "number" ? data.order : 999;

                    const pathParts = normalizedFile.split("/");

                    const cleanPath = `${locale}/${service}/${platform}/${normalizedFile}`;

                    const slug = normalizedFile.replace(/\.md$/, "");
                    const docLabel = data.label || formatLabel(path.basename(normalizedFile, ".md"));

                    const groupFolder = pathParts[0] ?? "";

                    if (typeof groupFolder !== "string" || groupFolder.length === 0) return;

                    // Add clean document data to search index
                    searchItems.push({
                        id: slug,
                        label: docLabel,
                        slug,
                        path: cleanPath,
                        description: data.description || "",
                        content: cleanMarkdownContent(content),
                    });

                    // Initialize Group
                    if (!groupsMap.has(groupFolder)) {
                        const defaultLabel = formatLabel(groupFolder);
                        const localizedLabel = GROUP_TRANSLATIONS[locale]?.[defaultLabel] || defaultLabel;

                        groupsMap.set(groupFolder, {
                            label: localizedLabel,
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
                            const defaultParentLabel = formatLabel(parentFolder);
                            const localizedParentLabel = GROUP_TRANSLATIONS[locale]?.[defaultParentLabel] || defaultParentLabel;
                            parentItem = {
                                label: localizedParentLabel,
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

                const sortedGroups = Array.from(groupsMap.entries()).map(([folderName, group]) => {
                    // Sort items
                    group.items.sort((a, b) => (a.order || 999) - (b.order || 999));

                    // Sort nested children
                    group.items.forEach(item => {
                        if (item.children) item.children.sort((a, b) => (a.order || 999) - (b.order || 999));
                    });

                    return { folderName, group };
                }).sort((a, b) => {
                    // Sort main groups based on group order constants
                    const indexA = GROUP_ORDER.indexOf(formatLabel(a.folderName));
                    const indexB = GROUP_ORDER.indexOf(formatLabel(b.folderName));

                    const posA = indexA !== -1 ? indexA : 999;
                    const posB = indexB !== -1 ? indexB : 999;

                    return posA - posB;
                }).map(item => item.group);

                const manifest: Manifest = {
                    locale,
                    service,
                    platform,
                    groups: sortedGroups
                };

                const outputFolder = path.join(MANIFESTS_DIR, locale, service);
                fs.mkdirSync(outputFolder, { recursive: true });

                // Write manifest file (e.g. manifests/en/audience-intelligence/web.json)
                const outputFile = path.join(outputFolder, `${platform}.json`);
                fs.writeFileSync(outputFile, JSON.stringify(manifest, null, 2));

                // Write search index file (e.g. manifests/en/audience-intelligence/search-index-web.json)
                const searchOutputFile = path.join(outputFolder, `search-index-${platform}.json`);
                fs.writeFileSync(searchOutputFile, JSON.stringify(searchItems, null, 2));

                console.log(`✅ Generated manifest & search index: manifests/${locale}/${service}/${platform}.json`);
            });
        });
    });
}

generateManifests();