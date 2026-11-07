import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import useProgress, { latest, saveToStorage } from '@site/src/hooks/useProgress.js';
import { siteKeys } from '@site/src/utils/learnerData.js';

test('writes start from stored data, not a stale component copy', () => {
  const stored = { modules: { a: { completed: true } }, retrievalSchedule: { a: { intervalIndex: 1 } } };
  const map = new Map([['iel_integral-education_progress_v1', JSON.stringify(stored)]]);
  globalThis.localStorage = { getItem: (k) => map.get(k) ?? null, setItem: (k, v) => map.set(k, v) };
  const stale = { modules: {}, retrievalSchedule: {} };
  assert.deepEqual(latest(stale).retrievalSchedule, stored.retrievalSchedule);
  assert.equal(latest(stale).modules.a.completed, true);
});

test('progress is read from the site\'s own key, and legacy data carries over to it', () => {
  const legacy = { modules: { a: { completed: true } }, retrievalSchedule: {} };
  const map = new Map([['iel_progress_v1', JSON.stringify(legacy)]]);
  globalThis.localStorage = { getItem: (k) => map.get(k) ?? null, setItem: (k, v) => map.set(k, v) };
  assert.equal(latest(null, siteKeys('integral-education')).modules.a.completed, true);
  assert.ok(map.has('iel_integral-education_progress_v1'));
  assert.equal(latest(null, siteKeys('stage-site')).modules.a, undefined, 'a stage site starts empty');
  assert.ok(map.has('iel_progress_v1'), 'old data kept');
});

test('saveToStorage reports failure instead of hiding it', () => {
  const keys = siteKeys('integral-education');
  globalThis.localStorage = { setItem: () => { throw new Error('quota'); } };
  assert.equal(saveToStorage(keys, { modules: {} }), false);
  globalThis.localStorage = { setItem: () => {} };
  assert.equal(saveToStorage(keys, { modules: {} }), true);
});

test('the first render never reads storage, so it matches the server render', () => {
  globalThis.localStorage = new Proxy({}, { get() { throw new Error('storage read during render'); } });
  function Probe() {
    const { isAvailable, completedCount } = useProgress();
    return createElement('p', null, `available=${isAvailable} completed=${completedCount}`);
  }
  assert.match(renderToString(createElement(Probe)), /available=true completed=0/);
});
