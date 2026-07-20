# Design: AGENT-01 — learner-experience/SKILL.md revision (v1 → v2)

## Impacted Components

### 1. `.agents/skills/learner-experience/SKILL.md` (REVISE)

The primary change target. Four sections need revision to match the v2 agent at `.agents/agents/learner-experience.md`.

#### a) TransitionAssessment scoring section
- **Replace**: linear score thresholds (`{ min: 0, max: 30 }`, `{ min: 31, max: 60 }`, `{ min: 61, max: 90 }`)
- **With**: per-line modal scoring structure (`lineScores` object with `{ lineName: { transition: 'amber_orange' } }`), modal determination logic, tie-breaking rule (weight cognitive + interpersonal)
- **Keep**: question design template, plain-language result display text

#### b) RetrievalScheduler reset logic
- **Replace**: `reset ? 0 : nextIndex` (the ternary that resets to intervalIndex 0)
- **With**: `missed ? Math.max(0, currentIndex - 1) : Math.min(INTERVALS_DAYS.length - 1, currentIndex + 1)` (drop back one interval)
- **Keep**: interval constants, `DueReviews` surface component, `getNextInterval` function

#### c) localStorage schema
- **Replace**: `version: 1` → `version: 2`
- **Replace**: `assessment.result: 'orange_green'` → `assessment.lineResults: { cognitive: '...', emotional: '...', ... }` + `assessment.modalResult: '...'`
- **Add**: `complete: false` field to `retrievalSchedule` entries
- **Keep**: all other fields (`completedModules`, `inProgressModules`, etc.)

#### d) Graceful degradation (NEW section)
- Add `safeLocalStorageGet(key)` and `safeLocalStorageSet(key, value)` patterns
- Add private browsing message: "Progress won't be saved in private browsing"
- Add in-memory fallback behavior description

#### e) Error boundary pattern (NEW section)
- Add error boundary React pattern for component crashes
- Describe recovery behavior and user-facing message

#### f) useDocusaurusContext pattern (NEW section)
- Add hook import and usage pattern for fork-safe internal links
- Describe `siteConfig.baseUrl` usage for link generation

### 2. `AGENTS.md` (UPDATE)

Add or update a skill status table entry to reflect `learner-experience/SKILL.md` is now at v2. Keep AGENTS.md lean per the token cost header.

## Constraints
- No npm dependencies changed
- Skill file must remain stage-neutral
- All existing component specifications preserved intact (CompetencyMap, ReadinessCheck, PracticeTimer, PartnerPrompt)
- "What not to build" section preserved
- MDX integration pattern section preserved
- Design principles section preserved