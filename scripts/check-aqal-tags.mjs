#!/usr/bin/env node
/**
 * check-aqal-tags.mjs — audits module stage/line/tier tags against
 * docs/maps/aqal-competency-map.md (P6-04). Read-only; exits 1 on any mismatch.
 *
 * Checks: required AQAL metadata present ("Minimum Metadata Required for New Modules"),
 * values drawn from the map's vocabulary, and tier-2 tag <-> safety_tier agreement.
 */
import { readFileSync, readdirSync } from 'fs';
import { resolve } from 'path';
import yaml from 'js-yaml';

const DIR = resolve(import.meta.dirname, '../docs/modules');
const QUADRANTS = ['I', 'We', 'It', 'Its'];
const LINES = ['cognitive', 'emotional', 'moral', 'interpersonal', 'somatic', 'spiritual', 'self'];
const TIERS = [1, 2, 3];

let problems = 0;
const report = (f, msg) => { problems++; console.log(`  ${f}: ${msg}`); };

for (const f of readdirSync(DIR).filter(n => /\.mdx?$/.test(n)).sort()) {
  const m = readFileSync(resolve(DIR, f), 'utf8').match(/^---\n([\s\S]*?)\n---\n/);
  const d = (m && yaml.load(m[1])) || {};
  for (const k of ['quadrants', 'level', 'lines', 'states', 'types']) {
    if (d[k] == null || (Array.isArray(d[k]) && !d[k].length)) report(f, `missing ${k}`);
  }
  for (const q of [].concat(d.quadrants ?? [])) if (!QUADRANTS.includes(q)) report(f, `unknown quadrant "${q}"`);
  for (const l of [].concat(d.lines ?? [])) if (!LINES.includes(l)) report(f, `unknown line "${l}"`);
  const tags = d.tags ?? [];
  if (d.safety_tier != null && !TIERS.includes(Number(d.safety_tier))) report(f, `safety_tier ${d.safety_tier} not 1-3`);
  if (tags.includes('tier-2') !== (Number(d.safety_tier) === 2)) report(f, `tier-2 tag (${tags.includes('tier-2')}) disagrees with safety_tier (${d.safety_tier})`);
}
console.log(problems ? `\n${problems} mismatches` : 'AQAL tags match the competency map');
process.exit(problems ? 1 : 0);
