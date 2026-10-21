# Decision: Site Analytics (P10-01)

> **Status:** Decided
> **Decided by:** @paruff, 2026-10-21 (#532)
> **Implements:** FR-19 and NFR-05 in `specification.md`

## Decision

The main site and every stage site use **cookieless, aggregate-only**
analytics. The other option, no analytics at all, was not chosen.

## Why

- **Without it, P9-06 has no data.** FR-19 needs a per-site trend and the
  hub switch rate to compare the first stage site with the main site.
  Without analytics, the only data would come from learners who export
  their metrics in a study, which is too few to show a trend.
- **Learner data stays in the browser.** Progress, answers, ratings and
  reflections are personal developmental material. NFR-05 keeps them in the
  learner's browser, and this decision doesn't change that: analytics
  counts page visits, never what a learner writes or rates.
- **No identity, so nothing to leak.** The tool stores nothing on the
  learner's device and keeps no visitor ID, so the counts can't be traced
  back to a person or joined across days.

## Rules

Allowed:

- Page views per page and per site, referrer and broad device type, as
  aggregate counts.
- Aggregate counts for a fixed list of events: entering a stage site from
  the hub, and the hub's "choose again" link. Anything else needs a change
  to this file.

Never:

- Cookies, `localStorage` or any other device storage set by the tool;
  fingerprinting; a visitor ID that persists across sessions or days.
- Anything from `useProgress`, `RetrievalPrompt`, `RetrievalCard` or
  reflections, including answers, self-ratings, scores, schedules or free
  text.
- Per-visitor records or exports; advertising or cross-site tracking.
- Running on PR builds or local builds: production deploys only.

A short privacy note, linked from every site's footer, says what is
counted and what isn't.

## What this means for FR-19

| FR-19 metric | Source after this decision |
| --- | --- |
| Pathway completion | Local (P10-02). Analytics adds an aggregate proxy: views of a QuickStart's last step divided by views of its first step |
| Return within 7 and 30 days | **Local only.** Cookieless analytics can't tell a returning visitor from a new one, so return rates come from P10-02 and study exports |
| Stage-site switch rate | Aggregate proxy: "choose again" events divided by hub-to-site entries. It is not a per-learner rate |

Both proxies must be labelled as proxies wherever they're reported.

## Tool choice (P10-01a)

This decision doesn't pick a tool. Whichever tool is chosen must:

1. Load from a script tag on a static GitHub Pages site, without blocking
   rendering.
2. Meet the rules above, as confirmed in its own documentation.
3. Count the two events above, or the page paths that stand in for them.
4. Export aggregate data for the baseline in P10-04.
5. Be free or low-cost; open source and self-hostable is preferred.

Candidates to check against these criteria: GoatCounter, Plausible,
Cloudflare Web Analytics. Their feature claims have not been verified here.
