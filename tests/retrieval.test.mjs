import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  INTERVALS_DAYS,
  markIntervalComplete,
  isDue,
  slugifyModuleName,
} from '@site/src/utils/retrieval.js';

const daysAgo = (n) => new Date(Date.now() - n * 86400000).toISOString();

test('first review schedules the second interval', () => {
  const next = markIntervalComplete(undefined);
  assert.equal(next.intervalIndex, 1);
  assert.equal(next.complete, false);
  assert.ok(new Date(next.nextDueDate) > new Date());
});

test('a long-missed review drops back one interval, not to zero', () => {
  const next = markIntervalComplete({ intervalIndex: 2, lastReviewDate: daysAgo(30) });
  assert.equal(next.intervalIndex, 1);
});

test('the last on-time review completes the sequence', () => {
  const last = INTERVALS_DAYS.length - 1;
  const next = markIntervalComplete({ intervalIndex: last, lastReviewDate: daysAgo(INTERVALS_DAYS[last]) });
  assert.equal(next.complete, true);
  assert.equal(next.nextDueDate, null);
});

test('isDue is true only for past, incomplete entries', () => {
  assert.equal(isDue(undefined), false);
  assert.equal(isDue({ nextDueDate: daysAgo(1) }), true);
  assert.equal(isDue({ nextDueDate: daysAgo(-1) }), false);
  assert.equal(isDue({ nextDueDate: daysAgo(1), complete: true }), false);
});

test('slugifyModuleName makes URL-safe ids', () => {
  assert.equal(slugifyModuleName('Cognitive Bias 101!'), 'cognitive-bias-101');
});
