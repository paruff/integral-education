# UX-21 · Design

## Impacted Components

| File | Change |
|---|---|
| `src/pages/index.js` | Swap CSS classes on the two hero CTAs (lines 21–30) |

## Detailed Changes

### Hero CTA row (lines 21–30 in `index.js`)
Swap the visual treatment of the two CTAs:

| CTA | Old Classes | New Classes | Effect |
|---|---|---|---|
| **Get Started →** (`/docs/intro`) | `button button--lg homepage-primary-cta` | `button button--lg button--secondary` | Primary (filled green) → Secondary (outline/ghost) |
| **Find Your Path →** (`/start`) | `styles.secondaryCta` | `button button--lg homepage-primary-cta` | Secondary (underline text) → Primary (filled green) |

### CSS
No CSS changes needed. The `homepage-primary-cta` class already exists in `src/css/custom.css` and provides the filled-green button styling. Docusaurus's built-in `button--secondary` provides the outline/ghost styling.

### No other files modified
- `src/pages/index.module.css` — untouched
- `src/css/custom.css` — no changes needed
- `src/pages/prototype.js` — untouched

## Visual Result
After the change, the hero will show:
1. **Find Your Path →** (filled green button) — primary action
2. **Get Started →** (outline button) — secondary action

This is a pure CSS class swap on the two existing `<Link>` elements.
