# Specification: LSC-01 — Implement live spaced retrieval prompts at module end
> **Issue #317** | **PR #341** | Archived from feature-flow session


## Problem

Every module has a `## 🧠 Anki Cards` section with Q&A pairs rendered as static text. There is no reveal mechanism (answer always visible), no self-scoring, and no delivery schedule. The single most evidence-supported mechanism for long-term retention — retrieval practice — is designed but not deployed.

## Requirements

### Functional
- Create `RetrievalCard` component: shows question, hides answer until click/tap, tracks correct/incorrect per session in component state
- Create `RetrievalPrompt` component: wraps Anki cards as `RetrievalCard` instances, renders sequentially (one at a time), after all reviewed shows scheduling section
- Schedule section: pre-formatted copy-to-clipboard text for 24h and 7d reminders: "Review [Module Name] — [date + 24h]" and "Review [Module Name] — [date + 7d]"
- Replace `## 🧠 Anki Cards` static blocks with `<RetrievalPrompt cards={[...]} />` in all 55 modules
- Component is keyboard accessible, works without mouse

### Non-Functional
- Infima theme variables for styling
- Keyboard accessible (tab, enter/space for reveal, arrow for correct/incorrect)
- Follows existing `src/components/` patterns
- `npm run build` passes
- No persistence (sessionStorage only, cleared on browser close)

## Acceptance Criteria
1. `RetrievalCard` component: question visible, answer hidden by default, click/tap reveals answer, "I remembered" / "Need to review" buttons post-reveal
2. `RetrievalPrompt` component: cards rendered sequentially, scoring tracked, after all done: (a) score summary, (b) schedule section with copy-to-clipboard for 24h + 7d
3. At least 3 modules updated with `<RetrievalPrompt>` replacing `## 🧠 Anki Cards` (sample: cognitive-bias-101, shadow-integration-101, amber-mythic-orientation)
4. Remaining 52 modules updated in subsequent batches — all 55 modules converted
5. Component keyboard navigable (tab, enter/space, no mouse required)
6. `npm run build` passes with zero errors