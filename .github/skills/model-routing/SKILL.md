> Load with: "model-routing skill" in your prompt
> Example: "Use the model-routing skill to implement this feature."

# Model Routing Skill

## Mode Decision Table
| Situation | Mode | Why |
|---|---|---|
| Need explanation, audit, estimate, or options | Ask | Lowest token burn; no edit context overhead |
| Small bounded edit (1–3 files) | Edit | Controlled context with minimal orchestration |
| Multi-step change, cross-file refactor, or investigation + implementation | Agent Mode | Automation helps, but requires strict scope control |

## Model Decision Table
| Cost Tier | Use for | Example tasks |
|---|---|---|
| Cheap model | Summaries, formatting, doc cleanup, straightforward rewrites | Normalize frontmatter, update links, tidy `.copilotignore` |
| Mid model | Most implementation work with moderate reasoning | Add script, update docs, adjust sidebars |
| Frontier model | High-ambiguity architecture/risk decisions only | Complex safety-policy refactor, novel workflow design |

## Scope Check Protocol (before Agent Mode)
1. List exact files to read first.
2. List exact files expected to change.
3. Write a 2-sentence plan including validation command.
4. If scope expands, pause and restate the new scope before continuing.

Paste-ready text:
"Scope check: I will read [files]. I expect to modify [files]. Plan: [sentence 1]. [sentence 2]. Validation: [command]."

## Local Model Guidance (if Ollama is available)
- Use local models for brainstorming, summarization, and first-pass rewrites.
- Reserve paid hosted models for final synthesis, high-risk reasoning, and repo-aware implementation.
- Keep local prompts free of sensitive data and verify outputs before commit.

## Reference
- See `docs/MODEL_ROUTING_GUIDE.md` for full routing policy, anti-patterns, and examples.
