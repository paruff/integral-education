# Feature Archives

Specification and design files from completed feature-flow sessions. Each subdirectory contains the `specification.md` and `design.md` for one feature.

Feature work passes the same human gates as product work, without the intent gate: spec → design → plan (`tasks.json`) → PR → merge/release. Decisions go in the log in `docs/product/review.md` with the feature slug as scope, and each feature `design.md` links to the section of `docs/product/design.md` it implements.

Process audit files (`build-report.md`, `test-report.md`, `review-report.md`, `verification-report.md`, `cross-validation-report.md`) are not archived — they are ephemeral evidence consumed during the feature-flow session. The permanent record lives in:

- `.agents/logs/YYYY-MM-DD.jsonl` — structured JSON log of every feature-flow invocation
- Git history + PR descriptions
- GitHub Issues

| Feature | Issue | PR | Status |
|---------|-------|-----|--------|
| UX-18: AQAL Glossary + Term component | #222 | #313 | Merged |
| AGENT-01: learner-experience SKILL.md v1→v2 | #333 | #334 | Merged |
| SAFE-03: Fix prescribed breath ratios | #316 | #336 | Open |
| SAFE-01: Crisis resource banner | #314 | #337 | Open |
