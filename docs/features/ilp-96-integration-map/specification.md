# Specification — Integral Life Practice Integration Map

**Issue:** #96 (GH Issue #96) | **Date:** 2026-07-24
**Component:** `docs/maps/integral-life-practice-integration.mdx`

## 1. Functional Requirements

### FR-01: Reference Page Structure
Page SHALL be formatted as an integration guide (reference document), not a Mastery Loop module. SHALL include complete Docusaurus frontmatter with id, title, sidebar_label, description, and tags.

### FR-02: "Why Parallel Practice?" Section
SHALL explain ILP's cross-domain synergy principle (3–4 paragraphs) with concrete examples of how state practice deepens shadow work and vice versa. SHALL cite Wilber, Patten, Leonard & Morelli (2008).

### FR-03: 12-Week Integration Matrix
SHALL present a table with rows = 12 weeks, columns = State Practice / Stage Work / Shadow Work / Relational/Community. Each cell SHALL specify which module or practice is recommended that week. Matrix SHALL draw from all three platform suites (State Development, Stage Development, Shadow Work).

### FR-04: Community/Cohort Recommendation
SHALL explain why self-directed parallel practice is valuable but limited. SHALL recommend forming a practice group of 3–8 people. SHALL provide a basic cohort agreement template. SHALL directly address the expert critique that developmental work requires intersubjective support. SHALL cite Kegan's holding environment concept and Mezirow's transformative learning communities.

### FR-05: "Synergies & Tensions" Section
SHALL map at least 5 specific interaction patterns between suites, e.g.:
- Causal state access can intensify shadow activation
- Amber → Rational transition can generate grief requiring shadow work container
- Shadow integration can deepen state access quality
- Stage transition destabilization can disrupt practice continuity
- Parallel practice can produce faster development but also overwhelm

### FR-06: Cross-References
SHALL cross-reference all three QuickStart paths, the three Facilitator Guides, and the ILP Practice Taxonomy. SHALL use relative MDX links.

## 2. Non-Functional Requirements

| NFR | Constraint |
|-----|-----------|
| NFR-01 | MDX format only — no React component |
| NFR-02 | All citations follow Tier A/B/C quality tiering |
| NFR-03 | Build must pass with zero errors |
| NFR-04 | Frontmatter includes: id, title, sidebar_label, description, tags |

## 3. Constraints

- Reference page, not a module — no ModuleFooter, no ModuleMeta, no mastery loop
- Sidebar entry positioned after `ilp-practice-taxonomy` as capstone resource
- Module references use relative paths (`../modules/`, `../quickstarts/`, `../maps/`)
