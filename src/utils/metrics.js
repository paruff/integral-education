// Process metrics (FR-19), computed in the learner's browser from their own
// stored data and shown only to them. Nothing here is sent anywhere.
//
// reviewLog entry: { moduleId, at, dueAt | null, results: [{ cardId, outcome }] }
//   outcome is 'remembered' | 'needs-review'; dueAt is null for a module's first review.

const DAY_MS = 24 * 60 * 60 * 1000;
const MAX_REVIEW_LOG = 500;
const MAX_ACTIVITY_DAYS = 400;

// Adds a review to the log, keeping only the most recent MAX_REVIEW_LOG.
export function appendReview(reviewLog = [], entry) {
  return [...reviewLog, entry].slice(-MAX_REVIEW_LOG);
}

// Records the day of `nowIso` (UTC date) as a day the learner did something, for the return-visit metric.
export function withActivity(data, nowIso) {
  const day = nowIso.slice(0, 10);
  const days = data.activityDays || [];
  return days.includes(day) ? data : { ...data, activityDays: [...days, day].slice(-MAX_ACTIVITY_DAYS) };
}

// Share of scheduled reviews done no later than `graceDays` after they were due.
// Early reviews count as on time. A module's first review has no due date and is skipped.
export function onTimeReviewRate(reviewLog = [], graceDays = 2) {
  const scheduled = reviewLog.filter((r) => r.dueAt);
  const onTime = scheduled.filter((r) => new Date(r.at) - new Date(r.dueAt) <= graceDays * DAY_MS).length;
  return { onTime, total: scheduled.length, rate: scheduled.length ? onTime / scheduled.length : null };
}

// Calibration gap: of the cards rated "remembered", the share rated "needs-review"
// the next time the same card came up. A high gap means the learner over-rates what
// they know. Compared across consecutive reviews of the same card only.
export function calibrationGap(reviewLog = []) {
  const last = new Map();
  let pairs = 0;
  let missed = 0;
  const chronological = [...reviewLog].sort((a, b) => new Date(a.at) - new Date(b.at));
  for (const review of chronological) {
    for (const { cardId, outcome } of review.results ?? []) {
      if (last.get(cardId) === 'remembered') {
        pairs += 1;
        if (outcome === 'needs-review') missed += 1;
      }
      last.set(cardId, outcome);
    }
  }
  return { missed, pairs, gap: pairs ? missed / pairs : null };
}

// How much of one pathway (a list of module ids) the learner has marked complete.
export function pathwayCompletion(modules = {}, pathwayModules = []) {
  const done = pathwayModules.filter((id) => modules[id]?.completed).length;
  const started = pathwayModules.filter((id) => modules[id]).length;
  return { done, started, total: pathwayModules.length, rate: pathwayModules.length ? done / pathwayModules.length : null };
}

// Return visits, from the days (YYYY-MM-DD, UTC) on which the learner did anything.
// A window is true if they came back inside it, null if it has not ended and they have
// not come back yet, false if it ended without a return.
export function returnVisits(activityDays = [], now = new Date()) {
  const days = [...new Set(activityDays)].sort();
  if (!days.length) return { firstDay: null, distinctDays: 0, within7: null, within30: null };
  const first = new Date(`${days[0]}T00:00:00Z`);
  const window = (n) => {
    const back = days.some((d) => {
      const diff = (new Date(`${d}T00:00:00Z`) - first) / DAY_MS;
      return diff >= 1 && diff <= n;
    });
    if (back) return true;
    return (new Date(now) - first) / DAY_MS > n ? false : null;
  };
  return { firstDay: days[0], distinctDays: days.length, within7: window(7), within30: window(30) };
}

// pathways: [{ id, title, modules: [moduleId] }]. Only pathways the learner has started are listed.
export function computeMetrics(data = {}, pathways = [], now = new Date()) {
  return {
    reviews: onTimeReviewRate(data.reviewLog),
    calibration: calibrationGap(data.reviewLog),
    returns: returnVisits(data.activityDays, now),
    pathways: pathways
      .map((p) => ({ id: p.id, title: p.title, ...pathwayCompletion(data.modules, p.modules) }))
      .filter((p) => p.started > 0),
  };
}

// The only fields that can leave the browser (P10-03). Counts and rates only:
// no card text, answers, ratings, reflections or dates.
export function buildExport(metrics, now = new Date()) {
  const { reviews, calibration, returns, pathways } = metrics;
  return {
    exportedOn: new Date(now).toISOString().slice(0, 10),
    reviews: { onTime: reviews.onTime, total: reviews.total },
    calibration: { missed: calibration.missed, pairs: calibration.pairs },
    returns: { distinctDays: returns.distinctDays, within7: returns.within7, within30: returns.within30 },
    pathways: pathways.map((p) => ({ id: p.id, done: p.done, total: p.total })),
  };
}
