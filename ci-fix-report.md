# CI Fix Report — PR #340 (LSC-03)

## Diagnosis

**PR:** [#340](https://github.com/paruff/integral-education/pull/340) — Personalized mirror paragraphs in Find Your Path
**Branch:** `feature/lsc-03-find-your-path-assessment`

## Failure

| Workflow | Status |
|----------|--------|
| Build And Validate | ✅ PASS |
| Protocol Guardrails | ✅ PASS |
| Dependency Review | ✅ PASS |
| CodeQL (x2) | ✅ PASS |
| **NPM Audit** | **❌ FAIL** |
| GitGuardian Security | ✅ PASS |

## Root Cause

**Classification:** Dependency

Same issue as PR #341 — `brace-expansion` <1.1.16 high-severity advisory (GHSA-3jxr-9vmj-r5cp). Transitive dependency via `serve-handler@6.1.7 → minimatch@3.1.5`. Not caused by LSC-03 changes.

## Fix

Added `brace-expansion: "1.1.16"` to `overrides` in `package.json`. Regenerated lockfile.

## Validation

| Check | Before | After |
|-------|--------|-------|
| `npm audit --omit=dev --audit-level=high` | ❌ exit 1 | ✅ exit 0 |

## Root Cause Category

**Dependency**