# CLARITY-03 · Replace one homepage featured module with a differentiated example

## Problem

The three Featured Modules on the homepage (Mindfulness Basics, Emotional Granularity, Shadow Integration) are all generic-wellness-adjacent topics that don't distinguish this platform from any other self-help site.

## Solution

Replace the **Shadow Integration** card (third card) with **Amber/Mythic Orientation** — this immediately signals the platform's real differentiation: developmental stage theory grounded in Kegan, Cook-Greuter, and Fowler, not just typology.

## Requirements

### Functional
- Replace the third Featured Module card (Shadow Integration) with Amber/Mythic Orientation
- New card blurb must hint at Kegan/Cook-Greuter/Fowler grounding
- Link should point to `/docs/modules/amber-mythic-orientation`
- Keep Mindfulness Basics and Emotional Granularity as accessible entry points

### Non-functional
- `npm run build` must pass
- No new dependencies
- No CSS changes required (existing card styles work)

## Acceptance Criteria

| ID | Criterion | Test Type |
|----|-----------|-----------|
| AC-01 | Homepage renders with 3 Featured Module cards: Mindfulness Basics, Emotional Granularity, Amber/Mythic Orientation | live-system |
| AC-02 | Third card title reads "Amber/Mythic Orientation" | live-system |
| AC-03 | Third card blurb mentions Kegan, Cook-Greuter, or Fowler grounding | live-system |
| AC-04 | Third card links to `/docs/modules/amber-mythic-orientation` | live-system |
| AC-05 | Third card shows difficulty "Beginner" and read time "8 min" | live-system |
| AC-06 | `npm run build` passes | build |