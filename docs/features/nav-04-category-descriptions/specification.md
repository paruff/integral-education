# NAV-04 · Add category description metadata across all module groupings

## Problem Statement

Extends CLARITY-05's fix beyond just Stage Development vs. State Training — every module category (Core Skills, Shadow Work, the seven Lines, Stage Development, State Training) should have a one-line description visible in the sidebar or index, so a first-time visitor browsing the Modules index understands what each grouping is for without opening a module.

## Requirements

### Functional
1. Every top-level module category must have a `description` field (via Docusaurus-equivalent for inline sidebar categories)
2. Descriptions are one sentence each, consistent in voice and length
3. Voice matches the tone already established by the CLARITY-05 Stage Development/State Training descriptions

### Non-functional
4. `npm run build` must pass
5. No new dependencies
6. No restructuring of the sidebar
7. No changes to module content pages

## Acceptance Criteria

| ID | Criterion | Test Type |
|----|-----------|-----------|
| AC-01 | Self Line sidebar category has a description | integration |
| AC-02 | Emotional Line sidebar category has a description | integration |
| AC-03 | Interpersonal Line sidebar category has a description | integration |
| AC-04 | Cognitive Line sidebar category has a description | integration |
| AC-05 | Spiritual Line sidebar category has a description | integration |
| AC-06 | Moral Line sidebar category has a description | integration |
| AC-07 | Shadow Work (top-level) sidebar category has a description | integration |
| AC-08 | Somatic Line sidebar category has a description | integration |
| AC-09 | Core Skills (under Modules) sidebar category has a description | integration |
| AC-10 | Shadow Work (under Modules) sidebar category has a description | integration |
| AC-11 | Descriptions are one sentence each, consistent in voice and length | review |
| AC-12 | Descriptions tone matches CLARITY-05 Stage Development/State Training descriptions | review |
| AC-13 | `npm run build` passes | build |

## Constraints

- No `_category_.json` files needed — categories are defined inline in `sidebars.js`, so `description` field is the Docusaurus-equivalent
- No new files created (modify `sidebars.js` only)
- No CSS changes required
- No changes to module content (`.md`/`.mdx` files)

## Existing Context

- `sidebars.js` defines all module groupings as inline `type: 'category'` objects
- CLARITY-05 already added `description` fields to "Stage Development" and "State Training" categories
- All 75 module files live flat in `docs/modules/` (no subdirectory structure)
- AQAL Overview page at `docs/maps/aqal-overview.md` has a "Skills (Lines)" section (lines 90-101) that lists the 6 developmental lines
