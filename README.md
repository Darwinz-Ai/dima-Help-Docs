# dima© Help Docs

This repository is the single source of truth for all public-facing, end-user documentation across our Web and Mobile apps.

By keeping our documentation in this Git repository, we can serve dynamic, localized, and version-controlled help centers, in-app guides, and contextual help without cluttering our core application codebases.

---

## Table of Contents

- [Folder Architecture](#folder-architecture)
- [How to Add or Edit a Document](#how-to-add-or-edit-a-document)
  - [Naming Conventions (Crucial!)](#1-naming-conventions-crucial)
  - [File Placement & Nesting](#2-file-placement--nesting)
  - [YAML Frontmatter (Required)](#3-yaml-frontmatter-required)
- [Writing Guidelines & Guide Structure](#writing-guidelines--guide-structure)
- [Image & Media Handling](#image--media-handling)
- [How to Contribute](#how-to-contribute)
- [Local Development & Manifest Generation](#local-development--manifest-generation)
  - [Setup](#setup)
  - [Generate Manifests (Manual)](#generate-manifests-manual)
- [Integration & Data Fetching](#integration--data-fetching)
  - [Environment Variables](#environment-variables)
  - [Fetching the Data](#fetching-the-data)

---

## Folder Architecture

To support multiple languages, products, and platforms, this repository strictly follows a **Locale ➔ Service ➔ Platform** hierarchy.

```text
docs/
├── en/                        <-- 1. Locale (en, ar)
│ ├── audience-intelligence/   <-- 2. Service
│ │ ├── web/                   <-- 3. Platform (web, mobile)
│ │ │ ├── brands/              <-- 4. Category Group
│ │ │ │ └── add-company.md     <-- 5. Markdown Document
│ │ │ └── manage/
│ │ │ └── own-page/            <-- Nested Category Group
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

Every Markdown file **must** begin with a YAML frontmatter block. This metadata is parsed by our services to map the correct titles and descriptions.

_Note on `order`: This field is **optional**. If omitted, it defaults to `999` (placing it at the bottom of the list). Use it only when you need to enforce a strict visual order in the UI sidebar._

**Example (English with strict ordering):**

```markdown
---
label: "Add Company"
description: "Learn how to add a new brand company to your workspace."
order: 1
---

# Adding a Company
```

**Example (Arabic relying on default order):**

```markdown
---
label: "إضافة شركة"
description: "تعرف على كيفية إضافة شركة جديدة إلى مساحة العمل الخاصة بك."
---

# إضافة شركة
```

---

## Writing Guidelines & Guide Structure

For consistency across the platform, all documentation should follow a standardized format.

**The Gold Standard:**
Please reference `docs/en/audience-intelligence/web/brands/add-company.md` as the primary example of how a document should be structured.

**General Rules:**

- Start with an introductory paragraph summarizing the feature.
- Whenever possible, include a video tutorial demonstrating how to use the feature described in your documentation.
- Use a divider (`---`) before diving into the steps.
- Use sequential `##` headings for each major step.
- If a step contains multiple sub-sections, use `###` for the sub-headings.
- Place the relevant image directly under the main or sub-heading, as appropriate.

---

## Image & Media Handling

Do not store raw images directly in this repository to prevent bloating the git history.

All images must be manually uploaded to our Google Cloud Storage bucket: `mediamonitor/dimabothelp/images`.

**The GCS Folder Rule:**
The folder structure inside GCS must exactly mirror the repository structure, **with one addition:** you must create a final folder named identically to the `.md` file to house its specific images.

- **Repo Path:** `docs/en/audience-intelligence/web/brands/add-company.md`
- **GCS Path:** `.../images/en/audience-intelligence/web/brands/add-company/add-company-step-1.png`

![GCS Bucket Structure Example](Screenshot 2026-08-11 at 10-55-41 mediamonitor – Bucket details – Cloud Storage – My First Project – Google Cloud console.png)

Once uploaded, grab the public URL from GCS and reference it in your markdown:

```markdown
![Description for screen readers & chatbot](https://storage.googleapis.com/mediamonitor/dimabothelp/images/en/audience-intelligence/web/brands/add-company/add-company-step-1.png)
```

---

## How to Contribute

To maintain a clean and functioning documentation pipeline, please follow this strict workflow:

1. **Branch Out:** Create a new branch originating from the `development` branch.
2. **Make Changes:** Add or edit your markdown files and upload any necessary images to GCS.
3. **Build Manifests:** Run `npm run precommit` in your terminal. This will automatically crawl your changes, generate the updated JSON manifest files, and stage them.
4. **Push to Dev:** Commit your changes and push them to the `development` branch.
5. **Review & Stage:** If everything looks good and functions correctly in the dev environment, push your changes to the `staging` branch for final review.

---

## Local Development & Manifest Generation

Consuming applications do not crawl this repository directly. Instead, they read from JSON manifest files (`manifests/`) that map out the folder structure.

### Setup

```bash
npm install
```

### Generate Manifests (Manual)

If you need to manually rebuild the JSON maps without committing:

```bash
npm run build:manifests
```

---

## Integration & Data Fetching

We use environment variables to ensure consuming applications fetch from the correct branch depending on the environment (Development, Staging, or Main/Production).

### Environment Variables

Ensure your application's `.env` configuration includes the base URL pointing to the correct branch:

```env
# Example for Development environment

DOCS_GITHUB_BASE_URL="https://raw.githubusercontent.com/Darwinz-Ai/dima-Help-Docs/development"
```

### Fetching the Data

**1. Fetching a Manifest:**

```typescript
const DOCS_BASE_URL = process.env.NEXT_PUBLIC_DOCS_GITHUB_BASE_URL;
const manifestUrl = `${DOCS_BASE_URL}/manifests/${locale}/${service}/${platform}.json`;

const response = await fetch(manifestUrl);
const manifest = await response.json();
```

**2. Fetching a Document:**

```typescript
const DOCS_BASE_URL = process.env.NEXT_PUBLIC_DOCS_GITHUB_BASE_URL;
// doc.path comes from the fetched manifest item (e.g., en/.../add-company.md)
const docUrl = `${DOCS_BASE_URL}/docs/${doc.path}`;

const response = await fetch(docUrl);
const markdownText = await response.text();
```
