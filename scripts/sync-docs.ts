// import fs from "fs";
// import path from "path";
// import matter from "gray-matter";
// import { globSync } from "glob";
// import type { ManifestGroup } from "../utils/types.js";

// const DOCS_DIR = path.join(process.cwd(), "../docs");
// const MANIFESTS_DIR = path.join(process.cwd(), "../manifests");
// const SUPPORTED_LOCALES = ["en", "ar"];
// const SUPPORTED_SERVICES = ["audience-intelligence", "pr-comms"];

// const formatLabel = (str: string): string =>
//     str
//         .split("-")
//         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//         .join(" ");

// function generateManifests() {
//     SUPPORTED_LOCALES.forEach((locale) => {

//         SUPPORTED_SERVICES.forEach((service) => {
//             const serviceDir = path.join(DOCS_DIR, locale, service);

//             if (!fs.existsSync(serviceDir)) return; // it shouldn't happen but just in case

//             const groupsMap = new Map<string, ManifestGroup>();
//             const files = globSync("**/*.md", { cwd: serviceDir });

//             console.log(files);

//             files.forEach((file) => {
//                 const filePath = path.join(serviceDir, file);
//                 const fileContent = fs.readFileSync(filePath, "utf-8");
//                 const { data } = matter(fileContent);

//                 const pathPaths = file.split("/");
//                 const cleanPath = `${locale}/${service}/${file}`;
//                 const slug = file.replace(/\.md$/, "");
//                 const docLabel = data.label || formatLabel(path.basename(file, ".md"));

//                 const groupFolder = pathPaths[0];

//                 // Initializing groups
//                 if (!groupsMap.has(groupFolder)) {

//                 }
//             })
//         })
//     })
// }

// generateManifests();