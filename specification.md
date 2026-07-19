# Specification: UX-15 — No Open Graph or Twitter Card meta tags

## Problem
When any page is shared on social media, messaging apps, or email clients that render link previews, no image, title, or description appears — just a bare URL. There are no Open Graph or Twitter Card meta tags on any page. For a platform growing through community sharing, blank link previews are a material conversion barrier.

## UX Rationale
Link preview quality is a significant driver of click-through rate for socially-distributed content. Links with rich previews (image + title + description) generate 2-3 times the clicks of bare URL links. For a learning platform targeting growth via community, this is one of the highest-ROI distribution fixes available.

## Requirements

### Functional
- Create a default OG image at static/img/og-default.png (1200x630px) — a simple branded card with the platform name
- Add site-level metadata to docusaurus.config.js themeConfig.metadata: og:image, og:type, og:site_name, twitter:card
- Add page-specific description frontmatter to all module and quickstart .md files (becomes og:description)
- Add title and description frontmatter to all maps and pilots docs
- Validate OG tags using a link preview checker

### Non-Functional
- OG image must be 1200x630px (standard OG ratio)
- File size should be minimized for fast loading
- Use Docusaurus built-in meta tag support (no custom components)

## Acceptance Criteria
1. Default OG image exists at static/img/og-default.png
2. All pages show a title, description, and image in a link preview checker
3. Module pages show module-specific titles and descriptions
4. Twitter Card meta tag is present site-wide