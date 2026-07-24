# CLARITY-05 · Add explanatory link/blurb distinguishing State Training from Stage Development in sidebar

## Problem Statement

A new visitor encountering both "Amber/Mythic Orientation" (Stage Development category) and "Gross State Awareness" (State Training category) as separate, adjacent sidebar categories under Modules has no framing for why both exist or how they relate. States vs. stages is one of AQAL's most commonly confused distinctions — without explanatory context, the sidebar structure itself creates confusion.

## Requirements

### Functional
1. Add a one-sentence category description clarifying the difference for **both** "Stage Development" and "State Training" sidebar categories
2. The description must make the state-vs-stage distinction understandable at a glance
3. Confirm whether the AQAL Overview page already explains this distinction; if so, link to it rather than duplicating content
4. Keep descriptions concise (1-2 sentences each)

### Non-functional
5. `npm run build` must pass
6. No new dependencies
7. No restructuring of the sidebar
8. No changes to module content pages

## Acceptance Criteria

| ID | Criterion | Test Type |
|----|-----------|-----------|
| AC-01 | "Stage Development" sidebar category has a description clarifying it refers to long-term developmental stages | integration |
| AC-02 | "State Training" sidebar category has a description clarifying it refers to temporary states of consciousness | integration |
| AC-03 | AQAL Overview page confirmed as having the state/stage distinction; descriptions link to it rather than duplicating content | integration |
| AC-04 | Descriptions render on the generated Modules index page at `/docs/modules` | integration |
| AC-05 | `npm run build` passes | build |

## Constraints

- No new files created (modify sidebars.js only)
- No CSS changes required
- No changes to module content (`.md`/`.mdx` files)

## Existing Context

- `sidebars.js` lines 133-178: "Stage Development" category (inline, not `_category_.json`)
- `sidebars.js` lines 179-191: "State Training" category (inline, not `_category_.json`)
- `docs/maps/aqal-overview.md` lines 71-87 ("Depth/Levels" = stages) and lines 105-115 ("Experience/States" = states) explicitly distinguish the two concepts
- The AQAL overview also uses the "4-Path Lens" (lines 142-145) distinguishing "Growing Up" (stages) from "Waking Up" (states)
