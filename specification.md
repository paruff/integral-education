# Specification: UX-14 — No search capability

## Problem
The platform has no search functionality. With 20+ modules, 7+ maps, and multiple implementation and quality docs, a learner who wants to find content about emotional regulation or shadow work contraindications must manually navigate the sidebar. There is no search box on the 404 page or homepage, meaning lost users have no recovery mechanism.

## UX Rationale
Search becomes essential once a content library exceeds approximately 15-20 items. The platform already exceeds this threshold. Client-side search (no backend required) is available for free via the `@easyops-cn/docusaurus-search-local` plugin — it indexes at build time and ships the index with the static site. For a GitHub Pages deployment this is the ideal architecture: zero infrastructure cost, zero latency, works offline.

## Requirements

### Functional
- Install `@easyops-cn/docusaurus-search-local` as a dev dependency
- Add plugin configuration to `docusaurus.config.js` with:
  - `hashed: true`
  - `language: ['en']`
  - `indexDocs: true`
  - `indexPages: true`
- Verify search index is generated during `npm run build` without errors
- Confirm search box appears in navbar on both desktop and mobile
- Search returns relevant results for: mindfulness, shadow, retrieval, emotional

### Non-Functional
- No additional backend required
- Search index deployed as static JSON with the site
- Zero infrastructure cost
- Works offline
- Keyboard accessible (Tab reaches search, Enter submits)

## Acceptance Criteria
1. Search box visible in the navbar
2. Search returns relevant results for: mindfulness, shadow, retrieval, emotional
3. Build completes without errors including search index generation
4. Search works on the deployed GitHub Pages site, not only locally
5. Search box accessible via keyboard — Tab key reaches it, Enter submits
