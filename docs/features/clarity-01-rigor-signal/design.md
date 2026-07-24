# CLARITY-01: Design

## Impacted Components
- **File:** `src/pages/index.js`
- **Component:** `HomepageHeader` — hero section
- **Scope:** Add one `<p>` element after line 16 (closing `</p>` of hero subtext)

## Technical Approach
1. Insert a new `<p>` element with class `hero__rigor-signal` after the existing subtext paragraph
2. Sentence text: "Built on peer-reviewed developmental psychology — Kegan, Cook-Greuter, Kohlberg — with every claim tiered by evidence quality, not just integral theory retold."
3. Add minimal CSS in `src/pages/index.module.css` for the new paragraph (font-size, opacity/margin to visually distinguish from subtext)
4. No JavaScript changes, no new dependencies, no restructuring

## Constraints
- Must remain a single `<p>` sibling to the existing hero__subtitle
- Must not break existing layout
- Must render correctly on mobile (within the container)

## Risks
- Low: Sentence could push CTA buttons below fold on short viewports — mitigate with reasonable font-size
- Low: Tone could read as defensive — mitigate by keeping sentence descriptive, not comparative