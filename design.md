# Design: NAV-01 — Separate learner navigation from internal documentation

## Architecture

Two Docusaurus docs plugin instances:

```
docs plugin #1 (learner):
  path: docs/           → routeBasePath: /
  sidebar: learnerSidebar
  → docs/intro, docs/modules/, docs/maps/, etc.

docs plugin #2 (internal):
  path: internal/       → routeBasePath: /internal
  sidebar: internalSidebar
  → internal/implementation/, internal/quality/, etc.
```

## File operations

| Action | From | To |
|--------|------|----|
| Move | `docs/implementation/` | `internal/implementation/` |
| Move | `docs/quality/` | `internal/quality/` |
| Move | `docs/safety/` | `internal/safety/` |
| Move | `docs/pilots/` | `internal/pilots/` |
| Modify | `sidebars.js` | Strip internal sections, export as `learnerSidebar` |
| Create | `sidebarsInternal.js` | Internal-only sidebar config |
| Modify | `docusaurus.config.js` | Two plugin instances, updated navbar/footer |

## Sidebar structure

### learnerSidebar
- Introduction (intro)
- QuickStarts
- Self Line
- Emotional Line
- Interpersonal Line
- Cognitive Line
- Spiritual Line
- Moral Line
- Shadow Work
- Modules (Stage Dev, State Training, Core Skills, Shadow Work)
- Maps
- Reflection
- Interactive Prototype (link)

### internalSidebar
- Implementation (+ Guides subcategory)
- Quality
- Safety Standards
- Pilots

## Navbar
- Find Your Path → /start
- Modules → /docs/modules
- Maps & Tools → /docs/maps/aqal-overview

## Footer
Add: "Facilitator & contributor docs" → /internal/