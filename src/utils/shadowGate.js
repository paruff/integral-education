// Decides what the shadow-work entry gate does with a learner's answers.
// Contraindications are checked before distress: a learner who says they are in
// crisis or have active PTSD is never offered the "proceed anyway" override,
// whatever distress number they chose.
export const HIGH_DISTRESS = 7;

// distress: '1'..'10' or null (not chosen). contraindications: { [key]: boolean }.
// Returns 'incomplete' | 'contraindication' | 'distress' | 'pass'.
export function gateOutcome(distress, contraindications = {}) {
  const level = parseInt(distress, 10);
  if (Number.isNaN(level)) return 'incomplete';
  if (Object.values(contraindications).some(Boolean)) return 'contraindication';
  return level >= HIGH_DISTRESS ? 'distress' : 'pass';
}
