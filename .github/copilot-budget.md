# Copilot Budget Admin Checklist

## 3-step org setup
1. Set monthly Copilot budget caps and alert thresholds per org/team.
2. Enable credit pooling so low/high-usage teams share capacity predictably.
3. Define Code Review policy (model tiers, allowed modes, and human-required review gates).

## Weekly admin ritual
- Review usage and burn trend:
  - `gh api /orgs/<org>/settings/billing/actions`
  - `gh api /orgs/<org>/settings/billing/shared-storage`
  - `gh api /repos/<org>/<repo>/actions/runs?per_page=50`
- Check top model/mode consumers and anomalies.
- Compare spend vs weekly budget trajectory.
- Trigger coaching for avoidable high-cost patterns.
- Capture decisions in team ops notes.

## Heavy user conversation (constructive template)
- Start with observed data, not blame.
- Ask what task types drive high usage and where friction occurs.
- Align on routing improvements (scope checks, mode/model fit, skill loading).
- Agree on one measurable behavior change for next week.
- Recheck trend and celebrate improvement.

## Budget targets by team size
| Team size | Suggested monthly cap (credits) | Alert threshold |
|---|---:|---:|
| 1–5 | [PLACEHOLDER] | 70% and 90% |
| 6–15 | [PLACEHOLDER] | 70% and 90% |
| 16–40 | [PLACEHOLDER] | 75% and 90% |
| 41+ | [PLACEHOLDER] | 80% and 95% |

> Fill placeholders based on contract, usage history, and critical delivery windows.

## Promotional credit reminder
If a promotional credit period is active, record end date and post-expiry budget impact now so teams are not surprised when paid billing starts.
