## Copilot Cost Guide

## Billing model in plain language
- As of June 2026, token-based billing means AI Credits are consumed by model usage and context size.
- 1 credit = $0.01.
- Input context tokens (including always-on instruction files) are billed every interaction.
- Free usage is limited by plan allowances and any promotional credits.
- Large prompts + Agent Mode + frontier models create the fastest spend growth.

## Plan credit budgets (verify in billing settings)
| Plan | Included monthly credits | Notes |
|---|---:|---|
| Pro | [PLACEHOLDER: verify current plan credits] | Individual budget baseline |
| Pro+ | [PLACEHOLDER: verify current plan credits] | Higher individual allowance |
| Business | [PLACEHOLDER: org-configured pool] | Shared org budget + admin controls |
| Enterprise | [PLACEHOLDER: org-configured pool] | Shared pool, policy controls, reporting |

> [PLACEHOLDER] values must be filled from GitHub billing UI because contracted allocations vary by plan date and contract.

## Three cost levers (highest impact first)
1. **Instruction file size (always-on context)**
   - Keep always-on files lean (target < 80 lines / ~320 tokens total core).
   - Move details into `.github/skills/*` and load only when needed.
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

| Usage pattern | Approx tokens/request | Monthly interactions | Estimated monthly cost |
|---|---:|---:|---:|
| Light docs maintenance (10/day) | 540 | 220 | ~$0.36 |
| Moderate mixed work (20/day) | 540 | 440 | ~$0.71 |
| Heavy iteration (50/day) | 540 | 1100 | ~$1.78 |

## How to read GitHub billing dashboard
1. Open GitHub Billing → Copilot usage.
2. Review usage by model, mode, and date range.
3. Compare daily burn trend vs team budget cap.
4. Identify outliers (heavy users, high-cost model spikes).
5. Correlate spikes with large prompts or Agent Mode overuse.

## Team admin controls
- Set monthly budget caps and alerts.
- Use credit pooling for org-level budget smoothing.
- Set model and Code Review policies by team/repository.
- Review weekly and coach users on routing patterns, not blame.
