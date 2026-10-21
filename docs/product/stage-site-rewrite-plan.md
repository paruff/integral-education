# Plan: Register Rewrite for the First Stage Site (P9-05, #528)

> **Status:** Draft for human review. Prepared by Claude Sonnet 5.5; the rewrite itself is planned for Opus 5.5.
> **Scope:** the five modules that hold the 912 vocabulary hits, plus what the safety, evidence and reader gates need.
> **Rules applied:** `developmental-vocabulary` § Stage-site rules (FR-17), FR-18, NFR-06.

## What the numbers say

Counts come from `sites/clear-thinking.vocabulary-baseline.json`. "Lines" is the number of lines containing at least one flagged term, which is the real size of the editing job.

| Module | Hits | Lines to touch | Lines in file | Main terms |
|---|---:|---:|---:|---|
| rational-orange-orientation | 247 | 89 | 400 | Orange 111, stage 58, developmental 31 |
| authority-autonomy-transition | 198 | 88 | 475 | stage 79, Amber 40, developmental 31, Rational 22 |
| amber-mythic-orientation | 183 | 87 | 381 | Amber 81, stage 59, developmental 22 |
| perspective-taking-capacity | 180 | 70 | 403 | stage 86, developmental 23, Amber 21, Rational 20 |
| cognitive-dissonance-bridge | 106 | 55 | 363 | developmental 25, stage 24, worldview 21 |

The QuickStart already has an override. `critical-thinking-foundations` and `evidence-evaluation` already pass through light patches.

## Decision for every module: per-site override

Even the lightest module needs 55 lines touched. `prepare-site.mjs` patches are exact-text replacements, so 55 of them would be brittle and would fail the build whenever the shared page changes. Each module becomes a per-site override in `sites/clear-thinking/overrides/docs/modules/`, which the build already supports.

Neutral shared variants (rule 5) are not recommended yet. They would change text that main-site learners read, and no second site needs the module today. Revisit when the second stage site is built.

## Per-module calls

| Module | What changes | What stays | Watch for |
|---|---|---|---|
| **amber-mythic-orientation** | Reframe the whole module as "what you already do well and why it works", in the audience's words. Drop the four framework lenses and every stage label. | The five gifts, specific and unhedged (cross-stage rule 4). The practice (Strengths Inventory). | "Limitations" must stay honest, written as "where relying on trusted sources alone runs out", without naming a next stage. |
| **rational-orange-orientation** | Reframe as "weighing evidence for yourself": what it is, what it is good for, where it stops. Remove "Orange", "Rational stage" and the framework lenses. | The five gifts as concrete skills (evidence, autonomy, method, reform, fairness). | The limits of evidence-weighing must not point at another stage. State them plainly and keep the evidence tier. |
| **authority-autonomy-transition** | Plain-language rewrite of the move from trusting outside authority to weighing things yourself. Replace the Kegan / Cook-Greuter / Spiral Dynamics sections with one short, tier-labelled paragraph. | The two practices, the grief and belonging material, the rubric. | **Highest sensitivity** (faith, family, belonging). Needs the `safety-review` agent's veto pass and a human read before audience readers see it. |
| **perspective-taking-capacity** | Remove the AQAL 1st/2nd/3rd-person section and the Four Quadrant audit (AQAL 9, integral 7). Reword "stages" of Selman and Kohlberg as "steps" or "levels". | Steel-man exercise and dialogue journaling, which work for any audience. | Selman and Kohlberg are real names with real "stage" wording in the sources. The citation keeps the source's term; the body text uses plain words. |
| **cognitive-dissonance-bridge** | Reword "developmental signal", "worldview" and stage labels. Keep Festinger and Mezirow with plain tier wording. | Dissonance Inventory, the checkpoint (genuine tolerance vs premature resolution vs collapse). | The checkpoint is a safety-relevant section. Do not shorten it. |

## Cross-cutting work

1. **Frontmatter and tags.** Titles, `level:` values such as "Amber → Rational", tags and descriptions are shown to learners (rule 4). Each override sets neutral values.
2. **Sidebar, search, alt text, diagram labels.** All count under rule 4.
3. **Evidence tiers.** Every developmental claim keeps its A/B/C tier, worded in the audience's register (rule 3). Run `evidence-vetting` over each override.
4. **Citations.** Source titles may contain the flagged words ("Stages of ..."). Decide once whether the checker should ignore citation lists or whether those references are reworded. This is the single biggest swing in the final hit count and needs your call.
5. **Gate.** `node scripts/check-site-vocabulary.mjs clear-thinking --strict` must report 0, then `build-sites.mjs --strict`.
6. **Do not edit the baseline file to pass.** The baseline may only shrink.

## Suggested order

1. Citation-handling decision (above). Human.
2. `amber-mythic-orientation`, then `rational-orange-orientation`. These two define the audience's voice, and the other three reuse it.
3. `cognitive-dissonance-bridge`, then `perspective-taking-capacity`.
4. `authority-autonomy-transition` last, once the voice is settled. Run `safety-review` and human review before any reader sees it.
5. Frontmatter, tags and sidebar pass; strict gate to 0.
6. Audience readers (three per QuickStart) with the reader kit.
7. Owner confirms the audience-facing name; set `published: true`.

## Decisions needed from you

- Citation titles: ignore in the vocabulary check, or reword?
- Audience-facing name and slug (see the name suggestions in #528).
- Whether one human reader from the target audience sees `authority-autonomy-transition` before the formal readers do.
