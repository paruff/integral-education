import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkModule } from '../scripts/check-toolkit.mjs';

const fence = '```';
const passing = `
:::tip Before you read
1. Why do feedback loops matter?
:::
**Evidence tier:** A — meta-analysis
**Evidence tier:** B — framework
${fence}mermaid
flowchart LR
  accTitle: Loop
  accDescr: A feeds B, B feeds A
  A --> B --> A
${fence}
**Back to your opening questions:** they matter because...
<RetrievalPrompt cards={[{q: "What is a loop?", a: "Output becomes input"}]} />
`;

test('a module with every toolkit marker passes', () => {
  assert.deepEqual(checkModule(passing), []);
});

test('missing markers are each reported', () => {
  const problems = checkModule('<RetrievalPrompt cards={[{q: "Q?"}]} /> learning styles; reread the Learn section');
  for (const fr of ['FR-08', 'FR-10', 'FR-11', 'FR-14', 'FR-16']) {
    assert.ok(problems.some((p) => p.includes(fr)), `expected a ${fr} problem`);
  }
});

test('a diagram without accTitle fails', () => {
  const noAlt = passing.replace('  accTitle: Loop\n', '');
  assert.ok(checkModule(noAlt).some((p) => p.includes('accTitle')));
});

test('a Retrieval Schedule row must ask for recall before rereading or opening anything', () => {
  const sched = (row) => `${passing}\n## ⏱️ Retrieval Schedule\n\n| 24 hours | ${row} |\n`;
  const bad = (row) => checkModule(sched(row)).some((p) => p.includes('Retrieval Schedule'));
  assert.ok(bad('Re-read the Gifts section.'));
  assert.ok(bad('Open the journal entry you wrote and note what changed.'));
  assert.ok(!bad('Without looking, list the three stages, then check the Learn section.'));
  assert.ok(!bad('Without looking, write what your map showed, then open it and compare.'));
  assert.ok(!bad('Apply one Integrate activity and journal what you noticed.'));
});
