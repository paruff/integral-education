---
name: docusaurus-conventions
description: "Use this skill whenever modifying, creating, or debugging Docusaurus v3 configuration files, sidebar configuration, MDX components, frontmatter, plugin setup, GitHub Pages deployment, or fork-specific configuration for the Integral Education platform. Trigger when: changing docusaurus.config.js, sidebars.js, or any file in src/; installing or configuring plugins; troubleshooting build errors; scaffolding a new fork's Docusaurus config; integrating React components into MDX module files; or fixing heading hierarchy across modules. Load before any file edit in the Docusaurus layer."
---

# Docusaurus v3 Conventions — Integral Education

The platform runs Docusaurus v3 deployed to GitHub Pages. This skill is the canonical reference for every agent that touches the Docusaurus layer. When this skill and an agent file conflict, this skill takes precedence — report the conflict rather than resolving it silently.

---

## Repository structure

```
integral-education/
├── docs/
│   ├── modules/           ← all learning modules (.md / .mdx)
│   ├── quickstarts/       ← QuickStart path files
│   ├── skills/            ← skills overview modules
│   ├── states/            ← states modules
│   └── reference/         ← infrastructure docs (AQAL overview, competency map, etc.)
├── src/
│   ├── components/        ← React components imported into MDX
│   ├── pages/             ← homepage and other static pages (index.js, start.js, about.js)
│   └── css/
│       └── custom.css     ← Docusaurus CSS variable overrides
├── static/                ← static assets (images, favicon, fonts)
├── .github/
│   └── workflows/
│       └── deploy.yml     ← GitHub Actions deployment workflow
├── docusaurus.config.js   ← main site config
├── sidebars.js            ← sidebar structure
└── package.json
```

---

## Heading hierarchy — canonical fix procedure

**Context:** In Docusaurus v3, the frontmatter `title:` field renders automatically as the page's H1. Any `# Heading` in the markdown body creates a *second* H1, causing a WCAG Level A violation and a visible duplicate title.

**Do not use a naive find-and-replace on `# `.** That pattern will incorrectly match H2+ headings that happen to be at the start of a line after blank space, and will match `# ` inside code fences. Use this safe procedure:

### Step 1 — Identify violations (dry run, no changes)
```bash
# Find lines that begin with exactly one # followed by a space
# --include flags restrict to markdown files only
# -n shows line numbers; review every result before acting
grep -rn "^# " docs/ --include="*.md" --include="*.mdx"
```

Review the output. For each match, confirm:
- Is this line inside a code fence (between ` ``` ` delimiters)? → Skip it; do not change.
- Is this line in the frontmatter block (between `---` delimiters)? → This shouldn't appear; frontmatter uses `title:` not `# `. If it does, it's malformed frontmatter — fix separately.
- Is this a genuine H1 section heading in the module body? → Change to `##`.

### Step 2 — Fix confirmed violations
Edit each file manually or with a targeted replacement. Do NOT use `sed -i 's/^# /## /'` globally — it will corrupt code fence content in some editors and platforms.

For a single file:
```bash
# Review the specific lines first
grep -n "^# " docs/modules/module-slug.md

# Then open in your editor and change each confirmed H1 body heading to ##
```

### Step 3 — Verify
```bash
# Confirm zero body H1s remain across all module files
grep -rn "^# " docs/ --include="*.md" --include="*.mdx"
# Expected output: no results

# Then build to confirm no new errors introduced
npm run build
```

Commit: `fix: H1→H2 heading hierarchy across all modules (WCAG Level A — PRE-16/UX-09)`

---

## `docusaurus.config.js` — canonical structure

```js
// @ts-check
const { themes: prismThemes } = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Integral Education',
  tagline: 'Plain-language tagline — no AQAL jargon',
  favicon: 'img/favicon.ico',

  url: 'https://paruff.github.io',
  baseUrl: '/integral-education/',   // must end with /
  organizationName: 'paruff',        // GitHub org or username
  projectName: 'integral-education', // repo name — controls Pages URL
  trailingSlash: false,              // GitHub Pages strips trailing slashes; keep false

  // Never downgrade either of these to 'warn' in production
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',    // broken markdown links are as bad as broken hrefs

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Search plugin goes in plugins: — NOT in themes: (silent failure if wrong)
  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,              // required for GitHub Pages cache-busting
        indexDocs: true,
        indexBlog: false,
        docsRouteBasePath: '/docs',
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: null,             // suppress "Edit this page" links on all docs
        },
        blog: false,                 // blog disabled; do not enable without explicit decision
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: '',                   // leave empty; logo carries brand identity
        logo: {
          alt: 'Integral Education',
          src: 'img/logo.svg',
        },
        items: [
          { to: '/start',            label: 'Start Here', position: 'left' },
          { to: '/docs/modules',     label: 'Modules',    position: 'left' },
          { to: '/docs/quickstarts', label: 'Paths',      position: 'left' },
          { to: '/docs/skills',      label: 'Skills',     position: 'left' },
          { to: '/about',            label: 'About',      position: 'right' },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `© ${new Date().getFullYear()} Integral Education`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

module.exports = config;
```

---

## `sidebars.js` — canonical 4-group structure

```js
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  mainSidebar: [
    {
      type: 'category',
      label: 'Stage Journeys',
      collapsed: false,
      items: [
        'modules/amber-mythic-orientation',
        'modules/cognitive-dissonance-bridge',
        'modules/perspective-taking-capacity',
        'modules/authority-autonomy-transition',
        'modules/rational-orange-orientation',
        'modules/late-orange-disillusionment',
        'modules/empathy-perspective-plurality',
        'modules/emotional-intelligence-somatic-line',
        'modules/contextual-ethics-moral-complexity',
        'modules/ecological-systems-consciousness',
        'modules/authentic-dialogue-collaborative-meaning',
        'modules/community-belonging-collective-intelligence',
        'modules/relativism-limits-of-pluralism',
        'modules/pluralistic-green-orientation',
        'modules/integral-teal-orientation',
      ],
    },
    {
      type: 'category',
      label: 'Skills',
      collapsed: true,
      items: [
        'modules/mindfulness-basics',
        'modules/mindfulness-deepening',
        'modules/emotional-granularity',
        'modules/shadow-integration-101',
        'modules/cognitive-bias-101',
        'modules/evidence-evaluation',
        'modules/critical-thinking-foundations',
        'modules/systems-thinking-101',
      ],
    },
    {
      type: 'category',
      label: 'States',
      collapsed: true,
      items: [
        'modules/gross-state-awareness',
        'modules/subtle-state-access',
        'modules/flow-state-peak-experience',
        'modules/causal-witness-state',
        'modules/nondual-awareness-orientation',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: true,
      items: [
        'reference/aqal-overview',
        'reference/aqal-competency-map',
        'reference/ilp-practice-taxonomy',
        'reference/shadow-developmental-lines-map',
        'reference/instructional-design-protocol',
        'reference/module-template',
      ],
    },
  ],
};

module.exports = sidebars;
```

### Critical: sidebar item IDs

Sidebar items reference the **`id` field from the doc's frontmatter**, not the file path.

- If a doc has `id: my-custom-id` in frontmatter → sidebar entry must be `'path/to/my-custom-id'`
- If a doc has NO `id:` in frontmatter → Docusaurus defaults to the file path relative to `docs/` without extension → sidebar entry is `'modules/module-slug'`
- **Mismatch between sidebar ID and frontmatter `id:` causes a silent build failure** — the doc becomes unreachable but no error is thrown. Always verify with `npm run build`.

---

## `_category_.json` — directory-level metadata

Place in any `docs/` subdirectory to set the sidebar category label and sort order without listing every file in `sidebars.js`:

```json
// docs/modules/_category_.json
{
  "label": "Stage Journeys",
  "position": 1,
  "collapsed": false,
  "collapsible": true,
  "link": {
    "type": "generated-index",
    "description": "Learning modules organised by developmental stage and line."
  }
}
```

When a `_category_.json` is present, Docusaurus auto-generates the category from all docs in that directory. **Do not mix** `_category_.json` auto-generation with explicit `items:` arrays in `sidebars.js` for the same directory — they conflict.

---

## Frontmatter — required fields on every module

```yaml
---
id: module-slug                    # used by sidebars.js; must be unique across all docs
title: Full Module Title           # Docusaurus renders this as H1 — do NOT add # in body
sidebar_label: Short Label         # what appears in the sidebar nav
description: One sentence, plain language, no AQAL jargon for non-Integral audiences.
tags:
  - amber                          # stage: magenta / red / amber / orange / green / teal
  - cognitive-line                 # line: self / cognitive / emotional / interpersonal / moral / somatic / spiritual
  - tier-1                         # safety: tier-1 / tier-2
---
```

**`title:` containing a colon:** If the title contains a colon (e.g. `title: Character: The Foundation`), YAML will parse the colon as a key-value separator and the build will fail with a cryptic frontmatter error. Wrap titles containing colons in quotes:
```yaml
title: "Character: The Foundation"
```

---

## MDX 2 — syntax rules

The platform uses MDX 2. These patterns from MDX 1 silently break or throw errors:

| ❌ MDX 1 (broken) | ✅ MDX 2 (correct) |
|------------------|-------------------|
| `<!-- HTML comment -->` | `{/* JSX comment */}` |
| `export default function Layout` at file top | Use `_category_.json` for layout; no default export in content files |
| Bare `<br>` tags | `<br />` (self-closing) |
| Unescaped `<` and `>` in prose | `&lt;` and `&gt;`, or wrap in a JSX expression |
| `import` statements after frontmatter with a blank line gap | Imports must immediately follow the closing `---` of frontmatter |

### Component imports in MDX

```mdx
---
id: example-module
title: Example Module
---

import PracticeTimer from '@site/src/components/PracticeTimer';
import ReadinessCheck from '@site/src/components/ReadinessCheck';

## Practice

<PracticeTimer duration={1200} label="Body scan" />
```

Always use the `@site` alias — never relative paths for component imports. `@site` resolves to the project root regardless of the file's directory depth.

---

## Internal links — cross-fork safety

Module body text that uses absolute paths (e.g. `/docs/modules/rational-orange-orientation`) will break across forks that have a different `baseUrl`. Always use Docusaurus doc IDs for cross-document links:

```mdx
// ❌ Breaks in forks with different baseUrl
[Rational Orange Orientation](/docs/modules/rational-orange-orientation)

// ✅ Fork-safe: Docusaurus resolves relative to the doc root
[Rational Orange Orientation](../modules/rational-orange-orientation)

// ✅ Also fork-safe: use the @docusaurus/Link component in MDX
import Link from '@docusaurus/Link';
<Link to="/docs/modules/rational-orange-orientation">Rational Orange Orientation</Link>
```

When in doubt, use relative paths. They are portable across all forks regardless of `baseUrl`.

---

## GitHub Actions deploy workflow

The site deploys automatically on push to `main`. Reference structure for `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: write

jobs:
  deploy:
    name: Deploy to GitHub Pages
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build website
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

**Do not change** `organizationName`, `projectName`, or `baseUrl` without also updating the GitHub Pages source setting in the repo's Settings → Pages.

**Node version:** Use Node 20 (LTS). Docusaurus v3 requires Node 18+. Node 16 will fail at build time.

---

## Per-fork config — what changes and what doesn't

When scaffolding a fork, change ONLY these fields from the upstream config:

| Field | Fork 1 `integral-amber` | Fork 2 `integral-rational` | Fork 3 `integral-pluralistic` |
|-------|------------------------|---------------------------|-------------------------------|
| `title` | Character & Growth | Clear Thinking & Effectiveness | Belonging & Dialogue |
| `tagline` | [Amber plain-language] | [Orange plain-language] | [Green plain-language] |
| `baseUrl` | `/integral-amber/` | `/integral-rational/` | `/integral-pluralistic/` |
| `projectName` | `integral-amber` | `integral-rational` | `integral-pluralistic` |

Everything else — plugin config, preset config, MDX version, Node version, deploy workflow structure — is shared and must stay in sync with upstream.

**After changing `baseUrl`:** All internal component links that read `baseUrl` from `useDocusaurusContext()` will update automatically. Hardcoded absolute path strings in component files will not — audit `src/` for any hardcoded `/integral-education/` strings and replace with the `baseUrl` variable.

---

## URL redirect management

When a module slug changes (e.g. during a restructure), use `@docusaurus/plugin-client-redirects` to preserve old URLs:

```js
// In plugins: array of docusaurus.config.js
[
  '@docusaurus/plugin-client-redirects',
  {
    redirects: [
      {
        from: '/docs/modules/old-slug',
        to: '/docs/modules/new-slug',
      },
    ],
  },
],
```

This prevents broken bookmarks and external links after a restructure. Add a redirect entry for every slug change before the PR is merged.

---

## Common errors reference

| Symptom | Cause | Fix |
|---------|-------|-----|
| MDX compile error with no clear line number | Unescaped `<` or `>` in prose, or HTML comment `<!--` | Use `&lt;`/`&gt;` or JSX comment `{/* */}` |
| `Broken link to [path]` at build | Sidebar ID doesn't match frontmatter `id:` | Verify frontmatter `id:` and update sidebar entry to match |
| Search bar missing or returns no results | Search plugin in `themes:` instead of `plugins:` | Move plugin config to `plugins:` array |
| H1 appears twice on module page | `# Heading` in markdown body + `title:` in frontmatter both rendering | Remove `# ` from module body; leave only `##` and below |
| Build passes, site loads blank or 404 | `baseUrl` mismatch with GitHub Pages source setting | Align `baseUrl` with the Pages URL structure |
| Assets (CSS, JS) 404 on GitHub Pages | `baseUrl` missing trailing `/` | Ensure `baseUrl` ends with `/` |
| Frontmatter parse error on title | Title contains unquoted colon | Wrap title in quotes: `title: "Word: Word"` |
| Deploy fails with `GITHUB_TOKEN` permission error | Workflow permissions not set | Add `permissions: contents: write` to workflow |
| `npm run start` works; `npm run build` fails | MDX error suppressed in dev mode | Always run `npm run build` before pushing; never rely on dev server to validate |

---

## Local development workflow

```bash
# Install (use ci for reproducible installs)
npm ci

# Development server (fast refresh; does NOT catch all MDX errors)
npm run start

# Production build (catches all errors — run before every PR)
npm run build

# Serve the production build locally
npm run serve

# Clear cache if build behaves unexpectedly
npm run clear
npm run build
```

**Rule:** `npm run build` must pass with zero errors before any PR is opened. The dev server (`npm run start`) silently swallows certain MDX parse errors that throw at build time.