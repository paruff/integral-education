import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readLearnerData, clearLearnerData, migrateLegacyData, siteKeys } from '@site/src/utils/learnerData.js';

// Minimal Web Storage stand-in.
function fakeStorage(entries) {
  const map = new Map(Object.entries(entries));
  return {
    get length() {
      return map.size;
    },
    key: (i) => [...map.keys()][i] ?? null,
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => map.set(k, String(v)),
    removeItem: (k) => map.delete(k),
    has: (k) => map.has(k),
  };
}

const entries = {
  'iel_integral-education_progress_v1': JSON.stringify({ modules: { x: { completed: true } } }),
  'iel_integral-education_reflections_v1': JSON.stringify({ entries: [] }),
  'iel_integral-education_broken': '{not json',
  iel_progress_v1: JSON.stringify({ modules: { old: { completed: true } } }),
  'iel_stage-site_progress_v1': JSON.stringify({ modules: { y: { completed: true } } }),
  'other-site-key': 'keep me',
};

test('view: returns every learner key, parsed when possible', () => {
  const data = readLearnerData(fakeStorage(entries));
  assert.deepEqual(Object.keys(data).sort(), [
    'iel_integral-education_broken',
    'iel_integral-education_progress_v1',
    'iel_integral-education_reflections_v1',
    'iel_progress_v1',
  ]);
  assert.equal(data['iel_integral-education_progress_v1'].modules.x.completed, true);
  assert.equal(data['iel_integral-education_broken'], '{not json');
});

test('reset: clears progress, schedule and reflections, leaves other keys', () => {
  const storage = fakeStorage(entries);
  clearLearnerData(storage);
  assert.deepEqual(readLearnerData(storage), {});
  assert.ok(storage.has('other-site-key'));
  assert.ok(storage.has('iel_stage-site_progress_v1'), 'another site\'s data is untouched');
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

test('two sites on one origin do not overwrite or show each other\'s data', () => {
  const storage = fakeStorage(entries);
  assert.deepEqual(Object.keys(readLearnerData(storage, 'stage-site')), ['iel_stage-site_progress_v1']);
  clearLearnerData(storage, 'stage-site');
  assert.ok(storage.has('iel_integral-education_progress_v1'));
  assert.ok(storage.has('iel_progress_v1'));
  assert.notEqual(siteKeys('a').progress, siteKeys('b').progress);
});

test('migration: the main site copies legacy data to its own key and keeps the old key', () => {
  const storage = fakeStorage({ iel_progress_v1: '{"modules":{"old":{}}}', iel_reflections_v1: '{"a":1}' });
  migrateLegacyData(storage, 'integral-education');
  assert.equal(storage.getItem('iel_integral-education_progress_v1'), '{"modules":{"old":{}}}');
  assert.equal(storage.getItem('iel_integral-education_reflections_v1'), '{"a":1}');
  assert.ok(storage.has('iel_progress_v1') && storage.has('iel_reflections_v1'), 'old data kept');
});

test('migration: never overwrites newer data, and stage sites do not adopt legacy data', () => {
  const storage = fakeStorage({ iel_progress_v1: '{"old":1}', 'iel_integral-education_progress_v1': '{"new":1}' });
  migrateLegacyData(storage, 'integral-education');
  assert.equal(storage.getItem('iel_integral-education_progress_v1'), '{"new":1}');
  migrateLegacyData(storage, 'stage-site');
  assert.equal(storage.getItem('iel_stage-site_progress_v1'), null);
});

test('renameModuleIds: moves progress, schedule and review log to renamed ids, leaves others', async () => {
  const { renameModuleIds } = await import('@site/src/utils/learnerData.js');
  assert.deepEqual(renameModuleIds({ modules: { keep: { completed: true } } }), { modules: { keep: { completed: true } } });
  assert.equal(renameModuleIds(null), null);
});
