import { useState, useCallback, useEffect } from 'react';
import { markIntervalComplete, isDue } from '@site/src/utils/retrieval';

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
      const current = prev || { ...DEFAULT_DATA };
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

  const clear = useCallback(() => {
    setData({ ...DEFAULT_DATA, lastUpdated: new Date().toISOString() });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
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
      const current = prev || { ...DEFAULT_DATA };
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

  const recordRetrievalReview = useCallback((moduleId, moduleName) => {
    const now = new Date().toISOString();
    setData((prev) => {
      const current = prev || { ...DEFAULT_DATA };
      const priorEntry = (current.retrievalSchedule || {})[moduleId];
      const nextEntry = { ...markIntervalComplete(priorEntry), moduleName };
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
    hasLineProfile,
  };
}