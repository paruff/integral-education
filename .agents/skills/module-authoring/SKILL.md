---
name: module-authoring
description: "Use this skill whenever writing, extending, or auditing an Integral Education learning module. This is the master protocol for the 13-section gold standard every module must meet. Trigger when: creating a new module from scratch, extending an incomplete module, auditing a module against the rubric, writing any individual section (AQAL mapping, practice, Anki cards, retrieval schedule, safety note, etc.), or checking whether a draft meets the platform standard. Always load before touching any module markdown file. Also load references/stage-content-guides.md for the module's target stage before writing."
---

# Module Authoring — 13-Section Gold Standard

## Benchmark exemplars — fetch before writing
- `https://paruff.github.io/integral-education/docs/modules/rational-orange-orientation`
- `https://paruff.github.io/integral-education/docs/modules/late-orange-disillusionment`

These are the quality floor. If you cannot fetch them, stop and report the failure.

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

## The 13 sections — required order, required headings

All section headings: `##` (H2). The `title:` frontmatter field is the only H1. No `# ` heading anywhere in the markdown body.

---

### Section 1: AQAL Mapping

A table covering all 5 AQAL dimensions. Every cell must be populated — no blanks.

```markdown
## AQAL Mapping

| Dimension | This module's focus |
|-----------|-------------------|
| **Quadrants** (Where) | [Which quadrants are primary — UL interior individual, UR exterior individual, LL interior collective, LR exterior collective] |
| **Levels** (Depth) | [Stage or transition addressed] |
| **Lines** (Skills) | [Which developmental lines this module develops] |
| **States** (Experience) | [Which states of consciousness are engaged or worked with] |
| **Types** (Style) | [Relevant type considerations — gender, cultural background, personality, learning style] |
```

---

### Section 2: Theoretical Frameworks

**Minimum 4 frameworks.** Required: at least one developmental framework. Required choices depend on the module's stage — see the stage-content-guides reference for the most appropriate frameworks per stage. The universal minimum is Kegan's subject-object theory plus one domain-specific framework.

Do not default to Spiral Dynamics for every module — for Magenta and Red content, Spiral Dynamics is a framework developed by Orange-stage researchers theorising about pre-Orange experience. Use it with awareness of that limitation, and supplement with frameworks closer to the stage's phenomenology (e.g. developmental trauma research for Red, relational attachment theory for Magenta).

Each framework entry: name of framework, the specific concept relevant to this module, 1–2 sentences of application.

---

### Section 3: Gifts

**Purpose:** Honour the genuine strengths and contributions of this stage or capacity. A reader at this stage's centre of gravity should feel seen and respected — not patronised, not managed, not gently condescended to.

**Requirements:**
- 5+ genuine, specific items. Not platitudes.
- Sub-heading for each gift (`###`)
- No hedging language. This section is unambiguously positive. If any sentence contains "while," "however," "though," "but," or "can sometimes" — rewrite it. Those words belong in Section 4, not here.
- No implicit comparison to other stages. Do not describe any gift in terms of what it leads toward.

**The sincere-reader test:** Read the Gifts section as if you are a sincere, intelligent member of this stage's community. If any sentence produces even faint condescension or patronising warmth — rewrite it. This is the most commonly failed section in audit.

---

### Section 4: Limitations / Shadows

**Purpose:** Name the structural constraints and shadow material of this stage or capacity — without contempt, without pathologising, without framing limitations as reasons to evolve.

**Requirements:**
- Structurally framed: "The very [gift] that makes [stage] [strength] can, at the boundary, become [limitation]." — not character judgments.
- No contemptuous language. No "merely," "only," "simplistic," "primitive," "immature."
- Distinguish genuine stage limitations from misreadings by observers at other stages (a common error in developmental writing).
- **Pre/Trans note (required for Magenta, Red, Amber, and Integral modules):** Include a paragraph explicitly distinguishing genuine stage expression from pre-stage regression or post-stage imitation. Example: "Somatic aliveness is a genuine gift of early-stage development and also a genuine attainment of later contemplative practice. These look similar from the outside; distinguishing them requires attention to [specific markers]."

---

### Section 5: Practice

**Purpose:** A concrete, step-by-step practice the learner can complete in a single sitting.

**Requirements:**
- Duration stated explicitly: 20–25 minutes. If shorter for a specific reason, state why.
- Setup stated: physical space, materials if any, body position.
- Numbered steps. Each step self-contained — a learner who starts at step 3 knows what to do.
- Pacing language throughout: "take a moment," "no rush," "pause here before continuing," "if you need to stop, that's fine."
- **Tier classification applies here:** If any step involves somatic instruction, shadow material, identity disruption, or relational vulnerability — the module is Tier 2. See the safety-classification skill. Do not write a Tier 2 practice without confirmed clinician review.

---

### Section 6: Reflect

5+ prompts. Mix of:
- Individual journaling prompts (inner exploration of the module's content)
- Dialogue prompts (for use with a partner or in a group — specify which)
- Somatic check-in prompts where appropriate ("Where do you notice this in your body? What texture, weight, or movement is there?")

Write prompts that are open and generative, not leading. A good reflection prompt does not contain its own preferred answer.

---

### Section 7: Assess

A rubric table with a stated passing threshold. The rubric is for learner self-assessment — write it in first-person descriptors, not evaluator-observer language.

```markdown
## Assess

### Mastery rubric

| Criterion | Not yet | Developing | Stable |
|-----------|---------|------------|--------|
| [Criterion 1] | [Behavioural description — what it looks like when not present] | [What partial development looks like] | [What stable capacity looks like in daily life] |
| [Criterion 2] | ... | ... | ... |
| [Criterion 3] | ... | ... | ... |

**Passing threshold:** Stable in at least [X] of [Y] criteria, with no "Not yet" in [specific critical criterion if applicable].
```

**Requirements:**
- Minimum 3 criteria, maximum 6 (beyond 6, rubrics are not used)
- Criteria must be behavioural and observable — not conceptual ("I understand the concept" is not a criterion)
- Passing threshold must be stated explicitly

---

### Section 8: Integrate

Daily carry-forward activities that embed the module's core practice into existing routines. These are not assignments — they are anchors.

**Requirements:**
- At least 3 activities
- Each activity specifies: what to do, when (tied to an existing daily moment — not "sometime during the day"), and how long
- Behavioural specifics, not conceptual aspirations: "Before your next difficult conversation, take three slow breaths and name the emotion you're feeling" — not "Notice your emotions more."

---

### Section 9: Facilitator Note

Guidance for facilitators running this module in a group or supported setting.

**Requirements:**
- Group framing: how to introduce this module to a group in 2–3 minutes
- Facilitation sequence: recommended time breakdown (e.g. "10 min intro / 20 min practice / 15 min paired reflection / 10 min large-group debrief")
- Watch-fors: 2–3 common group dynamics to anticipate and how to respond
- Adaptation notes: how to adjust for stage-mixed groups; professional settings; faith communities where relevant to this module's content

---

### Section 10: Anki Cards

8+ Q&A pairs for spaced retrieval practice.

```markdown
## Anki Cards

**Q:** [Question]
**A:** [Answer — 1–3 sentences maximum]
```

**Card design principles:**
- Each card tests exactly one concept
- Mix of types: definition, application, distinction, critical reflection — not all definitions
- Questions are direct, not leading ("What are the three conditions for X?" not "Why is X so important?")
- Cards cover the full module — not just Section 1 (AQAL Mapping) or Section 2 (Frameworks). Include cards for the practice steps, the assess criteria, and the integrate activities.

---

### Section 11: Retrieval Schedule

4 intervals with specific, varied activities at each interval. Activities should escalate from recall toward application and integration.

```markdown
## Retrieval Schedule

| Interval | When | Activity |
|----------|------|----------|
| 1 | 24 hours after completing the module | [Card review: all 8+ Anki cards] |
| 2 | 3 days after completing the module | [Re-do one step from the Practice section; journal any differences from the first time] |
| 3 | 7 days | [Teach the core concept to someone else in your own words; note what you struggled to explain] |
| 4 | 14 days | [Apply one Integrate activity deliberately this week; journal what you noticed] |
```

---

### Section 12: Evidence and Citations

All empirical claims in the module body require a citation. All citations require a Tier rating. All Tier-C citations require a stated caveat.

```markdown
## Evidence and Citations

| Citation | Tier | Caveat |
|----------|------|--------|
| Author, A. A., & Author, B. B. (Year). Title of article. *Journal Name*, *vol*(iss), pp. https://doi.org/ | A | None |
| Author, C. C. (Year). *Title of book*. Publisher. | B | Book-length synthesis; individual chapters vary in evidence quality |
| Author, D. D. (Year). Theoretical framework. *Journal*. | C | Theoretical framework; empirical validation limited; cite as theoretical |
```

**Tier definitions (full detail in evidence-vetting skill):**
- **Tier A:** RCT, systematic review, or meta-analysis. High confidence.
- **Tier B:** Observational study, expert consensus, well-validated clinical framework, longitudinal developmental research. Moderate confidence.
- **Tier C:** Expert opinion, single case study, theoretical framework without empirical validation. Use with stated caveat.

Minimum: 4 Tier-A or Tier-B sources. No module should rest primarily on Tier-C sources.

---

### Section 13: Safety Note

Required on every module. Written LAST — after the full Practice section is finalised, because the Practice content determines the Tier.

**Tier 1 (minimum):**
```markdown
## Safety Note

**Tier:** 1 — Standard reflective content

This module involves reflective and cognitive practices. If any material surfaces significant distress, pause and speak with a trusted person. This content is educational, not therapeutic.
```

**Tier 2 (full protocol):**
```markdown
## Safety Note

**Tier:** 2 — [Specify: Somatic practice / Shadow work / Identity disruption risk / Relational vulnerability]

**Before you begin:** [Specific description of what this practice involves and what it may surface — not generic]

**This practice may not be the right moment if:** You are currently in acute life disruption, significant emotional overwhelm, or are actively working with a therapist on closely related material. The practice will be here when you're ready.

**Stop if you notice:** [Specific conditions — dissociation, flashback, inability to feel your body, overwhelming emotion that doesn't settle within 2–3 minutes of pausing]

**Grounding:** If you need to pause:
1. Stop the practice completely.
2. Place both feet flat on the floor. Feel the pressure of the floor against your soles.
3. Look around the room and name five things you can see, slowly.
4. Take several slow breaths at a pace that feels natural — there's no prescribed count. Breathe in a way that feels settling, not forced.
5. When you feel more settled, you may return to the practice or close it here. Both are fine.
6. If you do not feel more settled after several minutes, close the practice and reach out to a trusted person or therapist before returning.

**If distress continues:** [Specific escalation path — not just "seek help"]

**Resources:** [Region-appropriate crisis resources — see safety-classification skill for current list. Do not make categorical claims about confidentiality or authority involvement.]

**Facilitator note:** [Group-specific safety guidance — how to hold space for activation in a group setting]
```

**Note on breath instructions:** Do not prescribe specific breath counts (e.g. "4-count inhale, 6-count exhale") in the grounding protocol. Extended exhale ratios can be activating for some anxiety profiles. Use invitational language: "at a pace that feels settling" or "slow, natural breaths."

---

## Self-audit checklist

Complete before opening any PR.

**Structure:**
- [ ] Frontmatter complete (id, title, sidebar_label, description, tags)
- [ ] No `# ` heading in the markdown body (title renders from frontmatter)
- [ ] All 13 sections present in the correct order
- [ ] All section headings are `##` (H2); subsections `###` (H3)

**Content quality:**
- [ ] Gifts section: 5+ items; no hedging language; sincere-reader test passed
- [ ] Limitations section: structurally framed; no contempt; Pre/Trans note present (if applicable)
- [ ] Practice: explicit duration; numbered steps; setup stated; pacing language throughout
- [ ] Reflect: 5+ prompts; mix of individual, dialogue, somatic types
- [ ] Assess: rubric with behavioural criteria; passing threshold stated
- [ ] Integrate: 3+ activities with specific timing; behavioural not conceptual
- [ ] Facilitator Note: timing breakdown present; watch-fors listed
- [ ] Anki Cards: 8+ pairs; types mixed; covers full module not just frameworks
- [ ] Retrieval Schedule: 4 intervals; activities escalate from recall to application
- [ ] Evidence: every empirical body claim has a citation row; all citations Tier-rated; Tier-C all have caveats
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
- `references/exemplar-sections.md` — annotated sections from the two gold-standard modules with margin notes explaining what makes each element work
- `references/ei-line-protocol.md` — detailed protocol for Emotional/Interpersonal line modules