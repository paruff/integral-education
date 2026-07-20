# Specification: SAFE-03 — Fix prescribed breath ratios in Shadow Integration 101

## Problem

The Safety Note section of `docs/modules/shadow-integration-101.md` prescribes a specific breathing protocol: "breathe slowly (4-count inhale, 6-count exhale)." The Safety Classification skill (v2) explicitly prohibits prescribed breath-count ratios in grounding protocols because extended and prescribed exhale ratios can be activating for certain anxiety presentations (specifically panic disorder).

An audit reveals 28+ occurrences of prescribed breath-count ratios across module files, all using the same 4-count inhale / 6-count exhale pattern that is now prohibited.

The Safety Classification skill specifies the approved replacement:
> "Take several slow, natural breaths — at whatever pace feels settling to you. Do not force a particular count."

## Requirements

### Functional
- Remove the prescribed breath-count phrase `(4-count inhale, 6-count exhale)` from `shadow-integration-101.md`
- Replace with an invitation to breathe slowly at a natural pace without prescribing counts
- Run the same audit across ALL module files in `docs/modules/` for any prescribed breath-count ratios
- Apply the same fix pattern to every occurrence
- Replacement language must match the Safety Classification skill's approved grounding language: "slow, natural breaths — at whatever pace feels settling to you. Do not force a particular count."

### Non-Functional
- Replacement language must be context-appropriate (standalone breath instruction vs. part of grounding sequence vs. timed practice)
- Must NOT introduce new safety issues
- Must preserve the surrounding grounding sequence structure (sensory naming, feet on floor, etc.)
- `npm run build` must pass

## Acceptance Criteria
1. `shadow-integration-101.md` no longer contains prescribed breath-count ratio
2. All other module files in `docs/modules/` no longer contain prescribed breath-count ratios
3. Replacement language uses approved phrasing from Safety Classification skill
4. Surrounding grounding protocol structure preserved
5. `npm run build` passes with no errors