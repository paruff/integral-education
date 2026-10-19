#!/usr/bin/env node
// Checks the self-regulation parts of every QuickStart (G3): an if-then planning
// prompt, visible progress, a suggested pace (FR-13), a pathway map with a mixed
// review at least every three modules (FR-05, FR-16) and a mastery threshold on
// every step (FR-07). Each step's threshold must match the module's own Assess
// "Passing threshold". Judgment calls (is the pace realistic, does the map
// explain) stay in the quickstart-validator skill.
// Usage: node scripts/check-quickstarts.mjs [file...]
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { basename } from 'node:path';

const DIR = 'docs/quickstarts';
const MODULES = 'docs/modules';
const MAX_RUN = 3;

const unescapeLabel = (s) => s.replace(/#quot;/g, '"').replace(/#amp;/g, '&').trim();

function readThreshold(slug) {
  for (const ext of ['md', 'mdx']) {
    const p = `${MODULES}/${slug}.${ext}`;
    if (existsSync(p)) {
      // Drop in-module cross-references such as "(see the checkpoint below)"; they mean nothing on a QuickStart.
      return readFileSync(p, 'utf8').match(/^\*\*Passing threshold:\*\*\s*(.+)$/m)?.[1].replace(/\s*\(see [^)]*\)/g, '').trim() ?? null;
    }
  }
  return undefined; // module file missing
}

export function checkQuickStart(text, thresholdOf = readThreshold) {
  const problems = [];
  const plan = text.match(/^## Plan your pathway[^\n]*\n([\s\S]*?)(?=^## |(?![\s\S]))/m)?.[1];
  if (!plan) return ['no "## Plan your pathway" section (FR-13)'];

  if (!/When \[[^\]]+\], I will/.test(plan)) problems.push('planning prompt has no if-then template "When [time/place], I will..." (FR-13)');
  if (!/\]\([^)]*my-progress\)/.test(plan)) problems.push('no link to My Progress for visible progress and due reviews (FR-13)');
  if (!/\*\*Suggested pace:\*\*\s*\S/.test(plan)) problems.push('no "**Suggested pace:**" (FR-13)');
  if (!/\*\*Mastery before moving on:\*\*[^\n]*advisory/i.test(plan)) problems.push('no "**Mastery before moving on:**" statement saying the gate is advisory (FR-07)');

  const rows = [...plan.matchAll(/^\|\s*(\d+)\s*\|\s*\[([^\]]+)\]\(\.\.\/modules\/([a-z0-9-]+)\)\s*\|\s*(.*?)\s*\|\s*$/gm)];
  if (!rows.length) problems.push('no step table with "| n | [Module](../modules/slug) | Pass when |" rows (FR-07)');
  rows.forEach(([, n, , slug, pass]) => {
    const real = thresholdOf(slug);
    if (real === undefined) problems.push(`step ${n}: module "${slug}" does not exist`);
    else if (!pass) problems.push(`step ${n}: no mastery threshold (FR-07)`);
    else if (real && real !== pass) problems.push(`step ${n}: threshold differs from the "Passing threshold" in ${slug} (FR-07)`);
  });

  const map = plan.match(/```mermaid([\s\S]*?)```/)?.[1];
  if (!map) { problems.push('no Mermaid pathway map (FR-16)'); return problems; }
  if (!/accTitle:/.test(map) || !/accDescr/.test(map)) problems.push('pathway map lacks accTitle/accDescr (FR-16)');

  const nodes = [...map.matchAll(/\b[A-Za-z][A-Za-z0-9]*(?:\["([^"]+)"\]|\(\["([^"]+)"\]\))/g)];
  const seen = new Set();
  const order = [];
  for (const m of nodes) {
    const label = unescapeLabel(m[1] ?? m[2]);
    if (seen.has(m[0])) continue;
    seen.add(m[0]);
    order.push(label);
  }
  const steps = order.filter((l) => /^\d+\.\s/.test(l)).map((l) => l.replace(/^\d+\.\s+/, ''));
  const tableTitles = rows.map((r) => unescapeLabel(r[2]));
  if (steps.join('|') !== tableTitles.join('|')) problems.push('pathway map steps do not match the step table, in the same order (FR-16)');

  let run = 0;
  let reviews = 0;
  for (const label of order) {
    if (/^\d+\.\s/.test(label)) { if (++run > MAX_RUN) { problems.push(`more than ${MAX_RUN} modules without a mixed review (FR-05)`); break; } }
    else if (/^Mixed review/i.test(label)) { run = 0; reviews++; }
  }
  if (steps.length >= MAX_RUN && !reviews) problems.push('pathway map has no "Mixed review" point (FR-05)');
  return problems;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const files = process.argv.length > 2
    ? process.argv.slice(2)
    : readdirSync(DIR).filter((f) => /\.mdx?$/.test(f)).map((f) => `${DIR}/${f}`);
  const problems = files.flatMap((f) => checkQuickStart(readFileSync(f, 'utf8')).map((p) => `${basename(f)}: ${p}`));
  if (problems.length) {
    const failing = new Set(problems.map((p) => p.split(':')[0])).size;
    console.error(`❌ ${failing}/${files.length} QuickStarts miss part of the self-paced scaffolds:\n  ${problems.join('\n  ')}`);
    process.exit(1);
  }
  console.log(`✅ ${files.length}/${files.length} QuickStarts pass the self-paced pathway check`);
}
