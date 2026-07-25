# Design: MOD-01 — Fix Mindfulness Basics prerequisite mismatch

## Diagnosis

### Mindfulness Basics
- `difficulty: Beginner`, `level: Personal → Pluralistic`
- `prerequisites: - rational-orange-orientation` ← **Error.** Copy-paste from a Stage Development module template. Content is genuinely foundational (breath awareness, body scanning, open monitoring) with no cognitive dependency on Rational-stage capacities.
- **Fix:** Remove `rational-orange-orientation` from prerequisites; set `prerequisites: None`

### Mindfulness Deepening
- `difficulty: Beginner`, `level: Personal → Pluralistic`
- `prerequisites: - rational-orange-orientation`
- This module covers jhana-adjacent concentration, choiceless awareness, noting practice to deconstruct sense of self — these are Intermediate-to-Advanced practices that appropriately assume Rational-stage cognitive capacities. The difficulty tag (`Beginner`) is the error, not the prerequisite.
- **Fix:** Change `difficulty: Beginner` → `difficulty: Intermediate` to match the actual content depth and prerequisite

## Files changed

| File | Field | Old | New |
|------|-------|-----|-----|
| `docs/modules/mindfulness-basics.md` | `prerequisites` | `- rational-orange-orientation` | `None` |
| `docs/modules/mindfulness-deepening.mdx` | `difficulty` | `Beginner` | `Intermediate` |

## Dependencies
- None.
