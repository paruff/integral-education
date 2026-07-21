# Specification: NAV-01 — Separate learner navigation from internal documentation

## Problem

The Docusaurus sidebar exposes Implementation, Quality, Pilots, and Safety sections to all visitors. These create cognitive noise for learners.

## Requirements

### Functional
- Separate sidebar configs: `learnerSidebar` and `internalSidebar`
- `learnerSidebar`: Introduction, QuickStarts, Self/Emotional/Interpersonal/Cognitive/Spiritual/Moral Lines, Modules (Stage Dev, State Training, Core Skills, Shadow Work), Maps, Reflection, Prototype
- `internalSidebar`: Implementation, Quality, Safety Standards, Pilots — accessible via `/internal/` route
- Remove internal docs sections from learner sidebar entirely
- Navbar links only to learner-facing pages: Find Your Path, Modules, Maps & Tools
- Footer includes "Facilitator & contributor docs" link to `/internal/`
- Internal docs moved to `internal/` directory from `docs/implementation/`, `docs/quality/`, `docs/safety/`, `docs/pilots/`

### Non-Functional
- `npm run build` passes
- No lost module content — learner-facing docs unchanged
- Internal docs remain accessible at `/internal/...` URLs

## Acceptance Criteria
1. `sidebars.js` exports `learnerSidebar` only (no internal sections)
2. Internal docs moved to `internal/` directory
3. Internal docs accessible at `/internal/implementation/...`, `/internal/quality/...`, etc.
4. Navbar shows: Find Your Path, Modules, Maps & Tools (no internal sections)
5. Footer has "Facilitator & contributor docs" → `/internal/`
6. `npm run build` passes