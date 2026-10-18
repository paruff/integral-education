---
id: product-charter
title: Product Charter
sidebar_label: Product Charter
tags: [implementation, governance, charter, M1]
---

## Integral Education Platform — Product Charter

> **Status:** Draft v0.2 — Pending Product Owner sign-off (plan task P1-01, issue #509)  
> **Version:** 0.2  
> **Last Updated:** 2026-10-18  
> **Classification:** [HUMAN-REQUIRED] — AI-drafted; the Product Owner must validate scope, outcomes, and the sign-off section before this becomes authoritative.  
> **Aligned with:** `docs/product/intent.md`, `docs/product/specification.md` (FR-15, FR-19), `docs/product/plan.md`

---

## 1. Mission Statement

The Integral Education Platform delivers evidence-based, developmentally-informed, **self-paced** learning experiences that support whole-person growth across the cognitive, emotional, somatic, interpersonal, and ethical lines of development.

We apply the AQAL framework (All Quadrants, All Levels, All Lines, All States, All Types) to design pathways that are:
- Built for adults learning alone: no instructor, cohort, or facilitator is assumed
- Grounded in learning science for durable learning (retrieval, spacing, interleaving, mastery)
- Safe, consent-led, and accessible (WCAG 2.2)
- Measurable against clear developmental outcomes

---

## 2. Strategic Objectives

| # | Objective | Success Indicator |
|---|-----------|------------------|
| O1 | Provide accessible self-paced integral learning pathways | 13/13 QuickStarts carry a planning prompt, visible progress, and scheduled reviews (FR-13) |
| O2 | Maintain evidence quality across all content | 100% of published claims pass the Evidence-Vetting Checklist |
| O3 | Uphold safety standards for shadow and reflective practices | Zero Tier 3 safety incidents unescalated within 24 h |
| O4 | Measure learning objectively before claiming the product works | ≥1 self-paced study with a delayed retention test ≥7 days after the last module, reported as an effect size with interval; self-report reported separately, never as the headline (FR-15, FR-19) |
| O5 | Operate with transparent, auditable governance | Charter, RACI, and decision log current within each milestone |

---

## 3. Scope

### 3.1 In Scope

- Design and publishing of AQAL-aligned learning modules following the Mastery Loop (Learn → Practice → Reflect → Assess → Integrate → Retrieval)
- Self-paced QuickStart pathways that supply the structure a teacher would otherwise give (planning prompts, visible progress, scheduled reviews, honest self-checks)
- A self-paced retention study on one QuickStart (FR-15; plan P5)
- Supporting governance artifacts: charter, RACI, backlog, evidence checklist, peer review SOP, safety standard
- Docusaurus-based platform hosted on GitHub Pages
- Learning metrics baseline (FR-19) and retention study report

### 3.2 Out of Scope

| Exclusion | Rationale |
|-----------|-----------|
| Clinical therapy or counselling | Platform is educational, not clinical; mental health services require licensed practitioners |
| Live facilitator certification programme | Requires qualified human credentialing body; flagged [HUMAN-REQUIRED] |
| Automated learner assessment or grading algorithms | Rubrics are self-assessed; algorithmic grading not appropriate without validity study |
| Instructor-led, cohort, or facilitated delivery, including facilitated pilots | The product is self-paced only (`intent.md`); the retention study is self-paced too |
| Per-learner tracking or accounts | Progress stays in the learner's browser (NFR-05) |
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

### Later milestones

Delivery after M1 is sequenced in `docs/product/plan.md` (P2–P11), not in
this charter. The facilitated M2–M3 pilot pathways from v0.1 are removed.
The outcome measure is the self-paced retention study:

| Deliverable | Owner | Acceptance Criteria |
|-------------|-------|---------------------|
| Self-paced study protocol (P5-01) | AI draft + `[PLACEHOLDER: Analyst]` | One QuickStart; delayed retention test ≥7 days after the last module; self-report reported separately |
| Retention test items (P5-02) | AI draft + `[HUMAN-REQUIRED]` validator | Validation recorded in `internal/pilots/` |
| Study report (P5-03) | `[PLACEHOLDER: Analyst]` | Effect sizes with intervals, labelled preliminary; no efficacy claims from one study |

---

## 5. Constraints

| Constraint | Description |
|------------|-------------|
| **Safety** | Any shadow or emotionally intense content must follow the [Shadowwork Safety Standard](../safety/shadowwork-safety-standard) |
| **Evidence** | No claim published without passing the [Evidence-Vetting Checklist](../quality/evidence-vetting-checklist) |
| **Accessibility** | All learner-facing content must meet WCAG 2.2 Level AA |
| **Cognitive load** | Microlearning units capped at 3–5 minutes; one concept per unit; no extraneous visuals |
| **Scope guard** | No therapeutic framing; no clinical claims; no Tier 2 content published before a named safety reviewer exists (plan P1-03); no Tier 3 content |
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
| Retention study go/no-go | Product Owner | Analyst, Safety Lead |
| Charter revision | Product Owner | Steering Group |

---

## 8. Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Shadow content causes learner distress with no facilitator present | Medium | High | Tier model, consent, stop rules, grounding alternatives, and signposting to qualified support in every Tier 2 module |
| Evidence quality insufficient for claims | Medium | Medium | Mandatory evidence-vetting gate before publication |
| Scope creep into clinical territory | Low | High | Explicit exclusion list; quarterly charter review |
| Self-paced learners disengage (Reich & Ruipérez-Valiente, 2019) | High | High | Planning prompts, if-then plans, visible progress, scheduled reviews (FR-13) |
| Retention study recruits too few learners | Medium | Medium | Label results preliminary; no efficacy claims from one study |
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
| Analyst | Metrics baseline, retention study protocol and report | `[PLACEHOLDER]` |
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
| 0.2 | 2026-10-18 | Claude (AI draft) | Self-paced-only scope; O4 replaced with the FR-15 delayed retention measure; facilitated pilot pathways and Pilot Coordinator role removed (P1-01, #509). Pending Product Owner sign-off |
