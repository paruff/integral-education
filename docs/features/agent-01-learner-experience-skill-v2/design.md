# Design: UX-18 — AQAL Glossary with Inline Tooltips

## Impacted Components

### 1. docs/maps/glossary.md (NEW)
Canonical glossary with 20+ AQAL/platform terms. Each term is an H3 heading with a unique anchor ID (kebab-case slug). One-to-three sentence plain-language definition.

### 2. src/components/Term/index.js (NEW)
React component that renders a term with an inline tooltip showing its definition. Uses CSS :hover and :focus-within for visibility (no JS-driven show/hide).

**Props:**
- `term` (string) — the term text to display
- `definition` (string) — the tooltip content (supports limited markdown)

**Behavior:**
- Renders `<span className={styles.wrapper}><span className={styles.term}>{term}</span><span className={styles.tooltip}>{definition}</span></span>`
- Tooltip visible on hover (desktop), focus (keyboard Tab), and tap (mobile)
- Tooltip positioned above the term text, centered

### 3. src/components/Term/styles.module.css (NEW)
CSS module for tooltip styling:
- `.wrapper` — `position: relative; display: inline;`
- `.term` — underlined/branded styling to indicate interactivity
- `.tooltip` — `position: absolute;` hidden by default, shown on `.wrapper:hover .tooltip` and `.wrapper:focus-within .tooltip`

### 4. sidebars.js
Add `'maps/glossary'` to the Maps category items list, after the existing entries.

### 5. docs/intro.md
- Add Term component imports and use on 5+ high-frequency terms
- Add link to glossary page

### 6. docs/quickstarts/personal-to-integral.md
- Add Term component imports and use on 5+ high-frequency terms
- Add link to glossary page

### 7. docs/quickstarts/amber-to-rational.mdx
- Add link to glossary page (no Term component needed here since .mdx supports imports but scope is limited)

## Glossary Terms (20+)
AQAL, Quadrant, Level/Stage, Line, State, Type, ILP, Tier 1, Tier 2, Mastery Loop, Shadow, Projection, Spiral Dynamics, Beige, Purple, Red, Blue/Amber, Orange, Green, Teal/Turquoise, Anki, Pre/Trans Fallacy

## Data Flow
- Glossary: static markdown page rendered at build time
- Term component: client-side React, no data fetching
- No API calls, no state management, no external dependencies

## Constraints
- No additional npm dependencies
- Tooltip must be pure CSS (no JS visibility toggling)
- Tooltip must not clip under sidebar (high z-index)
- Component must work in both .md and .mdx files