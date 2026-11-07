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
// results: [{ cardId, outcome }] from the review that just finished.
// Returns the next progress state after a review just happened.
//   - the first review schedules the first interval (1 day), as the modules promise;
//   - a review done before it was due, or after the sequence is complete, changes nothing;
//   - any card rated "needs-review" repeats the same interval instead of advancing;
//   - coming back well past the window drops back one interval;
//   - otherwise the schedule advances, and the last interval completes it.
export function markIntervalComplete(progress, results = []) {
  if (progress?.complete) return progress;
  if (progress?.nextDueDate && new Date(progress.nextDueDate) > new Date()) return progress;

  const currentIndex = progress?.intervalIndex ?? 0;
  const expectedDays = INTERVALS_DAYS[currentIndex];

  const late = progress?.lastReviewDate
    ? daysSince(progress.lastReviewDate) > expectedDays * MISS_THRESHOLD_MULTIPLIER
    : false;
  const forgot = results.some((r) => r.outcome === 'needs-review');

  let nextIndex;
  if (!progress) nextIndex = 0;
  else if (late) nextIndex = Math.max(0, currentIndex - 1);
  else if (forgot) nextIndex = currentIndex;
  else nextIndex = Math.min(INTERVALS_DAYS.length - 1, currentIndex + 1);

  const isComplete = !!progress && !late && !forgot && currentIndex === INTERVALS_DAYS.length - 1;

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

// Interleaved review (FR-05): mix cards from every due module round-robin, so
// no two neighbouring questions come from the same module while others remain.
// Capped per module to keep one sitting short.
// schedule: { [moduleId]: { moduleName, nextDueDate, cards: [{ q, a, criteria? }] } }
export function interleaveDueCards(schedule, maxPerModule = 3) {
  const decks = Object.entries(schedule || {})
    .filter(([, entry]) => isDue(entry) && entry.cards?.length)
    .map(([moduleId, entry]) =>
      entry.cards.slice(0, maxPerModule).map((card) => ({ ...card, moduleId, moduleName: entry.moduleName }))
    );
  const longest = Math.max(0, ...decks.map((d) => d.length));
  return Array.from({ length: longest }, (_, i) => decks.map((d) => d[i]).filter(Boolean)).flat();
}

// Stable short id for a card, from its question text, so a card's ratings can be
// followed across reviews (calibration, FR-10/FR-19) without storing the text twice.
export function cardId(question) {
  let h = 5381;
  for (const ch of String(question).trim().toLowerCase().replace(/\s+/g, ' ')) {
    h = ((h * 33) ^ ch.codePointAt(0)) >>> 0;
  }
  return h.toString(36);
}
