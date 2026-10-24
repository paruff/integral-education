# Product-Level Artifacts

Discovery, specification, design, and task-breakdown files scoped to the
whole product — as opposed to `docs/features/<slug>/`, which holds the same
file types scoped to one feature.

- `intent.md` — problem, intended learning outcome, constraints, open questions
- `discovery-draft.md` — product-level discovery-flow output (persona, JTBD, riskiest assumption)
- `specification.md` — product-wide requirements and acceptance criteria
- `plan.md` — the single consolidated product plan
- `analytics-decision.md` — P10-01: cookieless, aggregate-only site analytics and what it may collect
- `design.md` — how the spec is implemented: decisions, data flow, trade-offs
  and rejected options. `ARCHITECTURE.md` at repo root describes the system as built.
- `review.md` — every human gate (intent, spec, design, plan, PR, release,
  human steps) and the log of decisions taken. Status lives on the board
  (`AGENTS.md` § Workflow).
- `tasks.json` — superseded by `plan.md` (prod-01..05 carried into it); kept for history.
