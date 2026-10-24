# Architecture — Integral Education Platform

> **Last updated:** 2026-10-24
>
> The system **as built**. Why it is built this way, with trade-offs and
> rejected options, is in [docs/product/design.md](docs/product/design.md).
> When a design ships, update this file in the same PR.

## System Overview

The Integral Education Platform is a **static site** built by Docusaurus v3 from Markdown/MDX with embedded React components, and deployed to GitHub Pages. There is no server-side runtime, database, or API layer. One repo builds the main site and every stage site.

```
┌─────────────────────────────────────────────────────────────────┐
│                        Content Layer                             │
│  docs/modules/  │  docs/quickstarts/  │  docs/maps/             │
│  (77 learning   │  (13 QuickStart     │  (AQAL maps, cross-     │
│   modules)      │   paths)            │   walks, taxonomies)    │
│  sites/<id>/ overrides and patches: stage-site rewrites          │
├─────────────────────────────────────────────────────────────────┤
│                       Component Layer                             │
│  src/components/ (React + MDX)  │  src/hooks/useProgress.js     │
│  src/utils/ (learner data, retrieval, metrics)  │  src/pages/   │
├─────────────────────────────────────────────────────────────────┤
│                      Build Layer                                  │
│  Docusaurus 3  │  MDX 3  │  Mermaid  │  local search            │
│  scripts/build-sites.mjs: main site + one config per stage site │
├─────────────────────────────────────────────────────────────────┤
│                     Deployment Layer                               │
│  GitHub Actions: CI builds and tests one artifact; deploy        │
│  publishes that artifact to GitHub Pages                         │
└─────────────────────────────────────────────────────────────────┘
```

## Content Model

Every learning module follows the journey in the `module-authoring` skill (`.agents/skills/module-authoring/SKILL.md`), with the [Instructional Design Protocol](internal/quality/instructional-design-protocol.md) as the standard:

AQAL Mapping → Orient → Encounter → Learn → Practice → Stabilize → Integrate → Reflect → Assess → Retrieval Schedule → Evidence and Citations, plus a Facilitator Note and a Safety Note as admonitions. Modules end with a `<RetrievalPrompt>` and carry an explanatory diagram where the content has structure.

Frontmatter carries stage, line and safety-tier tags (`scripts/validate-frontmatter.js`). QuickStart step tables set the pathway order, and module footer "Next" links are generated from them (`scripts/generate-pathways.mjs`).

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| SSG | Docusaurus (`core`, `preset-classic`, `theme-mermaid`) | 3.10.2 |
| Markdown engine | MDX | 3 |
| React | React | 19 |
| Diagrams | Mermaid via `@docusaurus/theme-mermaid` | 3.10.2 |
| Search | @easyops-cn/docusaurus-search-local | ^0.55.3 |
| Analytics | GoatCounter, cookieless, production deploys only (`analytics.js`) | hosted |
| Git hooks | lefthook | 2.2.2 |
| Tests | Node built-in test runner (`npm test`) | — |
| Node | Node.js LTS (`.nvmrc`; `engines: >=24`) | 24 |
| Deployment | GitHub Actions + GitHub Pages | — |

## Key Architectural Decisions

### 1. No Server-Side Runtime
The platform is purely static. This eliminates security surface area, hosting costs, and operational complexity. The trade-off: no accounts, no cross-device sync and no per-learner data on any server.

### 2. Learner Data Stays in the Browser
Progress, the review schedule and reflections live in `localStorage` under the `iel_` prefix, keyed by the site's `projectName` so stage sites on one origin never overwrite each other (NFR-05, NFR-06). `src/utils/learnerData.js` owns every key, copies pre-NFR-06 data once for the main site, and lets the learner view and clear it on the progress page. Learning metrics are computed in the browser; the learner can export a counts-only summary.

### 3. Content as Data
Modules are plain Markdown/MDX files with structured frontmatter (YAML). This enables:
- Checks in pre-commit and CI (frontmatter, AQAL tags, retention, toolkit, QuickStarts, vocabulary)
- Per-site content filtering for stage sites
- Git-based versioning and review
- AI-auditable content structure

### 4. Safety Tiers
Each module carries `safety_tier` in frontmatter, shown by the tier badge in `ModuleMeta`. Tier 2 content (somatic practice, shadow work, identity disruption, relational vulnerability) needs a full Safety Note (stop rules, grounding, escalation) and the review the `safety-classification` skill requires before merge.

### 5. Stage Sites From One Repo
Stage sites are built from this repo, not forks (decision in [STAGE-SITES.md](STAGE-SITES.md)). `sites/sites.json` lists each site's docs and its `published` flag. `scripts/prepare-site.mjs` assembles the shared docs and applies the site's `overrides/` (whole-page rewrites) and `patches/` (text replacements that fail the build if the shared text changes). `scripts/build-sites.mjs` builds the main site and each `sites/<id>.config.js` into `build/<id>/` in one Pages artifact, with per-site link and vocabulary checks against baselines. Only sites with `published: true` are deployed.

### 6. Search
Local client-side search via `@easyops-cn/docusaurus-search-local`, indexed at build time. Each stage site reuses the main site's search plugin over its own docs. `docs/features/` and `internal/` are not indexed.

## Data Flow

```
Author edits .md/.mdx
        │
        ▼
  git commit → lefthook pre-commit
  (build, tests, frontmatter, AQAL tags, retention, toolkit,
   QuickStarts, no H1, no placeholders, no conflict markers)
        │
        ▼
  Pull request → GitHub Actions
  ├─ ci-quality.yml: same lefthook hooks, build:sites, a11y audit, site artifact
  ├─ content-protocol.yml: hype terms, shadow-work safety language
  └─ security.yml: dependency review, CodeQL, gitleaks, npm audit
        │
        ▼
  Human merges to main → CI runs again on main
        │
        ▼
  deploy-gh-pages.yml deploys that run's artifact (never rebuilds)
        │
        ▼
  https://paruff.github.io/integral-education/  (+ /<site slug>/ for each published stage site)
```

## CI/CD Pipelines

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `ci-quality.yml` | Push/PR | Lefthook hooks, build every site, accessibility audit (axe-core, WCAG 2.2 AA), upload the site artifact |
| `content-protocol.yml` | Push/PR | Protocol guardrails: hype terms, shadow-work safety language |
| `security.yml` | Push/PR/schedule | Dependency review, CodeQL, gitleaks, npm audit |
| `deploy-gh-pages.yml` | CI Quality success on `main`, or manual | Deploy the tested artifact to GitHub Pages |
| `link-check-nightly.yml` | Nightly, or manual | External links (lychee); opens an issue on failure |

Actions are pinned to commit SHAs; Node comes from `.nvmrc`.

## Directory Structure (Simplified)

```
integral-education/
├── docs/                    # Content layer (main site)
│   ├── modules/             # 77 learning modules
│   ├── quickstarts/         # 13 QuickStart paths
│   ├── maps/                # AQAL maps and crosswalks
│   ├── safety/              # Safety standards, crisis resources
│   ├── product/             # Intent, spec, design, plan, review gates
│   └── features/            # Feature specs and designs (not indexed)
├── sites/                   # Stage sites: sites.json, configs, overrides, patches
├── src/                     # Component layer
│   ├── components/          # React components for MDX
│   ├── hooks/               # useProgress
│   ├── utils/               # Learner data, retrieval, metrics
│   ├── pages/               # Static pages (home, start, reflect, line profile)
│   └── css/                 # Theme customisation
├── internal/                # Internal docs plugin (/internal)
│   ├── implementation/      # Product charter, RACI, backlog
│   ├── quality/             # Protocols, evidence vetting, peer review
│   ├── pilots/              # Retention study protocol and items
│   └── safety/              # Safety addenda
├── scripts/                 # Build, checks, site assembly
├── tests/                   # node --test unit tests
├── static/                  # Static assets
├── .github/workflows/       # CI/CD
└── .agents/                 # AI agent skills and roles
```

## Related Documents

- [docs/product/design.md](docs/product/design.md) — how the spec is implemented: decisions, trade-offs, rejected options
- [STAGE-SITES.md](STAGE-SITES.md) — stage-site decision and governance
- [Feature designs](docs/features/) — feature-level design docs
- [Product Charter](internal/implementation/product-charter.md) — product scope
- [AQAL Competency Map](docs/maps/aqal-competency-map.md) — content mapping
