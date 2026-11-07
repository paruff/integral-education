import { test } from 'node:test';
import assert from 'node:assert/strict';
import { daysToShow, readDays, setField, toStored } from '@site/src/utils/reflections.js';

process.env.TZ = 'UTC';

test('an old single entry is kept under the day it was written', () => {
  const old = { happened: 'a walk', _lastUpdated: '2026-03-04T10:00:00.000Z' };
  assert.deepEqual(readDays(old, '2026-03-10'), { '2026-03-04': old });
});

test('an old entry with no usable date lands on today; junk reads as empty', () => {
  assert.deepEqual(readDays({ happened: 'x' }, '2026-03-10'), { '2026-03-10': { happened: 'x' } });
  assert.deepEqual(readDays({ happened: 'x', _lastUpdated: 'nope' }, '2026-03-10'), { '2026-03-10': { happened: 'x', _lastUpdated: 'nope' } });
  assert.deepEqual(readDays(null), {});
  assert.deepEqual(readDays('text'), {});
});

test('writing today leaves yesterday untouched and does not mutate the input', () => {
  const days = { '2026-03-09': { happened: 'yesterday' } };
  const next = setField(days, '2026-03-10', 'happened', 'today', '2026-03-10T08:00:00.000Z');
  assert.equal(next['2026-03-09'].happened, 'yesterday');
  assert.equal(next['2026-03-10'].happened, 'today');
  assert.deepEqual(days, { '2026-03-09': { happened: 'yesterday' } });
});

test('stored shape round-trips', () => {
  const days = setField({}, '2026-03-10', 'felt', 'calm', 'x');
  assert.deepEqual(readDays(JSON.parse(JSON.stringify(toStored(days)))), days);
});

test('the picker lists today plus days with writing, newest first', () => {
  const days = { '2026-03-01': { happened: 'a' }, '2026-03-05': { happened: '   ', _lastUpdated: 'x' }, '2026-03-09': { felt: 'b' } };
  assert.deepEqual(daysToShow(days, '2026-03-10'), ['2026-03-10', '2026-03-09', '2026-03-01']);
});
