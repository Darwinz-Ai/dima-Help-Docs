
export const SUPPORTED_LOCALES = ["en", "ar"];
export const SUPPORTED_SERVICES = ["audience-intelligence", "pr-comms"];
export const SUPPORTED_PLATFORMS = ["web", "mobile"];

// Media hosting (see "Image & Media Handling" in the README)
export const MEDIA_STAGING_DIR = "_gcs-upload"; // Local, gitignored mirror of the bucket folder
export const GCS_BUCKET = "mediamonitor";
export const GCS_MEDIA_PREFIX = "dimabothelp/images";
export const MEDIA_PUBLIC_BASE_URL = `https://storage.googleapis.com/${GCS_BUCKET}/${GCS_MEDIA_PREFIX}`;
export const ALLOWED_MEDIA_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".mp4", ".webm"];
export const GROUP_ORDER = [
    "Getting Started",
    "Brands",
    "Common",
    "Monitor",
    "Made For You",
    "Trend Analysis",
    "Conversation Analysis",
    "Influencers",
    "Locations",
    "E Commerce Reviews",
    "Manage",
];

export const GROUP_TRANSLATIONS: Record<string, Record<string, string>> = {
    ar: {
        "Getting Started": "البدء",
        "Brands": "الجهات",
        "Common": "شائع",
        "Monitor": "الرصد",
        "Manage": "الإدارة",
        "Made For You": "مصنوع لك",
        "Trend Analysis": "تحليل الاتجاهات",
        "Conversation Analysis": "تحليل المحادثات",
        "Influencers": "المؤثرين",
        "Locations": "المواقع",
        "E Commerce Reviews": "تقييمات التجارة الإلكترونية",

        // Nested folders
        "Own Page": "الصفحات الشخصية",
        "Location": "الموقع",
        "Contact": "إعدادات وسائل الاتصال",
        "Group": "المجموعات",
        "Topic": "المواضيع",
        "User": "المستخدمين"
    }
};