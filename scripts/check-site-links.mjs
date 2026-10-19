#!/usr/bin/env node
// FR-18: a stage site never links to another stage or to the main AQAL site.
// Reads a built site and reports every internal link that leaves the site or
// does not resolve to a built page or file. Known violations live in a baseline
// file that may only shrink: a new violation fails, and --strict (the launch
// gate) fails on any violation at all.
// Usage: node scripts/check-site-links.mjs <outDir> <baseUrl> [--baseline file] [--strict]
import { readdirSync, readFileSync, existsSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? htmlFiles(join(dir, e.name)) : e.name.endsWith('.html') ? [join(dir, e.name)] : []
  );
}

// Returns [{ page, href, reason }] for internal links that leave the site or are broken.
export function findLinkProblems(outDir, baseUrl) {
  const origin = 'http://site.invalid';
  const problems = [];
  const seen = new Set();
  for (const file of htmlFiles(outDir)) {
    const rel = relative(outDir, file).split(sep).join('/');
    const pagePath = rel === 'index.html' ? '' : rel.replace(/(^|\/)index\.html$/, '/').replace(/\.html$/, '');
    const pageUrl = new URL(baseUrl + pagePath, origin);
    const html = readFileSync(file, 'utf8');
    for (const m of html.matchAll(/<a\b[^>]*?\shref="([^"]*)"/g)) {
      const href = m[1].replace(/&amp;/g, '&');
      if (!href || href.startsWith('#') || /^(mailto:|tel:|javascript:)/i.test(href)) continue;
      let url;
      try {
        url = new URL(href, pageUrl);
      } catch {
        continue;
      }
      if (url.origin !== origin) continue; // external
      const key = `${rel} ${url.pathname}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const page = rel === 'index.html' ? 'index.html' : rel;
      if (!url.pathname.startsWith(baseUrl)) {
        problems.push({ page, href: url.pathname, reason: 'outside-site' });
        continue;
      }
      const local = decodeURIComponent(url.pathname.slice(baseUrl.length));
      const candidates = [local, `${local}.html`, join(local, 'index.html')];
      const found = candidates.some((c) => {
        const p = join(outDir, c);
        return existsSync(p) && statSync(p).isFile();
      });
      if (!found) problems.push({ page, href: url.pathname, reason: 'broken' });
    }
  }
  return problems.sort((a, b) => (a.page + a.href).localeCompare(b.page + b.href));
}

export const problemKey = (p) => `${p.page} -> ${p.href}`;

// Splits problems into those already in the baseline and new ones; also lists baseline entries that no longer occur.
export function compareToBaseline(problems, baseline) {
  const known = new Set(baseline.map(problemKey));
  const current = new Set(problems.map(problemKey));
  return {
    fresh: problems.filter((p) => !known.has(problemKey(p))),
    fixed: baseline.filter((b) => !current.has(problemKey(b))),
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const [outDir, baseUrl] = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--baseline');
  const flag = (name) => args.indexOf(name);
  const baselineFile = flag('--baseline') >= 0 ? args[flag('--baseline') + 1] : null;
  const strict = flag('--strict') >= 0;
  const update = flag('--update-baseline') >= 0;
  if (!outDir || !baseUrl) {
    console.error('usage: check-site-links.mjs <outDir> <baseUrl> [--baseline file] [--strict] [--update-baseline]');
    process.exit(2);
  }
  const problems = findLinkProblems(outDir, baseUrl);
  if (update && baselineFile) {
    writeFileSync(baselineFile, JSON.stringify(problems, null, 2) + '\n');
    console.log(`Wrote ${problems.length} entries to ${baselineFile}`);
    process.exit(0);
  }
  const baseline = baselineFile && existsSync(baselineFile) ? JSON.parse(readFileSync(baselineFile, 'utf8')) : [];
  const { fresh, fixed } = compareToBaseline(problems, baseline);
  let failed = false;
  if (fresh.length) {
    failed = true;
    console.error(`❌ ${outDir}: ${fresh.length} new link(s) leave the site or are broken:\n  ${fresh.map((p) => `${problemKey(p)} (${p.reason})`).join('\n  ')}`);
  }
  if (fixed.length) {
    failed = true;
    console.error(`❌ ${outDir}: ${fixed.length} baseline entr${fixed.length === 1 ? 'y is' : 'ies are'} fixed. Remove ${fixed.length === 1 ? 'it' : 'them'} from ${baselineFile}:\n  ${fixed.map(problemKey).join('\n  ')}`);
  }
  if (strict && problems.length) {
    failed = true;
    console.error(`❌ ${outDir}: --strict: ${problems.length} link(s) leave the site or are broken (launch gate needs 0).`);
  }
  if (failed) process.exit(1);
  console.log(`✅ ${outDir}: no new links leave the site (${problems.length} known in baseline)`);
}
