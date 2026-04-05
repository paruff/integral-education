# Integral Education Platform

A mastery-based learning platform built on the [AQAL framework](https://integrallife.com/aqal-map/) — All Quadrants, All Levels, All Lines, All States, All Types.

Built with [Docusaurus](https://docusaurus.io/) and deployed to GitHub Pages.

## 🧭 What You Get

- **Docusaurus-based site** (GitHub Pages ready)
- **AQAL-aware content model** — every module tagged by quadrant, level, line, state, and type
- **2 QuickStarts** — curated learning paths for common developmental transitions
- **5 starter modules** — mindfulness, emotional granularity, shadow integration, cognitive bias, systems thinking
- **Built-in mastery loop** — Learn → Practice → Reflect → Assess → Integrate
- **Anki-ready card blocks** — flashcard content embedded in every module

## 🗂️ Structure

```
integral-education/
├── docusaurus.config.js
├── sidebars.js
├── package.json
├── docs/
│   ├── intro.md
│   ├── quickstarts/
│   │   ├── personal-to-integral.md
│   │   └── amber-to-rational.md
│   ├── modules/
│   │   ├── mindfulness-basics.md
│   │   ├── emotional-granularity.md
│   │   ├── shadow-integration-101.md
│   │   ├── cognitive-bias-101.md
│   │   └── systems-thinking-101.md
│   ├── maps/
│   │   └── aqal-overview.md
│   └── reflections/
│       └── daily-template.md
├── static/
└── src/
```

## ⚙️ Setup

```bash
npm install
npm start       # local dev server
npm run build   # production build
npm run deploy  # deploy to GitHub Pages
```

## 🚀 QuickStarts

| Path | Description |
|------|-------------|
| [Personal → Integral](docs/quickstarts/personal-to-integral.md) | Deepen self-awareness, reduce reactivity, build systems perspective |
| [Amber → Rational](docs/quickstarts/amber-to-rational.md) | Move from rule-based to evidence-based thinking |

## 📚 Modules

| Module | Focus | Level |
|--------|-------|-------|
| Mindfulness Basics | Attention, awareness | Personal → Pluralistic |
| Emotional Granularity | Emotion differentiation | Personal → Pluralistic |
| Shadow Integration 101 | Disowned self | Pluralistic → Integral |
| Cognitive Bias 101 | Critical thinking | Amber → Rational |
| Systems Thinking 101 | Systems perspective | Rational → Pluralistic |

## 🧬 AQAL Module Template

Every module follows the same mastery loop:

```
# 🧠 Learn     — High-signal concept
# 🧘 Practice  — Embodied exercise (10–20 min)
# 🔍 Reflect   — Guided self-inquiry
# 📊 Assess    — Self-assessment rubric
# 🔗 Integrate — Real-life application
# 🧠 Anki      — Flashcard pairs
```