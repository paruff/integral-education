> Load with: "metrics skill" in your prompt
> Example: "Use the metrics skill to implement this feature."

# Metrics Skill

## DORA Metrics + AI Credit Burn

| Metric | Target | Green | Amber | Red |
|---|---|---|---|---|
| Deployment Frequency | Daily or better for doc/config updates | ≥ 5 deploys/week | 2–4/week | < 2/week |
| Lead Time for Changes | Fast turnaround from first commit to deploy | < 24h | 24–72h | > 72h |
| Change Failure Rate | Keep regressions low | < 10% | 10–20% | > 20% |
| MTTR | Recover quickly from failures | < 4h | 4–24h | > 24h |
| Review SLA | Human review for safety/governance changes | < 24h | 24–72h | > 72h |
| Rework Rate | Minimize churn/rework commits | < 15% | 15–30% | > 30% |
| AI Credit Burn Rate | Keep monthly spend predictable | ≤ budget plan | 100–120% budget | > 120% budget |

## Measurement Commands
- Deployment Frequency: `gh run list --workflow deploy-gh-pages.yml --limit 50`
- Lead Time: `git log --since='30 days ago' --pretty='%h %ad %s' --date=iso`
- Change Failure Rate: `gh run list --workflow ci-quality.yml --limit 100`
- MTTR: `gh run list --workflow ci-quality.yml --limit 100 --json conclusion,createdAt,updatedAt`
- Review SLA: `gh pr list --state merged --limit 50 --json number,createdAt,mergedAt`
- Rework Rate: commands below
- AI Credit Burn: billing dashboard + `bash scripts/token-audit.sh`

## Rework Rate Formula
- Formula: `rework_rate = (rework_commits / total_commits) * 100`
- Suggested rework commit heuristic: commit message contains `fix`, `rework`, `follow-up`, or `address review`.
- Commands:
  - `TOTAL=$(git rev-list --count --since='30 days ago' HEAD)`
  - `REWORK=$(git log --since='30 days ago' --pretty='%s' | grep -Eic 'fix|rework|follow-up|address review' || true)`
  - `awk "BEGIN { if ($TOTAL==0) print 0; else printf \"%.2f\", ($REWORK/$TOTAL)*100 }"`

## Monthly Review Ritual
1. Pull prior month build/deploy and PR stats.
2. Update DORA + AI burn snapshot in `docs/METRICS.md`.
3. Run `bash scripts/token-audit.sh --save` and compare trend vs last month.
4. Identify top three cost or failure drivers.
5. Assign one owner per driver with due date.
6. Confirm human-required safety/governance reviews were completed.
7. Publish a short action plan for next cycle.
