# Product Specification

> **Status:** Accepted by the Product Owner (@paruff), 2026-10-18 (PR #560)
> **Revised:** 2026-10-18. Added visuals (FR-16), stage-specific language
> (FR-17), separate stage sites (FR-18), success metrics (FR-19) and NFR-06.
> **Previously:** 2026-10-02. Rebuilt around evidence-based self-paced learning
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
| Words with pictures (multimedia) | Learners recall and transfer more from words with relevant diagrams than from words alone, across many experiments (Mayer, 2021). Theoretical basis: dual coding (Clark & Paivio, 1991) | Strong | FR-16 |
| Visuals integrated with text (contiguity) | Placing labels and text next to the picture they describe beats separating them (meta-analysis: Ginns, 2006) | Strong | FR-16 |
| No decorative or "seductive" visuals (coherence) | Interesting but irrelevant pictures and details lower retention and transfer (meta-analysis: Rey, 2012) | Strong | FR-16 |
| Concept maps and learner-drawn diagrams | Studying concept maps beats studying text alone (Nesbit & Adesope, 2006), but retrieval beats concept mapping (Karpicke & Blunt, 2011). Drawing to learn rated a useful generative strategy (Fiorella & Mayer, 2016) | Moderate | FR-16 (optional practice, never instead of retrieval) |
| Fit to prior knowledge | Guidance that helps novices can hinder more advanced learners, and vice versa (expertise reversal; Kalyuga et al., 2003) | Strong | FR-17 |
| Conversational, relevant language | Conversational style improves learning (meta-analysis: Ginns, Martin & Marsh, 2013). Connecting content to the learner's own life and values raises interest and performance (Hulleman & Harackiewicz, 2009) | Moderate | FR-17 |
| Matching language to a developmental *stage* | **No direct evidence.** Stage models are a lens (FR-14). Stage-specific language rests on the two rows above and is treated as a hypothesis that FR-19 tests | Untested | FR-17 (design stance) |
| Separate sites per stage | **No direct evidence** at site level. The case is by analogy with coherence (less irrelevant material). More choice is not reliably harmful or helpful (choice-overload meta-analysis: Scheibehenne et al., 2010). Main risk: learners picking the wrong site, since FR-03 has no validity study | Untested | FR-18 (design stance) |
| Measuring learning | Performance during study is a poor guide to lasting learning; delayed tests are needed (Soderstrom & Bjork, 2015). Self-assessed knowledge tracks satisfaction more than learning (Sitzmann et al., 2010) | Strong | FR-15, FR-19 |
| Rereading, highlighting, summarizing | Rated low utility by Dunlosky et al. (2013) | Low | FR-11 (not used as learning activities) |
| Matching instruction to "learning styles" | No adequate evidence that matching instruction to learning styles improves outcomes (Pashler et al., 2008) | Unsupported | FR-11 (prohibited) |

Visuals are for every learner, not for "visual learners". FR-11's
learning-styles prohibition still applies.

Citations from protocol §7 were checked against sources on 2026-10-01.
Karpicke & Blunt, Gollwitzer & Sheeran, Richland et al., Dunlosky & Rawson
and Pashler et al. (added 2026-10-02) and Clark & Paivio, Ginns, Rey,
Nesbit & Adesope, Fiorella & Mayer, Ginns, Martin & Marsh, Hulleman &
Harackiewicz, Scheibehenne et al., Soderstrom & Bjork and Sitzmann et al.
(added 2026-10-18) are AI-sourced. All fifteen were checked by a human
on 2026-10-18 (see log below).

### Citation check log (P1-02, #510)

An AI pre-check on 2026-10-18 confirmed each bibliographic record below
(authors, year, title, journal, volume, issue, pages) against Crossref.
It did not confirm the claims. The Product Owner (@paruff) read each
source and confirmed each claim in the evidence table above on 2026-10-18.

| Citation | DOI | Record (AI, 2026-10-18) | Note for the human checker | Human checked (date, initials) |
| --- | --- | --- | --- | --- |
| Karpicke & Blunt (2011) | [10.1126/science.1199327](https://doi.org/10.1126/science.1199327) | Matches | — | 2026-10-18, PR |
| Gollwitzer & Sheeran (2006) | [10.1016/S0065-2601(06)38002-1](https://doi.org/10.1016/S0065-2601(06)38002-1) | Matches | Confirm d = 0.65 | 2026-10-18, PR |
| Richland, Kornell & Kao (2009) | [10.1037/a0016496](https://doi.org/10.1037/a0016496) | Matches | — | 2026-10-18, PR |
| Dunlosky & Rawson (2012) | [10.1016/j.learninstruc.2011.08.003](https://doi.org/10.1016/j.learninstruc.2011.08.003) | Matches | — | 2026-10-18, PR |
| Pashler et al. (2008) | [10.1111/j.1539-6053.2009.01038.x](https://doi.org/10.1111/j.1539-6053.2009.01038.x) | Matches | — | 2026-10-18, PR |
| Clark & Paivio (1991) | [10.1007/BF01320076](https://doi.org/10.1007/BF01320076) | Matches | Theory paper; cited only as the theoretical basis | 2026-10-18, PR |
| Ginns (2006) | [10.1016/j.learninstruc.2006.10.001](https://doi.org/10.1016/j.learninstruc.2006.10.001) | Matches | — | 2026-10-18, PR |
| Rey (2012) | [10.1016/j.edurev.2012.05.003](https://doi.org/10.1016/j.edurev.2012.05.003) | Matches | — | 2026-10-18, PR |
| Nesbit & Adesope (2006) | [10.3102/00346543076003413](https://doi.org/10.3102/00346543076003413) | Matches | — | 2026-10-18, PR |
| Fiorella & Mayer (2016) | [10.1007/s10648-015-9348-9](https://doi.org/10.1007/s10648-015-9348-9) | Matches | — | 2026-10-18, PR |
| Ginns, Martin & Marsh (2013) | [10.1007/s10648-013-9228-0](https://doi.org/10.1007/s10648-013-9228-0) | Matches | — | 2026-10-18, PR |
| Hulleman & Harackiewicz (2009) | [10.1126/science.1177067](https://doi.org/10.1126/science.1177067) | Matches | Effect was concentrated in students with low success expectations; consider narrowing the claim | 2026-10-18, PR |
| Scheibehenne, Greifeneder & Todd (2010) | [10.1086/651235](https://doi.org/10.1086/651235) | Matches | — | 2026-10-18, PR |
| Soderstrom & Bjork (2015) | [10.1177/1745691615569000](https://doi.org/10.1177/1745691615569000) | Matches | — | 2026-10-18, PR |
| Sitzmann et al. (2010) | [10.5465/amle.9.2.zqr169](https://doi.org/10.5465/amle.9.2.zqr169) | Matches | — | 2026-10-18, PR |

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
  *Acceptance:* 77/77 modules (today 59/77). A check script fails CI if any
  module is missing it.
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

### Visuals (every module and QuickStart)

- **FR-16 — Explanatory visuals.** Where content has structure (a
  process, a sequence, a relationship, a contrast, a map), it gets a
  diagram that carries that structure. Each visual:
  1. explains, never decorates (no stock photos, no ornamental images);
  2. sits next to the text it explains, with labels on the diagram rather
     than in a separate legend where possible;
  3. has alt text, plus a text description when the diagram carries more
     than one idea (WCAG 2.2 AA, NFR-02);
  4. is drawn as text-based source (Mermaid or SVG) so it can be reviewed
     in a PR and reused by forks.
  Practice sections may ask the learner to draw or map an idea, but only
  in addition to retrieval, never in place of it. Each QuickStart shows a
  pathway map: where the learner is, what is next, and where reviews fall.
  *Acceptance:* `module-authoring` and `quickstart-validator` checklists;
  `audit-a11y.mjs` passes.

### Stage-specific language and sites

- **FR-17 — Stage-specific language.** Learner-facing copy on a stage site
  uses that audience's register, per the `developmental-vocabulary` skill:
  its words, its framing, examples from its own life, and no naming of
  other stages. Two rules from the evidence apply to every stage: start
  from what the learner already knows (expertise reversal) and connect each
  idea to the learner's own life and values. Evidence tiers (FR-14) are
  still shown, worded in the audience's register. Honesty is not traded
  for resonance. *Acceptance:* `developmental-vocabulary` check passes,
  and at least three readers from the target audience read each
  QuickStart aloud and explain it back (cognitive interviews). AI is not a
  substitute for these readers `[HUMAN-REQUIRED]`.
- **FR-18 — Separate stage sites.** Each stage transition in `FORK.md` is
  its own site, holding only the modules, QuickStarts and maps for that
  transition. Sites are built from **this repo**, one Docusaurus config per
  site (`docusaurus build --config <site>.config.js --out-dir build/<site>`),
  each with its own title, navbar, sidebar, search and content filter. That
  way no site names another stage, and a fix lands on every site at once.
  Separate fork repos are deferred until a site needs its own owners or
  domain. A module shared by two sites must be written neutrally or split
  into per-site variants. Stage sites never link to the main AQAL site
  except through the hub's "choose again" route. A neutral hub page on the main site helps learners choose,
  using the FR-03 descriptive self-assessment, and every stage site links
  back to it with a plain "not the right fit? choose again" route. The
  main site stays the authoring source. *Acceptance:* every site builds in
  CI; `fork-readiness-audit` scope and vocabulary gates pass before each
  launch; NFR-06 holds.

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

- **FR-19 — Success metrics.** Success is judged on learning, measured
  in this order:

  | Tier | Metric | Source | Target |
  | --- | --- | --- | --- |
  | Outcome (headline) | Delayed retention score, ≥7 days after the pathway | FR-15 study | Effect size with interval, reported per stage site |
  | Process | Reviews completed within 2 days of due | `useProgress`, local | ≥60% for active learners |
  | Process | Calibration gap: share of cards rated "remembered" then missed at the next review | `useProgress`, local | Falling over a pathway |
  | Process | Pathway completion; return within 7 and 30 days | Local, plus site analytics if P10-01 approves | Baseline first, then per-site trend |
  | Fit | Learners who switch stage site after their first visit | Hub analytics | Baseline; a high rate signals mis-placement |
  | Self-report (never headline) | Perceived usefulness, comfort with stage language | Study survey | Reported separately |
  | Guardrail | Accessibility violations; safety reports; build | CI, issues | 0; reviewed within 72h; green |

  Process metrics are computed in the learner's browser and shown to them
  on the progress page. They also serve as FR-13's visible progress. Nothing
  leaves the browser unless the learner exports it. Any site-wide analytics
  must be cookieless, aggregate-only and approved by a human (P10-01).
  *Acceptance:* metrics visible on `docs/my-progress.mdx`; a baseline is
  recorded in `docs/METRICS.md` before the first stage site launches.

## Non-Functional Requirements

- **NFR-01 — No server-side runtime.** Static Docusaurus site.
- **NFR-02 — Accessibility.** WCAG 2.2 AA on learner-facing pages.
  `scripts/audit-a11y.mjs` exists but is not yet run in CI.
- **NFR-03 — Build integrity.** `npm run build` passes with zero broken
  links on every merge to `main`.
- **NFR-04 — Fork portability.** Per `ARCHITECTURE.md` § Fork Architecture.
  Stage sites (FR-18) stay in this repo for now, so content stays portable
  to a fork later.
- **NFR-05 — Learner data stays local and visible.** Progress, review
  schedule and reflections live only in the learner's browser, and the
  learner can view and clear them from the progress page.

- **NFR-06 — Per-site learner data.** Stage sites on one origin
  (`paruff.github.io`) share browser storage, whether they are built from
  this repo or from forks. Today `useProgress` uses one
  key, `iel_progress_v1`, so sites would overwrite each other's progress.
  Storage keys must include the site's `projectName`, and existing data
  must carry over to the new key. *Acceptance:* unit test with two site
  keys.

## Flagged concerns

1. **Charter conflict — resolved 2026-10-18.** Charter v0.2 replaces O4
   with the FR-15 retention measure and removes facilitated pilots.
2. **Self-assessment validity.** FR-03 instruments have no validity study.
   They must stay descriptive and never become placement.
3. **Citations — resolved 2026-10-18.** All fifteen AI-sourced citations
   were checked by a human (see § Citation check log).
4. **Stage targeting is a bet.** FR-17 and FR-18 have no direct evidence
   behind them, and they depend on self-placement (FR-03), which is
   unvalidated. Launch one stage site first and compare it with the main
   site on FR-19 before building the others.
5. **Register versus honesty.** The vocabulary skill tells writers to avoid
   words like "evidence" for some audiences. FR-14 still applies: tiers
   are reworded, never dropped.

## Out of Scope

Clinical therapy, per-learner tracking or accounts, instructor-led, cohort or facilitated delivery,
algorithmic placement or grading, personalized AI coaching, and replacing
AQAL as the organizing map.

## Sources

- Adesope, O. O., Trevisan, D. A., & Sundararajan, N. (2017). Rethinking the use of tests. *Review of Educational Research*, 87(3), 659–701.
- Broadbent, J., & Poon, W. L. (2015). Self-regulated learning strategies and academic achievement in online higher education. *The Internet and Higher Education*, 27, 1–13.
- Brown, P. C., Roediger, H. L., & McDaniel, M. A. (2014). *Make It Stick: The Science of Successful Learning*. Harvard University Press.
- Clark, J. M., & Paivio, A. (1991). Dual coding theory and education. *Educational Psychology Review*, 3(3), 149–210.
- Cepeda, N. J., et al. (2006). Distributed practice in verbal recall tasks. *Psychological Bulletin*, 132(3), 354–380.
- Dunlosky, J., & Rawson, K. A. (2012). Overconfidence produces underachievement. *Learning and Instruction*, 22(4), 271–280.
- Dunlosky, J., et al. (2013). Improving students' learning with effective learning techniques. *Psychological Science in the Public Interest*, 14(1), 4–58.
- Fiorella, L., & Mayer, R. E. (2016). Eight ways to promote generative learning. *Educational Psychology Review*, 28(4), 717–741.
- Ginns, P. (2006). Integrating information: A meta-analysis of the spatial contiguity and temporal contiguity effects. *Learning and Instruction*, 16(6), 511–525.
- Ginns, P., Martin, A. J., & Marsh, H. W. (2013). Designing instructional text in a conversational style: A meta-analysis. *Educational Psychology Review*, 25(4), 445–472.
- Gollwitzer, P. M., & Sheeran, P. (2006). Implementation intentions and goal achievement: A meta-analysis. *Advances in Experimental Social Psychology*, 38, 69–119.
- Hulleman, C. S., & Harackiewicz, J. M. (2009). Promoting interest and performance in high school science classes. *Science*, 326(5958), 1410–1412.
- Kalyuga, S., Ayres, P., Chandler, P., & Sweller, J. (2003). The expertise reversal effect. *Educational Psychologist*, 38(1), 23–31.
- Karpicke, J. D., & Blunt, J. R. (2011). Retrieval practice produces more learning than elaborative studying with concept mapping. *Science*, 331(6018), 772–775.
- Kulik, C.-L. C., Kulik, J. A., & Bangert-Drowns, R. L. (1990). Effectiveness of mastery learning programs. *Review of Educational Research*, 60(2), 265–299.
- Mayer, R. E. (2021). *Multimedia Learning* (3rd ed.). Cambridge University Press.
- Nesbit, J. C., & Adesope, O. O. (2006). Learning with concept and knowledge maps: A meta-analysis. *Review of Educational Research*, 76(3), 413–448.
- Pashler, H., McDaniel, M., Rohrer, D., & Bjork, R. (2008). Learning styles: Concepts and evidence. *Psychological Science in the Public Interest*, 9(3), 105–119.
- Reich, J., & Ruipérez-Valiente, J. A. (2019). The MOOC pivot. *Science*, 363(6423), 130–131.
- Rey, G. D. (2012). A review of research and a meta-analysis of the seductive detail effect. *Educational Research Review*, 7(3), 216–237.
- Richland, L. E., Kornell, N., & Kao, L. S. (2009). The pretesting effect. *Journal of Experimental Psychology: Applied*, 15(3), 243–257.
- Rohrer, D., & Taylor, K. (2007). The shuffling of mathematics problems improves learning. *Instructional Science*, 35, 481–498.
- Scheibehenne, B., Greifeneder, R., & Todd, P. M. (2010). Can there ever be too many options? A meta-analytic review of choice overload. *Journal of Consumer Research*, 37(3), 409–425.
- Sitzmann, T., Ely, K., Brown, K. G., & Bauer, K. N. (2010). Self-assessment of knowledge: A cognitive learning or affective measure? *Academy of Management Learning & Education*, 9(2), 169–191.
- Soderstrom, N. C., & Bjork, R. A. (2015). Learning versus performance: An integrative review. *Perspectives on Psychological Science*, 10(2), 176–199.

## References

- `docs/product/intent.md`, `docs/product/plan.md`
- `FORK.md` (stage sites), `docs/METRICS.md`
- `internal/implementation/product-charter.md`
- `internal/quality/instructional-design-protocol.md` (§7 evidence base, PR #501)
- `internal/quality/evidence-vetting-checklist.md`
