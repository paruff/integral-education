#!/usr/bin/env node
// Checks the mechanical parts of the learning toolkit in every module:
// generation questions (FR-08), model answers on retrieval cards (FR-10),
// no "learning styles" or reread-as-study (FR-11), inline evidence tiers
// (FR-14) and an accessible explanatory diagram (FR-16). Judgment calls
// (elaboration, load, whether a diagram explains) stay in the
// module-authoring checklist. Usage: node scripts/check-toolkit.mjs [file...]
import { readdirSync, readFileSync } from 'node:fs';
import { basename } from 'node:path';

const DIR = 'docs/modules';
const files = process.argv.length > 2
  ? process.argv.slice(2)
  : readdirSync(DIR).filter((f) => /\.mdx?$/.test(f)).map((f) => `${DIR}/${f}`);

export function checkModule(text) {
  const problems = [];
  if (!text.includes(':::tip Before you read')) problems.push('no ":::tip Before you read" generation questions (FR-08)');
  if (!text.includes('**Back to your opening questions:**')) problems.push('no "**Back to your opening questions:**" return (FR-08)');

  const cards = text.match(/\{\s*q:[\s\S]*?\}/g) ?? [];
  if (cards.some((c) => !/\ba:\s*["'`]/.test(c))) problems.push('a retrieval card has no model answer (FR-10)');

  if (/learning[- ]styles?\b/i.test(text)) problems.push('mentions "learning style(s)" (FR-11)');
  if (/re-?read (the|this) (learn|module|section|lesson|material)/i.test(text)) problems.push('rereading the material is set as a study activity (FR-11)');

  if ((text.match(/\*\*Evidence tier:\*\* [ABC]\b/g) ?? []).length < 2) problems.push('fewer than 2 inline "**Evidence tier:** A|B|C" framework tags (FR-14)');

  const diagrams = text.match(/```mermaid[\s\S]*?```/g) ?? [];
  if (!diagrams.length && !/<svg[\s\S]*?<\/svg>/.test(text)) problems.push('no Mermaid or SVG diagram (FR-16)');
  if (diagrams.some((d) => !/accTitle:/.test(d) || !/accDescr/.test(d))) problems.push('a Mermaid diagram lacks accTitle/accDescr (FR-16)');
  return problems;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const problems = files.flatMap((f) => checkModule(readFileSync(f, 'utf8')).map((p) => `${basename(f)}: ${p}`));
  if (problems.length) {
    const failing = new Set(problems.map((p) => p.split(':')[0])).size;
    console.error(`❌ ${failing}/${files.length} modules miss part of the learning toolkit:\n  ${problems.join('\n  ')}`);
    process.exit(1);
  }
  console.log(`✅ ${files.length}/${files.length} modules pass the learning-toolkit check`);
}
