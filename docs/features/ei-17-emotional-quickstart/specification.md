# Specification: EI-17 — Create QuickStart: Emotional Line Development path

> **Issue #239** | **Labels: emotional-line, quickstart, navigation, copilot-implementable, human-recommended**
> **Priority: P1** | **Effort: M**

## Problem

There is no QuickStart path for a learner who wants to develop the Emotional line specifically. The existing QuickStarts address stage transitions (Personal to Integral, Amber to Rational, Rational to Pluralistic, Pluralistic to Integral), individual developmental lines (Self, Somatic, Spiritual, Cognitive, Moral), state development, and shadow work. A learner who identifies emotional intelligence as a development priority has no guided entry point into the Emotional line suite of seven modules.

## Requirements

### Functional

| ID | Requirement | Priority |
|----|-------------|----------|
| REQ-01 | Create `docs/quickstarts/emotional-line-development.md` as a new QuickStart file | must-have |
| REQ-02 | Define QuickStart purpose matching issue description | must-have |
| REQ-03 | Define three audience profiles with routing to different starting modules: (a) richer emotional vocabulary → emotional-granularity, (b) understands emotions but struggles under stress → emotion-regulation-foundations, (c) regulates individually but struggles relationally → emotional-intelligence-somatic-line | must-have |
| REQ-04 | Sequence all seven Emotional line modules: Overview → Emotional Granularity → Regulation Foundations → Affect Labelling → Appraisal → Co-regulation → Integration | must-have |
| REQ-05 | Include estimated reading and practice time per module with cumulative total | must-have |
| REQ-06 | Add transition signals between each module (observable readiness indicators) | must-have |
| REQ-07 | Add QuickStart card to homepage QuickStarts section in src/pages/index.js | must-have |
| REQ-08 | Add QuickStart entry to sidebar in sidebars.js under QuickStarts category | must-have |
| REQ-09 | Ensure `npm run build` passes with no errors | must-have |

### Non-Functional

- Follow existing QuickStart format conventions (use somatic-line-development.md as primary template)
- No MDX imports or JSX components — plain markdown format
- No changes to existing module content
- No changes to Docusaurus configuration
- Frontmatter must include id, title, description, sidebar_label, sidebar_position

## Acceptance Criteria

1. QuickStart file exists at `docs/quickstarts/emotional-line-development.md`
2. Frontmatter includes: id (`emotional-line-development`), title (`Emotional Line Development (QuickStart)`), description, sidebar_position (12, after somatic-line-development at 11)
3. Three audience profiles present with explicit routing to starting modules
4. Full 7-module sequence with estimated reading and practice times, cumulative total
5. Transition signals (ready-to-advance indicators) between each module
6. Outcomes section summarizing what learners will develop
7. Next Steps section linking to related QuickStarts and resources
8. QuickStart card appears on homepage (src/pages/index.js)
9. QuickStart entry appears in sidebar (sidebars.js) under QuickStarts category
10. `npm run build` exits zero with no new errors

## Constraints

- New file: `docs/quickstarts/emotional-line-development.md`
- Files modified: `src/pages/index.js`, `sidebars.js`
- File format: Markdown (.md) — follow somatic-line-development.md conventions
- Module links must use relative paths (`../modules/emotional-line-overview-orientation`)
- Module ids must match existing file frontmatter ids exactly
- Time estimates must match frontmatter readingTime + practiceTime values from each module

## Dependencies

- Emotional Line module suite (7 files in docs/modules/)
- Existing QuickStart templates (somatic-line-development.md, self-line-development.mdx)
- Homepage (src/pages/index.js) — QuickStarts section
- Sidebar (sidebars.js) — QuickStarts category

## Out of Scope

- Creating new Emotional line modules
- Modifying existing module content or sequencing
- Creating MDX components or interactive elements
- Adding the QuickStart to navigation beyond homepage and sidebar