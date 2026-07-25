# UX-26 · Design

## Impacted Components

| File | Change |
|---|---|
| `src/pages/index.js` | Add motif container `<div>` + 4 label `<span>`s inside hero `<header>` |
| `src/pages/index.module.css` | Add `.aqalMotif`, `.aqalLabel`, `.aqalLabelI/It/We/Its`, `@keyframes aqalReveal` |

## Detailed Changes

### 1. HTML structure (index.js)

Add a motif container immediately inside the `<header>`, before the `.container` div:

```jsx
<header className={clsx('hero hero--primary', styles.heroBanner)}>
  <div className={styles.aqalMotif} aria-hidden="true">
    <span className={`${styles.aqalLabel} ${styles.aqalLabelI}`}>I</span>
    <span className={`${styles.aqalLabel} ${styles.aqalLabelWe}`}>We</span>
    <span className={`${styles.aqalLabel} ${styles.aqalLabelIt}`}>It</span>
    <span className={`${styles.aqalLabel} ${styles.aqalLabelIts}`}>Its</span>
  </div>
  <div className="container">
    ...existing content...
  </div>
</header>
```

`aria-hidden="true"` ensures screen readers ignore decorative labels.

### 2. CSS (index.module.css)

**Motif container:**
- `position: absolute; inset: 0` — covers full hero
- `pointer-events: none` — doesn't block clicks
- `overflow: hidden` — contains labels
- Background: `conic-gradient` with 4 alternating sections of white at 4-8% opacity
- Fade-in animation: `opacity: 0 → 1` over 1.5s ease-out
- Static at `prefers-reduced-motion: reduce`

**Gradient:**
```css
background: conic-gradient(
  from 45deg,
  rgba(255,255,255,0.04) 0deg,
  rgba(255,255,255,0.08) 90deg,
  rgba(255,255,255,0.04) 180deg,
  rgba(255,255,255,0.08) 270deg,
  rgba(255,255,255,0.04) 360deg
);
```

**Labels:**
- `position: absolute` — positioned in quadrant corners
- `color: rgba(255,255,255,0.10)` — ~10% white opacity (faint but legible)
- `font-family: Lora, Georgia, serif` — display face
- `font-size: clamp(2rem, 5vw, 3.5rem)` — responsive
- `font-weight: 600` — readable at low opacity
- `user-select: none` — no accidental selection

**Label positions:**
| Label | CSS position |
|---|---|
| I | `top: 8%; left: 5%` |
| It | `top: 8%; right: 5%` |
| We | `bottom: 12%; left: 5%` |
| Its | `bottom: 12%; right: 5%` |

**Mobile (≤996px):**
- Labels scale down: `font-size: clamp(1.5rem, 4vw, 2.5rem)`
- Positions adjust: `top: 5%`, `bottom: 8%`, `left/right: 3%`

### 3. Contrast verification
- Hero background: `#1a6b3c`
- Hero title text: white (`#ffffff`)
- Motif gradient: white at 4-8% opacity — negligible impact on legibility
- Label text: white at ~10% opacity — intentionally faint, not informational
- **WCAG check:** Run contrast ratio on hero title against `#1a6b3c` background before merge
