# Build Report — SAFE-03: Fix prescribed breath ratios in Shadow Integration 101

## Summary

Removed all prescribed breath-count ratios from module files, replacing them with the Safety Classification skill's approved grounding language: "slow, natural breaths at whatever pace feels settling." The fix started with the primary target (`shadow-integration-101.md`) and was systematically applied across all 20 module files that contained breath-count ratios.

## Session

- **Session ID:** `safe-03-20260720`
- **Branch:** `fix/safe-03-breath-ratios`

## Files Changed

| # | File | Changes |
|---|------|---------|
| 1 | `docs/modules/shadow-integration-101.md` | Removed `(4-count inhale, 6-count exhale)` |
| 2 | `docs/modules/shadow-positive-projection.mdx` | 2 occurrences fixed |
| 3 | `docs/modules/shadow-spiritual-bypassing.mdx` | 3 occurrences fixed |
| 4 | `docs/modules/shadow-persona-mask.mdx` | 1 occurrence fixed |
| 5 | `docs/modules/shadow-work-foundation.mdx` | 1 occurrence fixed |
| 6 | `docs/modules/shadow-in-relationships.mdx` | 3 occurrences fixed |
| 7 | `docs/modules/shadow-321-process.mdx` | 2 occurrences fixed |
| 8 | `docs/modules/shadow-immunity-to-change.mdx` | 2 occurrences fixed |
| 9 | `docs/modules/integral-shadow-teal-trap.mdx` | 2 occurrences fixed |
| 10 | `docs/modules/self-line-integration-practice.mdx` | 1 occurrence fixed |
| 11 | `docs/modules/spiritual-line-mythic-to-rational.mdx` | 3 occurrences fixed |
| 12 | `docs/modules/spiritual-line-shadow-integration.mdx` | 2 occurrences fixed |
| 13 | `docs/modules/spiritual-line-overview-orientation.mdx` | 1 occurrence fixed |
| 14 | `docs/modules/spiritual-line-post-metaphysical-integral-religion.mdx` | 1 occurrence fixed |
| 15 | `docs/modules/moral-line-overview-dual-track.mdx` | 1 occurrence fixed |
| 16 | `docs/modules/contextual-ethics-moral-complexity.mdx` | 1 occurrence fixed |
| 17 | `docs/modules/cognitive-line-practice-architecture.mdx` | 1 occurrence fixed |
| 18 | `docs/modules/cognitive-line-overview-orientation.mdx` | 1 occurrence fixed |
| 19 | `docs/modules/integral-life-practice-embodying-2nd-tier.mdx` | 1 occurrence fixed |
| 20 | `docs/modules/emotional-intelligence-somatic-line.mdx` | 1 occurrence fixed |

**Total: 20 files, 31 insertions, 31 deletions**

## Tasks Completed

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1 | Fix primary target: shadow-integration-101.md | ✅ Done | `(4-count inhale, 6-count exhale)` → `take several slow, natural breaths` |
| 2 | Audit and fix all module files | ✅ Done | 20 files, 30+ occurrences, three cleanup passes |
| 3 | Validate build | ✅ Done | `npm run build` SUCCESS |

## Replacement Language (from Safety Classification skill)

All replacements use the approved language from `.agents/skills/safety-classification/SKILL.md` line 134:
> "Slow, natural breaths at whatever pace feels settling" is safer and more universally appropriate.

Context-appropriate variants applied:
- `take several slow, natural breaths` (short grounding)
- `breathe slowly for two to three minutes at whatever pace feels comfortable` (timed)
- `slow, comfortable breathing` (in breathing sequence context)
- `take three slow, natural breaths at whatever pace feels settling` (repetition context)

## Validation Results

### Build
```
npm run build → [SUCCESS] Generated static files in "build".
```

### Breath-count audit
```
grep -rn '4-count\|6-count\|four-count inhale.*exhale' docs/modules/ → ZERO RESULTS
```

### Quality audit
- ✅ No double-word artifacts (e.g., "breathing breathing")
- ✅ No broken punctuation
- ✅ No remaining "three repetitions" counting after settling instructions

## Findings (out of scope, flagged)

Non-module files also contain breath-count ratios, outside this issue's scope:
- `docs/safety/shadowwork-safety-standard.md` — 4 occurrences (lines 309, 321, 333, 358)
- `docs/pilots/pilot-pathway-shadow-foundations.md` — 3 occurrences (lines 104, 327, 366)
- `docs/maps/ilp-practice-taxonomy.md` — 1 occurrence (line 240)

These should be addressed in a follow-up issue.

## Blockers

None.