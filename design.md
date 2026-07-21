# Design: LSC-03 — Convert "Find Your Path" to deliver confirmed, personalized recommendation

## Architecture

The assessment is a standalone React page (`src/pages/start.js`) with no external dependencies:
- `<Layout>` wrapper from Docusaurus
- `<Link>` from `@docusaurus/Link`
- CSS modules (`start.module.css`)

No API calls, no backend, no state persistence. Entirely client-side.

## Data flow

```
User selects Q1-Q4 → answers{} → Submit → tally(answers)
  → counts{a:, b:, c:} → max ≥ 3? → A/B/C-dominant
                              → max < 3? → mixed
  → RESULTS[key] → { title, explanation, recommended, alt, altLink }
  → Rendered in <div role="region" aria-label="Your recommended path">
  → Below result: all-paths grid with recommended badge
```

## Change scope — minimal

Only the `explanation` field in each `RESULTS{}` entry needs to change. Everything else is verified correct and stays:

| Component | Status | Change |
|-----------|--------|--------|
| QUESTIONS[] | Verified working | No change |
| ALL_PATHS[] | Verified mapping | No change |
| tally() | Verified: 3-of-4 threshold, mixed fallback | No change |
| RESULT.title | Path name (e.g. "Clear Thinking Path") | No change |
| RESULT.recommended | Link to QuickStart | No change |
| RESULT.alt | Alternate path text | No change |
| RESULT.altLink | Alternate path link | No change |
| **RESULT.explanation** | **Path-descriptive paragraph → mirror paragraph** | **Replace** |
| JSX rendering | Verified correct | No change |
| CSS (start.module.css) | Verified working | No change |

## Mirror paragraph design

Each result gets a 2–3 sentence paragraph that:
1. Reflects the learner's specific answer pattern back (e.g., "Your answers suggest you tend to…")
2. Uses the developmental-vocabulary skill's Amber/Rational/Pluralistic voice (the assessment targets learners ranging across these stages)
3. Names no stages, labels, or AQAL terms
4. Connects the pattern to why that specific path is a good fit (not a generic description of the path)

### Mirror templates

**A-dominant** (→ Amber-to-Rational / Clear Thinking Path):
"Your answers suggest you tend to rely on established sources, trusted guidance, and clear rules. These are real strengths — and there are also times when evidence-based reasoning opens doors that rules alone can't. The Clear Thinking Path is designed to build that second skill without asking you to abandon the first."

**B-dominant** (→ Rational-to-Pluralistic / Multiple Perspectives Path):
"Your answers suggest you're comfortable weighing evidence, reasoning things through, and forming your own conclusions. That analytical skill is a powerful foundation. The Multiple Perspectives Path builds on it by helping you hold and integrate viewpoints very different from your own — which is where the hardest decisions usually live."

**C-dominant** (→ Pluralistic-to-Integral / Integrating Perspectives Path):
"Your answers suggest you naturally see situations from multiple angles and value diverse viewpoints. That perspective-taking capacity is a genuine strength. The Integrating Perspectives Path helps you weave all those views together into something coherent and actionable — the jump from seeing many truths to working with all of them at once."

**mixed** (→ Personal-to-Integral):
"Your answers span a range of approaches — which is completely normal; different situations genuinely call for different ways of thinking. You're likely someone who moves flexibly between evidence, values, and perspectives depending on what the moment demands. The Personal to Integral Path is a broad foundation designed to meet you where you are and gradually introduce more integrative skills across all of those modes."

## Risk assessment

| Risk | Severity | Mitigation |
|------|----------|------------|
| Mirror text sounds like a personality label | Low | Use "Your answers suggest you tend to…" framing — always about response pattern, not identity |
| Build break from MDX-in-JSX | Low | file is `.js` (not `.mdx`); no MDX syntax in use |
| Regression on existing routing | None | No code changed except string literals in RESULTS.explanation |

## Dependencies

- **None.** Standalone page. No component imports, no module dependencies.