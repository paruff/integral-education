---
id: module-rubric-audit
title: Module Rubric Audit (13 sections, 77 modules)
---

# Module rubric audit: 13 sections, 77 modules

Audited 2026-11-11 from the module source files in `docs/modules/` on `main` (not from the live site). Produced by `node scripts/audit-modules.mjs`, which scores each module against the 13 sections in `.agents/agents/audit.md` using the countable requirements in `.agents/skills/module-authoring/SKILL.md`. AI-drafted; every safety and evidence item below needs a human decision.

## What this audit can and cannot tell you

The script counts things: gifts with their own sub-heading, rubric rows, cards, intervals, tier-rated citations, required phrases. It does not judge tone (the sincere-reader test for Gifts, moral versus structural framing in Limitations), whether a citation is real or supports its claim, or whether a practice is safe. A ✅ means "nothing countable is missing". It does not mean a human reviewer would pass the section.

Some checks are keyword heuristics and will produce false flags, in particular "no pacing language", "rubric not written in first person" and "hedging words" in Gifts (the word "but" is sometimes used innocently).

Five modules were read by the auditor: `mindfulness-basics` and the three modules rewritten in this change in full, and most of the benchmark (`rational-orange-orientation`). The tier flags were spot-checked against the practice text of the flagged modules. Findings marked "read" below come from that reading. Everything else is the script's output.

## Summary

- Every module has all 13 sections present in some form. Three modules have a structural gap: `vision-logic-metasystematic-thinking` and `pluralistic-green-orientation` have no Practice heading, and `integral-teal-orientation` has an Integrate heading whose activities sit under a later heading.
- 3 modules had no countable gaps after this change (the three rewritten here). Before it, none did. The benchmark module itself has 15 countable gaps.
- **Confirmed tier contradictions (P0), 3 modules:** `shadow-integration-101`, `shadow-work-foundation` and `self-line-integration-practice` carry `safety_tier: 2` in frontmatter and state Tier 1 in their Safety Note.
- **Possible tier misclassification (P0?), 8 modules:** the Practice text contains body or breath instruction, an automatic Tier 2 trigger in the safety-classification skill, and the module is not marked Tier 2. Read and confirmed for two: `mindfulness-basics` (a breath-focused sitting practice) and `gross-state-awareness` (a full-body scan, which also prescribes a breath count of four in, six out, against the module-authoring note on breath instructions). The other six mostly use "take three slow breaths" as a settling step, as the benchmark does, and may be false flags: `flow-peak-experience`, `cognitive-dissonance-bridge`, `magic-mythic-red-stage-orientation`, `spiritual-line-practice-architecture`, `interpersonal-line-overview-orientation`, `self-line-conventional-conformist-achiever`.
- 65 of 77 modules have journey sections out of the canonical order. The module-authoring skill already records this as a known, queued gap.

### Sections by score

| # | Section | ✅ | ⚠️ | ❌ |
|---|---|--:|--:|--:|
| 1 | AQAL Mapping | 76 | 1 | 0 |
| 2 | Theoretical Frameworks | 18 | 59 | 0 |
| 3 | Gifts | 6 | 71 | 0 |
| 4 | Limitations | 40 | 37 | 0 |
| 5 | Practice | 6 | 69 | 2 |
| 6 | Reflect | 12 | 65 | 0 |
| 7 | Assess | 14 | 63 | 0 |
| 8 | Integrate | 24 | 52 | 1 |
| 9 | Facilitator Note | 3 | 74 | 0 |
| 10 | Anki Cards | 45 | 32 | 0 |
| 11 | Retrieval Schedule | 41 | 36 | 0 |
| 12 | Evidence and Citations | 54 | 23 | 0 |
| 13 | Safety Note | 3 | 74 | 0 |

### Most common gaps

| Modules | Gap |
|--:|---|
| 68 | Facilitator Note has no timing breakdown |
| 68 | Facilitator Note has no adaptation note for stage-mixed groups |
| 68 | Practice has no pacing language (heuristic) |
| 65 | Journey sections out of order |
| 63 | Fewer than 5 gifts with their own `###` sub-heading (most modules write Gifts as paragraphs) |
| 58 | Safety Note does not say the content is educational, not therapeutic |
| 57 | Reflect has no somatic check-in prompt |
| 57 | Assess rubric not in first-person language (heuristic) |
| 51 | No tier tag in frontmatter |
| 50 | Integrate activities give no duration |
| 44 | Fewer than 4 frameworks with an evidence tier |
| 38 | Kegan's subject-object theory, the required developmental framework, is not used |
| 36 | Hedging words in Gifts (heuristic) |
| 33 | Practice does not state setup |
| 32 | Reflect has no dialogue prompt |
| 32 | Fewer than 8 retrieval cards |
| 22 | No Retrieval Schedule row starts from memory |
| 21 | Practice has no explicit duration |
| 19 | Fewer than 4 Tier A/B sources |
| 16 | Assess rubric lacks Not yet / Developing / Stable columns |

## Gap table

Columns 1 to 13 are the rubric sections in the order above. "✅" is the number of sections with no countable gap. "Gaps" is the total number of countable gaps, including ordering and frontmatter. "Tier" is the tier the module states. Sorted weakest first. Run `node scripts/audit-modules.mjs` for the gap text behind every ⚠️.

| # | Module | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | ✅ | Gaps | Tier | Priority |
|---|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|--:|:-:|:-:|
| 1 | `shadow-integration-101` | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | 1/13 | 21 | 1 | P0 |
| 2 | `emotion-regulation-foundations` | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | 2/13 | 21 | 1 | P2 |
| 3 | `self-line-postconventional-individualist-strategist` | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | 2/13 | 19 | ? | P2 |
| 4 | `ecological-systems-consciousness` | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | 2/13 | 17 | 2 | P2 |
| 5 | `self-line-postautonomous-construct-aware-unitive` | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | 2/13 | 17 | ? | P2 |
| 6 | `spiritual-line-conjunctive-universalizing` | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | 2/13 | 17 | 1 | P2 |
| 7 | `spiritual-line-post-metaphysical-integral-religion` | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | 2/13 | 17 | 1 | P2 |
| 8 | `shadow-immunity-to-change` | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | 2/13 | 15 | 2 | P2 |
| 9 | `spiritual-line-shadow-integration` | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | 3/13 | 22 | 2 | P2 |
| 10 | `moral-line-shadow-moral-injury` | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ | 3/13 | 21 | 2 | P2 |
| 11 | `co-regulation-relational-attunement` | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | 3/13 | 20 | 2 | P2 |
| 12 | `moral-line-conventional-reasoning` | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ | 3/13 | 20 | 1 | P2 |
| 13 | `cognitive-line-metasystematic-vision-logic` | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ⚠️ | ⚠️ | 3/13 | 19 | 1 | P2 |
| 14 | `cognitive-line-postformal-operations` | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ | 3/13 | 18 | 1 | P2 |
| 15 | `emotional-appraisal-meaning-making` | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | 3/13 | 18 | 1 | P2 |
| 16 | `flow-peak-experience` | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | 3/13 | 18 | 1 | P0? |
| 17 | `moral-line-imagination-integral-ethics` | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ | 3/13 | 18 | 1 | P2 |
| 18 | `moral-line-postconventional-reasoning` | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ | 3/13 | 18 | 1 | P2 |
| 19 | `self-line-conventional-conformist-achiever` | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | 3/13 | 18 | 1 | P0? |
| 20 | `subtle-state-access` | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | 3/13 | 18 | 2 | P2 |
| 21 | `cognitive-line-practice-architecture` | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | 3/13 | 17 | 1 | P2 |
| 22 | `healthy-hierarchy-actualization-gradient` | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ | 3/13 | 17 | 1 | P2 |
| 23 | `integral-ethics-beyond-relativism` | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | 3/13 | 17 | 1 | P2 |
| 24 | `shadow-collective-cultural` | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ⚠️ | ⚠️ | 3/13 | 17 | 2 | P2 |
| 25 | `relational-repair-conflict-navigation` | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | 3/13 | 16 | 2 | P2 |
| 26 | `amber-mythic-orientation` | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | 3/13 | 15 | 1 | P2 |
| 27 | `empathy-perspective-plurality` | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ⚠️ | 3/13 | 14 | 2 | P2 |
| 28 | `integral-life-practice-embodying-2nd-tier` | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ | 3/13 | 14 | 2 | P2 |
| 29 | `perspective-taking-capacity` | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | 3/13 | 14 | 1 | P2 |
| 30 | `gross-state-awareness` | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | 4/13 | 18 | 1 | P0? |
| 31 | `late-orange-disillusionment` | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ⚠️ | 4/13 | 18 | 1 | P2 |
| 32 | `mindfulness-basics` | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | 4/13 | 18 | 1 | P0? |
| 33 | `mindfulness-deepening` | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | 4/13 | 18 | 2 | P2 |
| 34 | `spiritual-line-mythic-to-rational` | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ✅ | ⚠️ | 4/13 | 18 | 2 | P2 |
| 35 | `cognitive-bias-101` | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ⚠️ | 4/13 | 17 | 1 | P2 |
| 36 | `late-green-emergence-signals` | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ⚠️ | 4/13 | 17 | 1 | P2 |
| 37 | `moral-line-overview-dual-track` | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ | 4/13 | 17 | 1 | P2 |
| 38 | `relativism-limits-of-pluralism` | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | 4/13 | 17 | 2 | P2 |
| 39 | `spiritual-line-overview-orientation` | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ✅ | ⚠️ | 4/13 | 17 | 1 | P2 |
| 40 | `causal-witness-state` | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | 4/13 | 16 | 2 | P2 |
| 41 | `evidence-evaluation` | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ✅ | ✅ | ⚠️ | 4/13 | 16 | 1 | P2 |
| 42 | `nondual-awareness-orientation` | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | 4/13 | 16 | 2 | P2 |
| 43 | `self-line-integration-practice` | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ | 4/13 | 16 | 1 | P0 |
| 44 | `shadow-321-process` | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | 4/13 | 16 | 2 | P2 |
| 45 | `vision-logic-metasystematic-thinking` | ✅ | ⚠️ | ⚠️ | ✅ | ❌ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ⚠️ | 4/13 | 16 | 1 | P2 |
| 46 | `critical-thinking-foundations` | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ✅ | ✅ | ⚠️ | 4/13 | 15 | 1 | P2 |
| 47 | `rational-orange-orientation` | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ | 4/13 | 15 | 1 | P2 |
| 48 | `shadow-positive-projection` | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ✅ | ✅ | ⚠️ | ⚠️ | 4/13 | 15 | 2 | P2 |
| 49 | `authentic-dialogue-collaborative-meaning` | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | 4/13 | 14 | 2 | P2 |
| 50 | `shadow-in-relationships` | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ✅ | ⚠️ | 4/13 | 14 | 2 | P2 |
| 51 | `community-belonging-collective-intelligence` | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | 4/13 | 13 | 1 | P2 |
| 52 | `contextual-ethics-moral-complexity` | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ⚠️ | 4/13 | 13 | 1 | P2 |
| 53 | `emotional-intelligence-somatic-line` | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | 4/13 | 13 | 2 | P2 |
| 54 | `magic-purple-stage-orientation` | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ | 4/13 | 13 | 1 | P2 |
| 55 | `authority-autonomy-transition` | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ✅ | ✅ | ⚠️ | 4/13 | 12 | 1 | P2 |
| 56 | `shadow-work-foundation` | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ✅ | ✅ | ⚠️ | 5/13 | 17 | 1 | P0 |
| 57 | `self-line-overview-psychograph` | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ✅ | ⚠️ | 5/13 | 16 | 1 | P2 |
| 58 | `shadow-spiritual-bypassing` | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ✅ | ⚠️ | 5/13 | 16 | 2 | P2 |
| 59 | `perspective-taking-empathic-accuracy` | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ | 5/13 | 15 | 1 | P2 |
| 60 | `cognitive-line-overview-orientation` | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ✅ | ⚠️ | 5/13 | 14 | 1 | P2 |
| 61 | `cognitive-dissonance-bridge` | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ✅ | ✅ | ⚠️ | 5/13 | 13 | 1 | P0? |
| 62 | `emotional-line-overview-orientation` | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ✅ | ⚠️ | 5/13 | 13 | 1 | P2 |
| 63 | `shadow-persona-mask` | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ✅ | ⚠️ | 5/13 | 13 | 2 | P2 |
| 64 | `magic-mythic-red-stage-orientation` | ✅ | ⚠️ | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ | 5/13 | 12 | 1 | P0? |
| 65 | `integral-shadow-teal-trap` | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ✅ | ✅ | ✅ | ⚠️ | 6/13 | 14 | 2 | P2 |
| 66 | `integral-teal-orientation` | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ❌ | ⚠️ | ✅ | ✅ | ✅ | ⚠️ | 6/13 | 11 | 1 | P2 |
| 67 | `spiritual-line-practice-architecture` | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ⚠️ | 6/13 | 11 | 1 | P0? |
| 68 | `pluralistic-green-orientation` | ✅ | ✅ | ⚠️ | ✅ | ❌ | ⚠️ | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ | 6/13 | 10 | 1 | P2 |
| 69 | `multiperspectival-leadership-action` | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ | 7/13 | 11 | 1 | P2 |
| 70 | `affect-labelling-somatic-correlation` | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ | 8/13 | 9 | 2 | P2 |
| 71 | `somatic-line-overview` | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ⚠️ | 9/13 | 8 | 2 | P2 |
| 72 | `cross-difference-dialogue-trust-building` | ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ | 9/13 | 7 | 2 | P2 |
| 73 | `interpersonal-line-overview-orientation` | ✅ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ⚠️ | ✅ | ✅ | ✅ | ⚠️ | 9/13 | 6 | 1 | P0? |
| 74 | `emotional-interpersonal-integration` | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ⚠️ | 10/13 | 4 | 1 | P2 |
| 75 | `cognitive-line-concrete-to-formal` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 13/13 | 0 | 1 | — |
| 76 | `emotional-granularity` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 13/13 | 0 | 1 | — |
| 77 | `systems-thinking-101` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 13/13 | 0 | 1 | — |

## The three modules fixed in this change

Ranked by fewest complete sections, then most gaps, the weakest module before this change was `shadow-integration-101` (1 of 13 complete, 21 gaps, confirmed tier contradiction). It was not rewritten: it is shadow content, and `AGENTS.md` bars Tier 2 or shadow content without human sign-off. The same rule excluded `emotion-regulation-foundations` (2 of 13, 21 gaps), which covers nervous-system regulation and has a clinical sign-off block still marked pending.

The three weakest modules that could be fully rewritten as Tier 1 content were:

| Module | Before | After |
|---|---|---|
| `cognitive-line-concrete-to-formal` | 2 of 13 complete, 21 gaps | 13 of 13, 0 gaps |
| `emotional-granularity` | 2 of 13 complete, 21 gaps | 13 of 13, 0 gaps |
| `systems-thinking-101` | 2 of 13 complete, 19 gaps | 13 of 13, 0 gaps |

Each was rewritten to the journey template: canonical section order, four framework lenses with evidence tiers (Kegan included), five gifts and structurally framed limitations as sub-headings, a single-sitting practice with duration, setup, a worked example and pacing language, Stabilize cautions, timed Integrate anchors, six Reflect prompts (journaling, dialogue, body check-in), a first-person Not yet / Developing / Stable rubric with checkable evidence, a four-interval retrieval schedule that starts from memory, ten retrieval cards, a tiered evidence table, and Facilitator and Safety notes as admonitions.

### Items in these three that need a human decision

1. **Tier.** All three state Tier 1. The practices were narrowed to keep them there: `emotional-granularity` now asks for a mild, everyday feeling, where it previously asked for "a recent emotionally significant event"; `cognitive-line-concrete-to-formal` asks for an ordinary situation in its stress map and its grounding step no longer includes body or breath instruction. Each module has one body check-in prompt in Reflect, as the module-authoring skill invites. Safety Review should confirm Tier 1.
2. **Citations.** Every source cited is one the drafting model is confident exists as described. None was fetched or checked against the original during this change. Volume and page numbers in particular should be verified before publication.
3. **Citations changed or removed because they could not be supported:**
   - `systems-thinking-101` cited Booth Sweeney & Sterman (2000) for the claim that systems-thinking teaching improves problem-solving, rated Tier A. That study reports that well-educated adults do poorly on simple stock-and-flow tasks. The claim was rewritten to match and the source rated Tier B.
   - `emotional-granularity` had a row for a "Lindquist Granularity–Wellbeing" meta-analysis with no reference. No such source could be identified, so the row was removed. The claims that granular people "recover faster from negative events" and "make better decisions under pressure" had no source and were removed.
   - `cognitive-line-concrete-to-formal` cited Labouvie-Vief (2006), "Emerging structures of adult thought", as a chapter in the *Handbook of Child Psychology*. The auditor believes that chapter is in a different book and replaced the citation with Labouvie-Vief (2003), which supports the same claim. Basseches (1984) was dropped with the sentence it supported.
4. **Tier ratings are stricter than before.** Sources were rated against the definitions in the evidence-vetting skill (Tier A = randomized trial, systematic review or meta-analysis). Piaget and Inhelder's work, rated A in several modules including the benchmark, is rated B here. Two of the three modules now cite no Tier A source and say so.
5. **Emotional-line evidence floor not met.** The evidence-vetting skill asks emotional-line modules for four Tier A sources and for polyvagal and attachment sources. `emotional-granularity` has three Tier A sources and cites neither framework, because nothing in the module depends on them and adding them would mean adding claims to justify the citations.
6. **Kegan.** The rubric requires Kegan's subject-object theory in every module. In all three, its application to the module's skill is the author's interpretation and is labelled as such in the text.

## What was not done

- The other 74 modules were not edited.
- The audit role says to fetch each module from its live URL. This audit read the source files in the repository, which is what the site is built from.
- No licensed clinician, stage-member or subject-matter review has taken place.
