# Specification: EI-21 — Pilot: Emotional Line suite — 15–20 participants

> **Issue #243** | **Labels: pilot, emotional-line, safety-critical, human-required**
> **Priority: P1** | **Effort: XL**

## Problem

No pilot infrastructure exists for the Emotional Line suite. The existing pilot document (`pilot-pathway-integral-foundations.md`) covers the overall Integral Foundations pathway but does not yet exist in the repo. The Emotional line suite requires its own pilot to validate: module sequence, practice safety, competency progression, retrieval spacing, and the accuracy of the competency map's L1–L4 thresholds for emotional development specifically.

## Scope

This specification covers only the COPILOT-implementable portion of EI-21: creating the pilot runbook document. The HUMAN-REQUIRED tasks (participant recruitment, clinical backup procurement, pilot execution, post-pilot revision report) are documented in tasks.json but marked as human-only and out of scope for automated implementation.

## Requirements

### Functional

| ID | Requirement | Priority |
|----|-------------|----------|
| REQ-01 | Create `docs/pilots/pilot-emotional-line.md` as a new pilot runbook document | must-have |
| REQ-02 | Define pilot objectives: validate module sequence, test L1→L2→L3 progression over 8 weeks, identify safety incidents and near-misses, validate competency map evidence thresholds, gather qualitative data on practice engagement | must-have |
| REQ-03 | Define participant criteria: adults 18+, no active clinical mental health treatment required as screening (not exclusion — include with clinical approval), diverse stage representation (target: 30% Amber/Orange, 40% Green, 30% Teal/Integral), minimum 15, maximum 20 | must-have |
| REQ-04 | Define consent and screening: informed consent including Tier 2 risk disclosure, screening questions from EI-20 Emotional & Interpersonal Safety Addendum, opt-out provisions for somatic practices | must-have |
| REQ-05 | Define facilitation requirements: at least one qualified facilitator with licensed clinical backup available, Tier 2 safety protocol in effect for EI-04 and EI-06 | must-have |
| REQ-06 | Define data collection instruments: pre/post emotional vocabulary breadth assessment, weekly practice log, module completion and drop-off tracking, safety incident log, qualitative debrief at weeks 4 and 8 | must-have |
| REQ-07 | Define revision triggers: any safety incident or >30% drop-off rate triggers immediate review and pause | must-have |
| REQ-08 | Include 8-week timeline mapping the seven modules to weeks with expected time commitments | must-have |
| REQ-09 | Reference all seven Emotional Line modules by correct file IDs and include Safety Addendum cross-references | must-have |
| REQ-10 | Include Appendix with sample data collection templates (vocabulary assessment, practice log, safety incident log, debrief question bank) | should-have |

### Non-Functional

- Follow platform conventions for document structure and cross-referencing
- Frontmatter must include id, title, description, sidebar_label
- All module links must use correct relative paths (`../modules/emotional-line-overview-orientation`)
- No MDX imports or JSX components required — plain markdown format
- No changes to existing module content or navigation
- `npm run build` must pass with no new errors

## Acceptance Criteria

1. Pilot runbook exists at `docs/pilots/pilot-emotional-line.md`
2. Frontmatter includes: id (`pilot-emotional-line`), title, description, sidebar_label
3. **Pilot Objectives** section defines all five validation targets from REQ-02
4. **Participant Criteria** section includes stage diversity targets, age minimum, clinical screening language, and participant range (15-20)
5. **Consent & Screening** section includes Tier 2 risk disclosure language and references EI-20 Safety Addendum screening questions
6. **Facilitation Requirements** section specifies qualified facilitator criteria, clinical backup, and Tier 2 protocol activation for EI-04 and EI-06
7. **Data Collection** section defines all five instruments from REQ-06 with collection cadence
8. **Revision Triggers** section defines the two trigger criteria (safety incident, >30% drop-off) and the immediate review/pause procedure
9. **Module Sequence & Timeline** section presents the 8-week schedule with all seven modules, weekly time estimates, and cumulative totals
10. All module cross-references use correct file IDs
11. `npm run build` exits zero with no new errors

## Constraints

- New directory: `docs/pilots/`
- New file: `docs/pilots/pilot-emotional-line.md`
- File format: Markdown (.md)
- Safety addendum reference: `internal/safety/emotional-interpersonal-safety-addendum.md`
- Module references must use relative paths matching existing file ids exactly

## Dependencies

- Emotional Line module suite (7 files in docs/modules/):
  - `emotional-line-overview-orientation` (EI-01)
  - `emotional-granularity` (EI-02)
  - `emotion-regulation-foundations` (EI-03)
  - `affect-labelling-somatic-correlation` (EI-04)
  - `emotional-appraisal-meaning-making` (EI-05)
  - `emotional-intelligence-somatic-line` (EI-06)
  - `emotional-interpersonal-integration` (EI-07)
- Emotional & Interpersonal Safety Addendum (`internal/safety/emotional-interpersonal-safety-addendum.md`)
- AQAL Competency Map (`docs/maps/aqal-competency-map.md`) — L1-L4 Emotional line thresholds
- Emotional Line Stage Map (`docs/maps/emotional-line-stage-map.md`) — stage-specific patterns
- Module time estimates from existing module frontmatter and QuickStart

## Out of Scope

- Participant recruitment — HUMAN-REQUIRED
- Clinical backup procurement — HUMAN-REQUIRED
- Running the pilot — HUMAN-REQUIRED
- Post-pilot revision report — HUMAN-REQUIRED + COPILOT (separate issue)
- Creating backlog issues from findings — HUMAN-REQUIRED + COPILOT (separate issue)
- Modifying existing module content
- Adding pilot document to navigation sidebar
- Creating interactive data collection tools (Google Forms, etc.)
