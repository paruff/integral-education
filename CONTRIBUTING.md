# Contributing to Integral Education Platform

> **Last updated:** 2026-07-25

Thank you for your interest in contributing. This repository is an educational content platform, and contributions must meet our safety, quality, and evidence standards.

## Code of Conduct

All contributors must:

- **Respect developmental diversity:** Content must not imply that any developmental stage is inherently superior or inferior. Avoid contemptuous language about earlier stages and superiority claims about later stages.
- **Prioritise safety:** All module content must pass safety classification. Tier 2 content (somatic practice, shadow work, identity disruption risk) requires clinician review before merging.
- **Cite responsibly:** Every empirical claim requires a cited source with evidence tier rating. No fabricated citations.
- **Be specific:** Use precise language. Avoid hype, therapeutic claims, and unsupported efficacy statements.

## How to Contribute

### Types of Contribution

1. **Module content** — new learning modules, QuickStart paths, or maps (see [Instructional Design Protocol](docs/quality/instructional-design-protocol.md))
2. **Platform improvements** — Docusaurus configuration, React components, search, accessibility
3. **Safety reviews** — clinician review of Tier 2 module content
4. **Bug fixes** — broken links, build errors, accessibility violations

### Process

1. **File an issue** — Describe what you want to contribute. Tag with the appropriate label (`module`, `platform`, `safety`, `bug`).
2. **Wait for triage** — A maintainer will confirm the contribution is in scope before you begin work.
3. **Create a branch** — Branch from `main`. Use a descriptive name: `fix/broken-link-xyz` or `feat/amber-shadow-module`.
4. **Develop** — Follow the standards below. Run `npm run build` before committing.
5. **Open a pull request** — Reference the issue number. Include a summary of changes and any caveats.
6. **Pass CI** — All workflows must pass (quality, content protocol, security).
7. **Human review** — At least one maintainer must review and approve. Tier 2 content additionally requires clinician sign-off.

## Standards

### Module Content Standards

All modules must follow the [13-Section Gold Standard](docs/quality/instructional-design-protocol.md):

1. AQAL Mapping
2. Theoretical Frameworks
3. Gifts
4. Limitations / Shadows
5. Practice
6. Reflect
7. Assess
8. Integrate
9. Facilitator Note
10. Anki Cards
11. Retrieval Schedule
12. Evidence and Citations
13. Safety Note

### Evidence Standards

- **Tier A:** Required for empirical effectiveness claims. RCT, systematic review, meta-analysis.
- **Tier B:** Acceptable for supporting claims. Observational study, expert consensus, validated clinical framework.
- **Tier C:** Permitted as theoretical framing only. Must include stated caveat.
- Citations must follow APA format. Links to DOI or PubMed preferred.

### Accessibility Standards

- WCAG 2.1 AA minimum
- No `#` heading in markdown body (derived from frontmatter `title:`)
- All images require `alt` text
- Colour contrast ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text
- All interactive elements must have visible focus indicators

### Safety Classification

- **Tier 1:** Cognitive/reflective content. No special restrictions.
- **Tier 2:** Somatic practice, shadow work, identity disruption risk, relational vulnerability. Requires clinician review. Must include complete Safety Note protocol (stop rules, grounding, escalation).
- **Tier 3:** (Not implemented) Therapeutic or clinical intervention. Requires licensed practitioner oversight.

## Pull Request Checklist

Before opening a PR:

- [ ] `npm run build` passes with zero errors
- [ ] All new modules follow the 13-section gold standard
- [ ] All empirical claims have cited sources with tier ratings
- [ ] Safety tier is correctly classified
- [ ] Tier 2 content has clinician review confirmation
- [ ] No AQAL jargon in learner-facing copy (unless for Integral audience)
- [ ] No hype language or therapeutic claims
- [ ] Commits are atomic with descriptive messages
- [ ] Branch is up to date with `main`

## Getting Help

- File an issue for process questions
- See the [Product Charter](internal/implementation/product-charter) for project scope
- See [AQAL Competency Map](docs/maps/aqal-competency-map.md) for module placement
- See [Evidence Vetting Checklist](docs/quality/evidence-vetting-checklist.md) for citation guidance
