# Design: SW-93 — Shadow Work Self-Assessment

## Architecture
**Files:** 1 new component + 1 new MDX page + 1 sidebar entry.
Follows AmberRationalAssessment pattern (inline styles, same structure).

## Component Design

### Ethical Framing Gate
Before questions render, a full-screen message with acknowledge button. State: `acknowledged` boolean.

### Section A: Shadow Mechanisms (10 questions)
5 mechanisms: projection, introjection, repression, reaction formation, splitting — 2 questions each.
Scenario-based with 3 response options revealing mechanism tendency.

### Section B: Developmental Line Shadow (8 questions)
Lines: cognitive, emotional, interpersonal, moral, spiritual, self, somatic, shadow itself.
Each question: "In which area do you most notice..." — multi-select or single-select.

### Section C: Spiritual Bypassing (12 items)
Likert 1–5 agreement scale. Items from Masters' bypassing inventory adapted for web.

### Scoring
- Section A: dominant mechanism = most frequently selected pattern
- Section B: highest-shadow line identified
- Section C: bypass severity band (low/moderate/high)
- Facilitated Support trigger: trauma-adjacent indicators in 3+ questions

### Module Recommendations
Map to existing shadow modules: shadow-work-foundation, shadow-321-process, shadow-spiritual-bypassing, shadow-positive-projection, shadow-persona-mask, shadow-in-relationships, shadow-immunity-to-change, shadow-collective-cultural.

### Accessibility
All radio inputs have `<label>` with `htmlFor`. All sections have `role="radiogroup"` and `aria-labelledby`. Keyboard navigable via Tab + arrow keys.
