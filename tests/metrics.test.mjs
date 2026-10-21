import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  onTimeReviewRate,
  calibrationGap,
  pathwayCompletion,
  returnVisits,
  computeMetrics,
  appendReview,
  withActivity,
  buildExport,
} from '@site/src/utils/metrics.js';
import { cardId } from '@site/src/utils/retrieval.js';

const d = (iso) => `${iso}T12:00:00.000Z`;

test('on-time reviews: within 2 days of due counts, later does not, first reviews are skipped', () => {
  const log = [
    { moduleId: 'a', at: d('2026-01-01'), dueAt: null, results: [] }, // first review: no due date
    { moduleId: 'a', at: d('2026-01-03'), dueAt: d('2026-01-02'), results: [] }, // 1 day late
    { moduleId: 'a', at: d('2026-01-10'), dueAt: d('2026-01-12'), results: [] }, // early
    { moduleId: 'b', at: d('2026-01-20'), dueAt: d('2026-01-10'), results: [] }, // 10 days late
    { moduleId: 'b', at: d('2026-01-12'), dueAt: d('2026-01-10'), results: [] }, // exactly 2 days late
  ];
  assert.deepEqual(onTimeReviewRate(log), { onTime: 3, total: 4, rate: 0.75 });
});

test('on-time reviews: no scheduled reviews gives no rate', () => {
  assert.deepEqual(onTimeReviewRate([]), { onTime: 0, total: 0, rate: null });
  assert.equal(onTimeReviewRate(undefined).rate, null);
});

test('calibration gap: remembered then needs-review next time, per card', () => {
  const log = [
    { at: d('2026-01-01'), results: [{ cardId: 'x', outcome: 'remembered' }, { cardId: 'y', outcome: 'remembered' }, { cardId: 'z', outcome: 'needs-review' }] },
    { at: d('2026-01-04'), results: [{ cardId: 'x', outcome: 'needs-review' }, { cardId: 'y', outcome: 'remembered' }, { cardId: 'z', outcome: 'remembered' }] },
    { at: d('2026-01-11'), results: [{ cardId: 'y', outcome: 'needs-review' }] },
  ];
  // pairs where the earlier rating was "remembered": x (missed), y (kept), y (missed) => 2 of 3
  assert.deepEqual(calibrationGap(log), { missed: 2, pairs: 3, gap: 2 / 3 });
});

test('calibration gap: reads the log in time order and ignores cards seen once', () => {
  const log = [
    { at: d('2026-01-04'), results: [{ cardId: 'x', outcome: 'needs-review' }] },
    { at: d('2026-01-01'), results: [{ cardId: 'x', outcome: 'remembered' }, { cardId: 'solo', outcome: 'remembered' }] },
  ];
  assert.deepEqual(calibrationGap(log), { missed: 1, pairs: 1, gap: 1 });
  assert.equal(calibrationGap([]).gap, null);
});

test('pathway completion: counts completed and started modules of one pathway', () => {
  const modules = { a: { completed: true }, b: { completed: false }, other: { completed: true } };
  assert.deepEqual(pathwayCompletion(modules, ['a', 'b', 'c']), { done: 1, started: 2, total: 3, rate: 1 / 3 });
  assert.equal(pathwayCompletion({}, []).rate, null);
});

test('return visits: back within 7 days, within 30 days only, or not yet', () => {
  const now = new Date('2026-03-01T00:00:00Z');
  assert.deepEqual(returnVisits(['2026-02-01', '2026-02-05'], now), { firstDay: '2026-02-01', distinctDays: 2, within7: true, within30: true });
  const late = returnVisits(['2026-01-01', '2026-01-20'], now);
  assert.equal(late.within7, false);
  assert.equal(late.within30, true);
  const noReturn = returnVisits(['2026-01-01'], now);
  assert.equal(noReturn.within7, false);
  assert.equal(noReturn.within30, false);
  const recent = returnVisits(['2026-02-28'], now);
  assert.equal(recent.within7, null, 'the window has not ended yet');
  assert.equal(recent.within30, null);
});

test('return visits: same-day activity is not a return, and no activity is empty', () => {
  const now = new Date('2026-03-01T00:00:00Z');
  assert.equal(returnVisits(['2026-02-01', '2026-02-01'], now).within7, false);
  assert.deepEqual(returnVisits([], now), { firstDay: null, distinctDays: 0, within7: null, within30: null });
});

test('computeMetrics lists only pathways the learner has started', () => {
  const data = { modules: { a: { completed: true } }, reviewLog: [], activityDays: ['2026-01-01'] };
  const pathways = [{ id: 'p1', title: 'One', modules: ['a', 'b'] }, { id: 'p2', title: 'Two', modules: ['z'] }];
  const m = computeMetrics(data, pathways, new Date('2026-01-02T00:00:00Z'));
  assert.deepEqual(m.pathways.map((p) => p.id), ['p1']);
  assert.equal(m.pathways[0].done, 1);
});

test('logging: reviews are appended and capped; activity days are added once a day', () => {
  let log = [];
  for (let i = 0; i < 502; i += 1) log = appendReview(log, { moduleId: 'a', at: String(i), dueAt: null, results: [] });
  assert.equal(log.length, 500);
  assert.equal(log[0].at, '2', 'oldest entries are dropped');

  const once = withActivity({ activityDays: [] }, '2026-01-01T09:00:00.000Z');
  assert.deepEqual(once.activityDays, ['2026-01-01']);
  assert.equal(withActivity(once, '2026-01-01T20:00:00.000Z'), once, 'same day: unchanged');
  assert.deepEqual(withActivity(once, '2026-01-02T00:00:00.000Z').activityDays, ['2026-01-01', '2026-01-02']);
  assert.deepEqual(withActivity({}, '2026-01-01T00:00:00.000Z').activityDays, ['2026-01-01']);
});

test('cardId is stable across spacing and case, and differs between questions', () => {
  assert.equal(cardId('What is  a loop?'), cardId('  what is a loop? '));
  assert.notEqual(cardId('What is a loop?'), cardId('What is a cycle?'));
});

test('buildExport keeps counts only: no titles, dates of activity or card data', () => {
  const m = computeMetrics(
    { modules: { a: { completed: true } }, activityDays: ['2026-10-01'], reviewLog: [{ cardId: 'x', dueDate: '2026-10-01', reviewedAt: '2026-10-01', remembered: true }] },
    [{ id: 'p', title: 'Secret title', modules: ['a', 'b'] }],
    new Date('2026-10-02'),
  );
  const out = buildExport(m, new Date('2026-10-02'));
  assert.equal(out.exportedOn, '2026-10-02');
  assert.deepEqual(out.pathways, [{ id: 'p', done: 1, total: 2 }]);
  const text = JSON.stringify(out);
  for (const leak of ['Secret title', 'firstDay', 'cardId', '"x"']) assert.ok(!text.includes(leak), leak);
});
