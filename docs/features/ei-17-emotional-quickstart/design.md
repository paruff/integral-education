# Design: EI-17 — Create QuickStart: Emotional Line Development path

## Architecture Overview

**Change type:** New file + two config updates. No code changes, no components, no infrastructure.

**Files to create/modify:**
1. NEW: `docs/quickstarts/emotional-line-development.md` — the QuickStart content
2. MODIFY: `src/pages/index.js` — add homepage QuickStart card
3. MODIFY: `sidebars.js` — add sidebar entry

## Design Rationale

**Template choice: somatic-line-development.md pattern.** 
- *Rationale:* The somatic-line-development.md QuickStart uses a clean 4-step structure with clear per-step goals, transition signals, and outcomes. It matches the issue's requested format (plain markdown, no MDX components). The self-line-development.mdx pattern is more complex (learn/practice/reflect/assess sections, AQAL mapping table) and better suited for stage-transition QuickStarts. The Emotional line QuickStart is a line-development path, not a stage-transition path.
- *Tradeoff:* Simpler structure means less AQAL explicitness. Acceptable — the Emotional Line Overview module (Step 1) introduces the full AQAL mapping.

**Three audience profiles:**
- Profile (a) — "wants richer emotional vocabulary" → starts at Step 2 (Emotional Granularity)
- Profile (b) — "understands emotions but can't regulate under stress" → starts at Step 3 (Regulation Foundations)
- Profile (c) — "regulates individually but struggles relationally" → starts at Step 5 (Co-regulation)

Profiles (b) and (c) skip the overview intentionally — these learners already have emotional vocabulary. They can read the overview at any time for theoretical grounding.

## Components

### QuickStart File Structure

| Section | Content |
|---------|---------|
| Frontmatter | id, title, description, sidebar_label, sidebar_position |
| Header | Goal, time commitment, why-this-sequence explanation |
| Readiness Check | Three audience profiles with routing |
| Step 1 | Module: Emotional Line Overview & Orientation |
| Step 2 | Module: Emotional Granularity |
| Step 3 | Module: Emotion Regulation Foundations |
| Step 4 | Module: Affect Labelling & Somatic Correlation |
| Step 5 | Module: Emotional Intelligence & Somatic Line |
| Step 6 | Module: Emotional Appraisal & Meaning-Making |
| Step 7 | Module: Emotional–Interpersonal Integration |
| Outcomes | What learners will have developed |
| Next Steps | Links to related QuickStarts and resources |

### Module Sequence and Time Estimates

| Step | Module | Reading | Practice | Total |
|------|--------|---------|----------|-------|
| 1 | Emotional Line Overview & Orientation | 8 min | 12 min | 20 min |
| 2 | Emotional Granularity | 10 min | 12 min | 22 min |
| 3 | Emotion Regulation Foundations | 10 min | 12 min | 22 min |
| 4 | Affect Labelling & Somatic Correlation | 10 min | 10 min | 20 min |
| 5 | Emotional Intelligence & Somatic Line | 10 min | 12 min | 22 min |
| 6 | Emotional Appraisal & Meaning-Making | 10 min | 10 min | 20 min |
| 7 | Emotional–Interpersonal Integration | 14 min | 25 min | 39 min |
| **Cumulative** | | **72 min** | **93 min** | **165 min (~2.75 h)** |

### Homepage Card

Placement: After existing cards in QuickStarts section. Format matches existing cards (h3 title, p description, p meta time, Link CTA). Card meta: "Estimated time: 2.75 h" (but show as "20–40 min per module" since it's self-paced).

### Sidebar Entry

Placement: After `'quickstarts/somatic-line-development'` in the QuickStarts category array (sidebar_position 12).

## Constraints

- No MDX imports — plain markdown
- Module links use relative paths (`../modules/`)
- File IDs must match exactly: emotional-line-overview-orientation, emotional-granularity, emotion-regulation-foundations, affect-labelling-somatic-correlation, emotional-intelligence-somatic-line, emotional-appraisal-meaning-making, emotional-interpersonal-integration
- sidebar_position 12 (after somatic-line-development at 11)
- `npm run build` must pass