import { useState, useCallback, useEffect } from 'react';
import { markIntervalComplete, isDue, interleaveDueCards } from '@site/src/utils/retrieval';
import { clearLearnerData } from '@site/src/utils/learnerData';

const STORAGE_KEY = 'iel_progress_v1';

const DEFAULT_DATA = {
  modules: {},
  lineProfile: null,
  retrievalSchedule: {},
  lastUpdated: null,
};

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Ensure schema is valid
      if (parsed && typeof parsed === 'object' && parsed.modules) {
        // Older stored data may predate retrievalSchedule — backfill it.
        return { retrievalSchedule: {}, ...parsed };
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
export function latest(prev) {
  return loadFromStorage() || prev || { ...DEFAULT_DATA };
}

function saveToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export default function useProgress() {
  const [data, setData] = useState(() => loadFromStorage());
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
      const current = latest(prev);
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
      saveToStorage(newData);
      return newData;
    });
  }, []);

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
    clearLearnerData(localStorage);
  }, []);

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
      const current = latest(prev);
      const newData = {
        ...current,
        lineProfile: profile,
        lastUpdated: now,
      };
      saveToStorage(newData);
      return newData;
    });
  }, []);

  const hasLineProfile = safeData.lineProfile !== null;

  // cards are kept so due reviews can be mixed across modules (getMixedReview).
  const recordRetrievalReview = useCallback((moduleId, moduleName, cards) => {
    const now = new Date().toISOString();
    setData((prev) => {
      const current = latest(prev);
      const priorEntry = (current.retrievalSchedule || {})[moduleId];
      const nextEntry = {
        ...markIntervalComplete(priorEntry),
        moduleName,
        cards: cards ?? priorEntry?.cards,
      };
      const newData = {
        ...current,
        retrievalSchedule: {
          ...current.retrievalSchedule,
          [moduleId]: nextEntry,
        },
        lastUpdated: now,
      };
      saveToStorage(newData);
      return newData;
    });
  }, []);

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