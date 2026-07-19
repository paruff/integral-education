---
id: product-charter
title: Product Charter
sidebar_label: Product Charter
tags: [implementation, governance, charter, M1]
---

## Integral Education Platform — Product Charter

> **Status:** Draft — Pending human owner review and approval  
> **Version:** 0.1  
> **Last Updated:** 2026-04-05  
> **Classification:** [HUMAN-RECOMMENDED] — Copilot-drafted; human owners must validate scope, constraints, and sign-off section before this becomes authoritative.

---

## 1. Mission Statement

The Integral Education Platform delivers evidence-based, developmentally-informed learning experiences that support whole-person growth across the cognitive, emotional, somatic, interpersonal, and ethical lines of development.

We apply the AQAL framework (All Quadrants, All Levels, All Lines, All States, All Types) to design pathways that are:
- Grounded in adult learning science (self-direction, relevance, problem-centred inquiry)
- Safe, consent-led, and accessible (WCAG 2.2)
- Measurable against clear developmental outcomes

---

## 2. Strategic Objectives

| # | Objective | Success Indicator |
|---|-----------|------------------|
| O1 | Provide accessible integral learning pathways | ≥2 learner-facing pilot pathways launched by M3 |
| O2 | Maintain evidence quality across all content | 100% of published claims pass the Evidence-Vetting Checklist |
| O3 | Uphold safety standards for shadow and reflective practices | Zero Tier 3 safety incidents unescalated within 24 h |
| O4 | Achieve measurable learner outcomes in pilot cohort | ≥70% of pilot learners demonstrate pre→post gains on self-report rubric |
| O5 | Operate with transparent, auditable governance | Charter, RACI, and decision log current within each milestone |

---

## 3. Scope

### 3.1 In Scope

- Design and publishing of AQAL-aligned learning modules following the Mastery Loop (Learn → Practice → Reflect → Assess → Integrate → Retrieval)
- Two pilot pathways for M2–M3:
  - **Pathway A:** Integral Foundations (4 weeks)
  - **Pathway B:** Shadow Integration Foundations (4 weeks, low-risk Tier 1)
- Supporting governance artifacts: charter, RACI, backlog, evidence checklist, peer review SOP, safety standard
- Docusaurus-based platform hosted on GitHub Pages
- Analytics schema and pilot revision report

### 3.2 Out of Scope

| Exclusion | Rationale |
|-----------|-----------|
| Clinical therapy or counselling | Platform is educational, not clinical; mental health services require licensed practitioners |
| Live facilitator certification programme | Requires qualified human credentialing body; flagged [HUMAN-REQUIRED] |
| Automated learner assessment or grading algorithms | Rubrics are self-assessed; algorithmic grading not appropriate without validity study |
| Recruitment, consent collection, and live facilitation | Participant operations are [HUMAN-REQUIRED] |
| Personalised AI coaching | Out of scope for M1–M3; may be assessed in a future charter revision |

---

## 4. Measurable Outcomes (M1–M3)

### Milestone 1 (Weeks 1–4) — Foundations and Governance

| Deliverable | Owner | Acceptance Criteria |
|-------------|-------|---------------------|
| Product Charter (this document) | `[PLACEHOLDER: Product Owner]` | Approved by owner and stakeholders; stored in repo |
| RACI matrix | `[PLACEHOLDER: Product Owner]` | All roles filled; no gaps in curriculum/safety/analytics |
| Backlog (`backlog.md`) | Copilot | All M1 Copilot tasks marked complete |
| AQAL Competency Map | Copilot + `[PLACEHOLDER: SME]` | Domains, levels, and progression indicators defined |
| ILP Practice Taxonomy | Copilot + `[PLACEHOLDER: SME]` | Taxonomy dimensions and safety notes populated |
| Evidence-Vetting Checklist | Copilot | Gates 1–8 documented and approved |
| Peer Review SOP | Copilot | Reviewer roles, rounds, and decision log defined |
| Shadowwork Safety Standard | Copilot | Tier model, stop rules, and escalation path complete |

### Milestone 2 (Weeks 5–8) — Pilot Content and Prototype

| Deliverable | Owner | Acceptance Criteria |
|-------------|-------|---------------------|
| Pathway A content | Copilot + `[PLACEHOLDER: Curriculum Lead]` | 4 weeks, retrieval schedule, faculty-validated |
| Pathway B content | Copilot + `[PLACEHOLDER: Safety Lead]` | Safety checkpoints, consent, Tier 1 only |
| Clickable prototype | Copilot | Pathway, practice flow, and rubric UX navigable |

### Milestone 3 (Weeks 9–12) — Pilot Execution and Revision

| Deliverable | Owner | Acceptance Criteria |
|-------------|-------|---------------------|
| Pilot runbook | Copilot + `[PLACEHOLDER: Pilot Coordinator]` | Recruitment, consent, scheduling, support documented |
| Pilot delivery (20–40 learners) | `[HUMAN-REQUIRED]` | Sessions delivered; incident log maintained |
| Pilot revision report | Copilot + `[PLACEHOLDER: Analyst]` | Quantitative and qualitative findings; prioritised change issues |

---

## 5. Constraints

| Constraint | Description |
|------------|-------------|
| **Safety** | Any shadow or emotionally intense content must follow the [Shadowwork Safety Standard](../safety/shadowwork-safety-standard) |
| **Evidence** | No claim published without passing the [Evidence-Vetting Checklist](../quality/evidence-vetting-checklist) |
| **Accessibility** | All learner-facing content must meet WCAG 2.2 Level AA |
| **Cognitive load** | Microlearning units capped at 3–5 minutes; one concept per unit; no extraneous visuals |
| **Scope guard** | No therapeutic framing; no clinical claims; no facilitator-led Tier 3 practice without qualified human oversight |
| **Consent** | Explicit, revocable consent required before any reflective or shadow practice |
| **Data privacy** | Learner reflection data is private by default; minimum retention; role-based access only |

---

## 6. Governance Cadence

| Cadence | Activity | Owner |
|---------|----------|-------|
| Weekly | Progress check against backlog; blocker escalation | `[PLACEHOLDER: Product Owner]` |
| Per milestone | Charter and RACI review; backlog grooming; go/no-go decision | `[PLACEHOLDER: Steering Group]` |
| Per content release | Evidence-vetting checklist pass; peer review sign-off | `[PLACEHOLDER: Content Reviewer]` |
| On incident | Safety incident documented; escalation actioned within 24 h | `[PLACEHOLDER: Safety Lead]` |
| Quarterly | Full charter review; scope and outcome re-validation | `[PLACEHOLDER: Product Owner + Steering Group]` |

---

## 7. Decision Authority (Summary RACI)

See the full [RACI Matrix](raci) for role definitions and workflow assignments.

| Decision | Accountable | Consulted |
|----------|-------------|-----------|
| Scope changes | Product Owner | Steering Group |
| Content publication | Content Reviewer | Curriculum Lead, SME |
| Safety tier classification | Safety Lead | Clinical Advisor |
| Pilot go/no-go | Pilot Coordinator + Product Owner | All stakeholders |
| Charter revision | Product Owner | Steering Group |

---

## 8. Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Shadow content causes participant distress | Medium | High | Tier model, consent, stop rules, trained facilitators |
| Evidence quality insufficient for claims | Medium | Medium | Mandatory evidence-vetting gate before publication |
| Scope creep into clinical territory | Low | High | Explicit exclusion list; quarterly charter review |
| Pilot recruitment underperforms | Medium | Medium | Runbook with recruitment scripts; coordinator assigned [HUMAN-REQUIRED] |
| Key role vacancies (SME, Safety Lead) | Medium | High | Identify owners before M2 launch; flag blockers weekly |

---

## 9. Stakeholder Roles

> **Action required:** Assign a named human to each placeholder before charter approval.

| Role | Responsibility | Current Owner |
|------|---------------|---------------|
| Product Owner | Charter, scope decisions, milestone go/no-go | `[PLACEHOLDER]` |
| Curriculum Lead | Module design, learning objective quality | `[PLACEHOLDER]` |
| Subject-Matter Expert (SME) | AQAL and ILP content accuracy | `[PLACEHOLDER]` |
| Safety Lead | Shadowwork safety tier review, incident escalation | `[PLACEHOLDER]` |
| Clinical Advisor | Safety model clinical review | `[PLACEHOLDER — HUMAN-REQUIRED]` |
| Content Reviewer | Evidence vetting and peer review | `[PLACEHOLDER]` |
| Pilot Coordinator | Runbook, recruitment, live facilitation operations | `[PLACEHOLDER — HUMAN-REQUIRED]` |
| Analyst | Analytics schema, pilot data, revision report | `[PLACEHOLDER]` |
| Accessibility Lead | WCAG 2.2 review | `[PLACEHOLDER]` |

---

## 10. Approval and Sign-Off

> This section must be completed by named human owners before this charter is authoritative.

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Product Owner | `[PLACEHOLDER]` | `[DATE]` | `[SIGNATURE]` |
| Safety Lead | `[PLACEHOLDER]` | `[DATE]` | `[SIGNATURE]` |
| Clinical Advisor | `[PLACEHOLDER]` | `[DATE]` | `[SIGNATURE]` |
| Steering Group Representative | `[PLACEHOLDER]` | `[DATE]` | `[SIGNATURE]` |

---

## 11. Version History

| Version | Date | Author | Change Summary |
|---------|------|--------|----------------|
| 0.1 | 2026-04-05 | Copilot | Initial draft for human review |
