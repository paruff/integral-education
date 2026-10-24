# Contributing to Integral Education Platform

> **Last updated:** 2026-10-24

Thank you for your interest in contributing. This repository is an educational content platform, and contributions must meet our safety, quality, and evidence standards.

## Code of Conduct

All contributors must:

- **Respect developmental diversity:** Content must not imply that any developmental stage is inherently superior or inferior. Avoid contemptuous language about earlier stages and superiority claims about later stages.
- **Prioritise safety:** All module content must pass safety classification. Tier 2 content (somatic practice, shadow work, identity disruption risk) needs the review the `safety-classification` skill requires before merging.
- **Cite responsibly:** Every empirical claim requires a cited source with evidence tier rating. No fabricated citations.
- **Be specific:** Use precise language. Avoid hype, therapeutic claims, and unsupported efficacy statements.

## How to Contribute

### Types of Contribution

1. **Module content** — new learning modules, QuickStart paths, or maps
2. **Platform improvements** — Docusaurus configuration, React components, stage sites, search, accessibility
3. **Safety reviews** — review of Tier 2 module content
4. **Bug fixes** — broken links, build errors, accessibility violations

### Process

Work is tracked on [Project #6](https://github.com/users/paruff/projects/6). Its Status field is the only record of progress; the full rules are in [AGENTS.md § Workflow](AGENTS.md#workflow), and the human gates in [docs/product/review.md](docs/product/review.md).

1. **File an issue** — For a planned task, use the **Plan Task** template (title `P<n>-<nn> · <task>`, linked from its row in [docs/product/plan.md](docs/product/plan.md)). Other templates cover safety reviews, content and human-only operations. Labels say what kind of work it is and who it is for (`bug`, `accessibility`, `safety-critical`, `evidence-quality`, `agent:*`, `human-required`), never its status.
2. **Wait for triage** — The maintainer moves the issue from Backlog to **Ready for agent** (or assigns it) when it is in scope and its dependencies are done.
3. **Create a branch** — Branch from `main`, named by type: `feat/…`, `fix/…`, `docs/…`, `ci/…`, `chore/…`.
4. **Develop** — Follow the standards below. Run `npx lefthook install` once after `npm install`; the pre-commit hooks run the build, unit tests and content checks. Lefthook is the only hook manager; CI runs the same hooks with `npx lefthook run pre-commit --all-files`.
5. **Commit** — Small commits, one intent each: `type: description (P-ID, #issue)`, for example `ci: run check-aqal-tags.mjs in the pre-commit hooks CI uses (P6-04, #539)`.
6. **Open a pull request** — Use the PR template: `Closes #N`, the gate, and the AI-Assisted Review Block. The base branch must be `main`.
7. **Pass CI** — CI Quality, Content Protocol and Security must pass.
8. **Human review** — The issue moves to **Needs human review**. The maintainer merges; merging to `main` deploys the site. Tier 2 content also needs its safety review.

## Standards

### Module Content Standards

Modules follow the structure in the `module-authoring` skill (`.agents/skills/module-authoring/SKILL.md`) and the [Instructional Design Protocol](internal/quality/instructional-design-protocol.md). The mechanical parts (retrieval, mastery threshold, learning toolkit, frontmatter, AQAL tags) are checked by `scripts/check-*.mjs` and `scripts/validate-frontmatter.js` in the pre-commit hooks.

### Evidence Standards

Rate every source Tier A, B or C with the `evidence-vetting` skill (`.agents/skills/evidence-vetting/SKILL.md`) and the [Evidence Vetting Checklist](internal/quality/evidence-vetting-checklist.md). AQAL and other stage models are a lens, not evidence (FR-14 in [docs/product/specification.md](docs/product/specification.md)). Citations follow APA; links to DOI or PubMed preferred.

### Accessibility Standards

- WCAG 2.2 AA (NFR-02)
- No `#` heading in a module body (the title comes from frontmatter `title:`)
- All images and diagrams require alt text
- Colour contrast ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text
- All interactive elements must have visible focus indicators

### Safety Classification

Classify with the `safety-classification` skill (`.agents/skills/safety-classification/SKILL.md`), which sets each tier's requirements and reviewer.

- **Tier 1:** Cognitive/reflective content. No special restrictions.
- **Tier 2:** Somatic practice, shadow work, identity disruption risk, relational vulnerability. Needs its safety review and a complete Safety Note (stop rules, grounding, escalation).
- **Tier 3:** Not implemented. Therapeutic or clinical intervention is out of scope.

## Pull Request Checklist

The PR template carries the checklist. Before opening a PR, also confirm:

- [ ] Pre-commit hooks pass (build, tests, content checks)
- [ ] All empirical claims have cited sources with tier ratings
- [ ] Safety tier is correctly classified, and Tier 2 content has its safety review
- [ ] Learner-facing copy follows the `developmental-vocabulary` skill
- [ ] No hype language or therapeutic claims

## Getting Help

- File an issue for process questions
- See the [Product Charter](internal/implementation/product-charter.md) for project scope
- See [AQAL Competency Map](docs/maps/aqal-competency-map.md) for module placement
- See [Evidence Vetting Checklist](internal/quality/evidence-vetting-checklist.md) for citation guidance
