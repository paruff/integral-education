# Product-Level Artifacts

Discovery, specification, design, and task-breakdown files scoped to the
whole product — as opposed to `docs/features/<slug>/`, which holds the same
file types scoped to one feature.

- `discovery-draft.md` — product-level discovery-flow output (persona, JTBD, riskiest assumption)
- `specification.md` — product-wide requirements and acceptance criteria
- `design.md` — point-in-time architectural snapshot from the product-discovery
  session. `ARCHITECTURE.md` at repo root remains the living, continuously-updated
  reference; this file does not replace it.
- `tasks.json` — product-level task/roadmap breakdown. An individual task graduates
  to its own `docs/features/<slug>/` entry once picked up by feature-flow.
