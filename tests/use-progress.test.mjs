import { test } from 'node:test';
import assert from 'node:assert/strict';
import { latest } from '@site/src/hooks/useProgress.js';

test('writes start from stored data, not a stale component copy', () => {
  const stored = { modules: { a: { completed: true } }, retrievalSchedule: { a: { intervalIndex: 1 } } };
  const map = new Map([['iel_progress_v1', JSON.stringify(stored)]]);
  globalThis.localStorage = { getItem: (k) => map.get(k) ?? null, setItem: (k, v) => map.set(k, v) };
  const stale = { modules: {}, retrievalSchedule: {} };
  assert.deepEqual(latest(stale).retrievalSchedule, stored.retrievalSchedule);
  assert.equal(latest(stale).modules.a.completed, true);
});
