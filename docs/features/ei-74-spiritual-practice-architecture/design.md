# Design: EI-74 — Create Spiritual Line Practice Architecture Module

## Architecture Overview

**Change type:** New module page + sidebar update. No code changes, no components, no infrastructure.

**Files to create/modify:**
1. NEW: `docs/modules/spiritual-line-practice-architecture.mdx` — the full module page
2. MODIFY: `sidebars.js` — add entry in Spiritual Line category

## Design Rationale

**Template choice: cognitive-line-practice-architecture.mdx**
- *Rationale:* The cognitive-line practice architecture module establishes the pattern for all practice architecture modules on the platform: modified Mastery Loop (Orient → Practice/Embody → Reflect → Assess → Integrate), 10-week (adapted to 12-week for spiritual), three-stream practice architecture, weekly protocols, self-assessment rubric, integration summary. The Spiritual line practice architecture follows this exact structure with spiritual-line content. This ensures cross-line consistency in how developmental practice is operationalized.
- *Tradeoff:* The cognitive module uses 10 weeks; the spiritual module uses 12 weeks. This is specified in the issue (FR-05) and reflects that contemplative practice integration typically requires a longer cycle than cognitive restructuring. The extra 2 weeks accommodate tradition-specific practice onboarding.

**Key difference from cognitive module: spiritual line is state-mediated.**
- Cognitive development is accelerated by edge-of-capacity problems. Spiritual line development is accelerated by sustained contemplative state access with appropriate integration. This fundamental difference shapes every section:
  - Orient: emphasizes state-to-trait mechanism, not ZPD/scaffolding
  - Practice mapping: organized by Fowler stage and practice tradition, not problem complexity
  - Audit: maps practices to stages, not cognitive operations to task demands
  - Schedule: integrates state practices (from State suite) and shadow practices (from Shadow suite) alongside tradition-specific practice

**Three parallel elements for sustained practice.**
The module's architecture is organized around the observation that sustained spiritual practice requires three elements running in parallel — isolation of any single element leads to collapse:
1. **Regular State Access** — daily practice or intensive courses that reliably open gross, subtle, causal, and nondual states
2. **Integration Work** — therapy, journaling, relational feedback, and shadow work that processes what state access reveals
3. **Relational Container** — peer accountability, teacher check-ins, structured groups that notice regression and hold the structure

These three elements map directly to the module's three streams: Stream 1 (State Practice) = element 1; Stream 2 (Shadow Integration) = element 2; Stream 3 (Tradition Practice with its embedded communal dimension) = element 3. The Orient section explicitly names this model as the explanatory framework for why the three-stream architecture works.

**Three entry points (stage-calibrated).**
- Unlike the cognitive module which has a single entry, this module provides three calibrated starting points based on the learner's Fowler stage:
  - Entry A: Mythic-Literal → devotional practice-as-practice, beginning state access
  - Entry B: Individuative-Reflective → demythologizing without nihilism, contemplative inquiry
  - Entry C: Conjunctive+ → inter-traditional practice, post-metaphysical engagement

## Components

### Module Structure

| Section | Content | Lines (est.) |
|---------|---------|-------------|
| Frontmatter | id, title, sidebar_label, description, AQAL metadata, prerequisites | 40 |
| Position in Sequence | Context within Spiritual line suite | 5 |
| Overview | What this module does and why practice architecture matters for spiritual line | 8 |
| Modified Mastery Loop | Orient → Practice (Embody) → Reflect → Assess → Integrate explanation | 5 |
| AQAL Mapping | Quadrants, Levels, Lines, States, Types table | 10 |
| Learn | 4 learning objectives | 8 |
| Orient | State-to-trait mechanism, practice-stage mapping table, three accelerants | 40 |
| Practice → Embody | 12-week schedule with 3 streams, three entry points | 80 |
| Reflect | 4 weekly reflection prompts | 10 |
| Assess | Self-assessment rubric (4 criteria × 4 levels) | 15 |
| Integrate | Integration summary prompts | 10 |
| Retrieval Schedule | Spaced retrieval plan | 10 |
| Evidence and Citations | 5+ citations with tier and caveat | 20 |
| Safety Note | Tier 1 classification standard | 15 |
| **Total** | | **~280** |

### Frontmatter Design

```yaml
id: spiritual-line-practice-architecture
title: Spiritual Line Practice Architecture
sidebar_label: Spiritual Practice Architecture
description: A 12-week spiritual line practice architecture integrating state practices,
  shadow work, and tradition-specific contemplative practice to support stage development
  across Fowler's stages of faith.
quadrants: [I, We, It, Its]
level: Cross-stage spiritual line development
lines: [spiritual, cognitive, self, emotional]
states: [reflective, contemplative, subtle, causal, nondual]
types: [self-paced, practice-based, tradition-informed]
tags: [spiritual-line, practice-architecture, Fowler, Wilber, contemplative-practice,
  state-to-trait, AQAL]
difficulty: Advanced
readingTime: 12
practiceTime: 15
prerequisites: [spiritual-line-post-metaphysical-integral-religion]
line: spiritual
```

### Practice Tradition Mapping Table (Orient Section)

| Fowler Stage | Practice Tradition | Stage-Appropriate Use | Transition Challenge |
|---|---|---|---|
| Mythic-Literal (2) | Devotional prayer, ritual, liturgy, bhakti yoga | Cultivates devotion, surrender, community belonging | May literalize metaphor; can resist demythologization |
| Individuative-Reflective (4) | Centering prayer, Zen koan work, Ramana Maharshi self-inquiry | Supports demythologizing without nihilism; develops inquiry capacity | Risk of intellectualizing practice; disconnection from heart |
| Conjunctive (5) | Lectio Divina, Sufi zikr, Vipassana, dialogue meditation | Cultivates paradox-tolerance; inter-traditional fluency | Risk of spiritual eclecticism without depth |
| Post-metaphysical (6+) | All traditions post-critically as state technologies | Full practice range without metaphysical entrapment | Risk of subtle bypass: using "post-metaphysical" as avoidance of commitment |

### 12-Week Schedule Structure

Three parallel streams across 12 weeks, each mapping to one of the three elements required for sustained practice:

1. **Stream 1: State Practice** (maps to Element 1 — Regular State Access) — daily practice from State suite, progressing gross → subtle → causal → nondual
2. **Stream 2: Shadow Integration** (maps to Element 2 — Integration Work) — weekly shadow practice from Shadow suite (3-2-1 process, spiritual bypass detection, sacred wound inquiry)
3. **Stream 3: Tradition Practice** (maps to Element 3 — Relational Container) — weekly tradition-specific contemplative practice appropriate to stage, including the communal/teacher dimension that notices regression

| Week | Stream 1 (State) | Stream 2 (Shadow) | Stream 3 (Tradition) |
|---|---|---|---|
| 1–2 | Gross state awareness, body scan | Projection spotting (foundation) | Stage-appropriate tradition practice onboarding |
| 3–4 | Subtle state access, visualization | 3-2-1 process applied to spiritual figures | Deepen tradition practice + journal |
| 5–6 | Causal/witness state, open awareness | Spiritual bypass detection inventory | Cross-tradition encounter (single session) |
| 7–8 | Nondual glimpses, choiceless awareness | Sacred wound inquiry | Integrate cross-tradition insight into primary practice |
| 9–10 | State cycling: gross → subtle → causal → nondual | Positive projection reclamation (golden shadow) | Practice adaptation for stage transition |
| 11–12 | Integration: stabilized state access | Integration: shadow reclaimed as developmental fuel | Synthesis: personal practice architecture design |

### Spiritual Practice Audit (Encounter Section)

Three-question self-assessment:
1. "What practices am I currently doing? List each and note: tradition, frequency, duration, primary state cultivated."
2. "Map each practice to Fowler's stages: Is this practice appropriate for my current stage? Is it challenging my Spiritual line development or reinforcing its current structure?"
3. "Identify one practice that served a previous stage well but may now be limiting. What would a next-stage version of this practice look like?"

### Sidebar Entry

Add `'modules/spiritual-line-practice-architecture'` after `'modules/spiritual-line-shadow-integration'` in the Spiritual Line category in `sidebars.js`.

## Constraints

- MDX format only — no React component
- Import ModuleFooter and ModuleMeta from @site alias
- Cross-reference state modules (gross-state-awareness, subtle-state-access, causal-witness-state, nondual-awareness-orientation) and shadow modules (shadow-work-foundation, shadow-321-process, shadow-spiritual-bypassing) with relative paths
- Frontmatter prerequisites: spiritual-line-post-metaphysical-integral-religion
- Follow cognitive-line-practice-architecture.mdx section structure and naming conventions
- All citations follow Tier A/B/C quality tiering with caveats
- Safety Note uses Tier 1 classification standard
- `npm run build` must pass
