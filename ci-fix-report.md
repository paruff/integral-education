# CI Fix Report — PR #341 (LSC-01)

## Diagnosis

**PR:** [#341](https://github.com/paruff/integral-education/pull/341) — Implement live spaced retrieval prompts at module end
**Branch:** `feature/lsc-01-retrieval-prompt`

## Initial failures

| Workflow | Status | Root Cause |
|----------|--------|------------|
| Build And Validate | ✅ PASS | — |
| Protocol Guardrails | ✅ PASS | — |
| Dependency Review | ✅ PASS | — |
| CodeQL (x2) | ✅ PASS | — |
| **NPM Audit** | **❌ FAIL** | `brace-expansion` <1.1.16 high-severity advisory |
| GitGuardian Security | ✅ PASS | — |

## Root Cause

**Classification:** Dependency

**Problem:** A new NPM security advisory (GHSA-3jxr-9vmj-r5cp) was published for `brace-expansion` versions <1.1.16. The lockfile pinned `brace-expansion@1.1.14` through the transitive dependency chain `serve-handler@6.1.7 → minimatch@3.1.5 → brace-expansion@1.1.14`. The `npm audit --omit=dev --audit-level=high` check in the Security workflow fails on any high-severity vulnerability.

This is a pre-existing issue affecting all branches (main also fails) — not caused by LSC-01 changes.

## Fix

**Changed:** `package.json` — added `brace-expansion: "1.1.16"` to the existing `overrides` field (alongside the existing `serialize-javascript` override). This forces npm to resolve `brace-expansion` to version 1.1.16 regardless of the transitive dependency chain.

**Updated:** `package-lock.json` — regenerated via `npm install --package-lock-only` to reflect the override.

## Validation

| Check | Before | After |
|-------|--------|-------|
| `npm audit --omit=dev --audit-level=high` | ❌ exit code 1 (20 vulns) | ✅ exit code 0 (18 moderate only) |
| `npm ls brace-expansion` | 1.1.14 | 1.1.16 (overridden) |
| Build (server) | ✅ | ✅ |

## Root Cause Category

**Dependency**