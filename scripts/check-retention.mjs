#!/usr/bin/env node
// Fails if any module lacks spaced retrieval (FR-04) or a mastery threshold
// in its Assess section (FR-07). Usage: node scripts/check-retention.mjs
import { readdirSync, readFileSync } from 'node:fs';

const DIR = 'docs/modules';
const files = readdirSync(DIR).filter((f) => /\.mdx?$/.test(f));
const problems = [];

for (const file of files) {
  const text = readFileSync(`${DIR}/${file}`, 'utf8');

  if (!/<RetrievalPrompt[\s\S]*?cards=\{\[\s*\{/.test(text)) {
    problems.push(`${file}: no <RetrievalPrompt> with cards`);
  }

  // An Assess span runs from its H2 to the next journey H2 (one starting with
  // an emoji, e.g. "## ⏱️ Retrieval Schedule"), since some modules put the
  // rubric under plain sub-H2s like "## Performance Task".
  const assessSections = [];
  let current = null;
  for (const s of text.split(/^(?=## )/m)) {
    if (/^## .*assess/i.test(s)) assessSections.push((current = [s]));
    else if (current && /^## [A-Za-z0-9(]/.test(s)) current.push(s);
    else current = null;
  }
  assessSections.forEach((parts, i) => (assessSections[i] = parts.join('')));
  if (!assessSections.length) {
    problems.push(`${file}: no Assess section`);
  } else if (!assessSections.some((s) => s.includes('**Passing threshold:**'))) {
    problems.push(`${file}: Assess section has no "**Passing threshold:**"`);
  }
}

if (problems.length) {
  console.error(`❌ ${problems.length} retention problem(s) in ${files.length} modules:\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
console.log(`✅ ${files.length}/${files.length} modules have spaced retrieval and a stated mastery threshold`);
