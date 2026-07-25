# UX-22 · Add visual weight differentiation for safety-tiered content

## Problem
No visual indicator distinguishes Tier 2/3 safety-classified modules from standard Tier 1 content. A learner visiting any module page sees TIME, LEVEL, STAGE, and PREREQUISITES badges — but nothing signals the elevated safety tier of shadow work, somatic practice, or other Tier 2 content.

## Requirements
1. Add a `safety_tier` frontmatter field to all 17 Tier 2 modules (those using CrisisResourceBanner or ShadowGate)
2. Extend the ModuleMeta component to render a TIER badge for Tier 2 and Tier 3 modules
3. The TIER badge must follow the existing badge-pill pattern (icon + label + value)
4. Tier 2 value text must include the text label "Guided" for accessibility (not color alone)
5. `npm run build` must pass

## Non-Requirements
- No CSS changes — use existing badge-pill CSS with CSS custom properties
- No Tier 1 badge rendered (Tier 1 is the default, no visual signal needed)
- No new visual pattern — extend the existing TIME/LEVEL/STAGE/PREREQUISITES row
- No changes to ShadowGate or CrisisResourceBanner components

## Acceptance Criteria
| ID | Criterion | Test Type |
|---|---|---|
| AC-1 | All 17 Tier 2 modules have `safety_tier: 2` in frontmatter | unit |
| AC-2 | ModuleMeta component renders a TIER badge when `safety_tier` is 2 or 3 | unit |
| AC-3 | Tier 2 badge shows "TIER 2 · Guided" (icon, label, value) matching existing pill style | unit |
| AC-4 | Tier 1 modules do not render a tier badge | unit |
| AC-5 | `npm run build` succeeds | integration |
