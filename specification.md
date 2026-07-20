# Specification: SAFE-01 — Add crisis resource banner to all shadow-adjacent module pages

## Problem

Learners can navigate directly to Shadow Integration 101, Shadow Work Foundation, and all 10+ shadow modules without encountering a crisis resource link. The Trauma Activation Response Protocol correctly references 988 (US) but is buried in `docs/safety/shadowwork-safety-standard.md`. A learner in acute distress during a shadow exercise will not navigate to that document.

## Requirements

### Functional
- Create `src/components/CrisisResourceBanner/` React component with persistent, non-intrusive banner
- Banner text: "If you feel overwhelmed or unsafe, stop the practice." with link to `/docs/safety/crisis-resources`
- Create `docs/safety/crisis-resources.md` listing: 988 Suicide & Crisis Lifeline (US), Crisis Text Line, Samaritans (UK/IE), international resources note with link to findahelpline.com
- Import banner into every module under `docs/modules/` that contains `shadow` in its frontmatter `tags:` field — 14 modules total
- Import banner into every module under `docs/modules/` tagged `subtle`, `causal`, or `nondual` — 3 modules total
- Banner must be the first component import after frontmatter, before module content

### Non-Functional
- Banner must use Infima theme variables for consistent styling
- Banner must follow existing `src/components/` patterns (CSS modules, default export)
- Banner must be keyboard accessible
- Crisis resources page must use the same resource language as the Safety Classification skill
- `npm run build` must pass

## Acceptance Criteria
1. CrisisResourceBanner component exists at `src/components/CrisisResourceBanner/`
2. `docs/safety/crisis-resources.md` exists with US crisis lines, Samaritans (UK/IE), and international link
3. Banner is imported into all 14 shadow-tagged modules
4. Banner is imported into all 3 state modules (causal-witness-state, nondual-awareness-orientation, subtle-state-access)
5. Crisis resources page uses safety classification skill's approved language
6. `npm run build` passes with no errors