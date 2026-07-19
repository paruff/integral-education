# Design: UX-14 — No search capability

## Impacted Components
- `package.json` — Add `@easyops-cn/docusaurus-search-local` dev dependency
- `docusaurus.config.js` — Add search plugin configuration

## Technical Approach

### 1. Install Plugin
```bash
npm install --save-dev @easyops-cn/docusaurus-search-local
```

### 2. Plugin Configuration
Add a `plugins` array to `docusaurus.config.js` with the search-local plugin:

```js
plugins: [
  [
    require.resolve('@easyops-cn/docusaurus-search-local'),
    {
      hashed: true,
      language: ['en'],
      indexDocs: true,
      indexPages: true,
    },
  ],
],
```

### 3. Build Verification
- `npm run build` generates static files including the search index JSON
- Docusaurus classic preset automatically renders a search bar in the navbar when a search plugin is active
- No theme swizzling or custom components needed

### 4. GitHub Actions
- No changes needed: the existing `deploy-gh-pages.yml` workflow runs `npm run build` and deploys the full `build/` directory including the search index

### 5. Verification Testing
- Start dev server with `npm run start`
- Confirm search bar appears in the navbar
- Test searches: "mindfulness", "shadow", "retrieval", "emotional"
- Check keyboard accessibility: Tab to search box, type query, Enter to submit

## Risk Assessment
- **Low risk**: Widely used Docusaurus plugin, no breaking changes
- **No backend**: Fully client-side search index
- **No theme changes**: Plugin integrates automatically via Docusaurus plugin system
- **No performance concern**: Index is hashed for cache busting, search is local/offline
