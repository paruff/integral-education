# Specification: EI-18 — Create QuickStart: Interpersonal Line Development path

> **Issue #240** | **Labels: interpersonal-line, quickstart, navigation, copilot-implementable, human-recommended**
> **Priority: P1** | **Effort: M**

## Problem

There is no QuickStart path for a learner who wants to develop the Interpersonal line specifically. A learner who identifies relational skill as a development priority has no guided entry point into the Interpersonal line suite.

## Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| REQ-01 | Create `docs/quickstarts/interpersonal-line-development.md` following the EI-17 structure | must-have |
| REQ-02 | Define path purpose: develop capacity to collaborate, dialogue, and build trust across differences | must-have |
| REQ-03 | Define three audience profiles: (a) strong analytical skills / difficulty relational complexity → EI-09, (b) relationally warm but conflict-avoidant → EI-10, (c) good individual relationships / difficulty cross-difference → EI-11 | must-have |
| REQ-04 | Sequence: EI-08 (Overview) → EI-09 (Perspective-Taking) → EI-10 (Repair & Conflict) → EI-11 (Cross-Difference Dialogue) → EI-13 (Integration) | must-have |
| REQ-05 | Add transition signals between each module | must-have |
| REQ-06 | Include estimated times per module | must-have |
| REQ-07 | Add QuickStart card to homepage and sidebar entry | must-have |
| REQ-08 | `npm run build` passes | must-have |

## Acceptance Criteria

1. QuickStart file exists at `docs/quickstarts/interpersonal-line-development.md`
2. Three audience profiles with routing
3. Five-module sequence with transition signals
4. Homepage card and sidebar entry present
5. `npm run build` exits zero

## Constraints

- Same file structure as EI-17 (somatic-line-development.md pattern)
- No MDX components — plain markdown
- Module links must match existing file IDs
- EI-17 QuickStart not yet merged — do not cross-link until available