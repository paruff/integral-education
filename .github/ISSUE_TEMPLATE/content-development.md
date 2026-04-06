---
name: Content Development
about: Propose or track the creation of a new learning module, micro-lesson, or pathway document
labels: [content, backlog, copilot-implementable]
---

## Title

<!-- Proposed module or lesson title -->

## Outcome Definition

- Learner will be able to:
- Context where skill is applied:
- Observable success signal:

## Context / Inputs

- Related issue(s) or epic:
- Milestone: <!-- M1 / M2 / M3 -->
- Target audience / readiness level:
- Delivery mode: <!-- self-guided / cohort / facilitator-led -->

## AQAL Mapping (Required)

| Dimension | Value |
|---|---|
| Quadrant(s) | I / We / It / Its |
| Level(s) | <!-- entry assumption and progression target --> |
| Line(s) | <!-- at least one: cognitive, emotional, moral, interpersonal, somatic, spiritual --> |
| State(s) | <!-- target state and prerequisites --> |
| Type(s) | <!-- style/personality adaptation note --> |

## Module Structure Checklist

- [ ] **Learn** — microlearning units drafted (target 3-5 min each, one concept per unit)
- [ ] **Practice** — at least one applied activity defined
- [ ] **Reflect** — journaling or dialogue prompt included
- [ ] **Assess** — rubric-based task or quiz specified
- [ ] **Integrate** — transfer-to-context activity defined
- [ ] **Retrieval Schedule** — spaced repetition plan (24 h, 72 h, 7 d)

## Safety Classification

- Emotional Intensity Tier: <!-- Tier 1 (self-paced) / Tier 2 (group support) / Tier 3 (facilitator-led only) -->
- [ ] Consent language included (required for Tier 2+)
- [ ] Contraindications and stop rules stated
- [ ] Grounding alternative provided
- [ ] Escalation path defined

## Evidence Table

| Claim | Source | Evidence Quality Tier | Caveat |
|---|---|---|---|
|  |  |  |  |

## Task Breakdown

<!-- Label each task [COPILOT], [HUMAN-RECOMMENDED], or [HUMAN-REQUIRED] -->

- [ ] Draft Learn section — `[COPILOT]`
- [ ] Draft Practice and Reflect sections — `[COPILOT]`
- [ ] Draft Assess rubric — `[COPILOT]`
- [ ] Verify evidence table citations — `[HUMAN-RECOMMENDED]`
- [ ] Safety review (Tier 2+ only) — `[HUMAN-REQUIRED]`
- [ ] Peer review — `[HUMAN-REQUIRED]`

## Acceptance Criteria

- [ ] All module structure sections present and complete
- [ ] AQAL mapping filled in for all five dimensions
- [ ] Retrieval schedule explicitly designed
- [ ] Evidence table complete with real, verifiable sources
- [ ] Safety tier set; safety notes included if Tier 2+
- [ ] Accessibility plan noted (alt text, captions, contrast)
- [ ] `npm run build` passes after doc added to sidebar

## Copilot-Ready Prompt

```
<!-- Paste a well-formed prompt for Copilot to draft this content -->
<!-- Example: "Draft a Tier 1 micro-lesson on recognizing projection in docs/modules/m2-projection.md following docs/implementation/integral-aqal-protocol-template.md. Map to Quadrant I, Orange-to-Green level, Emotional line. Include consent language, a grounding alternative, and the retrieval schedule at 24h, 72h, and 7d." -->
```

## Dependencies

## Canonical References

- `docs/implementation/integral-aqal-protocol-template.md`
- `docs/quality/instructional-design-protocol.md`
- `docs/quality/evidence-vetting-checklist.md`
- `docs/maps/aqal-label-crosswalk.md`

## Task Classification

- [ ] `[COPILOT]` — fully implementable in this repository
- [ ] `[HUMAN-RECOMMENDED]` — Copilot drafts, human approves
- [ ] `[HUMAN-REQUIRED]` — safety, clinical, or ethics review required
