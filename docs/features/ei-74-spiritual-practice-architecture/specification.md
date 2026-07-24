# Specification — Spiritual Line Practice Architecture Module

**Issue:** #160 (GH Issue #74)
**Date:** 2026-07-24
**Component:** `docs/modules/spiritual-line-practice-architecture.mdx`

## 1. Functional Requirements

### FR-01: Module Page Structure
Module SHALL follow the modified Mastery Loop: **Orient → Practice (Embody) → Reflect → Assess → Integrate**. The Embody section SHALL be the most substantive, reflecting that spiritual line development requires sustained practice, not conceptual understanding.

### FR-02: Orient Section — State-to-Trait Mechanism
SHALL explain the mechanism by which states become traits and thereby advance Spiritual line development. SHALL describe the three parallel elements required for sustained practice (not one-off state access):

1. **Regular State Access** — intensive courses or daily contemplative practice that reliably opens gross, subtle, causal, and nondual states
2. **Integration Work** — therapy, journaling, relational feedback, and shadow work that processes and stabilizes what state access reveals
3. **Relational Container** — peer accountability, teacher check-ins, structured groups that notice when you slip and hold the practice structure

SHALL explain why isolation of any single element fails: state access without integration creates a void (clarity that collapses back because nothing holds it); integration without state access has nothing to integrate; practice without a container lacks the external noticing that catches regression. Three elements in parallel sustain the state-to-trait transformation.

SHALL cite contemplative neuroscience (Lutz, Dunne & Davidson, 2007) and Wilber's state-to-trait model.

### FR-03: Orient Section — Practice Tradition Mapping
SHALL map specific practice traditions to Fowler's Spiritual line stages:

| Stage | Practice Traditions |
|---|---|
| Mythic-Literal (Stage 2) | Devotional practices: prayer, ritual, liturgy, bhakti — appropriate and powerful; how these evolve or become limiting |
| Individuative-Reflective (Stage 4) | Demythologizing without nihilism: centering prayer, Zen koan work, Ramana Maharshi's self-inquiry |
| Conjunctive (Stage 5) | Paradox-tolerance and inter-traditional encounter: Lectio Divina, Sufi zikr, Vipassana, dialogue meditation |
| Post-metaphysical/Integral (Stage 6+) | All traditions approached post-critically as technologies for state access and Spiritual line development, not metaphysical commitments |

### FR-04: Encounter Section — Spiritual Practice Audit
SHALL provide a self-assessment tool where the learner maps their current practice(s) against Spiritual line stages, answering: "Is this practice appropriate for my current stage? Is it challenging my Spiritual line development or reinforcing its current structure?"

### FR-05: Embody Section — 12-Week Practice Schedule
SHALL provide a 12-week Spiritual Line Practice Schedule integrating:
- State practices (from Issues #1–4)
- Shadow practices (from Issues #22, #30)
- Tradition-specific contemplative practice
- Calibrated to three entry points based on current Spiritual line stage

### FR-06: Practice Through Stage Transitions
SHALL address what happens when a practice that supported one stage is encountered from the next — e.g., devotional prayer from Stage 3 encountered at Stage 4 (Individuative-Reflective). SHALL provide guidance for maintaining practice continuity without bypassing the transition.

### FR-07: AQAL Mapping
SHALL include an AQAL Mapping table following the standard module format with Quadrants, Levels, Lines, States, and Types dimensions.

### FR-08: Learn Section — Learning Objectives
SHALL list specific, assessable learning objectives covering the state-to-trait mechanism, practice-stage mapping, and the 12-week architecture.

### FR-09: Standard Module Sections
SHALL include: Overview, Modified Mastery Loop explanation, Reflect prompts, Assess criteria, Integrate synthesis, Retrieval Schedule, Evidence and Citations, and Safety Note.

## 2. Non-Functional Requirements

| NFR | Constraint |
|-----|-----------|
| NFR-01 | Follow cognitive-line-practice-architecture.mdx structure and section naming |
| NFR-02 | Frontmatter includes: id, title, sidebar_label, description, quadrants, level, lines, states, types, tags, difficulty, readingTime, practiceTime, prerequisites, line |
| NFR-03 | Module imports ModuleFooter and ModuleMeta components |
| NFR-04 | All citations follow Tier A/B/C quality tiering with caveats |
| NFR-05 | Build must pass with zero errors |
| NFR-06 | Safety Note follows Tier 1 classification standard |

## 3. Reference Modules and Patterns

- **Template:** `docs/modules/cognitive-line-practice-architecture.mdx` (231 lines)
- **Spiritual line modules:** spiritual-line-overview-orientation, spiritual-line-mythic-to-rational, spiritual-line-conjunctive-universalizing, spiritual-line-post-metaphysical-integral-religion, spiritual-line-shadow-integration
- **Fowler stages used:** Stage 2 (Mythic-Literal), Stage 4 (Individuative-Reflective), Stage 5 (Conjunctive), Stage 6+ (Universalizing/Post-metaphysical)

## 4. Constraints

- MDX file only (no React component)
- Module footer and meta components imported from @site alias
- Cross-references to state modules and shadow modules use relative paths
- Frontmatter prerequisites: spiritual-line-post-metaphysical-integral-religion
- Sidebar entry in existing Spiritual Line category

## 5. Key References from Issue

- State-to-trait transformation: Wilber; Lutz, Dunne & Davidson (2007)
- Practice appropriate to Spiritual line stage: Wilber, Integral Spirituality, Ch.5; Keating on centering prayer stages
- Spiritual practice through stage transitions: Fowler; Parks Daloz, Faithful Journeys (2011)
- Post-metaphysical appropriation: Wilber's Integral Spirituality
- Spiritual eclecticism vs. depth: Trungpa, Cutting Through Spiritual Materialism
