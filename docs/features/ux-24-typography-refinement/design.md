# UX-24-REV · Design

## Impacted Components

| File | Change |
|---|---|
| `src/css/custom.css` | Add Lora `@import`, set heading font-family, update green color palette |

## Detailed Changes

### 1. Add Lora display typeface

Add at top of `src/css/custom.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');
```

Set heading font-family using Infima's built-in heading variable:
```css
:root {
  --ifm-heading-font-family: Lora, Georgia, serif;
}
```

This overrides Infima's default (which inherits from `--ifm-font-family-base` = system-ui). Result:
- **h1, h2, h3, h4, h5, h6** → Lora (with Georgia fallback)
- **body, p, badges, navbar, sidebar, buttons** → system-ui stack (unchanged)

**Why `--ifm-heading-font-family`:** Infima already separates heading and body font families. Using the existing variable means Docusaurus applies it everywhere headings are used — no individual CSS selector overrides needed.

### 2. Replace light-mode green with deliberate brand green

Replace in `:root {}` block:
| Variable | Old | New |
|---|---|---|
| `--ifm-color-primary` | `#2e8555` | `#1a6b3c` |
| `--ifm-color-primary-dark` | `#29784c` | `#165a31` |
| `--ifm-color-primary-darker` | `#277148` | `#144d2a` |
| `--ifm-color-primary-darkest` | `#205d3b` | `#0f3a20` |
| `--ifm-color-primary-light` | `#33925d` | `#218243` |
| `--ifm-color-primary-lighter` | `#359962` | `#258f49` |
| `--ifm-color-primary-lightest` | `#3cad6e` | `#2ba055` |
| `--ifm-color-primary-rgb` | `46, 133, 85` | `26, 107, 60` |

Dark mode `[data-theme='dark']` block: **unchanged**.

### 3. No other changes
- Badge-pill CSS, card CSS, callout CSS: untouched
- Component structure: untouched
- Module content: untouched
