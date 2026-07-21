# Design: LSC-01 — Implement live spaced retrieval prompts at module end

## Architecture

Two new React components in `src/components/`:

### RetrievalCard

```
┌────────────────────────────────┐
│ Card 3 of 7                    │
│                                │
│ Q: [question text displayed]   │
│                                │
│ [ Show Answer ↓ ]  (clickable) │
│                                │
│ -- after reveal --             │
│ A: [answer text displayed]     │
│                                │
│ [ I remembered ] [ Need review]│
└────────────────────────────────┘
```

State: `{ revealed, outcome }` (per card, local state)
Props: `{ question, answer, onComplete(outcome) }`

### RetrievalPrompt

```
┌────────────────────────────────┐
│ Review: [Module Name]          │
│                                │
│ [ RetrievalCard sequence ]     │
│ [ one card at a time ]         │
│                                │
│ -- after all cards done --     │
│ Score: 5/7 correct             │
│                                │
│ Schedule your follow-up:       │
│ □ "Review [Module] — [24h]"   │
│ □ "Review [Module] — [7d]"    │
└────────────────────────────────┘
```

State: `{ currentIndex, scores[], completed }`
Props: `{ moduleName, cards[{q, a}] }`

## Data flow

```
RetrievalPrompt renders → shows card 0
  → User clicks "Show Answer" → answer revealed
  → User clicks "I remembered" / "Need review" → score recorded, onComplete
  → next card shown (or completion screen)

Completion:
  → Calculate score (correct/total)
  → Render "Schedule" section
  → Copy-to-clipboard buttons for 24h + 7d text
```

## Module format change

Before:
```md
## 🧠 Anki Cards

Q: What is...
A: ...

Q: What is...
A: ...
```

After:
```mdx
import RetrievalPrompt from '@site/src/components/RetrievalPrompt';

<RetrievalPrompt moduleName="Module Title" cards={[
  {q: "What is...", a: "..."},
  {q: "What is...", a: "..."},
]} />
```

## Styling

- Infima theme variables (--ifm-color-*, etc.)
- Card container: bordered, rounded, padding
- Question: visible, medium weight
- Answer: hidden state (blurred/reveal button), revealed (normal text)
- Buttons: primary (I remembered), secondary (Need review)
- Copy buttons: code-style preformatted text with copy icon
- Responsive: full-width on mobile

## Module change scope

55 modules across 2 batches:
- Batch 1 (5 modules): cognitive-bias-101.md, shadow-integration-101.md, amber-mythic-orientation.mdx, shadow-work-foundation.mdx, emotional-intelligence-somatic-line.mdx
- Batch 2 (50 modules): all remaining

## Component imports in modules

Module files already import from `@site/src/components/` (e.g., CrisisResourceBanner, ShadowGate, NextStep). Adding `RetrievalPrompt` follows the existing import pattern — placed after frontmatter, before other component imports.

## Risk assessment

| Risk | Severity | Mitigation |
|------|----------|------------|
| Multi-line answers break JSON-like structure | Medium | Escape newlines in MDX cards array; use JSX-friendly formatting |
| Build breaks from MDX parse errors in cards prop | Medium | Test build after each batch of 5-10 modules |
| Keyboard accessibility gaps | Low | Use standard button elements + tabIndex; test with keyboard only |
| sessionState loss on page navigation | Low | Expected behavior — sessionStorage only, consistent with ShadowGate pattern |