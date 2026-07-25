# Design: ROUTE-02 — Extend Find Your Path to route by line

## Architecture

Same standalone React page (`src/pages/start.js`) with no external dependencies:
- `<Layout>` wrapper from Docusaurus
- `<Link>` from `@docusaurus/Link`
- CSS modules (`start.module.css`)

No API calls, no backend, no state persistence. Entirely client-side.

## Data flow (extended)

```
User selects Stage Q1-Q4 → stageAnswers{} → Submit Phase 1
  → tally(stageAnswers) → stageResultKey (A-dominant | B-dominant | C-dominant | mixed)

User selects Line Q1-Q3 → lineAnswers{} → Submit Phase 2
  → tallyLine(lineAnswers) → lineResultKey (emotional | interpersonal | self | mixed)

  → RESULTS[stageResultKey] + LINE_RESULTS[lineResultKey]
  → Rendered as two clearly labeled sections:
      "Your Stage Path Recommendation" → { title, explanation, CTA }
      "Your Line Path Recommendation"   → { title, explanation, CTA }
  → Below results: all-paths grid with Recommended badges on both stage and line paths
```

## Two-phase flow

```
PHASE 1 (existing): 4 stage questions → "See My Stage Recommendation" button
PHASE 2 (new):      3 line questions → "See My Full Recommendation" button
RESULT:             Both recommendations displayed together
```

On reset, both phases reset.

## Change scope

### Additions

| Component | Description |
|-----------|-------------|
| LINE_QUESTIONS[] | 3 questions with options mapping to `emotional`, `interpersonal`, `self` keys |
| LINE_RESULTS{} | Result states for each line key + mixed fallback |
| tallyLine() | Classification function: 2-of-3 threshold, `mixed` fallback |
| Phase 2 UI | Question rendering between Phase 1 submission and final results |
| Combined results rendering | Two result boxes: stage + line |
| Expanded ALL_PATHS | Add Emotional Line Development and Interpersonal Line Development |

### Modifications

| Component | Change |
|-----------|--------|
| Phase 1 submit button | Label change: "See My Stage Recommendation" |
| submit/submitted state | Replace `submitted` boolean with `phase` state (`null` → `'stage'` → `'line'` → `'complete'`) |
| Result rendering | Show stage result in Phase 2, show both in final results |
| ALL_PATHS grid | Recommended badge logic: check both stage AND line recommended paths |

### Preserved (no change)

| Component | Status |
|-----------|--------|
| QUESTIONS[] | Unchanged |
| tally() | Unchanged (3-of-4 threshold for stage) |
| RESULTS{} | Unchanged |
| getRecommendedPathTitle() | Kept, extended for line |
| start.module.css | Additions only, no changes to existing rules |

## Line question design

Each question presents 3 options mapping to emotional, interpersonal, and self lines:

**Q1 (pressure):** "When I feel under pressure, I tend to:"
- `emotional`: "Feel flooded by strong feelings — I have trouble naming what I'm experiencing."
- `interpersonal`: "Pull back from people or shut down — conflict and tension feel hard to stay present with."
- `self`: "Feel unsettled at a deeper level — my sense of who I am and what I believe feels shaky."

**Q2 (difficult conversations):** "In difficult or high-stakes conversations, I most often:"
- `emotional`: "Get overwhelmed by emotion and lose the ability to think clearly."
- `interpersonal`: "Focus so much on the other person that I lose track of my own needs and boundaries."
- `self`: "Notice that something about my identity or values is being challenged — it touches deeper than the topic."

**Q3 (growth area):** "The area I feel the strongest need for growth right now is:"
- `emotional`: "Understanding and working with my feelings — I feel driven by emotions I don't fully understand."
- `interpersonal`: "Navigating relationships with more skill — I want to handle conflict and closeness better."
- `self`: "Understanding how my sense of self has developed — there are patterns I can feel but can't yet name."

### Why these 3 lines?

The homepage prominently features **Emotional Line Development** and **Interpersonal Line Development** as QuickStarts. **Self Line Development** is the third most-established line path (with a complete QuickStart and module suite). Together they cover the three most common learner entry points for line work. Somatic and Shadow paths are available as secondary links but do not have the same breadth of QuickStart guidance.

## Line routing algorithm

```js
function tallyLine(answers) {
  const counts = { emotional: 0, interpersonal: 0, self: 0 };
  for (const val of Object.values(answers)) {
    if (counts[val] !== undefined) counts[val] += 1;
  }
  const max = Math.max(...Object.values(counts));
  if (max < 2) return 'mixed'; // 2-of-3 threshold (vs. 3-of-4 for stage)
  if (counts.emotional === max) return 'emotional';
  if (counts.interpersonal === max) return 'interpersonal';
  if (counts.self === max) return 'self';
  return 'mixed';
}
```

The 2-of-3 threshold (vs. 3-of-4 for stage) is appropriate because:
- Fewer questions means a 3-of-3 requirement would almost never classify
- The line assessment is secondary guidance, not a primary routing mechanism
- "Mixed" fallback offers a reasonable default recommendation

## Line mirror paragraphs

### emotional
"Your answers suggest that emotional experiences — naming feelings, staying grounded under pressure, and working with emotional intensity — are areas where focused attention could make a meaningful difference. The Emotional Line path builds emotional vocabulary, regulation skill, and somatic awareness in a structured, stage-aware sequence."

### interpersonal
"Your answers suggest that relational skill — navigating conflict, staying present with others during tension, and balancing your own needs with another person's perspective — is an area where focused attention could be particularly valuable. The Interpersonal Line path builds perspective-taking, empathic accuracy, and relational repair skills in a structured sequence."

### self
"Your answers suggest that identity and meaning-making — how you understand who you are, what shapes your values, and why certain challenges feel so personal — is an area where deeper exploration could be especially useful. The Self Line path maps how identity develops across stages and provides practices for understanding your own meaning-making structure."

### mixed
"Your answers span multiple areas — which is completely normal. The Emotional and Interpersonal lines are strongly connected: emotional skill supports relational skill, and relationships are where emotional patterns become most visible. We suggest starting with the Emotional Line path for foundational skills, or the Interpersonal path if relationships are your primary concern right now."

## Result layout

```
┌─────────────────────────────────────────┐
│  Your Stage Path Recommendation         │
│  [title] [explanation] [CTA] [alt]     │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  Your Line Path Recommendation          │
│  [title] [explanation] [CTA] [alt]     │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  All Learning Paths (grid)              │
│  6 cards with Recommended badges        │
└─────────────────────────────────────────┘
```

## Risk assessment

| Risk | Severity | Mitigation |
|------|----------|------------|
| Line questions feel like personality labeling | Low | Use "Your answers suggest…" framing; options describe observable behaviors, not traits |
| Two-phase flow adds complexity | Low | Clear progress indicator; Phase 1 result shown during Phase 2 questions |
| Stage recommendation could contradict line recommendation | Low | They are complementary axes; the result section explains the distinction ("Stage paths address how you think; line paths address what domain to develop") |
| Mixed line result feels unsatisfying | Low | Mixed result offers a concrete default with a clear alternative — not a "no result" state |
| Build break from expansion | Low | File is `.js` (not `.mdx`); no MDX syntax in use; CSS additions are additive |

## Dependencies

- **None.** Standalone page. No component imports, no module dependencies.
- **ROUTE-01 (LSC-03)** is a dependency for the specification (stage routing must already work), not a code dependency.
