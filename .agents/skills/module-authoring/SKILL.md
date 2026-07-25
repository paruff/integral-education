---
name: module-authoring
description: "Use this skill whenever writing, extending, or auditing an Integral Education learning module. This is the master protocol for the journey-template gold standard every module must meet. Trigger when: creating a new module from scratch, extending an incomplete module, auditing a module against the rubric, writing any individual section (AQAL mapping, practice, Anki cards, retrieval schedule, safety note, etc.), or checking whether a draft meets the platform standard. Always load before touching any module markdown file. Also load references/stage-content-guides.md for the module's target stage before writing."
---

# Module Authoring — Journey Template Gold Standard

## Benchmark exemplar — fetch before writing
- `https://paruff.github.io/integral-education/docs/modules/rational-orange-orientation`

This is the quality floor for tone, depth, and how Gifts/Limitations/Frameworks fold into custom-named headings. If you cannot fetch it, stop and report the failure.

**Known gap in this exemplar:** its section order today is AQAL Mapping → Learn → Practice → Reflect → Assess → Integrate → Evidence → Safety — it predates this spec and has not yet been reordered to match the canonical sequence below (Stabilize → Integrate → Reflect → Assess → Retrieval Schedule). It also has no explicit `## Retrieval Schedule` heading (the interval table is currently headerless). Use it for section *content and tone*, not literal ordering — it is queued for its own reorder pass along with every other module.

---

## Frontmatter

```yaml
---
id: module-slug                    # matches filename; no spaces; used by sidebars.js
title: Full Module Title           # Docusaurus renders this as H1 automatically — do NOT add a # heading in the body
sidebar_label: Short Label         # what appears in the sidebar
description: One sentence, plain language, no AQAL jargon for non-Integral audiences.
tags:
  - amber                          # stage tag (magenta / red / amber / orange / green / teal)
  - cognitive-line                 # line tag
  - tier-1                         # safety tier tag (tier-1 / tier-2)
---
```

---

## The journey — required order, required headings

All section headings: `##` (H2), each led with its emoji. The `title:` frontmatter field is the only H1. No `# ` heading anywhere in the markdown body.

**Facilitator Note and Safety Note are admonitions, not H2 headings** (`<Admonition type="tip" title="Facilitator Note">` and `:::note Safety Note` respectively) — this is a deliberate pattern, not a gap, and the content-graph/frontmatter validators already recognize both admonition forms and the "When to Seek Support" / "seek help" heading aliases for Safety Note.

```
🗺️ AQAL Mapping
🧭 Orient
🌿 Encounter
🧠 Learn         (Theoretical Frameworks, Gifts, Limitations fold in here under custom H2s)
🧘 Practice
⚓ Stabilize
🔄 Integrate
🔍 Reflect
📊 Assess
⏱️ Retrieval Schedule
📚 Evidence and Citations
[Facilitator Note admonition]
[Safety Note admonition]
```

---

### 🗺️ AQAL Mapping

A table covering all 5 AQAL dimensions. Every cell must be populated — no blanks.

```markdown
## 🗺️ AQAL Mapping

| Dimension | This module's focus |
|-----------|-------------------|
| **Quadrants** (Where) | [Which quadrants are primary — UL interior individual, UR exterior individual, LL interior collective, LR exterior collective] |
| **Levels** (Depth) | [Stage or transition addressed] |
| **Lines** (Skills) | [Which developmental lines this module develops] |
| **States** (Experience) | [Which states of consciousness are engaged or worked with] |
| **Types** (Style) | [Relevant type considerations — gender, cultural background, personality, learning style] |
```

---

### 🧭 Orient

**Purpose:** Ground the learner before any content — where this module sits in a sequence, what it assumes, why it matters now.

**Requirements:**
- State position in sequence if this module belongs to one ("This is the second orientation module in the Amber → Rational sequence...")
- Name prerequisites explicitly, with a link, if any exist (an `:::info Before this module` admonition works well here)
- One or two sentences on why this content matters to the learner right now — not just what it covers

---

### 🌿 Encounter

**Purpose:** First descriptive contact with the material — the lived, phenomenological texture of the stage/capacity/concept, before it gets analyzed. This is showing, not yet explaining.

**Requirements:**
- Written in descriptive/experiential register (e.g. "The Orange Worldview" style prose), not yet citation-dense
- Should make a sincere reader at this stage's centre of gravity feel accurately seen
- Sets up the concepts that Learn will then name and source

---

### 🧠 Learn

**Purpose:** The conceptual deep dive. This is where Theoretical Frameworks, Gifts, and Limitations fold in as custom-named `##` subsections — never as literal headings called "Theoretical Frameworks," "Gifts," or "Limitations." Name them for the specific content: "Four Framework Lenses," "The Gifts of Orange," "The Developmental Limitations of Orange."

**Theoretical Frameworks (folded in under a custom heading):**
- Minimum 4 frameworks. Required: at least one developmental framework — Kegan's subject-object theory plus one domain-specific framework is the universal floor.
- See `references/stage-content-guides.md` for the most appropriate frameworks per stage. Don't default to Spiral Dynamics for every module — for Magenta and Red content it's a framework built by Orange-stage researchers theorizing about pre-Orange experience; supplement with frameworks closer to the stage's own phenomenology (developmental trauma research for Red, relational attachment theory for Magenta).
- Each framework entry: name, the specific concept relevant to this module, 1–2 sentences of application.

**Gifts (folded in under a custom heading, e.g. "The Gifts of Orange"):**
- 5+ genuine, specific items, each its own `###` sub-heading.
- No hedging language — no "while," "however," "though," "but," "can sometimes." Those words belong in Limitations, not here.
- No implicit comparison to other stages; don't describe a gift in terms of what it leads toward.
- **Sincere-reader test:** read it as a sincere, intelligent member of this stage's community. Any sentence that produces even faint condescension — rewrite it. Most commonly failed check in audit.

**Limitations (folded in under a custom heading, e.g. "The Developmental Limitations of Orange"):**
- Structurally framed: "The very [gift] that makes [stage] [strength] can, at the boundary, become [limitation]" — not character judgments.
- No contemptuous language: no "merely," "only," "simplistic," "primitive," "immature."
- Distinguish genuine stage limitations from misreadings by observers at other stages.
- **Pre/Trans note (required for Magenta, Red, Amber, and Integral modules):** a paragraph distinguishing genuine stage expression from pre-stage regression or post-stage imitation.

---

### 🧘 Practice

**Purpose:** A concrete, step-by-step practice the learner can complete in a single sitting.

**Requirements:**
- Duration stated explicitly (e.g. 20–25 minutes; if shorter, state why)
- Setup stated: physical space, materials if any, body position
- Numbered steps, each self-contained — a learner starting at step 3 knows what to do
- Pacing language throughout: "take a moment," "no rush," "pause here before continuing," "if you need to stop, that's fine"
- **Tier classification applies here:** any step involving somatic instruction, shadow material, identity disruption, or relational vulnerability makes the module Tier 2 — see the safety-classification skill. Do not write a Tier 2 practice without confirmed clinician review.

---

### ⚓ Stabilize

**Purpose:** Consolidation and grounding notes after the practice — the "don't over-claim what you just did" section. This holds content like the Pre/Trans inflation warning and cultural/linguistic relativism notes that previously lived loose inside Limitations.

**Requirements:**
- At least one explicit caution against mistaking intellectual/conceptual grasp for structural, embodied capacity (the "Pre/Trans Action Gap" pattern)
- Cultural, linguistic, or contextual relativism notes where the module's frameworks or vocabulary are culturally specific (e.g. Western emotion-vocabulary scaffolds)

---

### 🔄 Integrate

Daily carry-forward activities that embed the module's core practice into existing routines. Not assignments — anchors.

**Requirements:**
- At least 3 activities
- Each specifies what to do, when (tied to an existing daily moment, not "sometime during the day"), and how long
- Behavioral specifics, not conceptual aspirations: "Before your next difficult conversation, take three slow breaths and name the emotion you're feeling" — not "Notice your emotions more."

---

### 🔍 Reflect

5+ prompts, mixing:
- Individual journaling prompts
- Dialogue prompts (for use with a partner or group — specify which)
- Somatic check-in prompts where appropriate ("Where do you notice this in your body?")

Open and generative, not leading — a good prompt doesn't contain its own preferred answer.

---

### 📊 Assess

A rubric table with a stated passing threshold, written in first-person self-assessment language, not evaluator-observer language.

```markdown
## 📊 Assess

| Criterion | Not yet | Developing | Stable |
|-----------|---------|------------|--------|
| [Criterion 1] | [Behavioral description — what it looks like when not present] | [What partial development looks like] | [What stable capacity looks like in daily life] |

**Passing threshold:** Stable in at least [X] of [Y] criteria.
```

**Requirements:**
- Minimum 3 criteria, maximum 6
- Behavioral and observable — not conceptual ("I understand the concept" is not a criterion)
- Passing threshold stated explicitly

---

### ⏱️ Retrieval Schedule

4 intervals with specific, varied activities, escalating from recall toward application and integration. **Give this an explicit `## ⏱️ Retrieval Schedule` heading** — do not leave the interval table headerless.

```markdown
## ⏱️ Retrieval Schedule

| Interval | When | Activity |
|----------|------|----------|
| 1 | 24 hours after completing the module | [Card review] |
| 2 | 3 days | [Re-do one step from Practice; journal differences] |
| 3 | 7 days | [Teach the core concept to someone else] |
| 4 | 14 days | [Apply one Integrate activity deliberately; journal what you noticed] |
```

---

### 📚 Evidence and Citations

All empirical claims in the module body require a citation, tier-rated, with all Tier-C citations stating a caveat.

```markdown
## 📚 Evidence and Citations

| Citation | Tier | Caveat |
|----------|------|--------|
| Author, A. A., & Author, B. B. (Year). Title. *Journal*, *vol*(iss), pp. https://doi.org/ | A | None |
| Author, C. C. (Year). *Title*. Publisher. | B | Book-length synthesis; individual chapters vary |
| Author, D. D. (Year). Theoretical framework. *Journal*. | C | Theoretical framework; empirical validation limited |
```

**Tier definitions (full detail in evidence-vetting skill):**
- **Tier A:** RCT, systematic review, or meta-analysis. High confidence.
- **Tier B:** Observational study, expert consensus, well-validated clinical framework, longitudinal developmental research. Moderate confidence.
- **Tier C:** Expert opinion, single case study, theoretical framework without empirical validation. Use with stated caveat.

Minimum 4 Tier-A or Tier-B sources. No module should rest primarily on Tier-C sources.

---

### Facilitator Note (admonition, not H2)

```markdown
<Admonition type="tip" title="Facilitator Note">

**Presenting this content in group settings:** [framing recommendations]

**Group facilitation structure:** [timing breakdown, e.g. "10 min intro / 20 min practice / 15 min paired reflection / 10 min large-group debrief"]

**Watch-fors:** [2–3 common group dynamics to anticipate]

</Admonition>
```

Optionally also embed Anki-style Q&A pairs (8+, mixing definition/application/distinction/reflection types, covering the full module) inside the `<RetrievalPrompt>` component near the end of the file, rather than as a separate literal "Anki Cards" heading.

---

### Safety Note (admonition, not H2)

Required on every module. Written LAST — after Practice is finalized, since Practice determines the Tier.

**Tier 1 (minimum):**
```markdown
:::note Safety Note

**Tier:** 1 — Standard reflective content

This module involves reflective and cognitive practices. If any material surfaces significant distress, pause and speak with a trusted person. This content is educational, not therapeutic.

:::
```

**Tier 2 (full protocol):**
```markdown
:::note Safety Note

**Tier:** 2 — [Specify: Somatic practice / Shadow work / Identity disruption risk / Relational vulnerability]

**Before you begin:** [Specific description of what this practice involves and what it may surface — not generic]

**This practice may not be the right moment if:** [specific conditions]

**Stop if you notice:** [specific conditions — dissociation, flashback, inability to feel your body, overwhelming emotion that doesn't settle within 2–3 minutes of pausing]

**Grounding:** [numbered steps back to settled ground]

**If distress continues:** [specific escalation path]

**Resources:** [region-appropriate crisis resources — see safety-classification skill for current list]

:::
```

**Note on breath instructions:** Do not prescribe specific breath counts (e.g. "4-count inhale, 6-count exhale") in grounding protocols. Extended exhale ratios can be activating for some anxiety profiles. Use invitational language: "at a pace that feels settling."

A custom heading like "When to Seek Support" is an acceptable equivalent to the `:::note Safety Note` admonition and is recognized by the validators — but the admonition form is preferred for new modules.

---

## Self-audit checklist

Complete before opening any PR.

**Structure:**
- [ ] Frontmatter complete (id, title, sidebar_label, description, tags)
- [ ] No `# ` heading in the markdown body
- [ ] All journey sections present in order: AQAL Mapping → Orient → Encounter → Learn → Practice → Stabilize → Integrate → Reflect → Assess → Retrieval Schedule → Evidence and Citations
- [ ] Facilitator Note and Safety Note are admonitions, not H2 headings
- [ ] Theoretical Frameworks, Gifts, and Limitations appear as custom-named H2/H3 subsections inside Learn — never as literal headings called "Theoretical Frameworks," "Gifts," or "Limitations"

**Content quality:**
- [ ] Gifts: 5+ items; no hedging language; sincere-reader test passed
- [ ] Limitations: structurally framed; no contempt; Pre/Trans note present (if applicable)
- [ ] Practice: explicit duration; numbered steps; setup stated; pacing language throughout
- [ ] Stabilize: Pre/Trans inflation warning and cultural-relativism notes present where applicable
- [ ] Reflect: 5+ prompts; mix of individual, dialogue, somatic types
- [ ] Assess: rubric with behavioral criteria; passing threshold stated
- [ ] Integrate: 3+ activities with specific timing; behavioral not conceptual
- [ ] Retrieval Schedule: explicit heading; 4 intervals; activities escalate from recall to application
- [ ] Evidence: every empirical body claim has a citation row; all citations tier-rated; Tier-C all have caveats
- [ ] Safety Note: Tier matches final Practice content; all Tier 2 elements present if applicable

**Vocabulary and framing:**
- [ ] No AQAL jargon in learner-facing language (Amber / Red / Magenta audiences)
- [ ] No "graduate from," "transcend," or "leave behind" language
- [ ] No therapeutic outcome claims anywhere in the module
- [ ] Pre/Trans check completed and noted
- [ ] Fork 3: Teal superiority check completed sentence by sentence

---

## Reference files

- `references/stage-content-guides.md` — authoring notes per stage (Magenta, Red, Amber, Orange, Green, Teal) and for the Emotional/Interpersonal line
- `references/exemplar-sections.md` — annotated sections from the gold-standard module with margin notes explaining what makes each element work
- `references/ei-line-protocol.md` — detailed protocol for Emotional/Interpersonal line modules
