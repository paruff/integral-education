# UX-27 · Full accessibility pass against existing accessibility-workflow skill

## Problem
The site's visual identity was refreshed across UX-22 (safety-tier badges), UX-24 (Lora display font + forest green `#1a6b3c` primary), UX-25 (typography consistency), and UX-26 (AQAL quadrant motif). The existing accessibility audit in `internal/quality/accessibility-audit.md` was last run on 2026-07-19 before these changes. A full WCAG 2.1 AA re-audit is needed to confirm no regressions and to address the specific concerns raised in the issue.

## Requirements
1. Re-run axe-core WCAG 2.1 AA audit (via `scripts/audit-a11y.mjs`) against all 7 key pages
2. Verify visible keyboard focus states (`:focus-visible` outlines) on all interactive elements — this is the quality-floor requirement from the internal frontend-design standards
3. Verify color contrast ratios pass WCAG AA (4.5:1 for normal text, 3:1 for large text) with the new forest green `#1a6b3c` primary — especially active/hover states of nav items, breadcrumbs, buttons, and links
4. Verify safety-tier markers from UX-22 do not rely on color alone — all tier badges must include readable text labels alongside any visual differentiation
5. Remediate any findings, then re-run the audit to confirm zero violations
6. `npm run build` must pass

## Non-Requirements
- No changes to the audit script infrastructure itself (unless a bug is blocking the run)
- No changes to third-party content (GitHub embeds, PDFs)
- No screen-reader manual testing — that is a separate human-only task not covered by automated audits
- No dark mode contrast fixes unless zero-cost (primary focus is light mode)

## Acceptance Criteria
| ID | Criterion | Test Type |
|---|---|---|
| AC-1 | axe-core reports zero WCAG 2.1 A/AA violations across all 7 audited pages | integration |
| AC-2 | Lighthouse accessibility score is ≥ 90 on all scored pages | integration |
| AC-3 | All interactive elements (links, buttons, form inputs) have a visible focus indicator when keyboard-navigated | unit |
| AC-4 | Color contrast ratio between primary-green text (`#1a6b3c`) and its backgrounds passes 4.5:1 (or 3:1 for large text) in all tested contexts | unit |
| AC-5 | Safety-tier TIER badge renders both text label and icon — information is not conveyed by color alone | unit |
| AC-6 | All findings are documented in `build-report.md` with remediation applied and verified | unit |
| AC-7 | `npm run build` succeeds | integration |
