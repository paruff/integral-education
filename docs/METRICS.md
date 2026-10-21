## Metrics

## Learning metrics (FR-19)

**Status:** structure only (P10-04, #535). **The baseline is not recorded yet.**
It cannot be until the analytics tool is chosen and live (#586) and the
retention study has produced a first score (#21). No value below is an
estimate; a blank means "not measured".

Order matters: the delayed retention score is the headline. Process metrics
are habits, and self-report is never the headline (Soderstrom & Bjork, 2015;
Sitzmann et al., 2010).

| Tier | Metric | Source | Target | Baseline (date) |
| --- | --- | --- | --- | --- |
| Outcome | Delayed retention score, ≥7 days after the pathway | Retention study (`internal/pilots/retention-study-protocol.md`) | Effect size with interval, per stage site | _not measured_ |
| Process | Reviews completed within 2 days of due | Learner export (P10-03) | ≥60% for active learners | _not measured_ |
| Process | Calibration gap | Learner export | Falling over a pathway | _not measured_ |
| Process | Pathway completion; return within 7 and 30 days | Learner export; analytics for the aggregate completion proxy | Baseline first, then per-site trend | _not measured_ |
| Fit | Learners switching stage site after first visit | Hub analytics (aggregate) | Baseline; a high rate signals mis-placement | _not measured_ |
| Self-report | Perceived usefulness, comfort with stage language | Study survey | Reported separately | _not measured_ |
| Guardrail | Accessibility violations; safety reports; build | CI, issues | 0; reviewed within 72h; green | _not measured_ |

### Recording the baseline `[HUMAN-REQUIRED]`

1. Confirm the analytics tool is live on production (#586).
2. Fill the Baseline column with values and dates from the sources above.
3. Do this before the first stage site is published (FR-19 acceptance).
4. Compare the first stage site with the main site after 8 weeks (P9-06).
