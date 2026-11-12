import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { audit, parse, SECTIONS } from '../scripts/audit-modules.mjs';

const doc = (body, fm = 'id: x\ntags:\n  - tier-1') => `---\n${fm}\n---\n${body}`;

test('a custom H2 under a journey heading counts toward that stage', () => {
  const { sections } = parse(doc('## 🧘 Practice\n\n## Late-Green Inventory\n\n1. Step\n\n## Encounter — Three Practices\n\n## 🔍 Reflect\n'));
  assert.deepEqual(sections.map((s) => s.stage), ['Practice', 'Practice', 'Practice', 'Reflect']);
});

test('Gifts and Limitations headings are not swallowed by the stage they sit in', () => {
  const { sections } = parse(doc('## 🔄 Integrate\n\n## The Gifts of Orange\n'));
  assert.equal(sections[1].stage, 'Concept');
});

test('an empty module scores every section missing or partial', () => {
  const r = audit(doc('Nothing here.'));
  assert.equal(SECTIONS.filter((s) => r.scores[s] === '✅').length, 0);
  assert.equal(r.scores['Safety Note'], '❌');
  assert.equal(r.priority, 'P0');
});

test('a Tier 1 note on a module tagged tier-2 is a P0 mismatch', () => {
  const r = audit(doc(':::note Safety Note\n**Tier:** 1 — Standard\nThis content is educational, not therapeutic.\n:::\n', 'id: x\nsafety_tier: 2\ntags:\n  - tier-2'));
  assert.ok(r.gaps['Safety Note'].some((g) => g.includes('disagrees')));
  assert.equal(r.priority, 'P0');
});

test('the three modules brought to standard stay free of countable gaps', () => {
  for (const f of ['systems-thinking-101.md', 'emotional-granularity.md', 'cognitive-line-concrete-to-formal.mdx']) {
    const r = audit(readFileSync(`docs/modules/${f}`, 'utf8'));
    assert.deepEqual([...SECTIONS.flatMap((s) => r.gaps[s]), ...r.other], [], f);
  }
});
