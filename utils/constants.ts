export const SUPPORTED_LOCALES = ["en", "ar"];
export const SUPPORTED_SERVICES = ["audience-intelligence", "pr-comms"];
export const GROUP_ORDER = [
    "Brands",
    "Audience Intelligence",
    "Monitor",
    "Made For You",
    "Conversation Analysis",
    "Influencers",
    "Locations",
    "Manage",
];

export const GROUP_TRANSLATIONS: Record<string, Record<string, string>> = {
    ar: {
        "Brands": "الجهات",
        "Audience Intelligence": "رؤى الجمهور",
        "Monitor": "الرصد",
        "Manage": "الإدارة",
        "Made For You": "مصنوع لك",
        "Conversation Analysis": "تحليل المحادثات",
        "Influencers": "المؤثرين",
        "Locations": "المواقع",

        // Nested folders
        "Own Page": "الصفحات الشخصية",
        "Location": "الموقع",
        "Contact": "إعدادات وسائل الاتصال",
        "Group": "المجموعات",
        "Topic": "المواضيع",
        "User": "المستخدمين"
    }
};