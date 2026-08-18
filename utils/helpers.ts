export const formatLabel = (str: string): string =>
    str
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

export function cleanMarkdownContent(rawContent: string): string {
    return rawContent
        .replace(/```[\s\S]*?```/g, "")         // Remove code blocks
        .replace(/<[^>]*>/g, " ")               // Remove HTML tags (<video>, <img>, blockquotes, etc.)
        .replace(/!\[.*?\]\(.*?\)/g, "")        // Remove images ![alt](url)
        .replace(/\[(.*?)\]\(.*?\)/g, "$1")     // Keep link text, drop URL [text](url) -> text
        .replace(/`([^`]+)`/g, "$1")            // Inline code `code` -> code
        .replace(/[#*`>_~\-|=]/g, " ")          // Remove Markdown structural characters
        .replace(/\s+/g, " ")                   // Collapse multiple spaces/newlines
        .trim();
}