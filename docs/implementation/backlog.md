---
id: backlog
title: Integral Platform Backlog
sidebar_label: Backlog
tags: [implementation, backlog, roadmap]
---

# Integral Platform Backlog

This backlog is designed so Copilot can implement technical and documentation items directly, while clearly flagging work that requires human judgment, facilitation, ethics review, or participant operations.

## Tag Legend

- `[COPILOT]` Copilot can implement autonomously in this repository.
- `[HUMAN-RECOMMENDED]` Copilot can prepare drafts, but a human should review and approve.
- `[HUMAN-REQUIRED]` Must be performed by qualified humans (ethics, facilitation, participant operations, legal, mental health escalation).

## Priority Milestones

- `M1 (Weeks 1-4)` Foundations and governance artifacts.
- `M2 (Weeks 5-8)` Pilot content, prototype, and quality systems.
- `M3 (Weeks 9-12)` Pilot delivery and revision package.

## Epic 1: Program Foundation and Governance

### Issue E1-1: Product charter and delivery governance (`M1`)
- Tags: `[COPILOT] [HUMAN-RECOMMENDED]`
- Outcome: Single source of truth for mission, outcomes, constraints, and decision cadence.
- Tasks:
  - [x] Draft charter doc with scope, exclusions, and measurable outcomes. `[COPILOT]` → [`product-charter.md`](product-charter)
  - [x] Define RACI for curriculum, safety, and analytics workflows. `[COPILOT]` → [`raci.md`](raci)
  - [ ] Approve charter and assign owners. `[HUMAN-REQUIRED]`

### Issue E1-2: Repository-wide implementation protocol (`M1`)
- Tags: `[COPILOT]`
- Outcome: Coding and documentation instructions optimized for this roadmap.
- Tasks:
  - [ ] Create/update `.github/copilot-instructions.md`. `[COPILOT]`
  - [ ] Add issue templates for feature, content, safety, and pilot execution work. `[COPILOT]`

## Epic 2: AQAL and ILP Knowledge Architecture

### Issue E2-1: Finalize AQAL competency map (`M1`)
- Tags: `[COPILOT] [HUMAN-RECOMMENDED]`
- Outcome: Competency model across quadrants, levels, lines, states, and types.
- Tasks:
  - [ ] Define competency domains and progression indicators by level. `[COPILOT]`
  - [ ] Add evidence and assessment signals for each competency. `[COPILOT]`
  - [ ] Validate developmental assumptions with subject-matter experts. `[HUMAN-REQUIRED]`

### Issue E2-2: Finalize ILP practice taxonomy (`M1`)
- Tags: `[COPILOT] [HUMAN-RECOMMENDED]`
- Outcome: Taxonomy for body, mind, spirit, shadow, ethics, relationships, and service practices.
- Tasks:
  - [ ] Define taxonomy dimensions (duration, intensity, contraindications, setup). `[COPILOT]`
  - [ ] Define progression ladders and fallback alternatives. `[COPILOT]`
  - [ ] Review safety boundaries for shadow and contemplative practices. `[HUMAN-REQUIRED]`

## Epic 3: Evidence Quality and Objectivity Controls

### Issue E3-1: Evidence-vetting checklist (`M1`)
- Tags: `[COPILOT] [HUMAN-RECOMMENDED]`
- Outcome: Repeatable quality gate for claims, citations, and overstatement control.
- Tasks:
  - [x] Build a checklist for source class, methods, causality limits, and citation validity. `[COPILOT]` → [`evidence-vetting-checklist`](../quality/evidence-vetting-checklist)
  - [x] Add red-flag list for hype language and uncited AI content. `[COPILOT]` → [`evidence-vetting-checklist`](../quality/evidence-vetting-checklist)
  - [ ] Approve policy for claims escalation and rejection criteria. `[HUMAN-REQUIRED]`

### Issue E3-2: Peer review SOP (`M1`)
- Tags: `[COPILOT] [HUMAN-RECOMMENDED]`
- Outcome: Standardized review workflow for complex modules and controversial topics.
- Tasks:
  - [x] Define reviewer roles, rounds, and acceptance thresholds. `[COPILOT]` → [`peer-review-sop`](../quality/peer-review-sop)
  - [x] Add structured decision log and dissent capture. `[COPILOT]` → [`peer-review-sop`](../quality/peer-review-sop)
  - [ ] Staff qualified reviewers and run calibration session. `[HUMAN-REQUIRED]`

## Epic 4: Shadowwork Safety and Facilitation Standards

### Issue E4-1: Shadowwork safety tier model (`M1`)
- Tags: `[COPILOT] [HUMAN-RECOMMENDED]`
- Outcome: Tiered risk model with delivery constraints and escalation pathways.
- Tasks:
  - [x] Define Tier 1-3 practices and entry criteria. `[COPILOT]` → [`shadowwork-safety-standard`](../safety/shadowwork-safety-standard)
  - [x] Define stop rules, grounding protocols, and documentation requirements. `[COPILOT]` → [`shadowwork-safety-standard`](../safety/shadowwork-safety-standard)
  - [ ] Clinical and legal review of safety model. `[HUMAN-REQUIRED]`

### Issue E4-2: Facilitator qualification standard (`M2`)
- Tags: `[HUMAN-REQUIRED]`
- Outcome: Verified facilitator training and supervision protocol.
- Tasks:
  - [ ] Define qualification minimums and supervision ratio. `[HUMAN-REQUIRED]`
  - [ ] Certify facilitators for Tier 2 and Tier 3 delivery. `[HUMAN-REQUIRED]`
  - [ ] Establish incident response roster. `[HUMAN-REQUIRED]`

## Epic 5: Pilot Pathways and Prototype

### Issue E5-1: Pilot pathway A - Integral Foundations (`M2`)
- Tags: `[COPILOT] [HUMAN-RECOMMENDED]`
- Outcome: 4-week pathway with microlearning, retrieval, and performance tasks.
- Tasks:
  - [ ] Build weekly objectives and micro-lesson sequence. `[COPILOT]`
  - [ ] Add retrieval schedule (AABBCC -> ABCABC progression). `[COPILOT]`
  - [ ] Validate content with faculty facilitator. `[HUMAN-REQUIRED]`

### Issue E5-2: Pilot pathway B - Shadow Integration Foundations (`M2`)
- Tags: `[COPILOT] [HUMAN-RECOMMENDED]`
- Outcome: 4-week low-risk shadow pathway with strong consent and safeguards.
- Tasks:
  - [ ] Draft protocol-aligned microlearning plan and reflection prompts. `[COPILOT]`
  - [ ] Add safety checkpoints and escalation path per tier model. `[COPILOT]`
  - [ ] Approve launch readiness by safety board. `[HUMAN-REQUIRED]`

### Issue E5-3: Clickable prototype (`M2`)
- Tags: `[COPILOT]`
- Outcome: Prototype for learner pathway, practice flow, and rubric experience.
- Tasks:
  - [ ] Implement interactive page in Docusaurus. `[COPILOT]`
  - [ ] Add links from docs and homepage navigation. `[COPILOT]`
  - [ ] Run usability walkthrough and collect notes. `[HUMAN-RECOMMENDED]`

## Epic 6: Pilot Execution and Revision

### Issue E6-1: Pilot runbook for 20-40 learners (`M3`)
- Tags: `[COPILOT] [HUMAN-REQUIRED]`
- Outcome: Operational protocol for recruitment, consent, scheduling, and support.
- Tasks:
  - [ ] Draft pilot runbook, scripts, and data capture forms. `[COPILOT]`
  - [ ] Recruit 20-40 adult learners and execute sessions. `[HUMAN-REQUIRED]`
  - [ ] Monitor incidents and engagement in real time. `[HUMAN-REQUIRED]`

### Issue E6-2: Pilot revision report (`M3`)
- Tags: `[COPILOT] [HUMAN-RECOMMENDED]`
- Outcome: Evidence-led revision decisions and backlog update.
- Tasks:
  - [ ] Provide report template with quantitative and qualitative sections. `[COPILOT]`
  - [ ] Populate report with pilot outcomes and recommendations. `[HUMAN-REQUIRED]`
  - [ ] Convert findings into prioritized change issues. `[COPILOT]`

## Suggested GitHub Labels

- `copilot-implementable`
- `human-required`
- `human-recommended`
- `safety-critical`
- `evidence-quality`
- `pilot`
- `aqal`
- `ilp`
- `assessment`
- `accessibility`

## Suggested Issue Template Snippet

Use this body for each issue:

```md
## Outcome

## Scope

## Tasks
- [ ]

## Acceptance Criteria
- [ ]

## Tags
- [ ] copilot-implementable
- [ ] human-required
- [ ] human-recommended

## Dependencies

## Risks and Mitigations
```
