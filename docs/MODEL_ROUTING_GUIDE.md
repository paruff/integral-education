## Model Routing Guide

## Mode decision tree
```text
Start
 ├─ Need only explanation, estimate, or options?
 │   └─ Yes → Ask mode
 └─ Need file edits?
     ├─ <=3 files, clear scope, low ambiguity?
     │   └─ Yes → Edit mode
     └─ Multi-step or cross-area change?
         └─ Yes → Agent mode (run scope check first)
```

## Model selection table
| Model tier | Relative cost | Best for | Example tasks |
|---|---|---|---|
| Cheap | 1x baseline | Summaries, formatting, low-risk rewrites | clean markdown tables, update links |
| Mid | 2-4x baseline | Most coding/doc implementation | add scripts, adjust docs and config |
| Frontier | 5x+ baseline | High-ambiguity/high-risk reasoning | architecture tradeoffs, sensitive policy synthesis |

## Scope-before-you-start protocol (paste exactly)
"Scope check: I will read [files]. I expect to modify [files]. Plan: [sentence 1]. [sentence 2]. Validation: [command]."

## Four expensive anti-patterns (and cheaper alternatives)
1. **Unbounded Agent tasks** → split into phases with explicit file scope.
2. **Frontier by default** → begin cheap/mid, escalate only if blocked.
3. **Always-on instruction bloat** → keep AGENTS/core lean, load skill files explicitly.
4. **Retry loops with massive prompts** → summarize state, trim context, retry once with narrower goal.

## Local model strategy (if Ollama is available)
- Use local inference for ideation, classification, and first-pass drafting.
- Use hosted paid models for repository-aware edits and high-confidence final synthesis.
- Add a quick quality gate before commit: factual check, style check, and build validation.

## One-sentence routing rule
Use the cheapest mode and model that can complete the task reliably, and escalate only when complexity proves it necessary.
