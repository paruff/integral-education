# Review Gates

> **Status:** Accepted with the workflow in `AGENTS.md` § Workflow, 2026-10-24
> **Owner:** @paruff (Product Owner)
>
> Every human gate, what "approved" means, and the decisions taken. The
> board (GitHub Project #6) shows what is waiting: an item in **Needs human
> review** carries a **Gate** value naming one of the gates below. This
> file is the record of the outcome.

## Gates

Product work passes Intent → Spec → Design → Plan → PR → Merge/release.
Feature work (`docs/features/<slug>/`) skips Intent: Spec → Design → Plan
(`tasks.json`) → PR → Merge/release. Human steps can sit anywhere.

| Gate | Who decides | Approved means | Recorded in | On rejection |
| --- | --- | --- | --- | --- |
| Intent | Product Owner | Problem, outcome, constraints and scope are agreed | [intent.md](intent.md) status line + a log row | Item back to **In progress** with the reason in a comment; revised in the same PR |
| Spec | Product Owner | Every requirement is testable and traces to the intent or the charter | [specification.md](specification.md) status line + a log row | As above |
| Design | Product Owner | Every requirement in scope has a section with the decision, trade-offs and rejected options, consistent with `ARCHITECTURE.md` | [design.md](design.md) status line + a log row | As above |
| Plan | Product Owner | Every task has an ID, proof, dependencies, a design section and an issue | [plan.md](plan.md) status line + a log row | As above |
| PR | Product Owner. Copilot code review is advisory | CI is green, the PR template is complete (`Closes #N`, AI-Assisted Review Block), and the Product Owner merges. GitHub doesn't let you approve your own PR, so for PRs opened under @paruff the merge is the approval | GitHub (the merge, or an approving review on PRs from Copilot). No log row | "Request changes" or close; item back to **In progress** |
| Merge/release | Product Owner | A merge to `main` deploys the main site. A **release** is a stage site set to `published: true` in `sites/sites.json`, or a version in `CHANGELOG.md` | A log row for releases only | Revert PR (roll forward, `gitops` skill) |
| Human step | The named human (`internal/implementation/raci.md`): for Tier 2 sign-off, the reviewer the `safety-classification` skill requires; the Product Owner for citation checks, test-item validation and audience readers | The `[HUMAN-REQUIRED]` action is done and recorded where that step keeps its own record (citation log, safety-review issue, study files) | That record + a log row linking to it | Item to **Blocked**, naming what's missing |

AI drafts, humans approve: an agent never records an approval on a
human's behalf, and never adds a log row that says "approved" without a
link to where the human gave it.

## Decision log

Append new rows at the bottom. Scope is `product` or a feature slug.

| Date | Scope | Gate | Item | Decision | Decider | Link |
| --- | --- | --- | --- | --- | --- | --- |
| 2026-10-18 | product | Intent | Charter v0.2: self-paced scope, FR-15 retention measure replaces O4 | Approved | @paruff | #509 |
| 2026-10-18 | product | Spec | [specification.md](specification.md) rebuilt around self-paced learning evidence | Approved | @paruff | PR #560 |
| 2026-10-18 | product | Human step | Fifteen AI-sourced citations checked against their sources | Done | @paruff | #510, [citation log](specification.md#citation-check-log-p1-02-510) |
| 2026-10-18 | product | Human step | Safety Lead named for Tier 2 review | Done | @paruff | #511 |
| 2026-10-19 | product | Design | Stage sites built from this repo, not forks (P9-01) | Approved | @paruff | #416, `STAGE-SITES.md` |
| 2026-10-21 | product | Design | Cookieless, aggregate-only site analytics (P10-01) | Approved | @paruff | #532, PR #587 |
| 2026-10-21 | product | Design | GoatCounter chosen as the analytics tool (P10-01a) | Approved | @paruff | #586, [analytics-decision.md](analytics-decision.md#tool-chosen-p10-01a) |
| 2026-10-21 | product | Release | Clear Thinking stage site published | Approved | @paruff | PR #619 |
| 2026-10-21 | product | Design | One internal stage-name set (P12-01) | Approved | @paruff | PR #620 |
| 2026-10-24 | product | Intent | [intent.md](intent.md) | Approved | @paruff | PR adding this file |
| 2026-10-24 | product | Plan | [plan.md](plan.md) | Approved | @paruff | PR adding this file |
