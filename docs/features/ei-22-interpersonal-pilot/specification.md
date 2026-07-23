# Specification: EI-22 — Pilot: Interpersonal Line suite — 15–20 participants

> **Issue #244** | **Labels: pilot, interpersonal-line, safety-critical, human-required**
> **Priority: P1** | **Effort: XL**

## Problem

No pilot infrastructure exists for the Interpersonal Line suite. The Emotional Line pilot runbook (EI-21) was created in the same feature session and provides the structural template. The Interpersonal Line suite requires its own pilot to validate: module sequence, perspective-taking and repair practice safety, trust-building across difference in a diverse cohort, and competency progression.

## Scope

This specification covers only the COPILOT-implementable portion of EI-22: creating the pilot runbook document. The HUMAN-REQUIRED tasks (participant recruitment, clinical backup procurement, pilot execution, post-pilot revision report) are documented in tasks.json but marked as human-only and out of scope for automated implementation.

## Requirements

### Functional

| ID | Requirement | Priority |
|----|-------------|----------|
| REQ-01 | Create `docs/pilots/pilot-interpersonal-line.md` as a new pilot runbook document | must-have |
| REQ-02 | Define pilot objectives: validate Interpersonal line module sequence and L1→L3 progression over 8 weeks, test perspective-taking and repair practice safety, validate trust-building across difference in a diverse cohort | must-have |
| REQ-03 | Define participant criteria: diverse stage and social identity representation deliberately recruited; Kegan stage diversity targets (30% Institutional, 40% Institutional/Interindividual boundary, 30% Interindividual); adults 18+; minimum 15, maximum 20 participants | must-have |
| REQ-04 | Define consent and screening: informed consent including Tier 2 risk disclosure for conflict material reflection and cross-difference dialogue, screening questions from EI-20 Safety Addendum for EI-10 and EI-11, opt-out provisions | must-have |
| REQ-05 | Define facilitation requirements: qualified facilitator with experience in cross-cultural dialogue; licensed clinical backup available for EI-10 and EI-11 Tier 2 safety protocols | must-have |
| REQ-06 | Define data collection instruments: pre/post perspective-taking accuracy measure (Interpersonal Reactivity Index or equivalent), trust rating in cohort relationships, weekly practice log, module completion and drop-off tracking, safety incident log, qualitative debrief at weeks 4 and 8 | must-have |
| REQ-07 | Define revision triggers: any safety incident or >30% drop-off rate triggers immediate review and pause | must-have |
| REQ-08 | Include 8-week timeline mapping the modules to weeks with expected time commitments | must-have |
| REQ-09 | Reference all four Interpersonal Line modules (EI-08 through EI-11) and the EI-07 integration capstone by correct file IDs; include Safety Addendum cross-references | must-have |
| REQ-10 | Use Kegan stage language (Institutional, Interindividual) for participant criteria, consistent with the Interpersonal line's constructive-developmental grounding | must-have |

### Non-Functional

- Follow the structural template established by `docs/pilots/pilot-emotional-line.md` (EI-21)
- Frontmatter must include id, title, description, sidebar_label
- All module links must use correct relative paths
- No MDX imports or JSX components required — plain markdown format
- No changes to existing module content or navigation
- `npm run build` must pass with no new errors

## Acceptance Criteria

1. Pilot runbook exists at `docs/pilots/pilot-interpersonal-line.md`
2. Frontmatter includes: id (`pilot-interpersonal-line`), title, description, sidebar_label
3. Pilot Objectives section defines validation targets: module sequence, L1→L3 progression, perspective-taking and repair practice safety, trust-building across difference
4. Participant Criteria section includes Kegan stage diversity targets, deliberate social identity diversity recruitment, clinical screening language, and participant range (15-20)
5. Consent & Screening section includes Tier 2 risk disclosure and references EI-20 Safety Addendum screening questions for conflict material reflection (EI-10) and cross-difference dialogue (EI-11)
6. Facilitation Requirements section specifies cross-cultural dialogue experience, clinical backup for EI-10 and EI-11, and Tier 2 protocol activation
7. Data Collection section defines all instruments: pre/post perspective-taking accuracy, trust rating, weekly practice log, module completion tracking, safety incident log, weeks 4 and 8 qualitative debriefs
8. Revision Triggers section defines trigger criteria and pause procedure
9. Module Sequence & Timeline section presents 8-week schedule with all modules, weekly time estimates, and cumulative totals
10. All module cross-references use correct file IDs
11. `npm run build` exits zero with no new errors

## Constraints

- New file: `docs/pilots/pilot-interpersonal-line.md`
- File format: Markdown (.md)
- Safety addendum reference: `internal/safety/emotional-interpersonal-safety-addendum.md`
- Module references must use relative paths matching existing file ids exactly
- Kegan stage language must be used consistently with the Interpersonal Line Stage Map

## Dependencies

- Interpersonal Line module suite (4 files in docs/modules/):
  - `interpersonal-line-overview-orientation` (EI-08)
  - `perspective-taking-empathic-accuracy` (EI-09)
  - `relational-repair-conflict-navigation` (EI-10)
  - `cross-difference-dialogue-trust-building` (EI-11)
- Integration capstone: `emotional-interpersonal-integration` (EI-07)
- Emotional & Interpersonal Safety Addendum (`internal/safety/emotional-interpersonal-safety-addendum.md`)
- AQAL Competency Map (`docs/maps/aqal-competency-map.md`) — L1-L4 Interpersonal line thresholds
- Interpersonal Line Stage Map (`docs/maps/interpersonal-line-stage-map.md`)
- Structural template: `docs/pilots/pilot-emotional-line.md` (EI-21)

## Out of Scope

- Participant recruitment — HUMAN-REQUIRED
- Clinical backup procurement — HUMAN-REQUIRED
- Running the pilot — HUMAN-REQUIRED
- Post-pilot revision report — HUMAN-REQUIRED + COPILOT (separate issue)
- Creating backlog issues from findings — HUMAN-REQUIRED + COPILOT (separate issue)
- Modifying existing module content
- Adding pilot document to navigation sidebar
- Creating interactive data collection tools
