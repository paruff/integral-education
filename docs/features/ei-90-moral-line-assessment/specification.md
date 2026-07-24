# Specification — Moral Line Developmental Profile Assessment

**Issue:** #177 (GH Issue #90)
**Date:** 2026-07-23
**Component:** `MoralLineAssessment.jsx`

## 1. Functional Requirements

### FR-01: Three-Section Assessment Structure
Component SHALL present three sequentially displayed sections:
- **Section A:** Moral Dilemma Reasoning — Justice Track (3 DIT-adapted dilemmas)
- **Section B:** Moral Dilemma Reasoning — Care Track (2 adapted dilemmas)
- **Section C:** Moral Courage Gap Assessment (5 questions)

### FR-02: Section A — Justice Track Dilemma Rating
Per dilemma:
- Learner selects a binary action choice (e.g., Should Heinz steal the drug? Yes/No)
- Learner rates **8 considerations** by importance (1 = Not at all important, 5 = Extremely important)
- Considerations are tagged to Rest's three moral schemas:
  - **PI** = Personal Interest (Stages 2/3)
  - **MN** = Maintaining Norms (Stage 4)
  - **PC** = Postconventional (Stages 5/6)
- Schema tags are hidden from the learner (considerations presented as plain-language statements)

### FR-03: Section A Scoring
- Per dilemma: compute the proportion of PC-rated items relative to total
- Aggregate across all 3 dilemmas to produce a schema profile: %PI, %MN, %PC
- Dominant schema = highest proportion (tie: higher schema wins — PC > MN > PI)

### FR-04: Section B — Care Track Dilemma Rating
Per dilemma:
- Learner rates **6 considerations** by importance (1–5 scale)
- Considerations emphasize relational, contextual, and care-based factors
- Scoring produces a **Care orientation score** (proportion of high-importance care ratings out of total)

### FR-05: Section C — Moral Courage Gap
- 5 questions with 1–5 Likert scale
- Questions assess the gap between stated moral convictions and actual moral action
- Scoring: average gap magnitude; higher score = larger perceived gap

### FR-06: Results Page
Upon submission, SHALL display:
(a) Moral reasoning schema profile (bar chart: %PI, %MN, %PC with dominant schema highlighted)
(b) Care track orientation score (standalone scale)
(c) Moral courage gap assessment (interpretation band: low/moderate/significant gap)
(d) Personalized module recommendations (top 3 based on dominant schema)
(e) Explicit DIT methodology disclaimer
(f) Export to Journal (clipboard copy) and Take Assessment Again

### FR-07: Dual-Track Framing
Assessment opening SHALL display:
"This assessment explores both justice-based and care-based moral reasoning. Both are equally valid developmental tracks, and mature moral development integrates both."

### FR-08: No Persistent Storage
All responses stored only in React component state. No localStorage, no cookies, no transmission.

### FR-09: Partial Submission
Learner can submit with partially completed sections. Profile is computed from whatever data is available, with appropriate caveats displayed.

## 2. Non-Functional Requirements

| NFR | Constraint |
|-----|-----------|
| NFR-01 | CSS Modules (not inline styles, not global CSS) |
| NFR-02 | Mobile-responsive (max-width: 600px breakpoint) |
| NFR-03 | Accessibility: all inputs labeled, radio buttons keyboard-accessible |
| NFR-04 | No stage labels visible to learner (use plain-language descriptions) |
| NFR-05 | Build must pass with zero errors |
| NFR-06 | Single-page assessment (not wizard); CognitiveLineAssessment pattern |

## 3. Three Adapted DIT Dilemmas — Draft Descriptions

### Dilemma 1: Heinz (adapted from original DIT)
The classic lifesaving need vs. property rights dilemma. Learner rates considerations tagged PI/MN/PC.

### Dilemma 2: Whistleblower
An engineer discovers safety defects in a product their company is shipping. Reporting could save lives but will cost them their job and their team's projects.

### Dilemma 3: Triage Ethics
A doctor during a resource-limited emergency must decide who receives the last ventilator: a 70-year-old community leader or a 25-year-old with a dependent child.

## 4. Care Track Dilemmas

### Care 1: Family Obligation vs. Self-Care
A caregiver must decide how to balance caring for an aging parent with their own health and career needs. Surface relational web, not abstract rights.

### Care 2: Community Responsibility
A member of a close-knit community discovers a community leader's past harmful behavior that the community has chosen to forgive and move past. Should the member raise it again? Surface relational preservation vs. accountability in a care framework.

## 5. Module Recommendations — Moral Line Modules

Existing modules to map:
- `moral-line-overview-dual-track` (all levels)
- `moral-line-conventional-reasoning` (PI/MN dominant)
- `moral-line-postconventional-reasoning` (PC dominant)
- `moral-line-imagination-integral-ethics` (PC + care integration)
- `moral-line-shadow-moral-injury` (supplementary, for moral courage gap)

## 6. Constraints

- Component must follow CognitiveLineAssessment component pattern
- No API calls, no external dependencies beyond React
- Must use `@site/src/components/` import alias
- Must use Docusaurus `Link` for module recommendations
- Must use `useCallback` for export handler (Clipboard API pattern)