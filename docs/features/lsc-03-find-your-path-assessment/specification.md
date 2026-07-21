# Specification: LSC-03 — Convert "Find Your Path" to deliver confirmed, personalized recommendation
> **Issue #319** | **PR #340** | Archived from feature-flow session


## Problem

The "Find Your Path" assessment (`src/pages/start.js`) has a working scoring function and result states, but the result explanations describe the path rather than mirroring the learner's specific answers back. The issue requests: (1) verify routing logic works, (2) add 2–3 sentence personalized mirror paragraphs, (3) ensure live rendering of all result states.

## Requirements

### Functional
- Verify the existing routing logic (tally(), RESULTS mapping, rendering) works for all four result states: A-dominant, B-dominant, C-dominant, mixed
- Replace each result's `explanation` paragraph with a 2–3 sentence **mirror paragraph** that reflects the learner's answers back without labeling ("Your answers suggest you tend to rely on established sources and clear rules…")
- Each result must retain: (a) path name/title, (b) mirror paragraph, (c) direct CTA button to QuickStart
- Mirror paragraphs follow developmental vocabulary guidelines: non-labeling, non-pathologizing, age-appropriate for Amber+ audiences

### Non-Functional
- Use Infima theme variables for styling (no hardcoded colors beyond existing)
- Keyboard accessible (existing pattern is already accessible)
- Follows existing `src/pages/start.js` patterns — no structural change
- `npm run build` must pass
- Mirror paragraphs reviewed for developmental accuracy per issue label

## Acceptance Criteria
1. All four result states (A-dominant, B-dominant, C-dominant, mixed) render correctly in `npm run build` output
2. Each result displays: (a) path title, (b) 2–3 sentence mirror paragraph reflecting learner's specific answer pattern, (c) direct CTA button to the recommended QuickStart
3. Mirror paragraphs use non-labeling language per developmental-vocabulary skill (no "you are an Amber-stage thinker", no "your level is…")
4. Existing routing logic (tally function, 3-of-4 threshold) unchanged and verified correct
5. All-paths grid retained with "Recommended" badge on the recommended path
6. `npm run build` passes with zero errors

## Scope
- **File:** `src/pages/start.js` — modify result explanation paragraphs only
- **NOT modified:** tally() logic, question structure, option labels, CSS, page layout, sidebar, navbar