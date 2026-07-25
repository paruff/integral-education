# UX-20 · Design

## Impacted Components

| File | Change |
|---|---|
| `src/pages/index.js` | Remove lines 31–35 (the "Open Prototype" hero CTA); update lines 209–217 (Maps & Tools card) |

## Detailed Changes

### 1. Hero CTA row (lines 31–35 in `index.js`)
Delete the third `<Link>` from the `.buttons` div:
```jsx
{/* Delete: */}
<Link className={styles.secondaryCta} to="/prototype">Open Prototype</Link>
```

The hero will retain exactly two CTAs:
- "Get Started →" (primary, to `/docs/intro`) — unchanged
- "Find Your Path →" (secondary, to `/start`) — unchanged

### 2. Maps & Tools card (lines 209–217 in `index.js`)
Update the prototype entry:
| Element | Old | New |
|---|---|---|
| Title | `Interactive Prototype` | `Platform Demo` |
| Description | `Preview pathway selection, safety checks, and assessment flow in one place.` | `Try an interactive walkthrough of pathway selection, safety gates, practice flows, and progress tracking.` |
| CTA | `Open prototype →` | `Try the demo →` |

### 3. No other files modified
`src/pages/prototype.js` and `src/pages/index.module.css` are untouched.

## Constraints
- Must preserve the existing card layout and grid structure
- Must keep the same emoji (`🖱️`)
- Must keep the same link target (`/prototype`)
