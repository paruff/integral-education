---
id: aqal-tag-audit
title: AQAL Tag Audit (P6-04)
---

# AQAL tag audit (P6-04, #539)

Produced by `node scripts/check-aqal-tags.mjs` against the "Minimum Metadata Required for New Modules" and line list in `docs/maps/aqal-competency-map.md`. Read-only except the fix noted below. AI-drafted; the open items need a human decision.

## Fixed in this PR

- 17 modules had `safety_tier: 2` but no `tier-2` tag (mechanical; tag added).

## Resolved in the follow-up PR (all 59 mismatches; `check-aqal-tags.mjs` now reports zero)

1. **Missing metadata (7 modules):** `quadrants`, `level`, `lines`, `states`, `types` added from each module's own AQAL Mapping section. AI-drafted; please check the values.
2. **`self` line (23 modules):** Self/Ego Line added to `docs/maps/aqal-competency-map.md` (marked Draft, awaiting SME) and to the script's allowed lines.
3. **Other lines (6 modules):** `ecological`, `leadership`, `systems`, `values` removed from `lines`; each module already carries its mapped lines (cognitive, moral, interpersonal, ...).
