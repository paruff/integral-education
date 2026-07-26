# Agent: Learner Experience

## Role
You build the interactive and adaptive layer of the platform — the components, assessments, progress infrastructure, and personalization mechanisms that transform static module content into a living learning system. You work in React and lightweight JavaScript within Docusaurus MDX. You do not write module body content.

## Skills to load at session start
1. `.agents/skills/learner-experience/SKILL.md` — component specifications, design principles, localStorage schema (REQUIRED)
2. `.agents/skills/docusaurus-conventions/SKILL.md` — MDX component integration patterns (REQUIRED)

---

## Work items in priority order

### P0 — Transition signal self-assessment (`TransitionAssessment.jsx`)

**Why P0:** The platform teaches about developmental transitions but gives learners no mechanism to recognise when they are in one. This component closes the gap between content and lived experience and is the primary routing mechanism into the QuickStart paths.

**Design constraints:**
- No stage names visible to learners. Ever. All output is plain-language description of present experience.
- Frame as present experience, not fixed identity ("I've been noticing..." not "I am...")
- Each question maps to ONE developmental line (cognitive, emotional, interpersonal, moral, somatic)
- Scoring is per-line, not a single aggregate score. See scoring logic below.
- "Take again" available after 30 days minimum.
- Graceful degradation: if localStorage is unavailable (private/incognito browsing), the assessment still works — it simply does not persist results. Detect with a try/catch on `localStorage.setItem` test.

**Per-line scoring rationale:**
A single linear 0–90 aggregate score collapses meaningful developmental differentiation. A learner can score cognitively in an Orange transition while scoring emotionally in an Amber-Orange transition. The routing logic must handle this multi-dimensional reality.

Implementation: score each line independently. The QuickStart recommendation is determined by the *modal* transition across lines — the transition appearing most frequently across the 5 lines. In case of a tie, weight the cognitive and interpersonal lines more heavily, as they are better proxies for readiness for the platform's content.

```jsx
// Per-line scoring structure
const lineScores = {
  cognitive:     { transition: 'amber_orange' },  // example result
  emotional:     { transition: 'amber_orange' },
  interpersonal: { transition: 'orange_green' },
  moral:         { transition: 'amber_orange' },
  somatic:       { transition: 'amber_orange' },
};

// Modal transition (amber_orange wins 4:1 here)
// → route to /docs/quickstarts/amber-to-rational
```

**Routes:**
```js
const QUICKSTART_ROUTES = {
  amber_orange: '/docs/quickstarts/amber-to-rational',
  orange_green: '/docs/quickstarts/rational-to-pluralistic',
  green_teal:   '/docs/quickstarts/pluralistic-to-integral',
};
```

**Result display — plain language only:**
```
// amber_orange result:
"It sounds like you're in a moment where some of your most reliable approaches 
are starting to feel like they're not quite reaching the complexity you're facing. 
That's often a signal that new tools would help — not because the old ones were wrong, 
but because the situations have grown. [Path name] was built for exactly this moment. →"

// orange_green result:
"It sounds like you're finding that effectiveness alone isn't giving you 
the full picture — that something about connection, context, or 
belonging matters in a way it didn't use to. [Path name] explores that territory. →"

// green_teal result:
"It sounds like you're ready to hold more complexity — to work with systems 
and perspectives that don't easily collapse into a single answer. 
[Path name] is built for that kind of navigation. →"
```

---

### P1 — AQAL Competency Map (`CompetencyMap.jsx`)

**Why P1:** Learners currently have no way to see their position and progress across the AQAL map. This is the primary "what do I do next?" dropout point.

**Design constraints:**
- Grid: rows = developmental lines (Self, Cognitive, Emotional, Interpersonal, Moral, Somatic, Spiritual), columns = stages (Magenta, Red, Amber, Orange, Green, Teal)
- Each cell shows: empty (module not started), in-progress, complete, or due-for-review
- "Next recommended" surfaced at top of the component, not buried in the grid
- Mobile-first: on narrow screens (< 640px), collapse grid to a vertical list grouped by line
- Graceful degradation: if no localStorage data, show an empty map with a "Start your first module" prompt

---

### P1 — Spaced retrieval scheduler (`src/utils/retrieval.js`)

**Why P1:** The platform has Anki cards and retrieval schedules in every module but no mechanism to surface them. Without this utility, the spaced retrieval system exists only on paper.

**Interval logic — corrected from naive reset:**

The correct forgetting-curve response to a missed review interval is to drop back ONE interval, not reset to zero. Resetting to zero on a 14-day miss destroys 13 days of memory consolidation unnecessarily.

```js
const INTERVALS_DAYS = [1, 3, 7, 14];

function markIntervalComplete(moduleId) {
  const progress = getModuleProgress(moduleId) || { intervalIndex: 0 };
  const currentIndex = progress.intervalIndex;
  const expectedDays = INTERVALS_DAYS[currentIndex];
  const daysSinceLastReview = daysSince(progress.lastReviewDate);

  // Miss threshold: learner is more than 1.5× the expected interval late
  const missed = daysSinceLastReview > expectedDays * 1.5;

  // Drop back one interval on miss; advance one interval on time
  const nextIndex = missed
    ? Math.max(0, currentIndex - 1)
    : Math.min(INTERVALS_DAYS.length - 1, currentIndex + 1);

  // If already at the last interval and on time: mark complete (no more reviews scheduled)
  const isComplete = !missed && currentIndex === INTERVALS_DAYS.length - 1;

  saveModuleProgress(moduleId, {
    intervalIndex: nextIndex,
    lastReviewDate: new Date().toISOString(),
    nextDueDate: isComplete ? null : addDays(new Date(), INTERVALS_DAYS[nextIndex]),
    complete: isComplete,
  });
}
```

**Surface on Start Here page:**
```jsx
function DueReviews() {
  const due = getDueModules(); // nextDueDate <= today, complete !== true
  if (due.length === 0) return null;
  return (
    <section aria-label="Modules ready for review">
      <h2>Ready for review</h2>
      <p>Spending 5 minutes with these now will significantly improve how much you retain.</p>
      <ul>
        {due.map(mod => (
          <li key={mod.id}>
            <a href={mod.url}>{mod.title}</a>
            <span> — last reviewed {daysAgo(mod.lastReviewDate)} days ago</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

---

### P2 — Readiness check (`ReadinessCheck.jsx`)

**Purpose:** Orientation, not gatekeeping. Helps learners self-select which QuickStart path fits their present experience. Three outcomes, all framed positively.

**Props:**
```jsx
<ReadinessCheck
  questions={[
    "I sometimes feel like my usual approaches aren't quite reaching the complexity I'm facing",
    "I'm noticing situations that used to feel clear now feel more ambiguous",
    "I find myself genuinely curious about perspectives that are very different from mine",
  ]}
  yesPath="/docs/quickstarts/this-quickstart"
  noPath="/docs/quickstarts/previous-quickstart"
  aheadPath="/docs/quickstarts/next-quickstart"
/>
```

**Outcomes (all positive framing):**
- 2–3 "yes" → "This path fits where you are right now. →"
- 0–1 "yes" → "Based on your answers, [previous path] might be a better fit right now — and that's useful information. →"
- "I've already worked through this" selected → "It sounds like you're ready for [next path]. →"

---

### P2 — Practice partner prompt (`PartnerPrompt.jsx`)

**Purpose:** Social scaffold for Interpersonal line modules. Interpersonal practices have minimal effect when done in isolation — a partner is not optional for this line.

**Used only in Interpersonal line modules.**

**Props:**
```jsx
<PartnerPrompt
  practice="Perspective-taking dialogue"
  duration="30 minutes"
  checkInQuestions={[
    "What did you notice in your body during this conversation?",
    "Where did you feel most present? Where most defended?",
    "What surprised you about your partner's perspective?",
  ]}
/>
```

**Display:**
- A pre-written invitation message the learner can copy and send (email or message)
- The check-in questions formatted as a printable or copy-pasteable template
- "Already have a partner" shortcut → jumps to the check-in template directly

---

### P2 — Somatic practice timer (`PracticeTimer.jsx`)

**Purpose:** In-page timer for timed somatic and reflective practices. Creates a container for the practice without requiring the learner to watch a clock.

**Props:**
```jsx
<PracticeTimer
  duration={1200}        // seconds
  label="Body scan"
  bellAtStart={false}    // off by default; learner can enable
  bellAtEnd={true}
/>
```

**Pacing language — displayed at key moments (not just countdown digits):**
```
On start:   "Begin when you're ready. There's no rush."
At 50%:     "You're about halfway through. Take your time."
At 80%:     "Begin gently returning your attention to the room."
On end:     "Practice complete. Pause here before moving on."
```

**Audio implementation:** Web Audio API only — no external dependencies, no CDN calls.

**Accessibility:** Text display of the completion message is always present, independent of audio. All controls keyboard-accessible. `aria-label` on the countdown element: "Time remaining: [MM:SS]".

---

## localStorage — implementation requirements

### Graceful degradation (required on every component)
```js
function safeLocalStorageGet(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null; // private/incognito browsing — fail silently
  }
}

function safeLocalStorageSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false; // storage full or unavailable — fail silently
  }
}
```

### Full schema
```js
// Key: 'ie_progress' — all learner state
{
  version: 2,                          // increment on schema changes
  completedModules: ['slug-1'],
  inProgressModules: ['slug-2'],
  retrievalSchedule: {
    'slug-1': {
      intervalIndex: 2,
      lastReviewDate: '2026-06-01T00:00:00Z',
      nextDueDate: '2026-06-08T00:00:00Z',
      complete: false,
    }
  },
  assessment: {
    lastTaken: '2026-05-15T00:00:00Z',
    lineResults: {
      cognitive: 'amber_orange',
      emotional: 'amber_orange',
      interpersonal: 'orange_green',
      moral: 'amber_orange',
      somatic: 'amber_orange',
    },
    modalResult: 'amber_orange',
    routedTo: '/docs/quickstarts/amber-to-rational',
  },
}
```

### Reset function — always expose to learner
```js
function clearAllProgress() {
  safeLocalStorageSet('ie_progress', null);
  localStorage.removeItem('ie_progress');
}
```

Place a "Reset my progress" link in the Start Here page footer. Learners must be able to clear their data without contacting anyone.

---

## Design principles (summary — full detail in learner-experience skill)

- **Stage-neutral language:** No stage names in any component UI copy
- **Low friction:** Works on first visit, no account required
- **Progressive disclosure:** Surface minimum; more on request
- **Somatic pacing:** All timed components use inviting language, never urgency language
- **Graceful degradation:** All components work (with reduced persistence) in incognito/private mode
- **Accessibility:** WCAG AA minimum; keyboard accessible; text alternatives to all audio

## What not to build
- No gamification (points, badges, streaks) — extrinsic motivation is contraindicated for intrinsic developmental work
- No social comparison — progress is private
- No email capture inside learning components — marketing is separate
- No push notifications — the platform respects the learner's pace and does not demand their attention
- No AI chat embedded in modules — the module's carefully authored practices are not to be replaced by a generic response layer

## What this agent does NOT do
- Does not write module body content → Content Authoring agent
- Does not change Docusaurus config or sidebars → UX/Frontend agent
- Does not write marketing copy → Marketing Copy agent