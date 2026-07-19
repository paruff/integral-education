# Design: UX-16 — Custom 404 Page

## Impacted Components

### 1. src/pages/404.js (NEW)
A React component that Docusaurus automatically uses as the 404 page. Uses `@theme/Layout` for consistent header/footer wrapping.

### 2. src/pages/404.module.css (NEW)
CSS module for 404 page styling, using Docusaurus/Infima CSS variables for theme consistency.

## Technical Approach

### Docusaurus Auto-Discovery
Docusaurus automatically discovers `src/pages/404.js` and renders it at any invalid URL. No config changes needed — no routing, no plugin, no docusaurus.config.js changes.

### Component Structure
```jsx
<Layout title="Page Not Found">
  <main className={styles.container}>
    <div className={styles.content}>
      <h1>Page Not Found</h1>
      <p>3-sentence explanation...</p>
      <div className={styles.recoveryLinks}>
        <Link to="/">Home</Link>
        <Link to="/start">Start Here</Link>
        <Link to="/docs/modules/mindfulness-basics">Mindfulness Basics</Link>
      </div>
      <Link to="https://github.com/paruff/integral-education/issues/new">Report broken link</Link>
    </div>
  </main>
</Layout>
```

### Recovery Navigation (3+ options)
1. Homepage — `/`
2. Start Here — `/start`
3. Mindfulness Basics module — `/docs/modules/mindfulness-basics`
4. Report a broken link — GitHub Issues (external)

### Accessibility
- Proper heading hierarchy: `h1 → h2 → h3`
- All links keyboard-navigable (native `<a>` and `<Link>` elements)
- `aria-label` on external link for context
- Sufficient color contrast using theme CSS variables

### Styling
- Use CSS variables from `:root` and `[data-theme='dark']` for theme consistency
- Center content vertically and horizontally
- Card-style recovery option blocks matching homepage card pattern
- Responsive layout

## Data Flow
No runtime data flow — static React page rendered at build time.

## Constraints
- No additional npm dependencies
- No docusaurus.config.js changes needed
- No changes to existing files