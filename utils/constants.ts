
export const SUPPORTED_LOCALES = ["en", "ar"];
export const SUPPORTED_SERVICES = ["audience-intelligence", "pr-comms"];
export const SUPPORTED_PLATFORMS = ["web", "mobile"];
export const GROUP_ORDER = [
    "Getting Started",
    "Brands",
    "Common",
    "Monitor",
    "Made For You",
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