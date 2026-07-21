# Build Report — NAV-01: Separate learner navigation from internal documentation

## Summary

Refactored Docusaurus configuration to use dual docs plugin instances — one for learner-facing content (`docs/`) and one for internal documentation (`internal/`). Removed Implementation, Quality, Safety, and Pilots sections from the learner sidebar. Updated all cross-links.

## Session

- **Session ID:** `nav-01-20260721`
- **Branch:** `feature/nav-01-separate-navigation`

## Changes

| File | Action | Purpose |
|------|--------|---------|
| `docs/implementation/` → `internal/implementation/` | **Moved** | Internal docs |
| `docs/quality/` → `internal/quality/` | **Moved** | Internal docs |
| `docs/pilots/` → `internal/pilots/` | **Moved** | Internal docs |
| `docs/safety/` → `internal/safety/` | **Moved** (crisis-resources.md kept in docs/safety/) | Internal docs |
| `sidebars.js` | **Rewritten** | Learner-only sidebar (no Implementation/Quality/Safety/Pilots) |
| `sidebarsInternal.js` | **Created** | Internal docs sidebar |
| `docusaurus.config.js` | **Modified** | Dual plugin instances, updated navbar/footer |
| 58 cross-link files | **Modified** | Updated `../safety/`, `../quality/` etc. to `/internal/` paths |

## Validation

```
npm run build → [SUCCESS] Generated static files in "build".
```

All broken links resolved. Pre-existing anchor warnings (emoji-based heading IDs) unchanged.

## Blockers

None.