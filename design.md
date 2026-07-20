# Design: SAFE-03 — Fix prescribed breath ratios in Shadow Integration 101

## Impacted Components

### 1. Primary target: `docs/modules/shadow-integration-101.md` (line 110)

**Current:**
```
**Grounding:** If distress arises, pause and use a grounding reset — breathe slowly (4-count inhale, 6-count exhale), name five things you can see, and place both feet flat on the floor.
```

**Replacement:**
```
**Grounding:** If distress arises, pause and use a grounding reset — take several slow, natural breaths at whatever pace feels settling to you, name five things you can see, and place both feet flat on the floor.
```

### 2. All other module files with breath-count ratios

Audit scope: `docs/modules/**/*.md` and `docs/modules/**/*.mdx`

**Replacement patterns — context-appropriate variants:**

| Pattern to replace | Context | Replacement |
|---|---|---|
| `(4-count inhale, 6-count exhale)` standalone | Short grounding instruction | "take several slow, natural breaths" |
| `(4-count inhale / 6-count exhale)` | Parenthetical grounding | "breathe slowly at whatever pace feels comfortable" |
| `4-count inhale / 6-count exhale, three repetitions` | Grounding sequence with repetitions | "take several slow, natural breaths, repeating until you feel more settled" |
| `4-count inhale / 6-count exhale for 2-3 minutes` | Timed grounding | "breathe slowly for two to three minutes at whatever pace feels comfortable" |
| `4-count inhale / 6-count exhale breathing sequence` | Named technique | "slow, comfortable breathing" |
| `(4-count inhale / 6-count exhale, three repetitions; name three things...` | Full grounding sequence | "take several slow, natural breaths; name three things..." |
| `four-count inhale, six-count exhale` | Spelled-out variant | "slow, natural breaths at whatever pace feels settling" |
| `four-count inhale, four-count hold, six-count exhale` | Extended ratio | "slow, natural breaths" (remove the count-based practice entirely) |

### 3. Non-module files (NOT in scope, flagged as finding)

- `docs/safety/shadowwork-safety-standard.md` — 4 occurrences (line 309, 321, 333, 358)
- `docs/pilots/pilot-pathway-shadow-foundations.md` — 3 occurrences (line 104, 327, 366)
- `docs/maps/ilp-practice-taxonomy.md` — 1 occurrence (line 240)

These are outside the issue scope of "module files" but should be tracked for a follow-up issue.

## Constraints
- No new npm dependencies
- Must not change non-breath content in affected lines
- Must preserve surrounding grounding sequence structure (sensory naming, feet-on-floor)
- Replacement language must derive from Safety Classification skill's approved grounding protocol