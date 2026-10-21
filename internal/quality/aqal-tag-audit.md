---
id: aqal-tag-audit
title: AQAL Tag Audit (P6-04)
---

# AQAL tag audit (P6-04, #539)

Produced by `node scripts/check-aqal-tags.mjs` against the "Minimum Metadata Required for New Modules" and line list in `docs/maps/aqal-competency-map.md`. Read-only except the fix noted below. AI-drafted; the open items need a human decision.

## Fixed in this PR

- 17 modules had `safety_tier: 2` but no `tier-2` tag (mechanical; tag added).

## Open: needs a human decision (59 mismatches)

1. **Missing required metadata (7 modules):** `affect-labelling-somatic-correlation`, `co-regulation-relational-attunement`, `cross-difference-dialogue-trust-building`, `emotional-appraisal-meaning-making`, `relational-repair-conflict-navigation`, `shadow-integration-101`, `somatic-line-overview`. They lack some of `quadrants`, `level`, `lines`, `states`, `types`. The values are a content judgment, so none were guessed.
2. **Line vocabulary (23 modules use `self`):** The map lists six lines (cognitive, emotional, moral, interpersonal, somatic, spiritual) but the platform has a Self Line suite. Decide: add Self to the map (recommended) or retag the modules.
3. **Other unlisted lines (6 modules):** `ecological` (1), `leadership` (1), `systems` (2), `values` (2). Decide: add to the map, or map each to an existing line.

Once these are settled, wire the script into lefthook/CI so the count stays at zero.
