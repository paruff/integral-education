import { useState, useCallback, useMemo } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { markIntervalComplete, isDue, interleaveDueCards } from '@site/src/utils/retrieval';
import { clearLearnerData, migrateLegacyData, siteKeys } from '@site/src/utils/learnerData';
import { appendReview, withActivity } from '@site/src/utils/metrics';

const DEFAULT_DATA = {
  modules: {},
  lineProfile: null,
  retrievalSchedule: {},
  // FR-19 process metrics: kept in this browser only and shown to the learner.
  reviewLog: [],
  activityDays: [],
  lastUpdated: null,
};


function loadFromStorage(keys) {
  try {
    migrateLegacyData(localStorage, keys.siteId);
    const raw = localStorage.getItem(keys.progress);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Ensure schema is valid
      if (parsed && typeof parsed === 'object' && parsed.modules) {
        // Older stored data may predate retrievalSchedule and the metrics logs — backfill them.
        return { retrievalSchedule: {}, reviewLog: [], activityDays: [], ...parsed };
      }
    }
    return { ...DEFAULT_DATA };
  } catch {
    // Private browsing or storage unavailable
    return null;
  }
}

// Several components each hold their own useProgress state. Writes start from
// what is in storage now, so one component can't overwrite another's changes
// (e.g. marking a module complete wiping the review schedule).
export function latest(prev, keys = siteKeys()) {
  return loadFromStorage(keys) || prev || { ...DEFAULT_DATA };
}

function saveToStorage(keys, data) {
  try {
    localStorage.setItem(keys.progress, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export default function useProgress() {
  // NFR-06: stage sites share one origin, so each stores under its own projectName.
  const { siteConfig } = useDocusaurusContext();
  const siteId = siteConfig.projectName;
  const keys = useMemo(() => siteKeys(siteId), [siteId]);
  const [data, setData] = useState(() => loadFromStorage(keys));
  const [isAvailable, setIsAvailable] = useState(() => {
    try {
      localStorage.setItem('__iel_test__', '1');
      localStorage.removeItem('__iel_test__');
      return true;
    } catch {
      return false;
    }
  });

  // If storage was unavailable on load, data is null
  const safeData = data || { ...DEFAULT_DATA };

  const updateModule = useCallback((moduleId, updates) => {
    const now = new Date().toISOString();
    setData((prev) => {
      const current = latest(prev, keys);
      const newData = {
        ...current,
        modules: {
          ...current.modules,
          [moduleId]: {
            ...(current.modules[moduleId] || {}),
            ...updates,
            lastVisited: now,
          },
        },
        lastUpdated: now,
      };
      const logged = withActivity(newData, now);
      saveToStorage(keys, logged);
      return logged;
    });
  }, [keys]);

  const getModule = useCallback(
    (moduleId) => {
      if (!safeData.modules) return null;
      return safeData.modules[moduleId] || null;
    },
    [safeData]
  );

  // Clears every learner key (progress, review schedule, reflections).
  const clear = useCallback(() => {
    setData({ ...DEFAULT_DATA });
    clearLearnerData(localStorage, siteId);
  }, [siteId]);

  const getDaysSinceLastActivity = useCallback(() => {
    if (!safeData.lastUpdated) return null;
    const last = new Date(safeData.lastUpdated);
    const now = new Date();
    const diff = Math.floor((now - last) / (1000 * 60 * 60 * 24));
    return diff;
  }, [safeData]);

  const completedCount = Object.values(safeData.modules || {}).filter(
    (m) => m.completed
  ).length;

  const updateLineProfile = useCallback((profile) => {
    const now = new Date().toISOString();
    setData((prev) => {
      const current = latest(prev, keys);
      const newData = {
        ...current,
        lineProfile: profile,
        lastUpdated: now,
      };
      const logged = withActivity(newData, now);
      saveToStorage(keys, logged);
      return logged;
    });
  }, [keys]);

  const hasLineProfile = safeData.lineProfile !== null;

  // cards are kept so due reviews can be mixed across modules (getMixedReview).
  // results ([{ cardId, outcome }]) go to the review log for the FR-19 metrics.
  const recordRetrievalReview = useCallback((moduleId, moduleName, cards, results) => {
    const now = new Date().toISOString();
    setData((prev) => {
      const current = latest(prev, keys);
      const priorEntry = (current.retrievalSchedule || {})[moduleId];
      const nextEntry = {
        ...markIntervalComplete(priorEntry),
        moduleName,
        cards: cards ?? priorEntry?.cards,
      };
      const reviewLog = appendReview(current.reviewLog, {
        moduleId,
        at: now,
        dueAt: priorEntry?.nextDueDate ?? null,
        results: results ?? [],
      });
      const newData = {
        ...current,
        retrievalSchedule: {
          ...current.retrievalSchedule,
          [moduleId]: nextEntry,
        },
        reviewLog,
        lastUpdated: now,
      };
      const logged = withActivity(newData, now);
      saveToStorage(keys, logged);
      return logged;
    });
  }, [keys]);

  const getDueReviews = useCallback(() => {
    const schedule = safeData.retrievalSchedule || {};
    return Object.entries(schedule)
      .filter(([, entry]) => isDue(entry))
      .map(([moduleId, entry]) => ({ moduleId, moduleName: entry.moduleName, nextDueDate: entry.nextDueDate }));
  }, [safeData]);

  const getMixedReview = useCallback(
    () => interleaveDueCards(safeData.retrievalSchedule),
    [safeData]
  );

  return {
    data: safeData,
    siteId,
    isAvailable,
    updateModule,
    getModule,
    clear,
    getDaysSinceLastActivity,
    completedCount,
    updateLineProfile,
    recordRetrievalReview,
    getDueReviews,
    getMixedReview,
    hasLineProfile,
  };
}