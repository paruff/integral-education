---
name: Pilot Execution Workflow
about: Plan and track a pilot cohort run, including participant operations, facilitation, data collection, and debrief
labels: [pilot, human-required]
---

## Pilot Name and Scope

- Pilot title:
- Target cohort size:
- Cohort profile (readiness level, audience):
- Delivery mode: <!-- self-guided / cohort / facilitator-led -->
- Planned start date:
- Planned end date:
- Related module(s) or pathway(s):
- Related issue(s) or epic:
- Milestone: <!-- M1 / M2 / M3 -->

## Outcome Definition

- Learners will be able to:
- Success signal for the pilot (observable, measurable):
- Minimum viable completion threshold:

## Pre-Pilot Preparation (Copilot can prepare; humans must approve and execute)

### Artifacts to Prepare
- [ ] Participant recruitment messaging — `[COPILOT]` draft, `[HUMAN-REQUIRED]` approval and distribution
- [ ] Informed consent form — `[COPILOT]` draft, `[HUMAN-REQUIRED]` legal/ethics review and execution
- [ ] Facilitator runbook — `[COPILOT]`
- [ ] Session scripts and discussion guides — `[COPILOT]`
- [ ] Pre-pilot survey or readiness assessment — `[COPILOT]` draft, `[HUMAN-RECOMMENDED]` review
- [ ] Analytics schema and data collection plan — `[COPILOT]`
- [ ] Safety escalation protocol — `[COPILOT]` draft, `[HUMAN-REQUIRED]` review

### Logistics (Human-Required)
- [ ] Recruit and onboard participants — `[HUMAN-REQUIRED]`
- [ ] Obtain signed consent from all participants — `[HUMAN-REQUIRED]`
- [ ] Set up LMS/delivery environment — `[HUMAN-RECOMMENDED]`
- [ ] Brief facilitators on safety escalation — `[HUMAN-REQUIRED]`

## Pilot Execution (Human-Required)

- [ ] Live facilitation sessions conducted — `[HUMAN-REQUIRED]`
- [ ] Safety check-ins performed at each session — `[HUMAN-REQUIRED]`
- [ ] Escalation incidents documented — `[HUMAN-REQUIRED]`
- [ ] Participant engagement data collected per analytics schema
- [ ] Session notes recorded by facilitator

## Data Collection Plan

| Metric | Collection Method | Frequency | Owner |
|---|---|---|---|
| Completion rate |  |  |  |
| Assessment scores |  |  |  |
| Learner satisfaction |  |  |  |
| Safety incidents |  |  |  |
| Transfer evidence |  |  |  |

## Post-Pilot Debrief and Reporting (Copilot can draft; humans must interpret)

- [ ] Analytics summary report — `[COPILOT]` draft, `[HUMAN-REQUIRED]` interpretation
- [ ] Facilitator debrief notes compiled — `[HUMAN-REQUIRED]`
- [ ] Participant feedback synthesized — `[COPILOT]` draft, `[HUMAN-RECOMMENDED]` review
- [ ] Revision recommendations documented — `[COPILOT]` draft, `[HUMAN-REQUIRED]` approval
- [ ] Ethics or safety incident review (if applicable) — `[HUMAN-REQUIRED]`

## Safety and Ethics Boundaries

- [ ] Safety escalation protocol reviewed and approved before pilot start — `[HUMAN-REQUIRED]`
- [ ] All participants provided with crisis resources — `[HUMAN-REQUIRED]`
- [ ] Data privacy and storage compliant with applicable regulations — `[HUMAN-REQUIRED]`
- [ ] Debrief session offered to all participants post-pilot — `[HUMAN-REQUIRED]`
- [ ] Sensitive outcome data interpreted only by qualified humans — `[HUMAN-REQUIRED]`

## Copilot Supporting Artifacts

Copilot can prepare the following artifacts; all require human review before use:

- [ ] Recruitment message draft
- [ ] Consent form draft
- [ ] Facilitator runbook
- [ ] Session script(s)
- [ ] Pre- and post-pilot survey questions
- [ ] Analytics schema (data fields, collection points, reporting format)
- [ ] Revision report template

## Copilot-Ready Prompt (for artifact preparation)

```
<!-- Example: "Draft a facilitator runbook for a 4-week cohort pilot of docs/modules/m2-shadow.md. Include session flow, safety check-in script, escalation steps, and a post-session debrief guide. Mark output [HUMAN-REQUIRED] for review before use with participants." -->
```

## Acceptance Criteria

- [ ] All pre-pilot artifacts prepared and human-approved
- [ ] Participant consent obtained and documented
- [ ] Pilot executed with facilitator and safety protocol in place
- [ ] Post-pilot report completed and revision recommendations filed
- [ ] All safety incidents reviewed and resolved

## Task Classification

- [x] `[HUMAN-REQUIRED]` — participant recruitment, consent, live facilitation, safety escalation, and interpretation of sensitive outcomes must be performed by humans
- [ ] `[COPILOT]` — artifact preparation (runbooks, scripts, schemas, report drafts) can be completed in this repository
