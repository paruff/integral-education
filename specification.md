# Specification: MM-01 — Magic/Purple Stage Orientation

## Problem
No module exists describing the Magic/Purple stage of development. Learners working with developmental frameworks, facilitators guiding groups through stage content, and adults recognizing unintegrated Magic-stage patterns in themselves have no educational resource for this foundational stage of human development.

## Context
Per MM-00 decision: **hybrid framing** — educational/facilitator-oriented content, not a self-guided practice module for someone at the Magic/Purple center of gravity. The module follows the Amber/Mythic Orientation structural template (Gifts before Limitations, four-framework treatment, tiered evidence, facilitator notes). It is analogous to psychoeducation: useful for a parent, coach, or facilitator, and for an adult recognizing Purple/Magic patterns in themselves.

## Requirements
1. Module file created at `docs/modules/magic-purple-stage-orientation.mdx` following the 13-section gold standard from the module-authoring skill
2. Four-framework treatment across: Spiral Dynamics (Purple), Gebser (magic structure), attachment theory (secure base / co-regulation), polyvagal-informed states — following Somatic module's precedent (Tier B for Polyvagal Theory's broad framework, explicit caveat on contested specifics)
3. Gifts section must pass the sincere-reader test including: belonging, ritual, participation with the living world, felt safety in tribe, meaning through story and repetition
4. Limitations section must be structurally framed (no contempt) covering: undifferentiated self/other boundary, magical causality, vulnerability to manipulation
5. Pre/Trans fallacy note included — distinguishing undeveloped Magic-stage worldview from mature reclaimed capacity for ritual, awe, and communal belonging
6. Introduction explicitly framed as educational/facilitator-oriented content, consistent with MM-00 hybrid decision
7. Developmental vocabulary for Magenta/Purple audience (connection/belonging/group/the-land, avoidance of individual/self-development/cognitive/rational) — used as psychoeducational framing, not as the primary learner voice (the module addresses facilitators and self-recognizing adults)
8. Evidence minimum: 6+ citations; 4+ Tier A/B
9. Safety Tier 1 — educational content about a developmental stage
10. Somatic aliveness discussed as a gift but no somatic practice instructions — somatic instruction requires Tier 2; this module stays Tier 1
11. PR opened per feature flow; merge blocked until Safety Review agent AND human reviewer sign off (per issue #410)

## Acceptance Criteria (ACs)
1. Module file `docs/modules/magic-purple-stage-orientation.mdx` exists with all 13 sections present in correct order
2. Frontmatter includes `id`, `title`, `sidebar_label`, `description`, `tags` — no `# ` heading in markdown body
3. Introduction explicitly frames as educational/facilitator content per MM-00 hybrid decision
4. AQAL Mapping table with all 5 dimensions populated
5. Four framework lenses present: Spiral Dynamics (Purple), Gebser (magic structure), attachment theory, polyvagal-informed states
6. Gifts section: 5+ items; no hedging language; passes sincere-reader test
7. Limitations section: structurally framed; no contempt language; Pre/Trans note present
8. Practice section: concrete, step-by-step; duration stated; numbered steps; stay within Tier 1 (no somatic instruction, no shadow work, no identity disruption)
9. Evidence: minimum 6 citations; minimum 4 Tier A or B; all Tier C tagged with caveat; polyvagal cited at Tier B with contested-mechanisms caveat
10. Safety Note classifed Tier 1; no therapeutic outcome claims; "educational, not therapeutic" stated
11. `npm run build` passes (Docusaurus v3 build, no warnings for this module)
12. Module registered in sidebar (if new file path not auto-resolved)D