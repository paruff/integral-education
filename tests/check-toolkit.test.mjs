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

test('a Retrieval Schedule row that rereads the material fails; rereading own work passes', () => {
  const sched = (row) => `${passing}\n## ⏱️ Retrieval Schedule\n\n| 24 hours | ${row} |\n`;
  assert.ok(checkModule(sched('Re-read the Gifts section.')).some((p) => p.includes('Retrieval Schedule')));
  assert.deepEqual(checkModule(sched('Re-read your journal entry and note what changed.')), []);
  assert.deepEqual(checkModule(sched('Without looking, list the three stages.')), []);
});
