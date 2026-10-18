# Product Specification

> **Status:** Draft, awaiting Product Owner acceptance (@paruff)
> **Revised:** 2026-10-02. Rebuilt around evidence-based self-paced learning
> (*Make It Stick* and related research). Corrected FR-04 to match the live
> `RetrievalPrompt` behavior and fixed stale `docs/quality/` paths.
>
> This file turns `intent.md` and `internal/implementation/product-charter.md`
> into testable requirements. The charter is authoritative for mission and
> scope; this file is authoritative for how they are verified. A requirement
> that traces to neither is scope creep and goes back to the Product Owner.

## Problem

Self-directed adults working alone need to build lasting capacity across
developmental lines. Most self-study relies on rereading and fluent-feeling
review, which create an illusion of mastery without durable learning. The
platform must build in the techniques that research shows produce lasting,
transferable learning. It must also supply the structure a teacher would
otherwise provide, and be honest about the evidence behind its
developmental frameworks.

## Evidence rule

| Evidence rating | Status in this spec |
| --- | --- |
| **Strong** (replicated meta-analyses) | **Requirement.** A module or pathway that omits it fails acceptance. |
| **Moderate** (a meta-analysis or several experiments, with caveats) | Required where noted, applied with its caveat. |
| **Weak / Contested / Unsupported** | Design stance at most. Never a requirement and never cited to learners as evidence. |

AQAL, Spiral Dynamics and other stage models are a **lens, not evidence**.
They organize navigation and content, and their claims are tiered (FR-14).

## Evidence base for self-paced learning

| Technique (*Make It Stick* term) | What the research shows | Rating | Requirement |
| --- | --- | --- | --- |
| Retrieval practice | Practice testing beats restudy (g = 0.51) across 217 studies (Adesope et al., 2017). Retrieval beats concept mapping for later recall (Karpicke & Blunt, 2011) | Strong | FR-04 |
| Spaced practice | Distributed practice beats massed practice (Cepeda et al., 2006). Rated high utility by Dunlosky et al. (2013) | Strong | FR-04 |
| Mastery before moving on | Positive, lasting effects across 108 controlled evaluations (Kulik et al., 1990) | Strong | FR-07 |
| Cognitive load, worked examples, coherence | Sweller; Kalyuga et al. (2003); Mayer (2021) | Strong | FR-12 |
| Self-regulation for self-paced learners | Most self-paced learners disengage (Reich & Ruipérez-Valiente, 2019). Planning, monitoring and effort regulation predict online achievement (Broadbent & Poon, 2015). If-then plans improve goal follow-through (d = 0.65; Gollwitzer & Sheeran, 2006) | Strong | FR-13 |
| Interleaving | Mixing problem types improves later discrimination and transfer (Rohrer & Taylor, 2007). Rated moderate utility by Dunlosky et al. (2013) | Moderate | FR-05 |
| Generation (try before being taught) | Attempting answers before study improves later learning, even when the attempts are wrong (Richland, Kornell & Kao, 2009) | Moderate | FR-08 |
| Elaboration, self-explanation, reflection | Elaborative interrogation and self-explanation rated moderate utility (Dunlosky et al., 2013) | Moderate | FR-09 |
| Calibration | Learners overrate their own answers, and overconfident self-scoring leads them to stop practicing too soon (Dunlosky & Rawson, 2012) | Moderate | FR-10 |
| Rereading, highlighting, summarizing | Rated low utility by Dunlosky et al. (2013) | Low | FR-11 (not used as learning activities) |
| Matching instruction to "learning styles" | No adequate evidence that matching instruction to learning styles improves outcomes (Pashler et al., 2008) | Unsupported | FR-11 (prohibited) |

Citations from protocol §7 were checked against sources on 2026-10-01.
Karpicke & Blunt, Gollwitzer & Sheeran, Richland et al., Dunlosky & Rawson
and Pashler et al. are new here and **must be checked by a human before
merge** (AI policy).

## Functional Requirements

### Content structure and routing

- **FR-01 — Stage/line-tagged content.** Every module carries frontmatter
  tags for its stage, line and safety tier (`aqal-tagger` skill).
  *Acceptance:* `node scripts/validate-frontmatter.js` reports zero errors
  and zero warnings (today 27/77 pass).
- **FR-02 — Self-selected QuickStarts.** Learners choose a pathway for their
  stage transition or line focus. *Acceptance:* every `docs/quickstarts/*.mdx`
  passes the `quickstart-validator` checks.
- **FR-03 — Descriptive, non-ranking self-assessment.** Learners locate
  their approximate starting point without a score or ranking.
  *Acceptance:* output uses developmental language only.
- **FR-06 — Audience-appropriate vocabulary** (`developmental-vocabulary`
  skill). *Acceptance:* no prohibited-vocabulary warnings in learner-facing
  bodies.

### Make It Stick toolkit (every module)

- **FR-04 — Spaced retrieval.** Every module ends with `<RetrievalPrompt>`.
  It schedules later reviews in the learner's browser (`localStorage` via
  `useProgress`), and due reviews appear on the progress page. The old text
  said "sessionStorage only", which no longer matches the live component.
  *Acceptance:* 77/77 modules render a working prompt (on 2026-10-18 only
  8/77 did: 19 had none and 50 passed `cards` without `[ ]`, which renders
  nothing). `scripts/check-retention.mjs` fails CI if any module is missing it.
- **FR-08 — Generation.** Each module opens with one or two questions the
  learner tries to answer before reading. The module then returns to them.
  *Acceptance:* `module-authoring` checklist.
- **FR-09 — Elaboration and reflection.** Reflect prompts ask the learner to
  explain *why* and *how* in their own words and to connect the idea to
  their own life. Prompts that only ask the learner to restate the content
  do not count. *Acceptance:* `module-authoring` checklist.
- **FR-10 — Calibration.** Before a learner rates a retrieval answer as
  "remembered", they see a model answer or criteria to compare against.
  Assess rubrics give concrete criteria, not "I feel I understand".
  *Acceptance:* `RetrievalCard` shows comparison content before
  self-rating; rubric review.
- **FR-11 — No low-utility or unsupported techniques.** Rereading,
  highlighting and summaries are never presented as the learning activity.
  Content is never tailored to "learning styles". *Acceptance:* content
  review.
- **FR-12 — Load-managed presentation.** One concept per section, worked
  examples before independent practice, and no decorative media. The 3–5
  minute section length is a Moderate engagement ceiling, not a learning
  effect. *Acceptance:* `module-authoring` checklist.

### Self-paced pathways (every QuickStart)

- **FR-05 — Interleaved review.** After the first modules of a pathway,
  retrieval reviews mix questions from earlier modules instead of covering
  one module at a time. *Acceptance:* `quickstart-validator` confirms a
  mixed review point at least every three modules.
- **FR-07 — Mastery before moving on.** Each Assess section states a
  passing threshold. QuickStarts tell the learner to meet it before the next
  module. The gate is advisory (static site), and the wording says so.
  *Acceptance:* `quickstart-validator` confirms each step names its
  threshold.
- **FR-13 — Self-regulation scaffolds.** Each QuickStart opens with a
  planning prompt that asks for an if-then plan ("When [time/place], I
  will…"). It shows visible progress and due reviews, and suggests a
  realistic pace. *Acceptance:* `quickstart-validator` confirms all three.

### Evidence honesty and outcomes

- **FR-14 — Evidence tier on developmental claims.** In each module's
  Theoretical Frameworks section, every framework is labelled with its
  evidence tier (A/B/C per `evidence-vetting` skill). Stage models are
  introduced as an organizing lens. *Acceptance:* `evidence-vetting` review
  of new and revised modules.
- **FR-15 — Retention measured objectively.** At least one self-paced study
  where learners complete a QuickStart on their own and take a delayed
  retention test at least 7 days after the last module. Self-report is
  collected and reported separately, never as the headline. Items are
  drafted with AI and validated by a human `[HUMAN-REQUIRED]`.
  *Acceptance:* study protocol and report in `internal/pilots/`.

## Non-Functional Requirements

- **NFR-01 — No server-side runtime.** Static Docusaurus site.
- **NFR-02 — Accessibility.** WCAG 2.2 AA on learner-facing pages.
  `scripts/audit-a11y.mjs` exists but is not yet run in CI.
- **NFR-03 — Build integrity.** `npm run build` passes with zero broken
  links on every merge to `main`.
- **NFR-04 — Fork portability.** Per `ARCHITECTURE.md` § Fork Architecture.
- **NFR-05 — Learner data stays local and visible.** Progress, review
  schedule and reflections live only in the learner's browser, and the
  learner can view and clear them from the progress page.

## Flagged concerns

1. **The charter conflicts with this spec.** Charter O4 (self-reported gain)
   and its facilitated pilot pathways conflict with FR-15 and the
   self-paced-only scope. The charter needs revising.
2. **Self-assessment validity.** FR-03 instruments have no validity study.
   They must stay descriptive and never become placement.
3. **Unverified citations.** The five new sources above need a human check
   before this spec is accepted.

## Out of Scope

Clinical therapy, instructor-led, cohort or facilitated delivery,
algorithmic placement or grading, personalized AI coaching, and replacing
AQAL as the organizing map.

## Sources

- Adesope, O. O., Trevisan, D. A., & Sundararajan, N. (2017). Rethinking the use of tests. *Review of Educational Research*, 87(3), 659–701.
- Broadbent, J., & Poon, W. L. (2015). Self-regulated learning strategies and academic achievement in online higher education. *The Internet and Higher Education*, 27, 1–13.
- Brown, P. C., Roediger, H. L., & McDaniel, M. A. (2014). *Make It Stick: The Science of Successful Learning*. Harvard University Press.
- Cepeda, N. J., et al. (2006). Distributed practice in verbal recall tasks. *Psychological Bulletin*, 132(3), 354–380.
- Dunlosky, J., & Rawson, K. A. (2012). Overconfidence produces underachievement. *Learning and Instruction*, 22(4), 271–280.
- Dunlosky, J., et al. (2013). Improving students' learning with effective learning techniques. *Psychological Science in the Public Interest*, 14(1), 4–58.
- Gollwitzer, P. M., & Sheeran, P. (2006). Implementation intentions and goal achievement: A meta-analysis. *Advances in Experimental Social Psychology*, 38, 69–119.
- Kalyuga, S., Ayres, P., Chandler, P., & Sweller, J. (2003). The expertise reversal effect. *Educational Psychologist*, 38(1), 23–31.
- Karpicke, J. D., & Blunt, J. R. (2011). Retrieval practice produces more learning than elaborative studying with concept mapping. *Science*, 331(6018), 772–775.
- Kulik, C.-L. C., Kulik, J. A., & Bangert-Drowns, R. L. (1990). Effectiveness of mastery learning programs. *Review of Educational Research*, 60(2), 265–299.
- Mayer, R. E. (2021). *Multimedia Learning* (3rd ed.). Cambridge University Press.
- Pashler, H., McDaniel, M., Rohrer, D., & Bjork, R. (2008). Learning styles: Concepts and evidence. *Psychological Science in the Public Interest*, 9(3), 105–119.
- Reich, J., & Ruipérez-Valiente, J. A. (2019). The MOOC pivot. *Science*, 363(6423), 130–131.
- Richland, L. E., Kornell, N., & Kao, L. S. (2009). The pretesting effect. *Journal of Experimental Psychology: Applied*, 15(3), 243–257.
- Rohrer, D., & Taylor, K. (2007). The shuffling of mathematics problems improves learning. *Instructional Science*, 35, 481–498.

## References

- `docs/product/intent.md`, `docs/product/plan.md`
- `internal/implementation/product-charter.md`
- `internal/quality/instructional-design-protocol.md` (§7 evidence base, PR #501)
- `internal/quality/evidence-vetting-checklist.md`
