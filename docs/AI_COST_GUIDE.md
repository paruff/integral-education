## AI Assistant Cost Guide

Tool-agnostic cost hygiene, plus per-tool billing specifics for whichever AI
coding assistants are actually in use on this repo at a given time (the
toolset here has moved from Copilot → OpenCode → Claude Code and may keep
changing — this guide separates what stays true regardless of tool from what
only applies to one).

## Three cost levers (highest impact first)
1. **Instruction file size (always-on context)**
   - Keep always-on files lean (target < 80 lines / ~320 tokens total core).
   - Move details into `.agents/skills/*` and load only when needed.
2. **Mode selection (Ask vs Agent)**
   - Use Ask mode for analysis/planning and small answers.
   - Use Agent Mode only for multi-step implementation tasks.
3. **Model selection (cheap vs frontier)**
   - Start with cheap/mid models for routine edits.
   - Escalate to frontier only when complexity/risk demands it.

## Anti-patterns and cost-safe alternatives
| Anti-pattern | Cost impact | Better pattern |
|---|---|---|
| Keeping long policy docs in always-on files | High repeated token burn every request | Keep AGENTS lean; move depth to skills |
| Using Agent Mode for simple Q&A | Extra orchestration + context tokens | Use Ask mode first |
| Defaulting to frontier models | Higher per-token rate | Route to mid/cheap unless needed |
| Huge unscoped prompts | Token-heavy context windows | Scope-before-you-start with explicit file list |

## Worked monthly scenarios for this repository
Assumptions: 22 working days, Sonnet-class input pricing ~$0.003 / 1K input tokens.
Applies to any token-metered tool at similar pricing — swap in the current
rate for whichever tool/model you're on.

| Usage pattern | Approx tokens/request | Monthly interactions | Estimated monthly cost |
|---|---:|---:|---:|
| Light docs maintenance (10/day) | 540 | 220 | ~$0.36 |
| Moderate mixed work (20/day) | 540 | 440 | ~$0.71 |
| Heavy iteration (50/day) | 540 | 1100 | ~$1.78 |

## Per-tool billing specifics

The levers and anti-patterns above hold regardless of tool. Billing
mechanics, plan tiers, and admin dashboards are tool-specific — add a
subsection here as each tool sees active/paid use; remove once a tool falls
out of use rather than leaving stale numbers behind.

### GitHub Copilot

- As of June 2026, token-based billing means AI Credits are consumed by
  model usage and context size. 1 credit = $0.01.
- Input context tokens (including always-on instruction files) are billed
  every interaction.
- Free usage is limited by plan allowances and any promotional credits.
- Large prompts + Agent Mode + frontier models create the fastest spend
  growth.

**Plan credit budgets** (verify in billing settings — contracted allocations
vary by plan date and contract):

| Plan | Included monthly credits | Notes |
|---|---:|---|
| Pro | [PLACEHOLDER: verify current plan credits] | Individual budget baseline |
| Pro+ | [PLACEHOLDER: verify current plan credits] | Higher individual allowance |
| Business | [PLACEHOLDER: org-configured pool] | Shared org budget + admin controls |
| Enterprise | [PLACEHOLDER: org-configured pool] | Shared pool, policy controls, reporting |

**Reading the GitHub billing dashboard:**
1. Open GitHub Billing → Copilot usage.
2. Review usage by model, mode, and date range.
3. Compare daily burn trend vs team budget cap.
4. Identify outliers (heavy users, high-cost model spikes).
5. Correlate spikes with large prompts or Agent Mode overuse.

**Org/team admin checklist** (only relevant once this repo has more than a
solo contributor on a paid org plan):

- 3-step org setup: set monthly budget caps and alert thresholds per
  org/team; enable credit pooling so low/high-usage teams share capacity
  predictably; define a Code Review policy (model tiers, allowed modes,
  human-required review gates).
- Weekly admin ritual: review usage/burn trend via
  `gh api /orgs/<org>/settings/billing/actions`,
  `gh api /orgs/<org>/settings/billing/shared-storage`, and
  `gh api /repos/<org>/<repo>/actions/runs?per_page=50`; check top
  model/mode consumers and anomalies; compare spend vs weekly budget
  trajectory; trigger coaching for avoidable high-cost patterns; capture
  decisions in team ops notes.
- Heavy-user conversation (constructive template): start with observed
  data, not blame; ask what task types drive high usage and where friction
  occurs; align on routing improvements (scope checks, mode/model fit,
  skill loading); agree on one measurable behavior change for next week;
  recheck trend and celebrate improvement.

| Team size | Suggested monthly cap (credits) | Alert threshold |
|---|---:|---|
| 1–5 | [PLACEHOLDER] | 70% and 90% |
| 6–15 | [PLACEHOLDER] | 70% and 90% |
| 16–40 | [PLACEHOLDER] | 75% and 90% |
| 41+ | [PLACEHOLDER] | 80% and 95% |

> Fill placeholders based on contract, usage history, and critical delivery
> windows.

If a promotional credit period is active, record its end date and the
post-expiry budget impact now so teams aren't surprised when paid billing
starts.

### Other tools (Claude Code, OpenCode, Cursor, etc.)

No fixed per-request pricing table is maintained here to avoid stale or
fabricated numbers — check the tool's own current billing page. The cost
levers and anti-patterns above apply the same way: always-on context size,
Ask/Agent-equivalent mode choice, and model tier are the three things that
actually move spend on any of these tools.
