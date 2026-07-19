# Design: UX-15 — Social Sharing Meta Tags

## Impacted Components

### 1. static/img/og-default.png (NEW)
Default Open Graph image for all pages that lack a page-specific image. 1200x630px PNG with branded platform name and tagline.

### 2. docusaurus.config.js
Add `themeConfig.metadata` array with Open Graph and Twitter Card meta tags. Docusaurus renders these as `<meta>` elements in `<head>`.

### 3. Module .md files (72 files)
Add `description` frontmatter to each module, derived from the module's title, level, and lines.

### 4. Quickstart .md files (10 files)
Add `description` frontmatter to each quickstart.

### 5. Maps .md files (8 files)
Add `title` and `description` frontmatter to each maps doc.

### 6. Pilot .md files (4 files)
Add `title` and `description` frontmatter to each pilot doc.

## Technical Approach

### Docusaurus Meta Tag Rendering
Docusaurus automatically:
- Uses `themeConfig.metadata` to render `<meta>` tags site-wide
- Uses `description` frontmatter on each doc page for `og:description` (no custom code needed)
- Uses `title` frontmatter or H1 for `og:title`

Example config:
```js
metadata: [
  { property: 'og:image', content: '/img/og-default.png' },
  { property: 'og:type', content: 'website' },
  { property: 'og:site_name', content: 'Integral Education Platform' },
  { name: 'twitter:card', content: 'summary_large_image' },
],
```

### OG Image Generation
Create a simple branded 1200x630 PNG with:
- Dark background (#1a1a2e or similar)
- Platform name "Integral Education" centered
- Tagline "Mastery Across All Quadrants" below
- Clean, readable font

### Frontmatter Additions
- **Modules**: Add `description` summarizing the module (e.g., "Explore [module title] — a [level] practice for developing [lines] awareness.")
- **Quickstarts**: Add `description` describing the quickstart path
- **Maps**: Add `title` (if missing) and `description`
- **Pilots**: Add `title` (if missing) and `description`

## Data Flow
No runtime data flow — all changes are build-time static metadata.

## Constraints
- Keep OG image file size reasonable (<100KB)
- No additional npm dependencies needed
- Do not break any existing builds