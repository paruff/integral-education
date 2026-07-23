---
date: 2026-07-23
persona: facilitator-program-lead
jtbd: "When I need to validate the Emotional Line module suite before public release, I want a structured pilot runbook with participant criteria, safety protocols, and data collection instruments, so I can run a safe, rigorous pilot that produces actionable findings for module revision."
riskiest_assumption: "We assume 15-20 participants across diverse stages can complete the 8-week Emotional Line sequence with fewer than 30% drop-off and zero unmitigated Tier 2 safety incidents. If either threshold is breached, the module sequence and/or safety protocols require significant revision before public release."
acceptance_criterion: "Given a pilot runbook at docs/pilots/pilot-emotional-line.md, when a qualified facilitator reviews it, then all required elements are present: objectives, participant criteria with stage diversity targets, consent and screening questions from EI-20 addendum, facilitation requirements including clinical backup, data collection instruments (pre/post assessment, practice log, completion tracking, safety incident log, qualitative debrief schedule), 8-week timeline with module sequence, revision triggers, and Tier 2 safety protocol references for EI-04 and EI-06."
dora_ai_capability: "Cap6: User-centric focus (the facilitator/participant is the user)"
dora_core_capability: "Continuous Delivery (validating content readiness for release)"
metric: "pilot_completion_rate"
measurement_source: "pilot data collection instruments"
baseline: "No Emotional Line pilot data exists — establish baseline"
prior_art: "pilot-pathway-integral-foundations.md (referenced but not yet created)"
status: ready-for-spec
---

# Discovery Brief: EI-21 — Pilot: Emotional Line suite

## Job to Be Done

When a program facilitator needs to validate the Emotional Line module suite (7 modules: EI-01 through EI-07) before public release, they want a structured pilot runbook with participant criteria, consent and screening protocols, Tier 2 safety procedures, and data collection instruments, so they can run a safe, rigorous 8-week pilot with 15-20 participants that produces actionable findings for module revision.

## Riskiest Assumption

The Emotional Line module sequence, safety protocols, and competency progression can be executed by 15-20 diverse-stage participants over 8 weeks with fewer than 30% drop-off and zero unmitigated Tier 2 safety incidents. If this assumption fails, the entire suite needs revision before public release.

## Acceptance Criterion

Given `docs/pilots/pilot-emotional-line.md`, when a qualified facilitator reviews it, then they find: pilot objectives, participant criteria with stage diversity targets (30% Amber/Orange, 40% Green, 30% Teal), consent/screening forms referencing the EI-20 Emotional & Interpersonal Safety Addendum, facilitator qualification requirements with clinical backup provisions, data collection instruments (pre/post emotional vocabulary assessment, weekly practice logs, module completion tracking, safety incident log, weeks 4 and 8 qualitative debrief schedules), an 8-week timeline mapping modules to weeks, revision trigger criteria, and explicit Tier 2 safety protocol activation for EI-04 (Affect Labelling & Somatic Correlation) and EI-06 (Emotional Intelligence & Somatic Line).

## DORA Outcome Target

- Capability: User-centric focus (the facilitator is the user of the runbook)
- Metric: Pilot completion rate (≥70% participant retention)
- Current baseline: Not applicable — first Emotional Line pilot
- Target: Establish baseline metrics; determine whether module sequence is valid for public release
- Measurement: Pilot data collection instruments (pre/post assessments, practice logs, safety incident log)

## Prior Art

The issue references `pilot-pathway-integral-foundations.md` as a template, but this file does not yet exist in the repo. The only pilot-related reference is in `docs/features/safe-03-breath-ratios/design.md` which references `docs/pilots/pilot-pathway-shadow-foundations.md` (also not yet created). This pilot runbook will serve as the first concrete pilot document in the platform.

## Notes

- This is a hybrid task: COPILOT creates the runbook document; HUMAN executes the pilot (recruitment, facilitation, data collection, post-pilot report)
- The runbook must reference specific Emotional Line modules by their EI identifiers (EI-01 through EI-07)
- Tier 2 safety protocol from the Emotional & Interpersonal Safety Addendum (EI-20) must be explicitly referenced
- Screening questions from the safety addendum (Section: "Screening Criteria") must be incorporated
- The runbook should be usable by a facilitator who may not have prior Integral/AQAL training
- No fictitious data or fabricated citations — all module references must resolve to existing files
