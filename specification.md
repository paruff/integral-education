# Specification: UX-18 — AQAL Glossary with Inline Tooltips

## Problem
AQAL terminology (quadrants, lines, levels, states, types, ILP, Tier 1/2, stage colour names, etc.) appears throughout all content without inline definition. A learner encountering 'Turiya' or 'gross state' for the first time has no in-context reference. The AQAL Overview page exists but requires navigation away from the current page. There is no cross-linked glossary.

## UX Rationale
Progressive disclosure of terminology is a foundational content UX principle. In domain-specific learning platforms, jargon that is not defined in context causes learners to leave the page to search externally — an abandonment risk. The solution has two layers: a canonical glossary as a reference document, and optional inline tooltips on first use of key terms within each module.

## Requirements

### Functional
- Create `docs/maps/glossary.md` with definitions for 20+ AQAL and platform-specific terms as H3 anchors with unique IDs
- Terms include: AQAL, Quadrant, Level/Stage, Line, State, Type, ILP, Tier 1/2, Spiral Dynamics colours (Beige through Turquoise), Shadow, Projection, Mastery Loop, Anki
- Add glossary to sidebar under Maps
- Link to glossary from `docs/intro.md` and both QuickStarts
- Create `src/components/Term/index.js` — a tooltip component with props: term, definition
- Tooltip: CSS :hover + :focus-within, keyboard-accessible, mobile-accessible
- Apply Term component to 10+ high-frequency AQAL terms in `docs/intro.md` and first QuickStart

### Non-Functional
- Tooltip uses CSS-only (no JS-driven visibility), :focus-within for keyboard
- Tooltip z-index high enough not to clip under sidebar
- Component follows existing src/components/ patterns

## Acceptance Criteria
1. Glossary page exists with minimum 20 defined terms
2. Each term has a unique anchor ID usable as a deep link
3. Term tooltip component works on hover (desktop) and tap (mobile)
4. Term component is keyboard accessible — visible on focus
5. At least 10 inline tooltips deployed in intro and first QuickStart
6. Glossary linked from sidebar, intro, and both QuickStarts