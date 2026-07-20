# Specification: UX-17 — WCAG 2.1 AA Accessibility Audit

> **Issue #222** | **PR #313** | Archived from feature-flow session


## Problem
No documented accessibility audit exists. Based on manual review, the following Level A violations are present or likely: multiple H1s per page (covered in UX-09), prototype form inputs missing labels (covered in UX-13), skip-to-main-content link not verified, color contrast of custom CSS elements not verified, keyboard focus management on prototype page not tested. The cumulative accessibility debt will grow with each new module added.

## UX Rationale
WCAG 2.1 AA compliance is both an ethical obligation for an educational platform and increasingly a legal requirement in many jurisdictions. More practically, accessibility improvements benefit all users: heading hierarchy helps sighted scanners, label clarity helps ESL learners, contrast benefits outdoor/bright-screen readers. An audit-driven approach is significantly more efficient than issue-by-issue discovery.

## Requirements

### Audit Scope
- Homepage (`/`)
- Intro page (`/docs/intro`)
- A module page (`/docs/modules/mindfulness-basics`)
- A quickstart page (`/docs/quickstarts/personal-to-integral`)
- Prototype page (`/prototype`)
- Start Here page (`/start`)
- Custom 404 page (`/any-invalid-url`)

### Functional
- Run axe-core CLI audit on all target pages
- Document all Level A and Level AA violations
- Fix all Level A violations found
- Run Lighthouse accessibility audit targeting score 90+
- Document final audit results in docs/quality/accessibility-audit.md
- Document methodology for quarterly re-runs

### Non-Functional
- No regressions to existing functionality
- No changes to module content unrelated to accessibility

## Acceptance Criteria
1. axe-core reports zero Level A violations on all audited pages
2. Lighthouse accessibility score 90 or above on all audited pages
3. Audit results documented in docs/quality/accessibility-audit.md
4. Audit methodology documented so it can be re-run quarterly