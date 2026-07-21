---
id: raci
title: RACI Matrix — Delivery Governance
sidebar_label: RACI Matrix
tags: [implementation, governance, raci, M1]
---

## RACI Matrix — Delivery Governance

> **Status:** Draft — Pending human owner review and role assignment  
> **Version:** 0.1  
> **Last Updated:** 2026-04-05  
> **Classification:** [HUMAN-RECOMMENDED] — Copilot-drafted; all `[PLACEHOLDER]` roles must be named humans before this document is authoritative.

---

## Role Definitions

| Role ID | Role Name | Description |
|---------|-----------|-------------|
| PO | Product Owner | Accountable for charter, scope, milestone go/no-go decisions |
| CL | Curriculum Lead | Responsible for module design, learning objective quality, and mastery loop integrity |
| SME | Subject-Matter Expert | Provides AQAL and ILP content expertise; validates developmental accuracy |
| SL | Safety Lead | Owns shadowwork safety tier review, stop-rule enforcement, and incident escalation |
| CA | Clinical Advisor | Reviews safety model for clinical appropriateness; [HUMAN-REQUIRED] |
| CR | Content Reviewer | Conducts evidence vetting and peer review sign-off |
| PC | Pilot Coordinator | Manages recruitment, consent, scheduling, and live facilitation; [HUMAN-REQUIRED] |
| AN | Analyst | Owns analytics schema, pilot data collection, and revision report |
| AL | Accessibility Lead | Ensures WCAG 2.2 Level AA compliance across learner-facing content |
| COP | Copilot (AI) | Generates drafts, code, and templates as directed; cannot approve or execute human-required actions |

---

## RACI Key

| Symbol | Meaning |
|--------|---------|
| **R** | Responsible — does the work |
| **A** | Accountable — owns the outcome; signs off |
| **C** | Consulted — provides input before or during |
| **I** | Informed — notified of outcome |
| —    | Not involved |

---

## 1. Curriculum Workflow

| Activity | PO | CL | SME | SL | CR | PC | AN | AL | COP |
|----------|----|----|-----|----|----|----|----|----|----|
| Define learning objectives for module | C | A | C | — | — | — | — | — | R |
| Write module content (Learn/Practice/Reflect) | I | A | C | — | — | — | — | — | R |
| Map content to AQAL quadrants/levels/lines | I | C | A | — | — | — | — | — | R |
| Evidence-vetting checklist pass | I | C | C | — | A | — | — | — | R |
| Peer review (round 1 and 2) | I | C | C | — | A/R | — | — | — | I |
| Accessibility review of module | I | C | — | — | — | — | — | A | R |
| Final publication approval | A | C | C | — | C | — | — | C | — |
| Add retrieval loop (spaced/interleaved) | I | A | — | — | — | — | — | — | R |
| Update module after pilot revision | C | A | C | — | C | — | C | — | R |

---

## 2. Safety Workflow

| Activity | PO | CL | SME | SL | CA | CR | PC | COP |
|----------|----|----|-----|----|----|----|----|-----|
| Assign safety tier to practice | C | C | C | A | C | — | — | R |
| Draft consent and contraindications language | I | — | — | A | C | — | — | R |
| Define stop rules and grounding alternatives | I | — | — | A | C | — | — | R |
| Define escalation pathway | C | — | — | A | C | — | C | R |
| Clinical review of safety model | I | — | — | C | A | — | — | — |
| Facilitator briefing script | I | — | — | A | — | — | C | R |
| Safety launch readiness checklist sign-off | A | — | — | A | C | — | C | — |
| Incident documentation (live pilot) | I | — | — | A | C | — | R | — |
| Incident escalation to qualified support | I | — | — | C | A | — | R | — |
| Post-incident review and protocol update | A | — | — | A | C | — | C | I |

---

## 3. Analytics Workflow

| Activity | PO | CL | AN | PC | COP |
|----------|----|----|----|----|-----|
| Define analytics schema (events, metrics) | C | C | A | — | R |
| Define pilot measurement instruments | C | C | A | C | R |
| Instrument learner-facing pages (tracking events) | I | — | A | — | R |
| Collect pilot data (sessions, engagement, outcomes) | I | — | A | R | — |
| Analyse pre→post rubric scores | I | C | A | — | R (template) |
| Populate pilot revision report | C | C | A | C | R (template) |
| Interpret sensitive participant data | A | — | C | C | — |
| Convert findings to prioritised change issues | C | C | A | — | R |
| Present findings to steering group | A | C | A | — | — |

---

## 4. Governance and Charter Workflow

| Activity | PO | CL | SL | AN | COP |
|----------|----|----|----|----|----|
| Maintain product charter | A | — | C | — | R (draft) |
| Maintain RACI matrix | A | — | C | — | R (draft) |
| Weekly progress check | A | C | C | C | — |
| Milestone go/no-go decision | A | C | C | C | I |
| Charter revision (scope changes) | A | C | C | — | R (draft) |
| Backlog grooming and prioritisation | A | C | — | — | R |
| Issue template management | I | — | — | — | R |

---

## 5. Pilot Execution Workflow

| Activity | PO | CL | SL | CA | PC | AN | COP |
|----------|----|----|----|----|----|----|-----|
| Draft pilot runbook | C | C | C | — | A | C | R |
| Learner recruitment | A | — | — | — | R | — | — |
| Informed consent collection | A | — | C | C | R | — | — |
| Scheduling and session logistics | I | — | — | — | A/R | — | — |
| Live facilitation | I | — | C | — | R | — | — |
| Real-time safety monitoring | I | — | A | — | R | — | — |
| Engagement and completion tracking | I | — | — | — | C | A/R | — |
| Post-pilot debrief with facilitators | C | C | A | — | R | — | — |

---

## 6. Role Assignment (Action Required)

> Human owners must fill in this table before the first M1 governance check-in.

| Role | Named Owner | Contact | Date Assigned |
|------|-------------|---------|---------------|
| Product Owner (PO) | `[PLACEHOLDER]` | `[email/handle]` | `[DATE]` |
| Curriculum Lead (CL) | `[PLACEHOLDER]` | `[email/handle]` | `[DATE]` |
| Subject-Matter Expert (SME) | `[PLACEHOLDER]` | `[email/handle]` | `[DATE]` |
| Safety Lead (SL) | `[PLACEHOLDER]` | `[email/handle]` | `[DATE]` |
| Clinical Advisor (CA) — [HUMAN-REQUIRED] | `[PLACEHOLDER]` | `[email/handle]` | `[DATE]` |
| Content Reviewer (CR) | `[PLACEHOLDER]` | `[email/handle]` | `[DATE]` |
| Pilot Coordinator (PC) — [HUMAN-REQUIRED] | `[PLACEHOLDER]` | `[email/handle]` | `[DATE]` |
| Analyst (AN) | `[PLACEHOLDER]` | `[email/handle]` | `[DATE]` |
| Accessibility Lead (AL) | `[PLACEHOLDER]` | `[email/handle]` | `[DATE]` |

---

## 7. Version History

| Version | Date | Author | Change Summary |
|---------|------|--------|----------------|
| 0.1 | 2026-04-05 | Copilot | Initial draft for human review |
