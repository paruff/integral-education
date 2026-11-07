import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  INTERVALS_DAYS,
  markIntervalComplete,
  isDue,
  slugifyModuleName,
} from '@site/src/utils/retrieval.js';

const daysAgo = (n) => new Date(Date.now() - n * 86400000).toISOString();

const inDays = (iso) => Math.round((new Date(iso) - Date.now()) / 86400000);

test('the first review schedules the first interval: due in 1 day', () => {
  const next = markIntervalComplete(undefined);
  assert.equal(next.intervalIndex, 0);
  assert.equal(next.complete, false);
  assert.equal(inDays(next.nextDueDate), 1);
});

test('on-time reviews walk 1, 3, 7, 14 days, then complete', () => {
  const due = [];
  let p = markIntervalComplete(undefined);
  for (let i = 0; i < 4; i += 1) {
    due.push(inDays(p.nextDueDate));
    // the learner comes back exactly when it was due
    p = markIntervalComplete({ ...p, lastReviewDate: daysAgo(INTERVALS_DAYS[p.intervalIndex]), nextDueDate: daysAgo(0) });
    if (p.complete) break;
  }
  assert.deepEqual(due, [1, 3, 7, 14]);
  assert.equal(p.complete, true);
});

test('a card rated needs-review repeats the interval instead of advancing', () => {
  const prior = { intervalIndex: 1, lastReviewDate: daysAgo(3), nextDueDate: daysAgo(0) };
  const results = [{ cardId: 'a', outcome: 'remembered' }, { cardId: 'b', outcome: 'needs-review' }];
  assert.equal(markIntervalComplete(prior, results).intervalIndex, 1);
  assert.equal(markIntervalComplete(prior, [{ cardId: 'a', outcome: 'remembered' }]).intervalIndex, 2);
});

test('missing cards on the last interval does not complete the sequence', () => {
  const last = INTERVALS_DAYS.length - 1;
  const prior = { intervalIndex: last, lastReviewDate: daysAgo(INTERVALS_DAYS[last]), nextDueDate: daysAgo(0) };
  const next = markIntervalComplete(prior, [{ cardId: 'a', outcome: 'needs-review' }]);
  assert.equal(next.complete, false);
  assert.equal(next.intervalIndex, last);
});

test('a review done before it is due, or after completion, leaves the schedule alone', () => {
  const early = { intervalIndex: 1, lastReviewDate: daysAgo(1), nextDueDate: daysAgo(-2) };
  assert.equal(markIntervalComplete(early, []), early);
  const done = { intervalIndex: 3, complete: true, nextDueDate: null };
  assert.equal(markIntervalComplete(done, []), done);
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
