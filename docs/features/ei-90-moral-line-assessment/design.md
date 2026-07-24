# Design: EI-90 — Build Moral Line Developmental Profile Assessment

## Architecture Overview

**Change type:** New components + config updates. No API calls, no infrastructure, no external dependencies beyond React.

**Files to create/modify:**
1. NEW: `src/components/MoralLineAssessment.jsx` — the assessment component
2. NEW: `src/components/MoralLineAssessment.module.css` — CSS Module styles
3. NEW: `docs/maps/moral-line-developmental-profile.mdx` — MDX wrapper page
4. MODIFY: `sidebars.js` — add sidebar entry in Maps category

## Design Rationale

**Component pattern: CognitiveLineAssessment.jsx.**
- *Rationale:* The cognitive-line assessment component establishes the pattern for all developmental profile assessments on the platform: three-section structure, React `useState` for all state, scoring computed in pure functions, results rendered conditionally on `submitted` flag, export via Clipboard API with `useCallback`, reset button clearing all state, and a privacy note. The Moral line assessment has identical UX requirements (sequential sections → submit → results → export/reset) with different content. Following this pattern ensures visual and interaction consistency across the platform.
- *Tradeoff:* The cognitive-line assessment uses open-ended text responses in Section B and C, whereas the moral-line assessment uses rating-only inputs (no free text). This simplifies the component — no textarea state to manage, no self-evaluation rubrics. The moral-line component is a subset of the CognitiveLineAssessment interaction model, not an expansion of it.

**DIT scoring methodology: schema proportions.**
- Per Rest's three-schema model: PI (Personal Interest), MN (Maintaining Norms), PC (Postconventional).
- Each consideration in Section A carries a hidden schema tag. When the learner rates it 1–5, we track which schema received higher ratings.
- The scoring algorithm: for each dilemma, compute proportion of PC-rated items vs. total. Aggregate across all 3 dilemmas to produce schema profile (PI%, MN%, PC%). Dominant schema = highest proportion; ties break PC > MN > PI.
- This is programmatically simpler than Kohlberg's stage-scoring interviews. It's a well-validated approach (Rest et al., 50,000+ participants).

**Dual-track framing (Justice + Care).**
- Kohlberg's original model is justice-only. Gilligan's critique is that moral reasoning also operates on a care/relationship track. The dual-track framing at assessment opening establishes that both are equally valid. This is not optional — it's a core architectural commitment that appears in the opening message, in the section structure (A = justice, B = care), and in the results display.

## Components

### MoralLineAssessment.jsx — State Design

| State Variable | Type | Purpose |
|---|---|---|
| `sectionAAnswers` | `{ [dilemmaId]: { action, ratings: { [considerationId]: number } } }` | Justice-track dilemma responses per dilemma |
| `sectionBAnswers` | `{ [dilemmaId]: { ratings: { [considerationId]: number } } }` | Care-track dilemma ratings |
| `sectionCAnswers` | `{ [questionId]: number }` | Moral courage gap Likert responses |
| `submitted` | `boolean` | Toggles between form view and results view |
| `copied` | `boolean` | UI feedback for Export to Journal |

All state is React `useState` — no localStorage, no cookies, no transmission.

### MoralLineAssessment.jsx — Data Constants

Three static data arrays defined at module top-level (not in component):

**`SECTION_A_DILEMMAS`** — Array of 3 objects:
```js
{
  id: 'd1',                    // 'd1', 'd2', 'd3'
  title: 'Heinz Dilemma',      // plain-language title shown to learner
  scenario: '...',             // 2-4 sentence dilemma description
  actionQuestion: 'Should Heinz steal the drug?',
  considerations: [            // 8 items per dilemma
    {
      id: 'd1-c1',
      text: '...',             // plain-language statement (schema hidden)
      schema: 'PI',            // 'PI' | 'MN' | 'PC' — NOT shown to learner
    },
    // ... 7 more
  ],
}
```

**`SECTION_B_DILEMMAS`** — Array of 2 objects:
```js
{
  id: 'c1',                    // 'c1', 'c2'
  title: 'Family Obligation vs. Self-Care',
  scenario: '...',
  considerations: [            // 6 items per dilemma, care-oriented
    { id: 'c1-r1', text: '...' },
    // ... 5 more
  ],
}
```

**`SECTION_C_QUESTIONS`** — Array of 5 objects:
```js
{
  id: 'g1',
  text: 'I often know what the right thing to do is, but find it difficult to actually do it.',
}
```

**`MODULE_RECOMMENDATIONS`** — object keyed by dominant schema:
```js
{
  PI: {
    label: 'Personal Interest (Conventional)',
    description: '...',
    modules: [
      { title: 'Moral Line Overview (Dual Track)', to: '/docs/modules/moral-line-overview-dual-track' },
      { title: 'Conventional Moral Reasoning', to: '/docs/modules/moral-line-conventional-reasoning' },
      // ...
    ],
  },
  MN: { /* ... */ },
  PC: { /* ... */ },
  'PC_CARE': { /* integration profile */ },
}
```

### Scoring Functions (Pure)

**`computeSchemaProfile(sectionAAnswers)`**
- For each dilemma with responses: count ratings ≥ 4 per schema tag (PI, MN, PC)
- Compute proportions: PI_pct = PI_count / total_ratings, etc.
- Find dominant: highest proportion, tie-breaking PC > MN > PI
- Returns `{ piPct, mnPct, pcPct, dominant, totalDilemmas, completedDilemmas }`

**`computeCareScore(sectionBAnswers)`**
- For each dilemma with responses: count ratings ≥ 4 across all considerations
- Care score = proportion of high-importance ratings
- Returns `{ score, totalConsiderations, completedDilemmas }`

**`computeCourageGap(sectionCAnswers)`**
- Average Likert score across answered questions (1–5 scale)
- Interpretation bands: 1.0–2.4 = low gap, 2.5–3.4 = moderate gap, 3.5–5.0 = significant gap
- Returns `{ average, band, answeredQuestions, totalQuestions }`

### Component Rendering — Two Views

**View 1: Assessment Form** (`submitted === false`)
- Opening section with dual-track framing message (FR-07)
- Section A: 3 dilemmas, each with binary action choice + 8 consideration ratings (Likert 1–5)
- Section B: 2 dilemmas, each with 6 consideration ratings (Likert 1–5)
- Section C: 5 Likert questions (1–5)
- Submit button with partial-submission hint
- Privacy note

**View 2: Results** (`submitted === true`)
- Schema profile bar chart (PI%, MN%, PC%) — reuses MHC bar pattern from CognitiveLineAssessment
- Care track orientation score
- Moral courage gap with interpretation band
- Module recommendations (top 3 based on dominant schema)
- DIT methodology disclaimer
- Export to Journal button (Clipboard API) + Take Assessment Again button

### Export Text Format

```
═══ Moral Line Developmental Profile ═══

── Moral Reasoning Schema Profile ──
Personal Interest (Stages 2/3):   XX%
Maintaining Norms (Stage 4):     XX%
Postconventional (Stages 5/6):   XX%
Dominant schema: [label]

── Care Track Orientation ──
Care orientation score: X.X / 5.0

── Moral Courage Gap ──
Perceived gap: X.X / 5.0 (low/moderate/significant)

── Recommended Modules ──
  • Module Title
  • Module Title
  • Module Title

── IMPORTANT ──
This assessment adapts the Defining Issues Test (DIT) methodology
(Rest, 1979; Rest et al., 1999) for self-guided developmental exploration.
...
```

### MoralLineAssessment.module.css

Follows the CSS Module pattern established by CognitiveLineAssessment.module.css:
- Docusaurus theme variables (`--ifm-color-primary`, `--ifm-color-emphasis-*`)
- CSS Modules import (`import styles from './MoralLineAssessment.module.css'`)
- Responsive breakpoint at `max-width: 600px`
- Same class naming conventions: `.assessment`, `.results`, `.section`, `.sectionTitle`, `.questionCard`, `.options`, `.optionLabel`, `.radio`, `.submitArea`, `.submitButton`, `.resultSection`, `.resultActions`, `.exportButton`, `.resetButton`, `.disclaimer`
- Additional moral-line-specific classes: `.schemaBars` (same layout as `.mhcBars`), `.courageGap`, `.careScore`, `.framingMessage`

### MDX Wrapper Page (`docs/maps/moral-line-developmental-profile.mdx`)

Follows the pattern from `docs/maps/cognitive-line-developmental-profile.mdx`:

```mdx
---
id: moral-line-developmental-profile
title: Moral Line Developmental Profile
sidebar_label: Moral Line Profile
description: An interactive assessment that presents moral dilemmas across justice and care tracks to reveal your moral reasoning patterns — from conventional through postconventional — and the gap between your moral convictions and moral action.
---

import MoralLineAssessment from '@site/src/components/MoralLineAssessment.jsx';

## Moral Line Developmental Profile Assessment

[Introductory text explaining the assessment structure, DIT methodology, dual-track framing]

<MoralLineAssessment />
```

- No `# H1` heading in body (Docusaurus renders title as H1 from frontmatter)
- Component imported via `@site` alias

### Sidebar Entry

Add `'maps/moral-line-developmental-profile'` to the Maps category items array in `sidebars.js`. Placement: after `'maps/shadow-developmental-lines-map'` (last entry currently), or alphabetical if convention requires. Following the existing pattern of `'maps/cognitive-line-developmental-profile'`, place adjacent to the cognitive-line entry.

## Module Recommendation Mapping

| Dominant Schema | Recommended Modules (top 3) |
|---|---|
| PI (Personal Interest) | moral-line-overview-dual-track, moral-line-conventional-reasoning, moral-line-shadow-moral-injury |
| MN (Maintaining Norms) | moral-line-overview-dual-track, moral-line-conventional-reasoning, moral-line-postconventional-reasoning |
| PC (Postconventional) | moral-line-postconventional-reasoning, moral-line-imagination-integral-ethics, moral-line-overview-dual-track |
| PC + high care (integration) | moral-line-imagination-integral-ethics, moral-line-postconventional-reasoning, moral-line-shadow-moral-injury |

## Constraints

- React `useState` only — no persistent storage (FR-08)
- CSS Modules (not inline styles, not global CSS) per NFR-01
- Mobile-responsive at `max-width: 600px` per NFR-02
- All inputs labeled, radio buttons keyboard-accessible per NFR-03
- No stage labels visible to learner — all consideration text is plain-language per NFR-04
- `@site/src/components/` import alias
- Docusaurus `Link` component for module recommendations
- `useCallback` for export handler (Clipboard API with fallback)
- `npm run build` must pass with zero errors (NFR-05, ac-t08-01)
- Single-page assessment (not wizard) per NFR-06
- Partial submission supported — profile computed from available data (FR-09)
- Opening must display dual-track framing message before any dilemmas (FR-07)
- DIT methodology disclaimer on results page (FR-06e)
