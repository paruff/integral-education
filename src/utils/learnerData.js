// Everything this site stores about a learner lives in localStorage under
// the `iel_` prefix (progress, review schedule, reflections) — NFR-05.
// Stage sites share one origin, so every key also carries the site's
// projectName and a site never reads, shows or clears another site's keys — NFR-06.
export const LEARNER_DATA_PREFIX = 'iel_';
export const MAIN_SITE_ID = 'integral-education';

// Keys written before NFR-06, when there was only the main site.
const LEGACY_PROGRESS_KEY = 'iel_progress_v1';
const LEGACY_REFLECTIONS_KEY = 'iel_reflections_v1';

export function siteKeys(siteId = MAIN_SITE_ID) {
  const id = String(siteId).toLowerCase().replace(/[^a-z0-9-]/g, '-');
  const main = id === MAIN_SITE_ID;
  return {
    siteId: id,
    prefix: `${LEARNER_DATA_PREFIX}${id}_`,
    progress: `${LEARNER_DATA_PREFIX}${id}_progress_v1`,
    reflections: `${LEARNER_DATA_PREFIX}${id}_reflections_v1`,
    // Only the main site adopts legacy data: it is the only site that wrote it.
    legacy: main ? [LEGACY_PROGRESS_KEY, LEGACY_REFLECTIONS_KEY] : [],
    legacyFor: main ? { progress: LEGACY_PROGRESS_KEY, reflections: LEGACY_REFLECTIONS_KEY } : {},
  };
}

// Copies pre-NFR-06 data to the site's own keys, once. The old keys are kept
// (nothing is lost if a learner returns to an older build) and shown/cleared with the rest.
export function migrateLegacyData(storage, siteId = MAIN_SITE_ID) {
  const keys = siteKeys(siteId);
  try {
    for (const kind of ['progress', 'reflections']) {
      const legacy = keys.legacyFor[kind];
      if (!legacy || storage.getItem(keys[kind]) !== null) continue;
      const old = storage.getItem(legacy);
      if (old !== null) storage.setItem(keys[kind], old);
    }
  } catch {
    // storage unavailable (private browsing): nothing to migrate
  }
}

function learnerKeys(storage, siteId) {
  const { prefix, legacy } = siteKeys(siteId);
  return Array.from({ length: storage.length }, (_, i) => storage.key(i)).filter(
    (k) => k && (k.startsWith(prefix) || legacy.includes(k))
  );
}

// Returns { key: parsedValue } for every key this site stores, so it can be shown as-is.
export function readLearnerData(storage, siteId = MAIN_SITE_ID) {
  try {
    return Object.fromEntries(
      learnerKeys(storage, siteId).map((k) => {
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

export function clearLearnerData(storage, siteId = MAIN_SITE_ID) {
  try {
    learnerKeys(storage, siteId).forEach((k) => storage.removeItem(k));
  } catch {
    // storage unavailable: nothing stored, nothing to clear
  }
}
