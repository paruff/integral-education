---
name: learner-experience
description: "Use this skill whenever building interactive learning components, adaptive assessments, progress tracking, spaced retrieval scheduling, somatic practice timers, partner prompts, or any component that improves the learner's experience beyond static content. Trigger when: creating React components for use in MDX modules, building the competency map, implementing the transition assessment, adding a practice timer or readiness check, implementing the spaced retrieval scheduler, or designing any interactive layer of the platform. Load alongside docusaurus-conventions whenever building components."
---

# Learner Experience — Component Patterns and UX Principles

The platform's content is strong. The learner experience layer is what transforms static modules into a living learning system. This skill governs all interactive components.

---

## Design principles

### 1. Stage-neutral language in all UI copy
No stage names visible to learners in any component. Use plain-language descriptions of experience, not developmental labels.
- ❌ "You appear to be at Amber stage"
- ✅ "This path might be a good fit for you right now"

### 2. Low friction — no account required
All components must work on first visit. Use `localStorage` for state. No login, no signup, no email required for core learning features.

### 3. Progressive disclosure
Surface the minimum needed. More on request. Components should not overwhelm — they orient.

### 4. Somatic awareness in timed components
Any component involving time or pacing uses language that invites rather than pressures:
- ❌ "Timer: 0:45 remaining" (creates urgency)
- ✅ "Take your time. The practice continues when you're ready."
- Include pause/resume on all timers

### 5. Accessibility — WCAG AA minimum
- All interactive elements keyboard accessible
- All timers have text alternatives to audio cues
- Color is never the only indicator of state
- Labels on all inputs; aria-labels on icon-only buttons

---

## Component library

### TransitionAssessment.jsx

**Purpose:** Surface the learner's likely current transition and route them to the relevant QuickStart.

**Location:** `src/components/TransitionAssessment.jsx`

**Props:** none (reads from localStorage for returning users)

**Behavior:**
- 5–7 questions, one at a time, with a progress indicator
- Questions framed as present experience ("I've been noticing..." not "I am...")
- Each question covers one line: cognitive, emotional, interpersonal, moral, somatic
- Scoring: weighted toward recognizing transition signals
- Output: plain-language description of what the learner may be experiencing + link to relevant QuickStart
- Saves last assessment date and result to localStorage
- "Take again" available after 30 days

**Question design template:**
```jsx
const questions = [
  {
    id: 'q1',
    line: 'cognitive',
    text: "Lately, I find that rules and clear guidelines feel...",
    options: [
      { value: 'a', text: "Reassuring — they help me know what's expected" },
      { value: 'b', text: "Helpful but sometimes too rigid for complex situations" },
      { value: 'c', text: "Limiting — I need to think through each situation myself" },
      { value: 'd', text: "Just one perspective among many" },
    ]
  },
  // ...
];
```

**Scoring and routing:**
```js
// Score thresholds (simplified — actual scoring weights each question by transition signal strength)
const routes = {
  amber_orange: { min: 0, max: 30, quickstart: '/docs/quickstarts/amber-to-rational' },
  orange_green: { min: 31, max: 60, quickstart: '/docs/quickstarts/rational-to-pluralistic' },
  green_teal:   { min: 61, max: 90, quickstart: '/docs/quickstarts/pluralistic-to-integral' },
};
```

**Result display (plain language, no stage names):**
```
"It sounds like you might be in a period of transition — where the approaches that used to work well for you are starting to feel incomplete. [QuickStart name] was designed for exactly this moment. →"
```

---

### CompetencyMap.jsx

**Purpose:** Show the learner's progress across all lines and modules, with retrieval due dates surfaced.

**Location:** `src/components/CompetencyMap.jsx`

**Props:** none (reads from localStorage)

**Display:**
- Grid: rows = lines of development (Self, Cognitive, Emotional, Interpersonal, Moral, Somatic, Spiritual), columns = stages (Magenta, Red, Amber, Orange, Green, Teal)
- Each cell: module completion badge (empty / in progress / complete / due for review)
- "Next recommended" prominently displayed at top
- Mobile-responsive: collapses to a vertical list on narrow screens

**localStorage schema:**
```js
// Key: 'ie_progress'
{
  completedModules: ['rational-orange-orientation', 'late-orange-disillusionment'],
  retrievalDue: {
    'rational-orange-orientation': '2026-06-08T00:00:00Z',
    'late-orange-disillusionment': '2026-06-12T00:00:00Z',
  },
  lastAssessment: '2026-05-15T00:00:00Z',
  assessmentResult: 'orange_green',
}
```

---

### RetrievalScheduler.js

**Purpose:** Track the 4-interval spaced retrieval schedule and surface due items.

**Location:** `src/utils/retrieval.js`

**Intervals:**
```js
const INTERVALS_DAYS = [1, 3, 7, 14]; // 24h, 72h, 7d, 14d

function getNextInterval(moduleId) {
  const progress = getModuleProgress(moduleId);
  const currentInterval = progress.intervalIndex || 0;
  if (currentInterval >= INTERVALS_DAYS.length) return null; // complete
  return INTERVALS_DAYS[currentInterval];
}

function markIntervalComplete(moduleId) {
  const progress = getModuleProgress(moduleId);
  const nextIndex = (progress.intervalIndex || 0) + 1;
  
  // If learner missed interval by >50% of the interval length, reset to 0
  const daysSinceLastReview = daysSince(progress.lastReviewDate);
  const expectedDays = INTERVALS_DAYS[progress.intervalIndex || 0];
  const reset = daysSinceLastReview > expectedDays * 1.5;
  
  saveModuleProgress(moduleId, {
    intervalIndex: reset ? 0 : nextIndex,
    lastReviewDate: new Date().toISOString(),
    nextDueDate: addDays(new Date(), INTERVALS_DAYS[reset ? 0 : nextIndex] || 0),
  });
}
```

**Surface on Start Here page:**
```jsx
function DueReviews() {
  const due = getDueModules(); // modules where nextDueDate <= today
  if (due.length === 0) return null;
  return (
    <div className="review-prompt">
      <h3>Ready for review</h3>
      {due.map(module => (
        <a key={module.id} href={module.url}>
          {module.title} — last reviewed {daysAgo(module.lastReviewDate)} days ago
        </a>
      ))}
    </div>
  );
}
```

---

### ReadinessCheck.jsx

**Purpose:** Help learners self-select whether a QuickStart path fits them right now.

**Location:** `src/components/ReadinessCheck.jsx`

**Props:**
```jsx
<ReadinessCheck
  questions={[
    "I sometimes feel like the approach I've always used is no longer quite enough",
    "I'm noticing more complexity in situations that used to feel clear",
    "I'm curious about perspectives very different from my own",
  ]}
  yesPath="/docs/quickstarts/this-quickstart"
  noPath="/docs/quickstarts/previous-quickstart"
  aheadPath="/docs/quickstarts/next-quickstart"
/>
```

**Three outcomes:**
- 2–3 "yes" → "This path fits where you are right now →"
- 0–1 "yes" → "It sounds like [previous path] might be a better fit right now →"
- All "yes" + "I've already done this work" → "You might be ready for [next path] →"

**Framing:** Orientation, not gatekeeping. All three outcomes are positive.

---

### PracticeTimer.jsx

**Purpose:** In-page timer for timed practices.

**Location:** `src/components/PracticeTimer.jsx`

**Props:**
```jsx
<PracticeTimer
  duration={1200}          // seconds (1200 = 20 min)
  label="Body scan practice"
  bellAtStart={true}
  bellAtEnd={true}
/>
```

**Behavior:**
- Visual countdown display (MM:SS)
- Pause/Resume button — always present
- Audio bell (Web Audio API, no external dependency) — optional, off by default, user can enable
- Text alternative to audio: "Practice complete" displayed when timer ends
- No data collection — purely in-session state

**Pacing language displayed during practice:**
```
0:00 — "Begin when you're ready."
[midpoint] — "You're halfway through. Take your time."
[last 60s] — "Begin to bring your attention back to the room."
[complete] — "Practice complete. Take a moment before moving on."
```

---

### PartnerPrompt.jsx

**Purpose:** Help learners find and work with a practice partner for Interpersonal line modules.

**Location:** `src/components/PartnerPrompt.jsx`

**Used only in Interpersonal line modules.**

**Props:**
```jsx
<PartnerPrompt
  practice="Perspective-taking dialogue"
  duration="30 minutes"
  checkInQuestions={[
    "What did you notice in your body during this conversation?",
    "Where did you feel most present? Most defended?",
    "What surprised you about your partner's perspective?",
  ]}
/>
```

**Display:**
- Copy-paste invitation message pre-filled with module name and practice description
- Partner check-in template (printable / copy-pasteable)
- "Already have a partner" flow → goes straight to the check-in template

---

## localStorage schema (full platform)

```js
// Key: 'ie_progress' — all learner state
{
  version: 1,
  completedModules: ['module-slug-1', 'module-slug-2'],
  inProgressModules: ['module-slug-3'],
  retrievalSchedule: {
    'module-slug-1': {
      intervalIndex: 2,
      lastReviewDate: '2026-06-01T00:00:00Z',
      nextDueDate: '2026-06-08T00:00:00Z',
    }
  },
  assessment: {
    lastTaken: '2026-05-15T00:00:00Z',
    result: 'orange_green',
    routedTo: '/docs/quickstarts/rational-to-pluralistic',
  },
}
```

**Reset function** — always provide a way for learners to clear their data:
```js
function clearAllProgress() {
  localStorage.removeItem('ie_progress');
}
```

---

## MDX integration pattern

```mdx
import PracticeTimer from '@site/src/components/PracticeTimer';
import ReadinessCheck from '@site/src/components/ReadinessCheck';
import PartnerPrompt from '@site/src/components/PartnerPrompt';

## Is this path right for you?

<ReadinessCheck questions={[...]} yesPath="..." noPath="..." aheadPath="..." />

## Practice

<PracticeTimer duration={1200} label="Body scan" />

1. Begin by settling into your seat...
```

---

## What not to build

- No gamification (points, badges, streaks) — creates extrinsic motivation that undermines intrinsic developmental motivation
- No social comparison features — learner progress is private
- No email capture within learning components — marketing is separate
- No push notifications — the platform respects the learner's pace
- No AI chat within modules — the Content Authoring agent's carefully crafted practices should not be overridden by a generic chatbot
