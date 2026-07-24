# Design: RP-106 — Rational → Pluralistic Stage Progress Self-Assessment

## Architecture Overview

**Change type:** New component + new MDX page + sidebar update. No infrastructure changes.

**Files to create/modify:**
1. NEW: `src/components/RationalPluralisticAssessment.jsx` — the assessment component
2. NEW: `docs/maps/rational-pluralistic-progress-assessment.mdx` — MDX wrapper page
3. MODIFY: `sidebars.js` — add entry in Maps category

## Design Rationale

**Component pattern: AmberRationalAssessment.jsx.**
- *Rationale:* The Amber→Rational assessment establishes the pattern for stage-transition self-assessments: scenario-based questions with three response options mapped to stage positions, domain-based scoring with visual breakdown, contextualized results with developmental framing, module recommendations, Export to Journal, and Retake. This is the simplest and most proven pattern on the platform. The Rational→Pluralistic assessment follows this pattern exactly, with the addition of three sections (A/B/C) instead of one, a descriptive profile instead of a stage category, and a Green shadow awareness section.
- *Tradeoff:* The AmberRationalAssessment uses inline styles (not CSS Modules). We follow this pattern for consistency — inline styles are acceptable for assessments per existing convention. A future refactor could extract to CSS Modules.

**Scenario-based design (not trait self-report).**
- Cook-Greuter's research on self-assessment limitations is the justification: self-report on traits produces systematic distortion where Green-identified learners inflate Green capacities and Orange-identified learners dismiss them. Scenario-based questions reduce this by asking "what would you do?" rather than "how [adjective] are you?"
- Each question presents a concrete situation and three behavioral responses: one reflecting Orange-default, one transitional, one reflecting Pluralistic-default.

**Descriptive profile (not score/ranking).**
- The issue explicitly prohibits numerical scores, stage labels, and ranking. Results use developmental language: "emerging capacities," "consolidated strengths," "growing edges." This is pedagogically intentional — it frames the assessment as a mirror for self-reflection, not a measurement instrument.

**Green Shadow Awareness (Section C).**
- This section is what differentiates this assessment from a simple stage-location tool. It makes the learner aware of characteristic Green blind spots — the shadow side of the capacity being assessed. This is consistent with the platform's commitment to shadow integration across all developmental lines.

## Components

### Question Structure (All Three Sections)

Each question:
```js
{
  id: 'a1',                    // 'a1'–'a8', 'b1'–'b12', 'c1'–'c6'
  text: 'Scenario text...',    // 1–3 sentence concrete situation
  options: [
    { value: 'o', label: 'Orange-default response...' },      // reflects Orange center of gravity
    { value: 't', label: 'Transitional response...' },        // reflects movement toward Pluralistic
    { value: 'p', label: 'Pluralistic-default response...' }, // reflects Pluralistic center of gravity
  ],
  domain: 'empathy',           // Section B only: domain tag for domain breakdown
  shadowTag: 'consensus',      // Section C only: which Green shadow pattern this reveals
}
```

### Section A: Late-Orange Recognition (8 questions)

Assesses the degree to which the learner is experiencing the characteristic signals of late-Orange development:
- Disillusionment with achievement metrics
- Meaning-deficit despite success
- Recognition that individual autonomy has limits
- Awareness of systemic interconnection
- Meta-cognition about one's own worldview
- Openness to non-meritocratic perspectives
- Valuing emotional/relational dimensions

Scoring: count of 'p' responses indicates readiness for Pluralistic capacities. High 'o' count with significant 't' count may indicate transitional space.

### Section B: Pluralistic Capacities (12 questions, 5 domains)

| Domain | Questions | What's Assessed |
|--------|-----------|-----------------|
| Empathy & Multiple Perspectives | b1, b2, b3 | Capacity to recognize and value emotional experience of people with different life contexts |
| Contextual Ethics | b4, b5 | Understanding moral reasoning as context-dependent, not rule-application |
| Ecological & Systems Awareness | b6, b7 | Seeing interconnection beyond individual or organizational level |
| Inclusive Dialogue | b8, b9, b10 | Collaborative meaning-making over competitive debate |
| Relativism Recognition | b11, b12 | Understanding all perspectives are situated, resisting "all equally valid" collapse |

Scoring per domain: 'p' count = consolidated, 't' count = emerging, 'o' count = growing edge.

### Section C: Green Shadow Awareness (6 questions)

| Shadow Pattern | Question | What's Revealed |
|----------------|----------|-----------------|
| Epistemic cowardice | c1 | Avoiding truth claims to maintain inclusivity |
| Green-on-green aggression | c2 | Enforcing ideological conformity within pluralistic communities |
| Consensus compulsion | c3 | Requiring unanimous agreement before action |
| Relativism paralysis | c4 | Inability to make value judgments between competing perspectives |
| Performative empathy | c5 | Displaying empathy as identity signal |
| Spiritual bypass via oneness | c6 | Using nondual language to avoid necessary conflict |

### Results Page Design

**Section 1: Descriptive Profile**
Three lists derived from Section B domain scores:
- "Your emerging capacities" — domains where 't' responses dominate
- "Your consolidated strengths" — domains where 'p' responses dominate
- "Your current growing edges" — domains where 'o' responses dominate

**Section 2: Domain Breakdown**
Visual breakdown per domain (similar to AmberRationalAssessment domain bars):
- Orange-default / Transitional / Pluralistic proportions per domain

**Section 3: Module Recommendations**
Top 3 modules mapped to the dominant pattern:
- Orange-dominant across Section A → late-orange-disillusionment, rational-orange-orientation, cognitive-dissonance-bridge
- Transitional (mixed 't'/'p') → empathy-perspective-plurality, contextual-ethics-moral-complexity, authentic-dialogue-collaborative-meaning
- Pluralistic-dominant → pluralistic-green-orientation, relativism-limits-of-pluralism, ecological-systems-consciousness
- High Green shadow scores → relativism-limits-of-pluralism, community-belonging-collective-intelligence, pluralistic-green-orientation

**Section 4: Framing Message**
"Developmental assessments are maps, not territories. They describe tendencies in meaning-making, not fixed identities. Scores can vary significantly by domain, life context, and the time of day you take this."

**Section 5: Facilitated Support Callout (conditional)**
Triggered when Section A has ≥5 'o' responses AND Section B has ≤4 'p' responses — indicating significant Orange-centered worldview with limited Pluralistic emergence, potentially signaling burnout/crisis rather than developmental readiness.

**Section 6: Export + Retake**
- Export to Journal: clipboard copy of full results
- Retake Assessment: reset all state

### MDX Wrapper Page

```mdx
---
id: rational-pluralistic-progress-assessment
title: Rational → Pluralistic Stage Progress Self-Assessment
sidebar_label: Rational → Pluralistic Progress
description: An interactive self-assessment that uses scenario-based questions to help you identify ...
---

import RationalPluralisticAssessment from '@site/src/components/RationalPluralisticAssessment.jsx';

## Rational → Pluralistic Stage Progress Self-Assessment

[Introductory text with framing about maps vs territories, no stage labels]

<RationalPluralisticAssessment />
```

### Sidebar Entry

Add `'maps/rational-pluralistic-progress-assessment'` after `'maps/amber-rational-progress-assessment'` in the Maps category.

## Constraints

- Follow AmberRationalAssessment component pattern (inline styles, same structure)
- Docusaurus Link for module recommendations
- Clipboard API for Export to Journal
- `@site/src/components/` import alias in MDX
- `npm run build` must pass
