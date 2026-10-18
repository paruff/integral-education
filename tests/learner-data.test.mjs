import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readLearnerData, clearLearnerData } from '@site/src/utils/learnerData.js';

// Minimal Web Storage stand-in.
function fakeStorage(entries) {
  const map = new Map(Object.entries(entries));
  return {
    get length() {
      return map.size;
    },
    key: (i) => [...map.keys()][i] ?? null,
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    removeItem: (k) => map.delete(k),
    has: (k) => map.has(k),
  };
}

const entries = {
  iel_progress_v1: JSON.stringify({ modules: { x: { completed: true } } }),
  iel_reflections_v1: JSON.stringify({ entries: [] }),
  iel_broken: '{not json',
  'other-site-key': 'keep me',
};

test('view: returns every learner key, parsed when possible', () => {
  const data = readLearnerData(fakeStorage(entries));
  assert.deepEqual(Object.keys(data).sort(), ['iel_broken', 'iel_progress_v1', 'iel_reflections_v1']);
  assert.equal(data.iel_progress_v1.modules.x.completed, true);
  assert.equal(data.iel_broken, '{not json');
});

test('reset: clears progress, schedule and reflections, leaves other keys', () => {
  const storage = fakeStorage(entries);
  clearLearnerData(storage);
  assert.deepEqual(readLearnerData(storage), {});
  assert.ok(storage.has('other-site-key'));
});

test('unavailable storage never throws', () => {
  const broken = {
    get length() {
      throw new Error('SecurityError');
    },
  };
  assert.deepEqual(readLearnerData(broken), {});
  assert.doesNotThrow(() => clearLearnerData(broken));
});
