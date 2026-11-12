#!/usr/bin/env node
// Scores every module against the 13-section rubric in .agents/agents/audit.md,
// using the measurable requirements in .agents/skills/module-authoring/SKILL.md.
// It checks what can be counted (items, table rows, required phrases). It does
// not judge tone (the sincere-reader test), whether a citation is real, or
// whether a practice is safe: those stay with a human reviewer.
// Usage: node scripts/audit-modules.mjs [--md] [--json] [file...]
import { readdirSync, readFileSync } from 'node:fs';
import { basename } from 'node:path';

const DIR = 'docs/modules';
const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('--')));
const named = args.filter((a) => !a.startsWith('--'));
const files = named.length
  ? named
  : readdirSync(DIR).filter((f) => /\.mdx?$/.test(f)).sort().map((f) => `${DIR}/${f}`);

export const SECTIONS = [
  'AQAL Mapping', 'Theoretical Frameworks', 'Gifts', 'Limitations', 'Practice', 'Reflect', 'Assess',
  'Integrate', 'Facilitator Note', 'Anki Cards', 'Retrieval Schedule', 'Evidence and Citations', 'Safety Note',
];
const JOURNEY = ['AQAL Mapping', 'Orient', 'Encounter', 'Learn', 'Practice', 'Stabilize', 'Integrate', 'Reflect', 'Assess', 'Retrieval Schedule', 'Evidence'];
const PRETRANS_STAGES = /magenta|purple|\bred\b|amber|mythic|teal|integral|turquoise|second[- ]tier|2nd[- ]tier/i;
// Automatic Tier 2 triggers that can be spotted in a Practice section (safety-classification skill).
const SOMATIC = /\bbody scan|\bbreath(e|ing)?\b|\binteroception|\bsensations?\b|\bgrounding\b|\bposture\b|in (your|the) body/i;

const strip = (s) => s.replace(/[^\p{L}\p{N}\s/&()':,.—–-]/gu, '').trim();
const tableRows = (text) => text.split('\n').filter((l) => /^\s*\|/.test(l) && !/^\s*\|[\s:|-]+\|\s*$/.test(l)).slice(1);
const listItems = (text) => text.split('\n').filter((l) => /^\s*(?:[-*]|\d+\.)\s+\S/.test(l));

// A journey heading (## 🧘 Practice) is often followed by custom-named H2s that
// carry its content (## Late-Green Inventory), so each H2 inherits the journey
// stage of the last marker heading above it.
const MARKERS = [
  ['AQAL Mapping', /^AQAL Mapping/i], ['Orient', /^(Orient|Overview)\b/i], ['Encounter', /^Encounter\b/i], ['Learn', /^Learn\b/i],
  ['Practice', /^(Pointing-Out )?(Practices?|Embody)\b/i], ['Stabilize', /^Stabilize\b/i], ['Integrate', /^Integrate\b/i], ['Reflect', /^Reflect\b/i],
  ['Assess', /^(Assess|Self-Assessment Rubric)/i], ['Retrieval Schedule', /^Retrieval Schedule/i], ['Evidence', /^Evidence/i],
  ['Safety Note', /^(Safety Notes?|When to Seek Support)/i], ['Facilitator Note', /^(Facilitator|A Note on Facilitated)/i],
  ['Other', /^(Clinical Safety|SME Review|Anki Cards|Knowledge Retention|Modified Mastery Loop|Complementary)/i],
];
// Custom H2s that belong to Learn wherever they sit in the file.
const CONCEPT = /gift|limitation|framework|\blens|pre\/trans/i;

export function parse(raw) {
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n/);
  const fm = fmMatch ? fmMatch[1] : '';
  const body = raw.slice(fmMatch ? fmMatch[0].length : 0);
  const sections = [];
  let inFence = false;
  let stage = null;
  const h1 = [];
  body.split('\n').forEach((line, i) => {
    if (/^```/.test(line)) inFence = !inFence;
    if (!inFence && /^# /.test(line)) h1.push(i + 1);
    const m = !inFence && line.match(/^## (.+)$/);
    if (m) {
      const title = strip(m[1]);
      // "Encounter — Three Practices" is a custom sub-heading, not the Encounter marker.
      const found = MARKERS.find(([, re]) => re.test(title))?.[0];
      const marker = found && (found === 'Practice' || !/\s[—–-]\s/.test(title)) ? found : undefined;
      if (marker) stage = marker;
      sections.push({ title, marker, stage: !marker && CONCEPT.test(title) ? 'Concept' : stage, lines: [] });
    } else if (sections.length) sections.at(-1).lines.push(line);
  });
  for (const s of sections) s.text = s.lines.join('\n');
  return { fm, body, sections, h1 };
}

// Text of every H2 whose own heading matches, joined.
const find = (doc, re) => doc.sections.filter((s) => re.test(s.title)).map((s) => s.text).join('\n');
// Text of a journey stage: its marker heading plus the custom H2s under it.
const region = (doc, stage) => doc.sections.filter((s) => s.stage === stage).map((s) => s.text).join('\n');
// A journey stage, or an admonition with that title.
function block(doc, label, aliases = []) {
  const names = [label, ...aliases].join('|');
  const jsx = doc.body.match(new RegExp(`<Admonition[^>]*title=["'][^"']*(?:${names})[^>]*>([\\s\\S]*?)</Admonition>`, 'i'))?.[1];
  const fenced = doc.body.match(new RegExp(`^:::\\w+[^\\n]*(?:${names})[^\\n]*\\n([\\s\\S]*?)^:::\\s*$`, 'im'))?.[1];
  return [region(doc, label), jsx, fenced].filter(Boolean).join('\n');
}

export function audit(raw) {
  const doc = parse(raw);
  const { fm, body } = doc;
  const gaps = Object.fromEntries(SECTIONS.map((s) => [s, []]));
  const missing = new Set();
  const need = (section, ok, gap) => { if (!ok) gaps[section].push(gap); };
  const absent = (section, text, what) => { if (!text.trim()) { missing.add(section); gaps[section].push(what); return true; } return false; };

  // 1 AQAL Mapping
  const aqal = region(doc, 'AQAL Mapping');
  if (!absent('AQAL Mapping', aqal, 'no AQAL Mapping section')) {
    const rows = tableRows(aqal);
    const dims = ['Quadrant', 'Level', 'Line', 'State', 'Type'].filter((d) => !rows.some((r) => new RegExp(d, 'i').test(r)));
    need('AQAL Mapping', !dims.length, `table lacks a row for: ${dims.join(', ')}`);
    need('AQAL Mapping', !rows.some((r) => r.split('|').slice(1, -1).some((c) => !c.trim())), 'table has a blank cell');
  }

  // 2 Theoretical Frameworks
  const tiers = (body.match(/\*\*Evidence tier:\*\*/g) ?? []).length;
  const fwHeading = doc.sections.some((s) => /framework|lens/i.test(s.title));
  if (!tiers && !fwHeading) { missing.add('Theoretical Frameworks'); gaps['Theoretical Frameworks'].push('no frameworks section'); } else {
    const fw = find(doc, /framework|lens/i);
    const h3 = (fw.match(/^### /gm) ?? []).length;
    const count = Math.max(tiers, h3);
    need('Theoretical Frameworks', count >= 4, `${count} frameworks with an evidence tier or own sub-heading; 4 required`);
    need('Theoretical Frameworks', /\bKegan\b/.test(body), 'Kegan subject-object theory (the required developmental framework) is not used');
    need('Theoretical Frameworks', !/Spiral Dynamics|Kegan|Loevinger|Cook-Greuter|Fowler|Kohlberg|Piaget/.test(body) || /\blens(es)?\b/i.test(body), 'stage model used without saying it is a lens, not a measurement (FR-14)');
  }

  // 3 Gifts
  const gifts = find(doc, /gift/i);
  if (!absent('Gifts', gifts, 'no Gifts section')) {
    const n = (gifts.match(/^### /gm) ?? []).length;
    need('Gifts', n >= 5, `${n} gifts with their own ### sub-heading; 5 required`);
    const hedges = gifts.match(/\b(while|however|though|but|can sometimes)\b/gi) ?? [];
    need('Gifts', !hedges.length, `${hedges.length} hedging word(s): ${[...new Set(hedges.map((h) => h.toLowerCase()))].join(', ')}`);
  }

  // 4 Limitations
  const limits = find(doc, /limitation|shadow/i);
  if (!absent('Limitations', limits, 'no Limitations section')) {
    const contempt = limits.match(/\b(merely|simplistic|primitive|immature)\b/gi) ?? [];
    need('Limitations', !contempt.length, `contemptuous word(s): ${[...new Set(contempt.map((c) => c.toLowerCase()))].join(', ')}`);
    need('Limitations', (limits.match(/^### /gm) ?? []).length >= 3 || limits.split(/\n\s*\n/).filter((p) => p.trim().length > 200).length >= 3, 'fewer than 3 developed limitations');
    if (PRETRANS_STAGES.test(fm)) need('Limitations', /pre[/-]trans|pre-rational|regression/i.test(body), 'Pre/Trans note required for this stage, none found');
  }

  // 5 Practice
  const practice = region(doc, 'Practice');
  if (!absent('Practice', practice, 'no Practice section')) {
    need('Practice', /\d+\s*(?:[–-]\s*\d+\s*)?min/i.test(practice), 'no explicit duration');
    need('Practice', (practice.match(/^\s*\d+\.\s/gm) ?? []).length >= 3, 'fewer than 3 numbered steps');
    need('Practice', /worked example/i.test(practice), 'no worked example before the learner practises alone (FR-12)');
    need('Practice', /\*\*Setup|\bsetup\b|\bset up\b|find a (quiet|comfortable)|materials|you will need|\bpen\b|\bjournal\b|notebook/i.test(practice), 'setup (space, materials, position) not stated');
    need('Practice', /take a moment|no rush|pause here|take your time|if you need to stop|at your own pace/i.test(practice), 'no pacing language');
  }

  // 6 Reflect
  const reflect = region(doc, 'Reflect');
  if (!absent('Reflect', reflect, 'no Reflect section')) {
    const n = listItems(reflect).length;
    need('Reflect', n >= 5, `${n} prompts; 5 required`);
    need('Reflect', /partner|group|dialogue|pair\b/i.test(reflect), 'no dialogue prompt for a partner or group');
    need('Reflect', /\bbody\b|somatic|sensation/i.test(reflect), 'no somatic check-in prompt');
    need('Reflect', (reflect.match(/\b(why|how)\b/gi) ?? []).length >= 2, 'fewer than 2 why/how elaboration prompts (FR-09)');
  }

  // 7 Assess
  const assess = region(doc, 'Assess');
  if (!absent('Assess', assess, 'no Assess section')) {
    const rows = tableRows(assess);
    need('Assess', rows.length >= 3 && rows.length <= 6, `${rows.length} rubric criteria; 3 to 6 required`);
    need('Assess', /not yet/i.test(assess) && /developing/i.test(assess) && /stable/i.test(assess), 'rubric lacks the Not yet / Developing / Stable columns');
    need('Assess', /passing threshold/i.test(assess), 'no stated passing threshold');
    need('Assess', /\bI\b|\bmy\b/.test(rows.join(' ')), 'rubric not written in first-person self-assessment language');
  }

  // 8 Integrate
  const integrate = region(doc, 'Integrate');
  if (!absent('Integrate', integrate, 'no Integrate section')) {
    const items = listItems(integrate);
    const rows = tableRows(integrate);
    const n = Math.max(items.length, rows.length, (integrate.match(/^### /gm) ?? []).length);
    need('Integrate', n >= 3, `${n} activities; 3 required`);
    need('Integrate', /\d+\s*(min|sec|breath)|\bseconds?\b|\bminutes?\b/i.test(integrate), 'activities give no duration');
    need('Integrate', /\b(before|after|when|each (morning|evening|day)|every (morning|evening|day)|at the (start|end))\b/i.test(integrate), 'activities are not tied to a daily moment');
  }

  // 9 Facilitator Note
  const fac = block(doc, 'Facilitator Note');
  if (!absent('Facilitator Note', fac, 'no Facilitator Note')) {
    need('Facilitator Note', (fac.match(/\d+\s*min/gi) ?? []).length >= 2, 'no timing breakdown');
    need('Facilitator Note', /watch[- ]fors?/i.test(fac), 'no watch-fors for group dynamics');
    need('Facilitator Note', /mixed|different stages|stage-mixed|adapt/i.test(fac), 'no adaptation note for stage-mixed groups');
    need('Facilitator Note', !doc.sections.some((s) => /^Facilitator Note$/i.test(s.title)), 'written as an H2, not an admonition');
  }

  // 10 Anki Cards
  const cards = body.match(/\{\s*q:[\s\S]*?\}/g) ?? [];
  if (!cards.length) { missing.add('Anki Cards'); gaps['Anki Cards'].push('no retrieval cards'); } else {
    need('Anki Cards', cards.length >= 8, `${cards.length} cards; 8 required`);
    need('Anki Cards', cards.every((c) => /\ba:\s*["'`]/.test(c)), 'a card has no model answer');
  }

  // 11 Retrieval Schedule
  const sched = region(doc, 'Retrieval Schedule');
  if (!absent('Retrieval Schedule', sched, 'no Retrieval Schedule heading')) {
    const rows = tableRows(sched);
    need('Retrieval Schedule', rows.length >= 4, `${rows.length} intervals; 4 required`);
    need('Retrieval Schedule', /without looking|from memory/i.test(sched), 'no row starts from memory ("Without looking, ...")');
    need('Retrieval Schedule', /\b(apply|teach|explain|use|try|practi[cs]e|re-?do|repeat)\b/i.test(sched), 'no interval moves from recall to application');
  }

  // 12 Evidence and Citations
  const ev = region(doc, 'Evidence');
  if (!absent('Evidence and Citations', ev, 'no Evidence and Citations section')) {
    const rows = tableRows(ev);
    const tier = (r) => r.match(/\|\s*(?:Tier\s+)?\**([ABC])\**(?=\s*(?:\||[—–-]|\())/)?.[1];
    const ab = rows.filter((r) => /[AB]/.test(tier(r) ?? '')).length;
    need('Evidence and Citations', rows.length > 0, 'citations are not in a table');
    need('Evidence and Citations', rows.every(tier), `${rows.filter((r) => !tier(r)).length} citation(s) without a tier`);
    need('Evidence and Citations', ab >= 4, `${ab} Tier A/B sources; 4 required`);
    need('Evidence and Citations', rows.filter((r) => tier(r) === 'C').every((r) => (r.split('|').at(-2) ?? '').trim().length > 4 && !/^\s*none\s*$/i.test(r.split('|').at(-2))), 'a Tier C citation has no caveat');
  }

  // 13 Safety Note
  const safety = block(doc, 'Safety Note', ['If You Are in Crisis']);
  const tagged2 = /safety_tier:\s*2|-\s*tier-2/.test(fm);
  const tagged = /safety_tier:|-\s*tier-[12]\b/.test(fm);
  const stated = safety.match(/Tier:?\**\s*:?\s*\**\s*([123])/i)?.[1];
  const somatic = SOMATIC.test(practice);
  if (!absent('Safety Note', safety, 'no Safety Note')) {
    need('Safety Note', stated, 'tier not stated in the note');
    need('Safety Note', /educational|not (a substitute for |a replacement for )?(therapy|therapeutic|clinical)/i.test(safety), 'does not say the content is educational, not therapeutic');
    need('Safety Note', tagged, 'no tier tag in frontmatter');
    need('Safety Note', !(tagged2 && stated === '1') && !(stated === '2' && tagged && !tagged2), 'tier in the note disagrees with frontmatter');
    need('Safety Note', !(somatic && stated !== '2' && !tagged2), 'Practice has body or breath instruction (an automatic Tier 2 trigger) but the module is not Tier 2: check classification');
    if (stated === '2' || tagged2) {
      const lacks = [['stop rule', /stop if|stop when|stop rule/i], ['grounding steps', /grounding/i], ['escalation path', /if distress|persist|continues/i], ['crisis resources', /resources|crisis|988|helpline|emergency/i], ['screening', /not be the right|before you begin|postpone|contraindicat/i]]
        .filter(([, re]) => !re.test(safety)).map(([n]) => n);
      need('Safety Note', !lacks.length, `Tier 2 note lacks: ${lacks.join(', ')}`);
    }
    need('Safety Note', !doc.sections.some((s) => /^Safety Notes?$/i.test(s.title)), 'written as an H2, not an admonition');
  }

  // Journey order and heading hierarchy (reported beside the 13 scores).
  const pos = JOURNEY.map((j) => doc.sections.findIndex((s) => s.marker === j));
  const present = pos.filter((p) => p >= 0);
  const other = [];
  const lost = JOURNEY.filter((_, i) => pos[i] < 0);
  if (lost.length) other.push(`journey heading missing: ${lost.join(', ')}`);
  if (present.some((p, i) => i && p < present[i - 1])) other.push('journey sections out of order');
  if (doc.h1.length) other.push(`H1 in body at line(s) ${doc.h1.join(', ')}`);
  if (!/^sidebar_label:/m.test(fm)) other.push('no sidebar_label');
  if (/prescribe|\b\d-count\b/i.test(safety + practice) && /inhale|exhale/i.test(safety + practice)) other.push('breath count prescribed');
  if (/push through|cold water|ice cube/i.test(body) && !/do not need to push through|don't push through|never push through|rather than pushing through/i.test(body)) other.push('possible prohibited-practice wording');
  else if (/cold water|ice cube/i.test(body)) other.push('possible prohibited-practice wording');

  const scores = Object.fromEntries(SECTIONS.map((s) => [s, missing.has(s) ? '❌' : gaps[s].length ? '⚠️' : '✅']));
  const partial = SECTIONS.filter((s) => scores[s] === '⚠️').length;
  const gapCount = SECTIONS.reduce((n, s) => n + gaps[s].length, 0) + other.length;
  // P0 = the module contradicts itself on tier, or has no Safety Note. "P0?" = the
  // Practice text matched a body/breath keyword, which a human has to confirm.
  const tierFlag = gaps['Safety Note'].some((g) => /disagrees|no Safety Note/.test(g));
  const tierCheck = gaps['Safety Note'].some((g) => /automatic Tier 2/.test(g));
  const priority = tierFlag ? 'P0' : tierCheck ? 'P0?' : missing.size >= 3 || doc.h1.length ? 'P1' : partial + missing.size ? 'P2' : '—';
  const action = tierFlag || missing.size >= 6 ? 'Rewrite' : missing.size ? 'Extend' : partial ? 'Minor revision' : 'Ready';
  return { scores, gaps, other, missing: missing.size, partial, gapCount, priority, action, tier: stated ?? (tagged2 ? '2' : '?') };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const results = files.map((f) => ({ slug: basename(f).replace(/\.mdx?$/, ''), ...audit(readFileSync(f, 'utf8')) }))
    .sort((a, b) => b.missing * 100 + b.gapCount - (a.missing * 100 + a.gapCount) || a.slug.localeCompare(b.slug));
  if (flags.has('--json')) console.log(JSON.stringify(results, null, 2));
  else if (flags.has('--md')) {
    console.log(`| # | Module | ${SECTIONS.map((_, i) => i + 1).join(' | ')} | ✅ | Gaps | Tier | Priority |`);
    console.log(`|---|---|${SECTIONS.map(() => ':-:').join('|')}|:-:|--:|:-:|:-:|`);
    const done = (r) => SECTIONS.filter((s) => r.scores[s] === '✅').length;
    results.sort((a, b) => done(a) - done(b) || b.gapCount - a.gapCount || a.slug.localeCompare(b.slug));
    results.forEach((r, i) => console.log(`| ${i + 1} | \`${r.slug}\` | ${SECTIONS.map((s) => r.scores[s]).join(' | ')} | ${done(r)}/13 | ${r.gapCount} | ${r.tier} | ${r.priority} |`));
  } else {
    for (const r of results) {
      console.log(`\n${r.slug} — ${r.gapCount} gaps, ${r.priority}, ${r.action}`);
      for (const s of SECTIONS) for (const g of r.gaps[s]) console.log(`  ${r.scores[s]} ${s}: ${g}`);
      for (const o of r.other) console.log(`  •  ${o}`);
    }
    console.log(`\n${results.filter((r) => !r.gapCount).length}/${results.length} modules have no countable gaps`);
  }
}
