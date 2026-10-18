// Everything this site stores about a learner lives in localStorage under
// this prefix (progress, review schedule, reflections) — NFR-05.
export const LEARNER_DATA_PREFIX = 'iel_';

function learnerKeys(storage) {
  return Array.from({ length: storage.length }, (_, i) => storage.key(i)).filter(
    (k) => k?.startsWith(LEARNER_DATA_PREFIX)
  );
}

// Returns { key: parsedValue } for every learner key, so it can be shown as-is.
export function readLearnerData(storage) {
  try {
    return Object.fromEntries(
      learnerKeys(storage).map((k) => {
        const raw = storage.getItem(k);
        try {
          return [k, JSON.parse(raw)];
        } catch {
          return [k, raw];
        }
      })
    );
  } catch {
    return {}; // storage unavailable (private browsing)
  }
}

export function clearLearnerData(storage) {
  try {
    learnerKeys(storage).forEach((k) => storage.removeItem(k));
  } catch {
    // storage unavailable: nothing stored, nothing to clear
  }
}
