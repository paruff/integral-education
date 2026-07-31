---
name: quickstart-validator
description: "Use this skill whenever creating, editing, or auditing a file in docs/quickstarts/. Trigger when: adding a module reference to a QuickStart sequence, reordering a QuickStart's module list, creating a new QuickStart pathway, or checking whether an existing QuickStart's sequence still matches its member modules' actual stage/line tags and prerequisites. Also trigger when a module's frontmatter tags or prerequisites change, since that can silently break a QuickStart that references it."
---

# QuickStart Validator

A QuickStart (`docs/quickstarts/*.mdx`) makes two promises the underlying modules must actually keep: the listed modules exist and are tagged for the stage/line the QuickStart claims, and the sequence order matches the developmental arc described in the QuickStart's own "Why this sequence?" framing. Neither is checked by `validate-frontmatter.js` or `generate-content-graph.js` — those validate each module in isolation, not a QuickStart's claims about a set of modules.

---

## What to check

1. **Every module link resolves.** Each module referenced by slug/link in the QuickStart body exists in `docs/modules/`. A broken link here fails silently at read-time (Docusaurus only throws on `onBrokenLinks` for internal doc links it can resolve, not on freeform mentions).
2. **Tag consistency.** Each referenced module's frontmatter `tags` include the stage(s) the QuickStart is bridging (e.g. `amber-to-rational.mdx` should only reference modules tagged `amber`, `rational`, or a transition-neutral tag — not `green` or `teal`). Cross-reference `docs/.content-graph.json`'s stage field per module rather than re-parsing frontmatter by hand.
3. **Sequence matches stated rationale.** If the QuickStart's prose claims an order ("starts with X, then Y, then Z"), the module list must appear in that literal order. A reorder of the list without updating the prose (or vice versa) is the most common drift.
4. **Prerequisites don't point backward.** If a module later in the sequence declares a `prerequisites` frontmatter field, every prerequisite it names must appear earlier in the same QuickStart's list (or be reasonably assumed prior knowledge) — not later or absent.
5. **Time commitment is plausible.** The stated "Time commitment" range should roughly track the number and depth of modules listed; flag if a QuickStart lists 12 modules but claims "2–4 weeks."

## How to check it

- Read the QuickStart file in full, then `docs/.content-graph.json` for the stage/line/prerequisite fields of each referenced module (regenerate first with `npm run content-graph` if the graph might be stale).
- Don't hand-simulate the content graph's parsing logic — read its actual output.
- For cross-QuickStart consistency (e.g. does `amber-to-rational.mdx` end where `rational-to-pluralistic.mdx` begins), compare the two files' module lists directly.

## Gotchas

- `docs/quickstarts/` is excluded from the search index concerns that apply to `docs/features/`/`internal/` — don't assume quickstart content is ever hidden from learners; broken links or wrong-stage references here are learner-facing, not internal-only.
- Stage-transition QuickStarts (`amber-to-rational.mdx`, `rational-to-pluralistic.mdx`, `pluralistic-to-integral.mdx`) and line-focused QuickStarts (`*-line-development.mdx`) use different validation logic: transition QuickStarts check stage tags, line QuickStarts check line tags — don't apply stage-sequence checks to a line-development QuickStart, its modules legitimately span every stage.
- Load the `developmental-vocabulary` skill alongside this one if a fix requires touching the QuickStart's learner-facing prose, not just its module list — sequencing fixes shouldn't silently introduce jargon.
