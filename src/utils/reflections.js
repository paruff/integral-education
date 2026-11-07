import { localDay } from './metrics.js';

// Daily reflections are stored one entry per local day so today's writing never replaces
// yesterday's: { v: 2, days: { 'YYYY-MM-DD': { happened, felt, ..., _lastUpdated } } }.
// Before this, the whole key held a single flat entry; it is kept under the day it was last written.

// raw: the parsed stored value (any shape). Returns { [day]: entry }.
export function readDays(raw, today = localDay()) {
  if (!raw || typeof raw !== 'object') return {};
  if (raw.v === 2 && raw.days && typeof raw.days === 'object') return raw.days;
  const written = Date.parse(raw._lastUpdated);
  return { [Number.isNaN(written) ? today : localDay(written)]: raw };
}

export function setField(days, day, field, value, nowIso = new Date().toISOString()) {
  return { ...days, [day]: { ...(days[day] || {}), [field]: value, _lastUpdated: nowIso } };
}

export function toStored(days) {
  return { v: 2, days };
}

// Days to offer in the picker, newest first: today, plus every day with something written.
export function daysToShow(days, today = localDay()) {
  const written = Object.keys(days).filter((d) => Object.entries(days[d]).some(([k, v]) => !k.startsWith('_') && String(v).trim()));
  return [...new Set([today, ...written])].sort().reverse();
}
