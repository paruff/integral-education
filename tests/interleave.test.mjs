import { test } from 'node:test';
import assert from 'node:assert/strict';
import { interleaveDueCards } from '@site/src/utils/retrieval.js';

const past = new Date(Date.now() - 86400000).toISOString();
const future = new Date(Date.now() + 86400000).toISOString();
const cards = (prefix, n) => Array.from({ length: n }, (_, i) => ({ q: `${prefix}${i}`, a: 'x' }));

const schedule = {
  a: { moduleName: 'A', nextDueDate: past, cards: cards('a', 3) },
  b: { moduleName: 'B', nextDueDate: past, cards: cards('b', 2) },
  c: { moduleName: 'C', nextDueDate: past, cards: cards('c', 4) },
  notDue: { moduleName: 'N', nextDueDate: future, cards: cards('n', 2) },
  noCards: { moduleName: 'O', nextDueDate: past },
};

test('mixes cards from 3 due modules instead of one module at a time', () => {
  // Round-robin, default cap of 3 per module: c3 is left for the next session.
  const qs = interleaveDueCards(schedule).map((c) => c.q);
  assert.deepEqual(qs, ['a0', 'b0', 'c0', 'a1', 'b1', 'c1', 'a2', 'c2']);
});

test('caps cards per module and skips modules that are not due or have no cards', () => {
  const mixed = interleaveDueCards(schedule, 2);
  assert.equal(mixed.length, 6);
  assert.ok(mixed.every((c) => ['a', 'b', 'c'].includes(c.moduleId)));
  assert.equal(mixed[0].moduleName, 'A');
});

test('nothing due gives an empty review', () => {
  assert.deepEqual(interleaveDueCards({ notDue: schedule.notDue }), []);
});
