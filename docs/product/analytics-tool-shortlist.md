# Tool Shortlist: Cookieless Analytics (P10-01a)

> **Status:** Draft recommendation for the human owner. Implements the criteria in `analytics-decision.md` (decided 2026-10-21, #532).
> **Evidence:** the vendors' own pages, fetched 2026-10-21. Where a page did not say, the cell says "not stated". Nothing below is independently tested.

## Checked against the five criteria

| Criterion | GoatCounter | Plausible | Cloudflare Web Analytics |
|---|---|---|---|
| **1. Script tag on static GitHub Pages** | Yes (script tag; not confirmed on the fetched page) | Yes (script tag; not confirmed on the fetched page) | Yes, via manual setup for sites not proxied by Cloudflare |
| **2. Meets the "never" rules** | Cookies, localStorage, cache: none. No IP stored. No persistent ID; repeat visits matched in memory for up to 8 hours | No cookies, cache or localStorage. IP not stored. Visitor ID is a daily hash and cannot recognize a visitor across days | Not stated on the fetched FAQ. Needs checking before use |
| **3. Counts the two hub events, or page paths standing in** | Pageviews and paths: yes. Custom events: not stated on the fetched page | Custom events supported | Page paths: yes. Custom events: not supported |
| **4. Aggregate export for the P10-04 baseline** | Not stated on the fetched page | Not stated on the fetched page | GraphQL API for aggregates; unsampled for 7 days, then roughly 10% sampling, 6 months of history |
| **5. Free or low cost; open source preferred** | Not stated on the fetched page (source code linked) | Free trial; price not stated; source code public | Not stated; free tier believed, unverified |

## Reading the table

- **Cloudflare is the weakest fit.** Its storage behaviour is not documented where I looked, it has no custom events, and its data is sampled after a week. That makes the baseline in P10-04 harder to trust.
- **Plausible** meets rules 2 and 3 on its own documentation and has the cleanest privacy statement (a daily salted hash that is deleted every 24 hours). It is a paid hosted service unless self-hosted.
- **GoatCounter** also meets rule 2 on its own documentation and is small and simple. Its short in-memory window (up to 8 hours) means a returning visitor on a later day counts as new, which is consistent with the decision.

## Recommendation

Use **Plausible** if you accept a small monthly cost or can self-host it; use **GoatCounter** if cost must be near zero. Both fit the decided rules better than Cloudflare. I have not verified pricing, licence or the GitHub Pages script setup for either; a person should confirm those before P10-01a closes.

For FR-19, "stage-site entry from the hub" can be counted two ways: a custom event (Plausible) or the stage site's first page view with the hub as referrer (works with all three). The second needs no tool feature.

## Do not forget

- Production builds only; not on PR or local builds.
- A footer privacy note linked from every site, saying what is counted and what is not.
- Check in browser devtools that no cookies or storage are set before closing P10-01a.
