# UX-25-REV · Design

## Audit Results

No design changes needed. UX-24-REV applied Lora via the Infima CSS variable `--ifm-heading-font-family` in `src/css/custom.css`:

```css
:root {
  --ifm-heading-font-family: Lora, Georgia, serif;
}
```

This variable is used by Infima to set `font-family` on all heading elements (h1–h6) globally. The elements this issue targets are:

| Target | HTML Element | Inherits Lora? |
|---|---|---|
| Hero headline | `<h1 className="hero__title">` | Yes — h1 |
| QuickStart titles (homepage) | `<h3>` inside `<article className="homepage-card">` | Yes — h3 |
| QuickStart titles (doc pages) | `##` → `<h2>` in Docusaurus MDX | Yes — h2 |
| Maps card titles (homepage) | `<h3>` inside `<article className="homepage-tool-card">` | Yes — h3 |
| Maps titles (doc pages) | `##` → `<h2>` in Docusaurus MDX | Yes — h2 |
| Module page titles | `<h1>` in Docusaurus doc layout | Yes — h1 |
| Section headers | `<h2>` | Yes — h2 |
| Find Your Path headings | `<h1>`, `<h2>`, `<h3>` | Yes — all headings |

**Body text, badges, sidebar, breadcrumbs** all use non-heading elements (`<p>`, `<span>`, `<nav>`, etc.) and correctly stay on the system sans-serif from `--ifm-font-family-base`.

### Decision: No implementation needed
The global approach already achieves full consistency. No CSS or component changes required.
