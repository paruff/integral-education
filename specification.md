# Specification: LSC-02 — Implement learner progress persistence (localStorage)

## Problem

There is no mechanism to remember where a learner is across sessions. A learner who self-assessed at Level 2 in Mindfulness Basics, then returns to the site tomorrow, has no system memory of this. The Daily Reflection Template is a static markdown page — it cannot be filled in or saved.

## Requirements

### Functional
- Create `src/hooks/useProgress.js` — reads/writes to localStorage key `iel_progress_v1`
- Schema: `{ modules: { [moduleId]: { completed: bool, level: 1|2|3|4|null, lastVisited: ISO8601 } }, lastUpdated: ISO8601 }`
- Create `src/components/ModuleComplete.jsx` — "Mark complete" button + level selector (1–4) at module end, wired to useProgress
- Create `docs/my-progress.mdx` — dashboard page reading from useProgress, showing modules completed, current level per module, days since last activity
- Convert `docs/reflections/daily-template.md` to interactive MDX with fillable text areas saving to localStorage key `iel_reflections_v1`
- "Clear my progress" button on progress page
- All localStorage operations wrapped in try/catch with graceful fallback for private browsing mode
- Add ModuleComplete component to 5 representative modules (batch 1), plus batch 2 for remaining modules

### Non-Functional
- Follows existing `src/components/` and `src/hooks/` patterns
- Infima theme variables for styling
- Keyboard accessible
- `npm run build` passes

## Acceptance Criteria
1. `useProgress` hook created at `src/hooks/useProgress.js` — reads/writes `iel_progress_v1` with correct schema, try/catch for private browsing
2. `ModuleComplete` component exists at `src/components/ModuleComplete/` — "Mark complete" button + level selector (1–4), reads/writes progress via useProgress
3. `docs/my-progress.mdx` page renders: modules completed count, current level per module, days since last activity, "Clear my progress" button
4. `docs/reflections/daily-template.mdx` converted to interactive — fillable text areas, saves to `iel_reflections_v1`, try/catch fallback
5. ModuleComplete added to 5 representative modules (batch 1)
6. `npm run build` passes