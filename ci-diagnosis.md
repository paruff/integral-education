# CI Diagnosis — PR #340 (LSC-03)

Failure:      NPM Audit
Location:     .github/workflows/security.yml — npm-audit job
Evidence:     brace-expansion <1.1.16 high-severity advisory (GHSA-3jxr-9vmj-r5cp)
Likely Cause: Newly published NPM advisory, transitive dep via serve-handler → minimatch → brace-expansion. Not caused by PR changes.
Confidence:   HIGH
Proposed Fix: Add npm override for brace-expansion@1.1.16 in package.json