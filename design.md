# Design: LSC-02 — Implement learner progress persistence (localStorage)

## Architecture

Client-side only. No backend. Uses localStorage with two keys:
- `iel_progress_v1` — module completion/level data
- `iel_reflections_v1` — daily reflection entries

## Data Flow

```
useProgress hook
  → localStorage.getItem('iel_progress_v1')
  → parse JSON
  → React state (with fallback for missing/private browsing)
  → onUpdate: localStorage.setItem('iel_progress_v1', JSON.stringify(data))
  → try/catch for all operations

ModuleComplete component
  → calls useProgress()
  → renders "Mark complete" button + level selector (1-4 radio)
  → on change: calls useProgress().updateModule(moduleId, { completed, level, lastVisited })

my-progress.mdx page
  → calls useProgress()
  → renders: summary (X modules completed), table of modules with levels, days since last activity
  → "Clear my progress" button → useProgress().clear()
  → Private browsing notice if localStorage unavailable

daily-template.mdx
  → On mount: load from localStorage('iel_reflections_v1')
  → Fillable text areas for each section
  → Auto-save on blur (debounced) or explicit save button
  → Display last saved timestamp
```

## Component Architecture

### useProgress.js

```
useProgress() → {
  data: {
    modules: {
      [moduleId]: {
        completed: bool,
        level: 1|2|3|4|null,
        lastVisited: ISO8601
      }
    },
    lastUpdated: ISO8601
  },
  updateModule(moduleId, partial),
  getModule(moduleId) → {...},
  clear(),
  isAvailable: bool,  // false if localStorage unavailable
  getDaysSinceLastActivity() → number
}
```

### ModuleComplete.jsx

```
┌─────────────────────────────────────────┐
│ Module Progress                          │
│                                          │
│ Current level: ○ 1  ○ 2  ○ 3  ○ 4      │
│                                          │
│ [✓ Mark as complete]                     │
│                                          │
│ (if completed) ✓ Completed on [date]     │
└─────────────────────────────────────────┘
```

### my-progress.mdx

```
┌─────────────────────────────────────────┐
│ My Progress                               │
│                                           │
│ You've completed X of Y modules           │
│ Last activity: [days] days ago            │
│                                           │
│ Module           | Level | Completed |    │
│──────────────────|───────|───────────|    │
│ Mindfulness      |   3   |    ✓      |    │
│ Cognitive Bias   |   2   |    ✓      |    │
│ ...              |       |           |    │
│                                           │
│ [Clear my progress]                        │
└─────────────────────────────────────────┘
```

## Files

| File | Action | Purpose |
|------|--------|---------|
| `src/hooks/useProgress.js` | **Create** | localStorage hook for progress |
| `src/components/ModuleComplete/index.js` | **Create** | Mark complete + level selector |
| `src/components/ModuleComplete/styles.module.css` | **Create** | Styling |
| `docs/my-progress.mdx` | **Create** | Progress dashboard page |
| `docs/reflections/daily-template.md` | **Convert to .mdx** | Interactive reflection template |
| 5 module files | **Modify** | Add ModuleComplete component |

## Scope Limits

- Batch 1: 5 modules (cognitive-bias-101, mindfulness-basics, shadow-integration-101, emotional-granularity, systems-thinking-101)
- Remaining modules deferred to batch 2
- No sidebar/navbar changes
- No backend required