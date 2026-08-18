import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { globSync } from "glob";

// Point this to your actual docs folder
const DOCS_DIR = path.join(process.cwd(), "docs");

const calculateReadingTime = (text: string) => {
    const wpm = 225; // Standard words per minute

    // Do a quick cleanup just like your manifest script
    const cleanText = text
        .replace(/```[\s\S]*?```/g, "")
        .replace(/<[^>]*>/g, " ")
        .replace(/!\[.*?\]\(.*?\)/g, "")
        .trim();

    const words = cleanText.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / wpm)); // Minimum 1 min read
};

const injectReadingTime = () => {
    // Find all markdown files in the docs directory
    const files = globSync("**/*.md", { cwd: DOCS_DIR, absolute: true });

    let updatedCount = 0;

    files.forEach((filePath) => {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const parsed = matter(fileContent);

        const time = calculateReadingTime(parsed.content);

        // Only overwrite the file if the readingTime is missing or has changed!
        // This prevents Git from thinking every file changed every time you run it.
        if (parsed.data.readingTime !== time) {
            parsed.data.readingTime = time;

            // Rebuild the file string with the updated frontmatter
            const updatedFileContent = matter.stringify(parsed.content, parsed.data);

            fs.writeFileSync(filePath, updatedFileContent, "utf-8");
            console.log(`⏱️ Injected ${time} min read into: ${path.basename(filePath)}`);
            updatedCount++;
        }
    });

    console.log(`✅ Finished! Updated ${updatedCount} files.`);
};

injectReadingTime();