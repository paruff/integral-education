# Product Intent

> **Status:** Draft, awaiting Product Owner acceptance
> **Owner:** @paruff
> **Date:** 2026-10-02
> **Relationship:** mission and scope come from
> `internal/implementation/product-charter.md`. This file states the learning
> direction that `specification.md` and `plan.md` must serve.

## Problem

Adult learners who want to grow their capacity across cognitive, emotional,
moral, interpersonal, somatic and spiritual lines have no **self-paced**
resource that is both developmentally organized and built on how people
actually learn and remember.

The platform has 77 modules and 13 QuickStarts. Two weaknesses limit it.

1. **Learning that may not last.** Research on durable learning (summarized in
   Brown, Roediger & McDaniel, *Make It Stick*, 2014) shows that rereading
   and fluent-feeling study build little lasting memory. Effortful retrieval,
   spacing and interleaving do. Only 59 of 77 modules end with spaced
   retrieval, and the rest of the toolkit isn't applied consistently.
2. **Evidence standards are uneven.** The developmental frameworks that
   organize the content (AQAL, Spiral Dynamics) have weak or contested
   empirical support, yet some content presents them as findings.

## Proposed outcome

A **self-paced** learning product, organized by a developmental lens and
built on learning-science evidence:

- **How people learn is held to evidence.** A learning technique becomes a
  requirement only if the evidence for it is rated **Strong**
  (`internal/quality/instructional-design-protocol.md` §7). Moderate
  techniques are allowed with their caveats. Weak or contested ideas are
  design stances, never requirements.
- **Make It Stick, applied to every module.** Retrieval practice, spacing,
  interleaving, elaboration, generation, reflection and calibration are
  built into each module and pathway. They target the most common
  self-study trap: mistaking familiarity for mastery.
- **Built for learners working alone.** No instructor, cohort or facilitator
  is assumed. Self-paced learners drop out at high rates, and those who
  plan and monitor their own learning do better. So pathways supply the
  structure a teacher would otherwise provide: planning prompts, visible
  progress, scheduled reviews and honest self-checks.
- **What is taught is labelled honestly.** AQAL and stage models stay the
  organizing map, labelled a lens, not a finding. Any developmental claim
  shown to learners carries its evidence tier.

### Success signals (to be confirmed in `specification.md`)

| Signal | Today | Target |
| --- | --- | --- |
| Modules ending in spaced retrieval (`RetrievalPrompt`) | 59 / 77 | 77 / 77 |
| Modules applying the full Make It Stick toolkit (FR-05 to FR-09) | not tracked | 100% of new and revised modules |
| QuickStarts with a planning prompt and visible progress | not tracked | 13 / 13 |
| Developmental claims carrying an evidence tier | not tracked | 100% of new and revised modules |
| Retention measured objectively | none | ≥1 self-paced study with a delayed retention test (≥7 days) |

## Affected users and systems

- **Learners:** self-directed adults working alone (personas in
  `discovery-draft.md`).
- **Systems:** module and QuickStart content (`docs/`), the learning
  components (`RetrievalPrompt`, `RetrievalCard`, `useProgress`), and
  `scripts/validate-frontmatter.js`.

## Constraints

- **Educational, not clinical.** No therapy, diagnosis or clinical outcome
  claims (charter §3.2).
- **No server.** Learner data stays in the learner's browser
  (`ARCHITECTURE.md` § Key Architectural Decisions #1).
- **Safety tiering and consent** per the safety standard. Tier 2/3 content
  needs human safety sign-off.
- **No fabricated evidence.** Every citation is checked against its source
  by a human before merge.
- **Accessibility:** WCAG 2.2 AA.

## Out of scope

- Instructor-led, cohort or facilitated delivery.
- Algorithmic placement, grading or personalized AI coaching (charter §3.2).
- Replacing AQAL as the organizing map.

## Decisions taken (2026-10-02)

| Question | Decision |
| --- | --- |
| Evidence status of AQAL and stage models | A lens, not evidence. Organizes content but is never cited as a finding. |
| Delivery mode | Self-paced only. |
| How retention is verified | A delayed retention test in a self-paced study. Self-report is reported separately and never as the headline. |

## Open questions

1. **Charter amendment.** O4 (self-reported ≥70% gain) and the charter's
   facilitated pilot pathways conflict with this intent. Should the charter
   be revised now? `plan.md` assumes yes (task P1-01).
2. **Safety reviewer.** Who signs off on Tier 2 content? Until someone is
   named, no Tier 2 content ships.
3. **Retention test items.** Who validates them? AI may draft items but must
   not validate them.
4. **Fork scope** (#415, #416). Does Magic/Red stage content stay on the main
   site?
