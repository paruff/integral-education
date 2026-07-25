# Design: MM-01 — Magic/Purple Stage Orientation Module

## Architecture Decision

**Template:** Follow the `docs/modules/amber-mythic-orientation.mdx` structural pattern exactly. This is the proven template for stage orientation modules. The Amber module is the quality benchmark — MM-01 must match its section structure, heading hierarchy, and component usage.

## Hybrid Framing (per MM-00 decision)

The module is **educational/facilitator-oriented**, not a self-guided practice for someone at the Magic/Purple center of gravity. This means:
- Introduction explicitly says "this is educational content about a developmental stage"
- Practice section is designed for a facilitator or self-recognizing adult, not for someone immersed in the Magenta worldview
- The vocabulary guide for Magenta/Purple is used as a psychoeducational lens, not as the primary learner voice — the actual reader has or is developing higher-stage capacities

## Files Changed

### New file
| File | Purpose |
|------|---------|
| `docs/modules/magic-purple-stage-orientation.mdx` | The module — 13 sections, frontmatter, imports matching Amber template |

### May need change
| File | Purpose | When |
|------|---------|------|
| `sidebars.js` (or sidebar config) | Register new module in navigation | Only if not auto-resolved |

**No other files change.** This is a single-file content addition following the established template.

## Skills Required

| Skill | Phase | Purpose |
|-------|-------|---------|
| module-authoring | Build | 13-section gold standard, frontmatter schema, section order |
| safety-classification | Build + Review | Tier 1 classification, Safety Note template, Pre/Trans vigilance |
| developmental-vocabulary | Build + Review | Magenta/Purple vocabulary substitution, sincere-reader test, framing |
| evidence-vetting | Build + Review | Tier-rating citations, polyvagal caveat, minimum 6 citations / 4 Tier A/B |
| docusaurus-conventions | Build | MDX component usage, `<ModuleMeta/>`, `<ModuleFooter/>`, `<RetrievalPrompt/>` |
| learner-experience | Review | RetrievalPrompt component integration, Anki card design |

## Component Usage

Import patterns from the Amber Orientation module:
```
import ModuleFooter from '@site/src/components/ModuleFooter';
import RetrievalPrompt from '@site/src/components/RetrievalPrompt';
import Admonition from '@theme/Admonition';
import ModuleMeta from '@site/src/components/ModuleMeta';
```

Use `<RetrievalPrompt>` for Anki cards (same pattern as Amber module).
Use `<Admonition type="tip">` for Facilitator Note.

## Architecture Diagram

```
magic-purple-stage-orientation.mdx
    ├── Frontmatter (id, title, sidebar_label, description, tags, etc.)
    ├── ModuleMeta component
    ├── Introduction / position statement (hybrid framing)
    ├── §1  AQAL Mapping (table, 5 dimensions)
    ├── §2  Theoretical Frameworks (4 lenses)
    │    ├── Spiral Dynamics: Purple
    │    ├── Gebser: magic structure
    │    ├── Attachment theory: secure base, co-regulation
    │    └── Polyvagal-informed: ventral vagal safety (with caveat)
    ├── §3  Gifts (5+ items, no hedging, sincere-reader test)
    ├── §4  Limitations / Shadows (structural framing, Pre/Trans note)
    ├── §5  Practice (10-15 min, Tier 1 — education + journaling only)
    ├── §6  Reflect (5+ prompts, no somatic instruction)
    ├── §7  Assess (rubric, behavioral criteria)
    ├── §8  Integrate (3+ activities)
    ├── §9  Facilitator Note (group framing)
    ├── §10 Anki Cards (via RetrievalPrompt, 8+ Q&A)
    ├── §11 Retrieval Schedule (4 intervals)
    ├── §12 Evidence & Citations (6+ sources, 4+ Tier A/B)
    ├── §13 Safety Note (Tier 1)
    └── ModuleFooter
```

## Design Constraints

1. **No somatic practice instruction** — discussing somatic aliveness as a trait is Tier 1, but guided somatic practice is Tier 2. Practice stays as education + journaling.

2. **No therapeutic claims** — "educational, not therapeutic." The module describes a developmental stage; it does not promise clinical outcomes.

3. **Pre/Trans note required** — same pattern as Amber module's treatment of this fallacy but focused on Magic/Purple: distinguishing undifferentiated Magenta worldview from reclaiming ritual/awe/communal belonging in higher stages.

4. **Vocabulary discipline** — the module body must use vocabulary that would resonate with a facilitator reading about Magenta/Purple (not internal AQAL jargon), and must avoid framing that would alienate a Magenta-stage reader. See developmental-vocabulary skill for the full substitution table.

5. **Structural framing for limitations** — "The very [gift] that makes Magenta [strength] can, at the boundary, become [limitation]." Same pattern as Amber module. No contempt language: no "merely," "only," "simplistic," "primitive," "undeveloped."

6. **Tier 1 safety** — the practice section uses journaling and reflection only. No shadow work, no identity disruption, no body-based practice. Safety Note uses Tier 1 template.

## Verification Strategy

| What | How |
|------|-----|
| 13-section presence | Manual check or scripted search for all 13 H2 headings |
| No `# ` heading | grep for `# ` (single hash) in module body |
| Citations present | grep for "citation" in the evidence section |
| Pre/Trans note present | grep for "Pre/Trans" |
| No contempt language | grep for prohibited words |
| Build passes | `npm run build` |