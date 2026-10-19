#!/usr/bin/env node
// Writes src/data/pathways.json: each QuickStart's ordered module ids, read from the
// step table in its "Plan your pathway" section. My Progress uses it to show pathway
// completion (FR-19) without a second, hand-kept list. tests/pathways.test.mjs fails
// if the committed file is stale.
// Usage: node scripts/generate-pathways.mjs [--check]
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const DIR = 'docs/quickstarts';
const OUT = 'src/data/pathways.json';

export function buildPathways(dir = DIR) {
  return readdirSync(dir)
    .filter((f) => /\.mdx?$/.test(f))
    .sort()
    .map((f) => {
      const text = readFileSync(`${dir}/${f}`, 'utf8');
      const plan = text.match(/^## Plan your pathway[^\n]*\n([\s\S]*?)(?=^## |(?![\s\S]))/m)?.[1] ?? '';
      const modules = [...plan.matchAll(/^\|\s*\d+\s*\|\s*\[[^\]]+\]\(\.\.\/modules\/([a-z0-9-]+)\)/gm)].map((m) => m[1]);
      const label = text.match(/^sidebar_label:\s*(.+)$/m)?.[1] ?? text.match(/^title:\s*(.+)$/m)?.[1] ?? f;
      return { id: f.replace(/\.mdx?$/, ''), title: label.replace(/\s*\(QuickStart\)\s*$/, '').trim(), modules };
    })
    .filter((p) => p.modules.length);
}

export const render = (pathways) => JSON.stringify(pathways, null, 2) + '\n';

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const next = render(buildPathways());
  if (process.argv.includes('--check')) {
    if (readFileSync(OUT, 'utf8') !== next) {
      console.error(`❌ ${OUT} is out of date. Run: node scripts/generate-pathways.mjs`);
      process.exit(1);
    }
    console.log(`✅ ${OUT} is up to date`);
  } else {
    writeFileSync(OUT, next);
    console.log(`Wrote ${OUT}`);
  }
}
