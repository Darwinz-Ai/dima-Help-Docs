
# dima© Help Docs

This repository is the single source of truth for all public-facing, end-user documentation across our Web and Mobile apps.

By keeping our documentation in this Git repository, we can serve dynamic, localized, and version-controlled help centers, in-app guides, and chatbot contexts without cluttering our core application codebases.

---

##  Folder Architecture

To support multiple languages, products, and platforms, this repository strictly follows a **Locale ➔ Service ➔ Platform** hierarchy.

```text
docs/
├── en/ <-- 1. Locale (en, ar)
│ ├── audience-intelligence/ <-- 2. Service
│ │ ├── web/ <-- 3. Platform (web, mobile)
│ │ │ ├── brands/ <-- 4. Category Group
│ │ │ │ └── add-company.md <-- 5. Markdown Document
│ │ │ └── manage/
│ │ │ └── own-page/ <-- Nested Category Group
│ │ │ └── add.md
│ │ └── mobile/
│ └── pr-comms/
│ └── web/
├── ar/
│ └── ... (Mirror of 'en' structure)
```

---

##  How to Add or Edit a Document

### 1. Naming Conventions (Crucial!)

- **Kebab-case only:** All folders and `.md` files must use lowercase `kebab-case` (e.g., `getting-started.md`, `add-company.md`). No spaces or capital letters.
- **English Filenames Always:** Even when writing Arabic documentation inside the `ar/` folder, **the filename and folder names must remain in English**. This ensures our URL routing remains perfectly consistent across languages (e.g., `/ar/.../add-company` and `/en/.../add-company`).

### 2. File Placement & Nesting

- Docs can be nested up to **two levels deep** inside the platform folder (e.g., `platform/category/doc.md` or `platform/category/sub-category/doc.md`).
- The folder names are automatically parsed to generate the Sidebar UI categories.

### 3. YAML Frontmatter (Required)

Every Markdown file **must** begin with a YAML frontmatter block. This metadata is parsed by the frontend to display the correct titles and descriptions in the UI, which is especially important for localized titles in Arabic.

**Template:**
```

---

label: "Your UI Sidebar Title"
description: "A brief 1-2 sentence description for SEO and subheadings."

---

# Your H1 Title Here

Your markdown content goes here. You can use **bold**, _italics_, and lists.
```

**Example (English - `docs/en/.../brands/add-company.md`):**
```

---

label: "Add Company"
description: "Learn how to add a new brand company to your workspace."

---

# Adding a Company

To add a company, navigate to the...
```

**Example (Arabic - `docs/ar/.../brands/add-company.md`):**
```

---

label: "إضافة شركة"
description: "تعرف على كيفية إضافة شركة جديدة إلى مساحة العمل الخاصة بك."

---

# إضافة شركة

لإضافة شركة، انتقل إلى...
```

---

##  Local Development & Manifest Generation

Our frontend app does not crawl this repository directly. Instead, they read from JSON manifest files (`manifests/`) that map out the folder structure.

Whenever you add, rename, or delete a markdown file, you **must** rebuild the manifests.

### Setup

```bash
npm install
```

### Generate Manifests

Run this command to crawl the `docs/` folder and generate fresh JSON maps in the `manifests/` folder.
```bash
npm run build:manifests
```

_Note: We have a `precommit` script configured. Running `npm run precommit` will automatically build the manifests and stage them for Git before you push._
