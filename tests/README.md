# Tests — Integral Education Platform

> **Last updated:** 2026-07-25

## Test Philosophy

This is a static content site built with Docusaurus. Testing focuses on:

1. **Build integrity** — Docusaurus production build must pass with zero errors
2. **Content correctness** — structured frontmatter validation, AQAL token coverage, safety tier compliance
3. **Link validity** — all internal and external links must resolve
4. **Accessibility** — WCAG 2.1 AA compliance (aXe, Lighthouse)
5. **Security** — dependency vulnerabilities, secret detection, SAST

## Test Types

### Build Test
```bash
npm run build
# Expected: [SUCCESS] Generated static files in "build"
# Failure mode: broken links, MDX syntax errors, missing dependencies
```
This is the primary gate. Run before every commit and PR.

### Content Protocol Test
```bash
# Validates AQAL token coverage, safety tier consistency, banned terms
# Run via CI workflow: .github/workflows/content-protocol.yml
npm run build  # content protocol runs as a pre-build step
```

### Link Check
```bash
# Validates all internal and external links
# Run via CI workflow: .github/workflows/ci-quality.yml
npx lychee --no-progress --exclude-all-private --exclude 'localhost' 'docs/**/*.md'
```
Expected: zero broken links. Excludes private/CI-only URLs.

### Security Scan
```bash
# Dependency vulnerabilities
npm audit --audit-level=high

# SAST (CodeQL) — run via CI: .github/workflows/security.yml
# Secret detection — run via CI
```

### Accessibility
```bash
# Run Lighthouse CI or aXe-core against the production build
# Manual: open DevTools → Lighthouse → Accessibility audit
```

### Search Index Validation
```bash
npm run build
# Verify build/search-index.json exists and is non-empty
# Verify search bar is functional in npm run serve
```

## CI Integration

All tests run automatically via GitHub Actions:

| Workflow | Tests | Required to merge |
|----------|-------|-------------------|
| `ci-quality.yml` | Lint, build, link check | ✅ Yes |
| `content-protocol.yml` | AQAL tokens, safety tiers, banned terms | ✅ Yes |
| `security.yml` | npm audit (high+), CodeQL, dependency review | ✅ Yes |
| `deploy-gh-pages.yml` | Build + deploy | ✅ Yes (main only) |

## Local Development Tests

```bash
# Fast feedback loop
npm run build    # must pass before any commit
npm run serve    # serve production build locally to verify

# Cache clear (if build behaves unexpectedly)
npm run clear && npm run build
```

## Test Coverage

This project does not use unit tests (no runtime logic to test). Coverage is defined as:

- **Build pass rate:** 100% on main
- **Broken links:** 0 on main
- **Accessibility violations:** 0 (aXe) on main
- **Module gold standard compliance:** 100% for published modules
- **Safety tier consistency:** 100% (frontmatter tier matches content tier)
