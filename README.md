# dima© Help Docs

This repository is the single source of truth for all public-facing, end-user documentation across our Web and Mobile apps.

By keeping our documentation in this Git repository, we can serve dynamic, localized, and version-controlled help centers, in-app guides, and contextual help without cluttering our core application codebases.

---

## Folder Architecture

To support multiple languages, products, and platforms, this repository strictly follows a **Locale ➔ Service ➔ Platform** hierarchy.

```text
docs/
├── en/                             <-- 1. Locale (en, ar)
│ ├── audience-intelligence/        <-- 2. Service
│ │ ├── web/                        <-- 3. Platform (web, mobile)
│ │ │ ├── brands/                   <-- 4. Category Group
│ │ │ │ └── add-company.md          <-- 5. Markdown Document
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

## How to Add or Edit a Document

### 1. Naming Conventions (Crucial!)

- **Kebab-case only:** All folders and `.md` files must use lowercase `kebab-case` (e.g., `getting-started.md`, `add-company.md`). No spaces or capital letters.
- **English Filenames Always:** Even when writing Arabic documentation inside the `ar/` folder, **the filename and folder names must remain in English**. This ensures our URL routing remains perfectly consistent across languages (e.g., `/ar/.../add-company` and `/en/.../add-company`).

### 2. File Placement & Nesting

- Docs can be nested up to **two levels deep** inside the platform folder (e.g., `platform/category/doc.md` or `platform/category/sub-category/doc.md`).
- The folder names are automatically parsed to generate the categories used by consuming applications.

### 3. YAML Frontmatter (Required)

Every Markdown file **must** begin with a YAML frontmatter block. This metadata is parsed by our services to map the correct titles and descriptions, which is especially important for localized titles in Arabic.

**Template:**

```markdown
---
label: "Your UI Sidebar Title"
description: "A brief 1-2 sentence description for SEO and subheadings."
order: 1
---

# Your H1 Title Here

Your markdown content goes here. You can use **bold**, _italics_, and lists.
```

**Example (English - `docs/en/.../brands/add-company.md`):**

```markdown
---
label: "Add Company"
description: "Learn how to add a new brand company to your workspace."
order: 1
---

# Adding a Company

To add a company, navigate to the...
```

**Example (Arabic - `docs/ar/.../brands/add-company.md`):**

```markdown
---
label: "إضافة شركة"
description: "تعرف على كيفية إضافة شركة جديدة إلى مساحة العمل الخاصة بك."
---

# إضافة شركة

لإضافة شركة، انتقل إلى...
```

---

## Local Development & Manifest Generation

Consuming applications do not crawl this repository directly. Instead, they read from JSON manifest files (`manifests/`) that map out the folder structure.

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

---

## Integration & Data Fetching

Because this is a public repository, any client or service can fetch documentation files directly from GitHub's raw content servers.

We use environment variables to ensure consuming applications fetch from the correct branch depending on the environment (Development, Staging, or Main/Production).

### Environment Variables

Ensure your application's `.env` configuration includes the base URL pointing to the correct branch:

```env

# Example for Development environment

DOCS_GITHUB_BASE_URL="https://raw.githubusercontent.com/Darwinz-Ai/dima-Help-Docs/development"
```

### Fetching the Data

To fetch the correct files, concatenate the base URL with the requested file path.

**1. Fetching a Manifest:**
Construct the URL using the locale, service, and platform.

```typescript
const DOCS_BASE_URL = process.env.NEXT_PUBLIC_DOCS_GITHUB_BASE_URL;
const manifestUrl = \`\${DOCS_BASE_URL}/manifests/\${locale}/\${service}/\${platform}.json\`;

const response = await fetch(manifestUrl);
const manifest = await response.json();
```

**2. Fetching a Document:**
The manifest objects contain a \`path\` property for every document (e.g., \`en/audience-intelligence/web/brands/add-company.md\`). Append this path directly to the base URL and the \`/docs/\` folder.

```typescript
const DOCS_BASE_URL = process.env.NEXT_PUBLIC_DOCS_GITHUB_BASE_URL;
// doc.path comes from the fetched manifest item
const docUrl = \`\${DOCS_BASE_URL}/docs/\${doc.path}\`;

const response = await fetch(docUrl);
const markdownText = await response.text();
```
