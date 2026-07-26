// Spaced-retrieval interval scheduler.
// Corrected forgetting-curve logic: a missed review drops back ONE interval
// (not a reset to zero) — a single lapse shouldn't erase all prior progress.
// "Missed" means the learner returned well past the expected review window,
// not just slightly late.

export const INTERVALS_DAYS = [1, 3, 7, 14];
export const MISS_THRESHOLD_MULTIPLIER = 1.5;

export function slugifyModuleName(moduleName) {
  return moduleName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function daysSince(isoDateString) {
  const then = new Date(isoDateString);
  const now = new Date();
  return Math.floor((now - then) / (1000 * 60 * 60 * 24));
}

function addDays(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

// progress: { intervalIndex, lastReviewDate, nextDueDate, complete } | undefined
// Returns the next progress state after a review just happened.
export function markIntervalComplete(progress) {
  const currentIndex = progress?.intervalIndex ?? 0;
  const expectedDays = INTERVALS_DAYS[currentIndex];

  const missed = progress?.lastReviewDate
    ? daysSince(progress.lastReviewDate) > expectedDays * MISS_THRESHOLD_MULTIPLIER
    : false;

  const nextIndex = missed
    ? Math.max(0, currentIndex - 1)
    : Math.min(INTERVALS_DAYS.length - 1, currentIndex + 1);

  const isComplete = !missed && currentIndex === INTERVALS_DAYS.length - 1;

  return {
    intervalIndex: nextIndex,
    lastReviewDate: new Date().toISOString(),
    nextDueDate: isComplete ? null : addDays(INTERVALS_DAYS[nextIndex]),
    complete: isComplete,
  };
}

export function isDue(progress) {
  if (!progress || progress.complete || !progress.nextDueDate) return false;
  return new Date(progress.nextDueDate) <= new Date();
}
