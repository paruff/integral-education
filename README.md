# Integral Education Platform

[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)
[![CI Quality](https://github.com/paruff/integral-education/actions/workflows/ci-quality.yml/badge.svg)](https://github.com/paruff/integral-education/actions/workflows/ci-quality.yml)
[![Deploy](https://github.com/paruff/integral-education/actions/workflows/deploy-gh-pages.yml/badge.svg)](https://github.com/paruff/integral-education/actions/workflows/deploy-gh-pages.yml)

A mastery-based learning platform built on the [AQAL framework](https://integrallife.com/) — All Quadrants, All Levels, All Lines, All States, All Types. Live at **[paruff.github.io/integral-education](https://paruff.github.io/integral-education/)**.

**Latest release:** [v0.2.0-alpha](https://github.com/paruff/integral-education/releases/tag/v0.2.0-alpha) — UX design system, WCAG 2.1 AA compliance, Somatic/Emotional/Interpersonal lines, developmental assessments. See [CHANGELOG](CHANGELOG.md) for full details.

Built with [Docusaurus](https://docusaurus.io/) and deployed to GitHub Pages.

## What You Get

- **68 learning modules** — stage orientations, developmental lines, shadow work, emotional intelligence, and state practices
- **10 QuickStart paths** — curated pathways for common developmental transitions
- **AQAL-aware content model** — every module tagged by quadrant, level, line, state, and type
- **Built-in mastery loop** — Learn → Practice → Reflect → Assess → Integrate
- **Anki-ready card blocks** — flashcard content embedded in every module
- **Safety standards** — tiered safety classification, facilitator qualifications, stop rules

## Structure

```
integral-education/
├── docusaurus.config.js
├── sidebars.js
├── docs/
│   ├── intro.md
│   ├── modules/          # 68 learning modules
│   ├── quickstarts/      # 10 curated learning paths
│   ├── maps/             # AQAL competency map, crosswalks, taxonomies
│   ├── safety/           # Safety standards and facilitator qualifications
│   ├── quality/          # Instructional design protocol, evidence vetting
│   ├── implementation/   # Facilitator guides, product charter, backlog
│   ├── pilots/           # Pilot program materials
│   └── reflections/      # Daily practice templates
├── static/
├── src/
├── .github/workflows/    # CI/CD (build, security, content protocol, deploy)
└── scripts/
```

## QuickStarts

| Path | Description |
|---|---|
| [Personal → Integral](docs/quickstarts/personal-to-integral.md) | Deepen self-awareness, reduce reactivity, build systems perspective |
| [Amber → Rational](docs/quickstarts/amber-to-rational.mdx) | Move from rule-based to evidence-based thinking |
| [Rational → Pluralistic](docs/quickstarts/rational-to-pluralistic.mdx) | Bridge from analytical to multi-perspectival reasoning |
| [Pluralistic → Integral](docs/quickstarts/pluralistic-to-integral.mdx) | Move beyond relativism to second-tier integration |
| [Cognitive Line](docs/quickstarts/cognitive-line-development.mdx) | Develop through concrete, formal, postformal, and metasystematic cognition |
| [Moral Line](docs/quickstarts/moral-line-development.mdx) | Progress from preconventional through postconventional moral reasoning |
| [Self Line](docs/quickstarts/self-line-development.mdx) | Navigate conformist, achiever, individualist, strategist, and postautonomous stages |
| [Shadow Work](docs/quickstarts/shadow-work.mdx) | Integrate disowned aspects of self across developmental levels |
| [Spiritual Line](docs/quickstarts/spiritual-line-development.mdx) | Move through mythic, rational, pluralistic, and integral spirituality |
| [State Development](docs/quickstarts/state-development.mdx) | Gross, subtle, causal, and nondual state practices |

## Module Library

### Stage Orientations
Amber Mythic, Rational Orange, Pluralistic Green, Integral Teal — full stage profiles with developmental characteristics, strengths, and growth edges.

### Developmental Lines (overview + progression modules)
Cognitive Line, Moral Line, Self Line, Emotional Line, Spiritual Line — each with overview orientation, stage-by-stage progression modules, shadow dimensions, and practice architecture.

### Shadow Work (10 modules)
From foundations (persona, projection, 3-2-1 process) through advanced (collective cultural shadow, immunity to change, spiritual bypassing, the teal trap).

### State Practices
Gross awareness, subtle state access, causal witness, flow and peak experience, nondual orientation.

### Emotional Intelligence
Emotion regulation, granularity, somatic correlation, appraisal and meaning-making, relational attunement.

### Cross-Cutting
Critical thinking, evidence evaluation, cognitive dissonance, systems consciousness, multiperspectival leadership, integral ethics, integral life practice.

## Quality Gates

Every module is held to the [Instructional Design Protocol](docs/quality/instructional-design-protocol.md) and [Evidence-Vetting Checklist](docs/quality/evidence-vetting-checklist.md). CI enforces:
- **Content Protocol**: no hype language, required safety terms in shadow modules, AQAL token coverage
- **Build**: Docusaurus production build must pass
- **Security**: npm audit (high+), CodeQL analysis, dependency review
- **Link Checking**: all internal and external links validated

## Setup

```bash
npm install
npm start       # local dev server
npm run build   # production build
```

## Contributor Guidance

- [Instructional Design Protocol](docs/quality/instructional-design-protocol.md)
- [AQAL Label Crosswalk](docs/maps/aqal-label-crosswalk.md)
- [Evidence-Vetting Checklist](docs/quality/evidence-vetting-checklist.md)
- [Peer Review SOP](docs/quality/peer-review-sop.md)
- [Shadowwork Safety Standard](docs/safety/shadowwork-safety-standard.md)
- [Facilitator Qualification Standard](docs/safety/facilitator-qualification-standard.md)
- [State Development Safety Standard](docs/safety/state-development-safety-standard.md)
- [AQAL Competency Map](docs/maps/aqal-competency-map.md)
- [ILP Practice Taxonomy](docs/maps/ilp-practice-taxonomy.md)
- [Implementation Backlog](docs/implementation/backlog.md)

## License

Content is licensed under [CC BY-SA 4.0](LICENSE). Code (build configuration, CI/CD) is available under the same terms where applicable.
