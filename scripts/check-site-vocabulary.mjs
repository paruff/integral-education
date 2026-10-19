#!/usr/bin/env node
// FR-17 / fork-readiness-audit vocabulary gate for one stage site: finds the
// terms a learner on that site must not meet in the site's assembled docs and
// pages. Known uses sit in a baseline of counts per file and term that may only
// shrink; --strict (the launch gate) fails on any use at all.
// Usage: node scripts/check-site-vocabulary.mjs <id> [--strict] [--update-baseline]
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

function files(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? files(p) : /\.(mdx?|jsx?)$/.test(n) ? [p] : [];
  });
}

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Returns [{ file, term, count }] for every file and banned term that occurs.
// `ignore` is a list of { pattern } regexes for text that only looks like a banned term, such as
// an author's surname in a citation; matches are removed before counting.
export function findVocabulary(fileTexts, terms, ignore = []) {
  const found = [];
  for (const [file, raw] of Object.entries(fileTexts)) {
    const text = ignore.reduce((t, { pattern }) => t.replace(new RegExp(pattern, 'g'), ' '), raw);
    for (const { term, caseSensitive } of terms) {
      const re = new RegExp(`(?<![A-Za-z])${escape(term)}(?:s|es)?(?![A-Za-z])`, caseSensitive ? 'g' : 'gi');
      const count = (text.match(re) ?? []).length;
      if (count) found.push({ file, term, count });
    }
  }
  return found.sort((a, b) => (a.file + a.term).localeCompare(b.file + b.term));
}

const key = (e) => `${e.file} :: ${e.term}`;

// more: uses above the baseline (new or increased); fewer: baseline entries that have shrunk or gone.
export function compareVocabulary(found, baseline) {
  const base = new Map(baseline.map((e) => [key(e), e.count]));
  const now = new Map(found.map((e) => [key(e), e.count]));
  return {
    more: found.filter((e) => e.count > (base.get(key(e)) ?? 0)),
    fewer: baseline.filter((e) => (now.get(key(e)) ?? 0) < e.count),
  };
}

if (process.argv[1] && import.meta.url === new URL(process.argv[1], 'file://').href) {
  const args = process.argv.slice(2);
  const id = args.find((a) => !a.startsWith('--'));
  const site = JSON.parse(readFileSync('sites/sites.json', 'utf8')).find((s) => s.id === id);
  if (!site) {
    console.error('usage: check-site-vocabulary.mjs <id> [--strict] [--update-baseline]');
    process.exit(2);
  }
  const { terms, ignore } = JSON.parse(readFileSync(`sites/${id}.vocabulary.json`, 'utf8'));
  const roots = [`.sites-cache/${id}/docs`, `sites/${id}/pages`];
  const texts = Object.fromEntries(roots.flatMap((r) => files(r)).map((f) => [relative('.', f), readFileSync(f, 'utf8')]));
  const found = findVocabulary(texts, terms, ignore);
  if (args.includes('--update-baseline')) {
    writeFileSync(site.vocabularyBaseline, JSON.stringify(found, null, 2) + '\n');
    console.log(`Wrote ${found.length} entries to ${site.vocabularyBaseline}`);
    process.exit(0);
  }
  const baseline = existsSync(site.vocabularyBaseline) ? JSON.parse(readFileSync(site.vocabularyBaseline, 'utf8')) : [];
  const { more, fewer } = compareVocabulary(found, baseline);
  const total = found.reduce((n, e) => n + e.count, 0);
  let failed = false;
  if (more.length) {
    failed = true;
    console.error(`❌ ${id}: prohibited vocabulary above the baseline:\n  ${more.map((e) => `${e.file}: "${e.term}" x${e.count}`).join('\n  ')}`);
  }
  if (fewer.length) {
    failed = true;
    console.error(`❌ ${id}: ${fewer.length} baseline entr${fewer.length === 1 ? 'y has' : 'ies have'} shrunk. Run: node scripts/check-site-vocabulary.mjs ${id} --update-baseline\n  ${fewer.map(key).join('\n  ')}`);
  }
  if (args.includes('--strict') && total) {
    failed = true;
    console.error(`❌ ${id}: --strict: ${total} use(s) of prohibited vocabulary in ${found.length} file/term pair(s) (the launch gate needs 0).`);
  }
  if (failed) process.exit(1);
  console.log(`✅ ${id}: no new prohibited vocabulary (${total} known uses in the baseline)`);
}
