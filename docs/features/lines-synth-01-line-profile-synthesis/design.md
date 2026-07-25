# Design: LINES-SYNTH-01 — Line Profile synthesis page

## Architecture

A standalone markdown page (`docs/maps/line-profile-overview.md`) with no React components:
- Plain markdown following existing maps/ conventions
- Internal links to line overview modules and AQAL Overview
- No MDX imports, no interactivity
- No API calls, no state

Cross-links added to 8 existing files (AQAL Overview + 7 line overviews) as inline "see also" references at their "Cross-References" or "Next Steps" sections.

## Data flow

```
Learner visits /docs/maps/line-profile-overview
  → Reads stages-vs-lines distinction
  → Sees seven-line summary table
  → Reads worked example of uneven development
  → Links to individual line overviews of interest
  → Links back to AQAL Overview for broader framework
```

## Page structure

```markdown
# Line Profile Overview

## Stages vs. Lines
Brief distinction (3-4 sentences), links to AQAL Overview #skills-lines

## The Seven Developmental Lines
Table:
| Line | Focus | Overview Module |
|---|---|---|
| Cognitive | How we know and reason | → overview |
| Emotional | How we feel and regulate | → overview |
| Interpersonal | How we relate to others | → overview |
| Moral | How we judge right and wrong | → overview |
| Self (Ego) | How we construct identity and meaning | → overview |
| Spiritual | How we relate to ultimate meaning | → overview |
| Somatic | How we inhabit our bodies | → overview |

## Uneven Development Is Normal
Explanation paragraph + worked example

### A Worked Example
Fictional composite profile showing 4+ lines at different levels, with daily-life explanation

## No Formal Cross-Line Assessment Yet
Explicit honesty note

## Cross-References
Links to individual overviews + maps
```

## Seven-line descriptions (one-sentence each)

| Line | Description |
|------|-------------|
| **Cognitive** | How we know and reason — the structural evolution of thinking from concrete operations through metasystematic cognition |
| **Emotional** | How we feel and regulate — the capacity to differentiate, name, and work with affective experience with increasing precision |
| **Interpersonal** | How we relate to others — the developmental arc of relational skill from transactional to genuine I–Thou contact |
| **Moral** | How we judge right and wrong — parallel development on justice reasoning and care-based ethical responsibility |
| **Self (Ego)** | How we construct identity and meaning — the meaning-making structure through which all experience is organized |
| **Spiritual** | How we relate to ultimate meaning — the evolving structural relationship to the sacred, ultimate reality, and what matters most |
| **Somatic** | How we inhabit our bodies — interoceptive awareness, nervous system regulation, and embodied presence |

## Worked example design

```
Maria, 34

| Line | Profile | What it means in daily life |
|---|---|---|
| Cognitive | Rational/Orange | Thinks clearly, evaluates evidence well, trusts her own analysis |
| Emotional | Amber/Conventional | Can name basic feelings but struggles to regulate under stress; relies on external rules for how to respond emotionally |
| Interpersonal | Amber/Conventional | Values harmony and shared norms; finds conflict destabilizing; defers to relationship expectations |
| Somatic | Developing/Orange | Notices tension signals but treats body instrumentally — pushes through rather than listening |
```

**Explanation:** Maria's cognitive line is her strongest — she can reason well, evaluate evidence, and make sound analytical decisions. Her emotional line is less developed; under pressure, she loses access to the emotional vocabulary and regulation strategies she knows conceptually. This asynchrony produces a characteristic friction: she can analyze what's happening to her but can't always *feel her way through it* in real time. She finds herself saying "I know this shouldn't bother me" while being bothered — the cognitive understanding doesn't directly transfer to emotional regulation. This is not a failure of character or effort. It is a psychograph profile — and it is completely normal.

## Cross-link placement

| File | Where to add link |
|------|-------------------|
| `docs/maps/aqal-overview.md` | In "Skills (Lines)" section, after line 102: "See the [Line Profile Overview](./line-profile-overview) for a synthesis across all seven lines." |
| `self-line-overview-psychograph.mdx` | In Cross-References / "Self Line Suite" section |
| `emotional-line-overview-orientation.md` | In Cross-References section |
| `interpersonal-line-overview-orientation.md` | In Cross-References section |
| `cognitive-line-overview-orientation.mdx` | In Cross-References section |
| `spiritual-line-overview-orientation.mdx` | In Cross-References section |
| `moral-line-overview-dual-track.mdx` | In Cross-References section |
| `somatic-line-overview.md` | Near existing Next Steps or Cross-References |

## Risk assessment

| Risk | Severity | Mitigation |
|------|----------|------------|
| Worked example misrepresents a real profile | Low | Fictional composite, explicitly labeled as such. No real person's data. |
| Seven-line model contradicts six-line AQAL Overview | Low | Note the difference explicitly; AQAL Overview lists 6 common lines but the Self line is the seventh that completes the model |
| Over-claiming diagnostic capacity | Low | Explicit honesty note: "no formal cross-line assessment tool exists yet" |
| Build break from markdown | Low | Standard markdown page; no JSX, no imports, no frontmatter beyond title |
| Dead links | Low | All overview module IDs confirmed; relative links verified |

## Dependencies

- **None.** Standalone markdown page. All linked modules already exist.
