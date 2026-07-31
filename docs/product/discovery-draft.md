# Product Discovery Draft

> Product-level discovery-flow output. Status: draft. Scope: whole platform,
> not one feature — see `docs/features/<slug>/discovery-brief.md` for
> feature-scoped discovery. Personas below are organized primarily by
> developmental stage (the platform's own primary axis, per
> `docs/maps/aqal-competency-map.md`), since a learner's needs from this
> platform differ more by stage than by any other single variable. A small
> number of "other" personas that aren't stage-anchored are listed
> separately.

## Why stage is the primary persona axis

The platform's content is already organized around the Amber → Rational →
Pluralistic → Integral arc (`docs/quickstarts/`) and the dual-layer AQAL
language model (`docs/maps/aqal-label-crosswalk.md`) already prescribes
different framing per stage audience. A persona set that ignored stage would
under-specify the single variable the product already treats as load-bearing.

Personas anchor at **Amber and above**. Magic/Purple and Red/Power stage
content exists on the platform (`magic-purple-stage-orientation.mdx`,
`magic-mythic-red-stage-orientation.md`) but is explicitly reflective and
observational — "the conceptual and experiential foundation for understanding
this pre-rational capacity **in oneself and others**." Per
`internal/implementation/product-charter.md`'s scope (self-directed adult
learners, no clinical population), nobody is expected to be self-directing
through this platform while operating *from* Magic/Purple or Red as their
current center of gravity. That content is consumed diagnostically by every
persona below, not owned by a persona of its own.

---

## Stage-anchored personas

### 1. The Amber-Anchored Learner

- **Stage:** Amber (Mythic/Conventional) — values structure, loyalty, belonging, clear right/wrong.
- **JTBD:** "When I notice tension between what I was taught and what I now experience, I want a steady, non-judgmental path to examine my beliefs, so that I can grow without feeling I'm betraying where I came from."
- **Needs:** Strengths-first framing (see `aqal-label-crosswalk.md`'s stage-differentiated editorial guidance), no deficit language ("stuck at"), no premature exposure to Rational/Pluralistic vocabulary.
- **Primary path:** `docs/quickstarts/amber-to-rational.mdx`.
- **Relevant tags:** `amber`, `tier-1` (most content), stage-specific line quickstarts as needed.

### 2. The Rational Achiever

- **Stage:** Orange (Rational) — values evidence, autonomy, achievement, self-authored judgment.
- **JTBD:** "When my old certainties stop holding up under scrutiny, I want a structured, evidence-aware way to build new judgment, so that I gain capability without becoming cynical or contemptuous of where I started."
- **Needs:** Canonical terminology is welcome here (per crosswalk guidance for Orange/Green/Integral audiences); values measurable progress and clear frameworks over open-ended reflection.
- **Primary path:** `docs/quickstarts/amber-to-rational.mdx` (arrival) and `docs/quickstarts/rational-to-pluralistic.mdx` (departure).
- **Relevant tags:** `orange`/`rational`, `cognitive-line` emphasis common at this stage.

### 3. The Pluralistic Integrator

- **Stage:** Green (Pluralistic) — values inclusion, egalitarianism, multiple perspectives, relational depth.
- **JTBD:** "When achievement-based success stops feeling sufficient, I want to integrate the relational and ethical dimensions I've been missing, so that my success includes genuine care for others without collapsing into relativism."
- **Needs:** Relational/interpersonal-line content, explicit non-ranking framing (a recurring concern across Green-adjacent modules), care around hierarchy language.
- **Primary path:** `docs/quickstarts/rational-to-pluralistic.mdx` and `docs/quickstarts/pluralistic-to-integral.mdx`.
- **Relevant tags:** `green`/`pluralistic`, `interpersonal-line`, `moral-line`.

### 4. The Integral Practitioner

- **Stage:** Teal/Turquoise (Integral/Super-Integral) — values systemic, multi-perspectival, paradox-holding capacity.
- **JTBD:** "When I can see the value in every stage but still catch myself using that awareness to feel subtly superior, I want tools to recognize and metabolize my own developmental shadow, so that my integral capacity serves genuine relationship rather than quiet status."
- **Needs:** Full canonical AQAL vocabulary; shadow-work content (`integral-shadow-teal-trap.mdx`); explicit non-ranking, non-elitism framing is a recurring and deliberate design concern at this stage.
- **Primary path:** `docs/quickstarts/pluralistic-to-integral.mdx`, `docs/quickstarts/personal-to-integral.md`, `docs/quickstarts/shadow-work.mdx`.
- **Relevant tags:** `teal`/`integral`, `tier-2` common (shadow/identity work).

---

## Other (non-stage-anchored) personas

### 5. The Facilitator / Guide

- **Not a stage** — a role a learner of any stage may occupy when supporting others (informally, or per `internal/implementation/raci.md`'s CL/SME/CR roles in a more formal capacity).
- **JTBD:** "When I'm supporting someone else's developmental transition, I want stage-appropriate facilitation guidance, so that I don't project my own stage's assumptions onto their process."
- **Needs:** Facilitator Notes (admonitions in every module), facilitator guides (`internal/implementation/*-facilitator-guide.mdx`), explicit warnings against stage-shaming and developmental ranking.
- **Out of scope per product-charter.md:** live facilitator certification is `[HUMAN-REQUIRED]` and not a platform deliverable — this persona is supported with content, not credentialed.

### 6. The Line-Focused Specialist Learner

- **Not a single stage** — a learner working one line of development (cognitive, emotional, moral, interpersonal, somatic, self, spiritual) independent of their overall developmental center of gravity, per the platform's explicit line-independence model (a learner can be Rational cognitively and Amber somatically).
- **JTBD:** "When I know my overall stage but have a specific line lagging behind it, I want a focused path for that one line, so that I can develop it without redoing content for lines I've already integrated."
- **Needs:** Per-line quickstarts (`cognitive-line-development.mdx`, `emotional-line-development.md`, `interpersonal-line-development.md`, `moral-line-development.mdx`, `self-line-development.mdx`, `somatic-line-development.md`, `spiritual-line-development.mdx`), content that doesn't assume a single overall stage.
- **Relevant tags:** a specific `*-line` tag spanning multiple stage tags.

---

## Job to Be Done (product-level synthesis)

When an adult learner notices a gap between their current developmental
capacity and what a situation in their life demands — across cognitive,
emotional, moral, interpersonal, somatic, or spiritual lines — they want a
self-directed, evidence-grounded, stage-appropriate path to grow that
capacity, so that they can meet their life more fully without requiring a
clinician, a live facilitator, or a rupture with their current community.

## Riskiest assumption

That self-directed adults can accurately locate their own current stage/line
starting point without a clinician or facilitator's assessment, and that
stage-appropriate self-selection (rather than an algorithmic placement test —
explicitly out of scope per `product-charter.md`) is sufficient to route them
to the right QuickStart. If learners systematically misjudge their own
starting point, the entire stage-anchored persona/routing model in this
document is weaker than assumed. `docs/features/rp-106-progress-self-assessment/`
(descriptive, non-ranking self-assessment) is the platform's current mitigation;
it has not been validated against actual placement accuracy.

## References

- `internal/implementation/product-charter.md` — mission, scope, constraints.
- `docs/maps/aqal-competency-map.md`, `docs/maps/aqal-overview.md` — stage/line taxonomy.
- `docs/maps/aqal-label-crosswalk.md` — stage-differentiated editorial guidance.
- `internal/implementation/raci.md` — non-learner stakeholder roles.
- `docs/quickstarts/` — existing stage-transition and line-development pathways.
