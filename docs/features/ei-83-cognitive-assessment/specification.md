# Specification: #83 — Build Cognitive Line Developmental Profile Assessment

> **Issue #170** | **Labels: feature, assessment** | **Priority: Medium** | **Effort: L**

## Problem

The Cognitive Line is the most directly task-based developmental line on the platform — cognitive operations can be revealed through performance on structured tasks rather than relying on self-report alone. No interactive assessment exists for the Cognitive Line. Learners need a tool that presents graduated cognitive tasks, dialectical thinking problems, and metacognitive reflection to identify which cognitive operations they are currently accessing.

## Requirements

### Functional

| ID | Requirement | Priority |
|----|-------------|----------|
| REQ-01 | Create `src/components/CognitiveLineAssessment.jsx` React component | must-have |
| REQ-02 | Section A: 8 graduated reasoning tasks (concrete → formal → postformal → early metasystematic) with radio-button response options tagged to Commons' MHC levels | must-have |
| REQ-03 | Section B: 4 open-ended dialectical thinking problems with text input for learner response and self-evaluation rubric drawn from Basseches' scoring criteria | must-have |
| REQ-04 | Section C: 5 metacognitive reflection questions about the experience of completing Sections A and B | must-have |
| REQ-05 | Results page with: (a) cognitive operations profile across MHC spectrum, (b) domain-specificity note, (c) top-3 module recommendations, (d) explicit disclaimer about context-sensitivity | must-have |
| REQ-06 | "Export to Journal" feature that copies results to clipboard | must-have |
| REQ-07 | No persistent data storage — results exist only in session | must-have |
| REQ-08 | Create `docs/maps/cognitive-line-developmental-profile.mdx` MDX wrapper page | must-have |
| REQ-09 | Add entry to `sidebars.js` under Maps category | must-have |

### Non-Functional

- Follow existing component patterns (functional component, useState)
- Use CSS Modules for styling (pattern from StateAssessment)
- All module recommendation links must use correct Docusaurus Link paths
- `npm run build` must pass with no errors
- Component must handle empty/incomplete sections gracefully (partial submission possible)

## Acceptance Criteria

1. `CognitiveLineAssessment.jsx` component exists in `src/components/`
2. Section A renders 8 cognitive tasks with 4 radio-button options each, tagged to MHC levels
3. Section B renders 4 text input problems with self-evaluation rubric (4 criteria, 0-2 scale each)
4. Section C renders 5 metacognitive reflection text inputs
5. Submit button at bottom; results replace form on submission
6. Results page shows: MHC profile summary, domain-specificity disclaimer, top-3 module recommendations, export-to-journal button
7. Export button copies results to clipboard and shows confirmation
8. `docs/maps/cognitive-line-developmental-profile.mdx` renders the component
9. `sidebars.js` includes `'maps/cognitive-line-developmental-profile'` in Maps category
10. `npm run build` exits zero with no errors

## Constraints

- New files: `src/components/CognitiveLineAssessment.jsx`, `src/components/CognitiveLineAssessment.module.css`, `docs/maps/cognitive-line-developmental-profile.mdx`
- Modified file: `sidebars.js`
- No external dependencies beyond React and Docusaurus imports
- No persistent storage (no localStorage, no API calls)

## Dependencies

- Existing assessment component patterns (AmberRationalAssessment.jsx, StateAssessment.jsx)
- Cognitive Line modules in docs/modules/
- MHC level framework (Commons et al.)
- Basseches' dialectical thinking scoring criteria

## Out of Scope

- Persistent data storage or user accounts
- Adaptive testing (all learners see all questions)
- Comparative or normative scoring
- Stage assessment beyond cognitive operations
- Module content modification
