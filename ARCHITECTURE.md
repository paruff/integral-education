# Architecture — Integral Education Platform

> **Last updated:** 2026-07-25

## System Overview

The Integral Education Platform is a **static site generator** approach to content delivery. Content is authored in Markdown/MDX with embedded React components, built into a static site by Docusaurus v3, and deployed to GitHub Pages. There is no server-side runtime, database, or API layer.

```
┌─────────────────────────────────────────────────────────────────┐
│                        Content Layer                             │
│  docs/modules/  │  docs/quickstarts/  │  docs/maps/             │
│  (75 learning   │  (10 QuickStart     │  (AQAL maps, cross-     │
│   modules)      │   paths)            │   walks, taxonomies)    │
├─────────────────────────────────────────────────────────────────┤
│                       Component Layer                             │
│  src/components/  │  src/pages/  │  src/css/                    │
│  (React + MDX)   │  (index.js,  │  (custom.css,                │
│                   │   start.js)  │   Docusaurus overrides)      │
├─────────────────────────────────────────────────────────────────┤
│                      Build Layer                                  │
│  Docusaurus v3  │  MDX 2  │  @easyops-cn/docusaurus-search      │
│                 │         │  -local                              │
├─────────────────────────────────────────────────────────────────┤
│                     Deployment Layer                               │
│  GitHub Pages  │  GitHub Actions  │  gh-pages branch             │
└─────────────────────────────────────────────────────────────────┘
```

## Content Model

Every learning module follows a 13-section gold standard (see [Instructional Design Protocol](docs/quality/instructional-design-protocol.md)):

1. **AQAL Mapping** — quadrant, level, line, state, type coverage
2. **Theoretical Frameworks** — minimum 4 frameworks including developmental theory
3. **Gifts** — genuine strengths (5+ items, no hedging)
4. **Limitations/Shadows** — structural constraints (no contemptuous language)
5. **Practice** — step-by-step exercise with explicit safety tier
6. **Reflect** — journaling and dialogue prompts
7. **Assess** — self-assessment rubric with passing threshold
8. **Integrate** — daily carry-forward activities
9. **Facilitator Note** — group facilitation guidance
10. **Anki Cards** — spaced retrieval Q&A pairs
11. **Retrieval Schedule** — 4-interval review plan
12. **Evidence and Citations** — tier-rated source table
13. **Safety Note** — stop rules, grounding, escalation protocol

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| SSG | Docusaurus | v3 |
| Markdown engine | MDX | v2 |
| React | React | v18 |
| Search | @easyops-cn/docusaurus-search-local | ^0.55.2 |
| Theming | CSS custom properties | — |
| Deployment | GitHub Actions + GitHub Pages | — |
| Node | Node.js (LTS) | 20 |

## Key Architectural Decisions

### 1. No Server-Side Runtime
The platform is purely static. This eliminates security surface area, hosting costs, and operational complexity. The trade-off: no personalization, no user accounts, no progress persistence across sessions. Learner progress is managed locally via browser storage (see `my-progress.mdx`).

### 2. Content as Data
Modules are plain Markdown/MDX files with structured frontmatter (YAML). This enables:
- CI-enforced content protocol checks (AQAL token coverage, safety tiers, banned terms)
- Easy forking — filter modules by frontmatter tags
- Git-based versioning and review
- AI-auditable content structure

### 3. Safety Tier 2 Protocol
Modules classified as Tier 2 (somatic practice, shadow work, identity disruption, relational vulnerability) require:
- Full Safety Note section with stop rules, grounding protocol, and escalation path
- Verified clinician sign-off before merge
- `safety_tier: 2` in frontmatter
- Tier badge rendered in `ModuleMeta` component

### 4. Fork Architecture
The upstream monorepo contains all content. Forks extract stage-specific subsets:
- Each fork is a separate GitHub repo with its own `docusaurus.config.js`
- Fork-specific values: `title`, `tagline`, `baseUrl`, `projectName`
- Shared values: `src/components/`, `src/css/custom.css`, workflow structure
- See [FORK.md](FORK.md) for full fork strategy

### 5. Search
Local client-side search via `@easyops-cn/docusaurus-search-local`. Search index is generated at build time. No external search service dependency. Fork-specific search excludes internal docs.

## Data Flow

```
Author edits .md/.mdx
        │
        ▼
  git add + git commit
        │
        ▼
  GitHub Actions (CI)
  ├─ ci-quality.yml (lint, link check, build)
  ├─ content-protocol.yml (AQAL tokens, safety terms, banned terms)
  └─ security.yml (npm audit, CodeQL, dependency review)
        │
        ▼
  npm run build → static site (./build/)
        │
        ▼
  Deploy to GitHub Pages (gh-pages branch)
        │
        ▼
  Published at https://paruff.github.io/integral-education/
```

## CI/CD Pipelines

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `ci-quality.yml` | Push/PR | Lint, check links, build |
| `content-protocol.yml` | Push/PR | Validate AQAL tokens, safety terms, banned terms |
| `security.yml` | Push/PR | npm audit, CodeQL, dependency review |
| `deploy-gh-pages.yml` | Push to main | Build and deploy to GitHub Pages |

## Directory Structure (Simplified)

```
integral-education/
├── docs/                    # Content layer
│   ├── modules/             # 75 learning modules
│   ├── quickstarts/         # 10 QuickStart paths
│   ├── maps/                # AQAL maps and crosswalks
│   ├── safety/              # Safety standards
│   ├── quality/             # Quality protocols
│   └── features/            # Feature specifications (internal)
├── src/                     # Component layer
│   ├── components/          # React components for MDX
│   ├── pages/               # Static pages (home, start)
│   └── css/                 # Theme customisation
├── internal/                # Internal content (plugin)
│   ├── implementation/      # Product charter, backlog
│   ├── quality/             # Evidence vetting, peer review
│   └── safety/              # Safety addenda
├── static/                  # Static assets
├── .github/workflows/       # CI/CD
└── .agents/                 # AI agent skills
```

## Related Documents

- [FORK.md](FORK.md) — fork strategy and governance
- [Design decisions](docs/features/) — feature-level design docs
- [Product Charter](internal/implementation/product-charter) — product scope
- [AQAL Competency Map](docs/maps/aqal-competency-map.md) — content mapping
