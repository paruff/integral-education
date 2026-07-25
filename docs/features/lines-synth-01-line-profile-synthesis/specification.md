# Specification: LINES-SYNTH-01 — Line Profile synthesis page across all seven lines

> **Issue #397** | Depends on: all seven line overview modules (confirmed built)

## Problem

The platform has seven complete developmental line overview modules (Self, Emotional, Interpersonal, Cognitive, Spiritual, Moral, Somatic) but no single synthesis page showing how a learner's profile might look across lines simultaneously. The single most distinctive insight the platform could surface — that uneven development across lines is normal and expected — is currently unavailable.

## Requirements

### Functional
1. Create a synthesis page at `docs/maps/line-profile-overview.md`
2. Briefly restate the stages-vs-lines distinction (link to AQAL Overview `#skills-lines`, don't duplicate)
3. Present all seven lines side by side with a one-sentence description of each, linking to its overview module
4. Include a worked example: a fictional composite profile showing uneven development across lines
5. Explain what uneven development actually means for a real person's daily experience
6. Note explicitly that no formal cross-line assessment tool exists yet (avoid over-claiming)
7. Add cross-links from the AQAL Overview and from each of the seven line overview modules

### Non-Functional
8. Follow existing MD/MDX conventions and heading hierarchy
9. `npm run build` must pass
10. No new dependencies
11. No changes to sidebar or navbar structure (unless adding a cross-link is appropriate)

## Acceptance Criteria

| ID | Criterion | Test Type |
|----|-----------|-----------|
| AC-01 | Synthesis page exists at `docs/maps/line-profile-overview.md` | unit |
| AC-02 | Page restates stages-vs-lines distinction with link to AQAL Overview | unit |
| AC-03 | All seven lines presented with name, one-sentence description, and link to overview module | unit |
| AC-04 | Self line included (not omitted as in the AQAL Overview's six-line list) | unit |
| AC-05 | Worked example shows fictional composite profile with at least 4 lines at different levels | unit |
| AC-06 | Worked example explains what uneven development means for daily experience | unit |
| AC-07 | Page explicitly states no formal cross-line assessment tool exists yet | unit |
| AC-08 | AQAL Overview has a cross-link to the new synthesis page | integration |
| AC-09 | Each of the seven line overview modules has a cross-link to the new synthesis page | integration |
| AC-10 | `npm run build` passes with zero errors | build |

## Scope
- **New file:** `docs/maps/line-profile-overview.md`
- **Modified — cross-links added:**
  - `docs/maps/aqal-overview.md`
  - `docs/modules/self-line-overview-psychograph.mdx`
  - `docs/modules/emotional-line-overview-orientation.md`
  - `docs/modules/interpersonal-line-overview-orientation.md`
  - `docs/modules/cognitive-line-overview-orientation.mdx`
  - `docs/modules/spiritual-line-overview-orientation.mdx`
  - `docs/modules/moral-line-overview-dual-track.mdx`
  - `docs/modules/somatic-line-overview.md`
- **NOT modified:** sidebar, navbar, other pages, module content beyond cross-links
