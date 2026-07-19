# Design: UX-17 — WCAG 2.1 AA Accessibility Audit

## Impacted Components

### Audit Targets
All major page types to ensure site-wide coverage:
1. `/` — Homepage
2. `/docs/intro` — Intro doc
3. `/docs/modules/mindfulness-basics` — Module page
4. `/docs/quickstarts/personal-to-integral` — Quickstart page
5. `/prototype` — Interactive prototype
6. `/start` — Start Here assessment page
7. `/any-invalid-url` — Custom 404

### Potential Fix Targets
Based on known/predictable violations:
- **Skip-to-content link** — Verify and add if missing
- **Color contrast** — Check custom CSS elements (navbar-start-here, homepage components)
- **Keyboard focus visibility** — Verify on prototype interactive controls
- **Heading hierarchy** — Verify consistency (UX-09 already addressed H1→H2)
- **Form labels** — Verify all inputs have accessible labels (UX-13 already addressed prototype)
- **Image alt text** — Check for missing alt text

## Technical Approach

### Audit Tools
- **Primary**: `@axe-core/cli` (runs axe-core in headless Chrome via Puppeteer)
- **Secondary**: Chrome DevTools Lighthouse for accessibility score
- **Verification**: Manual HTML output inspection

### Process
1. `npm run build` + `npm run serve` to host the site locally
2. Install `@axe-core/cli` via npx
3. Run axe against each target URL
4. Collect violations into structured report
5. Fix all Level A violations (edit source files)
6. Re-run axe to verify fixes
7. Run Lighthouse accessibility audit
8. Document results in docs/quality/accessibility-audit.md

### Fix Patterns

| Violation | Remediation |
|-----------|-------------|
| Missing skip-to-content link | Add `#__docusaurus_skipToContent_fallback` target (Docusaurus already renders the skip link; verify the target exists) |
| Insufficient color contrast | Adjust CSS custom properties or element-specific colors |
| Missing form labels | Add `aria-label` or visible `<label>` elements |
| Keyboard focus not visible | Add `:focus-visible` styles |
| Missing image alt text | Add `alt` attributes |

## Data Flow
No runtime data flow — all changes are static HTML/CSS/JS.

## Constraints
- Do not change module content
- Do not change Docusaurus core behavior
- Do not break existing build
- axe-core CLI only — no additional infrastructure