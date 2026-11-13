## Metrics

## Learning metrics (FR-19)

**Status:** structure only (P10-04, #535). **No baseline values yet.**
Analytics went live on production on 2026-10-21 (GoatCounter, #586), so
aggregate counts start from that date. The delayed retention score needs the
retention study (#628) and the learner-export metrics need P10-03. No value
below is an estimate; a blank means "not measured".

Order matters: the delayed retention score is the headline. Process metrics
are habits, and self-report is never the headline (Soderstrom & Bjork, 2015;
Sitzmann et al., 2010).

| Tier | Metric | Source | Target | Baseline (date) |
| --- | --- | --- | --- | --- |
| Outcome | Delayed retention score, ≥7 days after the pathway | Retention study (`internal/pilots/retention-study-protocol.md`) | Effect size with interval, for the studied QuickStart | _not measured_ |
| Process | Reviews completed within 2 days of due | Learner export (P10-03) | ≥60% for active learners | _not measured_ |
| Process | Calibration gap | Learner export | Falling over a pathway | _not measured_ |
| Process | Pathway completion; return within 7 and 30 days | Learner export; analytics for the aggregate completion proxy | Baseline first, then per-site trend | _not measured_ |
| Fit | Learners switching stage site after first visit | Hub analytics (aggregate) | Baseline; a high rate signals mis-placement | _not measured_ |
| Self-report | Perceived usefulness, comfort with stage language | Study survey | Reported separately | _not measured_ |
| Guardrail | Accessibility violations; safety reports; build | CI, issues | 0; reviewed within 72h; green | _not measured_ |

### Recording the baseline `[HUMAN-REQUIRED]`

1. Confirm the analytics tool is live on production (#586).
2. Fill the Baseline column with values and dates from the sources above.
3. Do this by 2026-11-30 (P10-04a). It was meant to happen before the
   first stage site was published; it did not, so the first values recorded
   are the baseline.
4. Compare the first stage site with the main site after 8 weeks (P9-06),
   using the rule below.

### P9-06 decision rule `[HUMAN-REQUIRED]`

Recommended by the planning audit on 2026-11-13. **Not yet confirmed:** the
Product Owner confirms or changes the numbers by 2026-11-30. The thresholds
are judgment values with no research source. Both measures are proxies
(`docs/product/analytics-decision.md`).

- **Window:** 2026-10-21 to 2026-12-16, both sites, the `amber-to-rational`
  QuickStart.
- **Counts only if:** each site has at least 30 first-step views and the
  hub has at least 30 entries to the stage site.
- **Go:** the stage site's completion proxy is at least the main site's,
  and the switch rate is 25% or lower.
- **Revise:** one of the two holds. **Stop:** neither holds.
- **Extend:** if the minimum is not met, one extension to 2027-01-13. If
  it is still not met, record "inconclusive" and build no further site.
- **Copy freeze:** no changes to `sites/clear-thinking/overrides/` until
  the decision. Reader findings are logged below and applied afterwards.

| Date | Reader finding or copy change | Applied |
| --- | --- | --- |
| | | |
