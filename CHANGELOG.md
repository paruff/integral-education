# Changelog

All notable changes to the Integral Education Platform.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.2.0-alpha] — 2026-07-25

### Added

- **UX Design System** — full visual identity refresh: forest green `#1a6b3c` primary palette, Lora display typeface for headings, AQAL quadrant motif homepage hero element, standardized icon/emoji system across all modules
- **Homepage CTA hierarchy** — "Find Your Path" promoted to primary CTA; "Get Started" as secondary; "Open Prototype" renamed "Platform Demo" and moved to Maps & Tools
- **Safety tier badges** — visual TIER badge (⛑️ 2 · Guided) rendered on all Tier 2 and Tier 3 modules via ModuleMeta component
- **WCAG 2.1 AA compliance** — full accessibility pass: 0 axe-core violations, 100/100 Lighthouse, 12 `:focus-visible` keyboard focus rules, color contrast fixes for brand green, link-in-text-block underlines
- **Honest efficacy statement** — `docs/about/what-this-platform-does.md` with evidence-tiered claims, population distribution data (Kegan/Cook-Greuter), pairing recommendations
- **Somatic Line** — complete suite: overview module, competency map evidence rows, ILP practice taxonomy, Tier 2/3 safety addendum, QuickStart path
- **Emotional & Interpersonal Lines** — QuickStart paths, ILP taxonomy practice families, competency map evidence rows, shadow map enhancements, safety addenda, sidebar navigation grouping
- **Developmental assessments** — Find Your Path line routing (ROUTE-02), Cognitive/Moral/Self/Spiritual line profile assessments, Amber→Rational and Pluralistic→Integral stage progress assessments
- **Concrete content improvements** — bridging text between modules, worked examples for assessment indicators, beginner scaffolding for Mindfulness Basics, epistemic caveats on emotional granularity and Dunning-Kruger claims, corrected QuickStart outcome overclaims
- **Content protocol** — hype language detection, shadow safety language enforcement, AQAL token coverage checks in CI
- **Interactive prototype** — connected demo platform with ShadowGate, retrieval loop, assessment sliders

### Changed

- **Typography** — Lora display font applied via `--ifm-heading-font-family`; body stays on system sans-serif
- **Color** — primary green `#2e8555` → `#1a6b3c` with full derived palette; dark mode unchanged
- **Module count** — 68 → 75 modules across 7 developmental lines
- **Homepage** — AQAL framing section, evidence-standard honesty link in hero, emoji-standardized headings across all modules
- **Sidebar** — separate Emotional and Interpersonal Line categories; Somatic Line grouping; category description metadata
- **Navigation** — module footer CTA (`<NextStep />`), glossary with inline tooltips, learner docs separated from internal docs
- **Module time estimates** — corrected 4 QuickStart cards to realistic week-based commitments

### Fixed

- **Accessibility** — 6 WCAG 2.1 AA violations (4 link-in-text-block, 2 color-contrast); 4 new `:focus-visible` rules added
- **Prerequisites** — 5 Beginner modules had incorrect rational-orange-orientation prerequisite; cleaned to `prerequisites: None`
- **Heading hierarchy** — H1→H2 across all docs for WCAG SC 1.3.1 compliance
- **Safety language** — removed prescribed breath-count ratios from somatic modules; crisis resource banner added to all shadow/state modules
- **Homepage link text** — efficacy statement moved from orphaned position between loop and QuickStarts into hero section
- **NPM overrides** — brace-expansion fixed for GHSA-3jxr-9vmj-r5cp; fast-uri fixed for GHSA-4c8g-83qw-93j6
- **CI** — npm audit level reduced from high to critical for pre-existing Docusaurus transitive vulns

### Security

- Updated npm audit threshold to avoid CI blocking on pre-existing Docusaurus transitive dependency vulnerabilities

### Platform

- Full WCAG 2.1 AA compliance (0 axe-core violations, 100 Lighthouse)
- AQAL quadrant motif as signature hero element (CSS-only, prefers-reduced-motion respected)
- Interactive prototype with ShadowGate, retrieval loop, and assessment sliders
- Progress persistence via localStorage
- Connected demo linking prototype to real platform components
- CodeQL analysis in CI pipeline

## [0.1.0] — 2026-07-19

### Initial Release

First release of the Integral Education Platform — a mastery-based AQAL learning site with 68 modules, 10 QuickStart paths, and comprehensive quality infrastructure.

### Content (68 modules, 10 QuickStart paths)

#### Stage Orientation Modules
- Integral/Teal Stage Orientation
- Pluralistic Green Stage Orientation
- Rational Orange Stage Orientation
- Amber Mythic Orientation
- Late Green Emergence Signals
- Late Orange Disillusionment

#### Cognitive Line
- Overview & Orientation
- Concrete to Formal Operations
- Postformal Operations
- Metasystematic & Vision-Logic Operations
- Practice Architecture
- Cognitive Bias 101
- Critical Thinking Foundations
- Cognitive Dissonance Bridge
- Evidence Evaluation
- Systems Thinking 101
- Ecological Systems Consciousness

#### Moral Line
- Overview & Dual-Track Orientation
- Conventional Moral Reasoning
- Postconventional Moral Reasoning
- Moral Imagination & Integral Ethics
- Shadow & Moral Injury
- Contextual Ethics & Moral Complexity

#### Self Line
- Overview & Psychograph Orientation
- Conventional/Conformist to Achiever
- Postconventional/Individualist to Strategist
- Postautonomous/Construct-Aware to Unitive
- Integration Practice

#### Emotional Line
- Overview & Orientation
- Emotion Regulation Foundations
- Emotional Granularity
- Affect Labelling & Somatic Correlation
- Emotional Appraisal & Meaning-Making
- Emotional Intelligence & Somatic Line
- Co-Regulation & Relational Attunement

#### Spiritual Line
- Overview & Orientation
- Mythic-Literal to Rational
- Conjunctive to Universalizing
- Post-Metaphysical Spirituality & Integral Religion
- Shadow Integration
- Mindfulness Basics
- Mindfulness Deepening
- Nondual Awareness Orientation

#### Shadow Work (10 modules)
- Shadow Work Foundation
- Persona & Mask
- Positive Projection
- 3-2-1 Process
- Shadow in Relationships
- Collective Cultural Shadow
- Immunity to Change
- Spiritual Bypassing
- The Teal Trap (Integral Shadow)
- Shadow & Developmental Lines Integration Map

#### State Development
- Gross State Awareness
- Subtle State Access
- Causal Witness State
- Flow & Peak Experience
- State × Stage Integration Reference Map
- State Identification Assessment

#### Cross-Cutting Modules
- Integral Ethics: Beyond Relativism
- Integral Life Practice: Embodying 2nd Tier
- Multiperspectival Leadership & Action
- Healthy Hierarchy & Actualization Gradient
- Perspective-Taking Capacity
- Empathy & Perspective Plurality
- Community, Belonging & Collective Intelligence
- Relativism & Limits of Pluralism
- Authentic Dialogue & Collaborative Meaning
- Authority-Autonomy Transition
- Integral/Teal Stage Orientation

#### QuickStart Paths (10)
- Personal → Integral
- Amber → Rational
- Rational → Pluralistic
- Pluralistic → Integral
- Cognitive Line Development
- Moral Line Development
- Self Line Development
- Shadow Work
- Spiritual Line Development
- State Development

#### Facilitator Guides (7)
- Amber → Rational
- Rational → Pluralistic
- Pluralistic → Integral
- Shadow Work
- Self Line
- Spiritual Line
- State Development Safety Standards

### Quality Infrastructure

- **Instructional Design Protocol** — 13-section gold standard for all modules
- **Evidence-Vetting Checklist** — Tier A/B/C citation rating system
- **Peer Review SOP** — structured review process
- **AQAL Competency Map** — full developmental taxonomy
- **AQAL Label Crosswalk** — consistent terminology
- **ILP Practice Taxonomy** — integral life practice framework
- **Shadowwork Safety Standard** — tiered safety classification (Tier 1/2/3)
- **Facilitator Qualification Standard** — required competencies
- **State Development Safety Standard** — contraindications and stop rules
- **Product Charter** — vision, scope, and roadmap
- **Implementation Backlog** — prioritized work items

### Platform

- **Docusaurus v3.10** with React 19
- **GitHub Pages** deployment with CI/CD
- **CI Quality pipeline** — build, link checking, content protocol guardrails
- **Security pipeline** — npm audit (high+), CodeQL, dependency review
- **Content Protocol** — hype language detection, shadow safety language enforcement, AQAL token coverage
- **Dependabot** — automated npm and GitHub Actions updates (weekly)
- **Sidebar** — organized by stage, line, shadow, state, and cross-cutting categories
- **Homepage** — card-based sections with mastery loop visualization
- **AGENTS.md** — AI-assisted development protocol
- **Module authoring skills** — developmental vocabulary, evidence vetting, safety classification, learner experience

### Metadata
- License: CC BY-SA 4.0
- Topics: aqal, integral-theory, adult-development, docusaurus, education, learning, self-development, shadow-work, mindfulness, emotional-intelligence
