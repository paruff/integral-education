# Design: SAFE-01 — Add crisis resource banner to all shadow-adjacent module pages

## Impacted Components

### 1. `src/components/CrisisResourceBanner/index.js` (NEW)

React component — persistent banner at top of module pages.

**Structure:**
```jsx
import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function CrisisResourceBanner() {
  return (
    <aside className={styles.banner} role="complementary" aria-label="Crisis resources">
      <span className={styles.icon} aria-hidden="true">⚠️</span>
      <span className={styles.text}>
        If you feel overwhelmed or unsafe, stop the practice.{' '}
        <Link to="/docs/safety/crisis-resources">Crisis resources →</Link>
      </span>
    </aside>
  );
}
```

### 2. `src/components/CrisisResourceBanner/styles.module.css` (NEW)

Non-intrusive but visible styling:
- Background: light warning tone (Infima `--ifm-color-warning-contrasting-background` or similar)
- Border-left accent
- Small icon, compact text
- Full-width within content area
- Z-index and positioning that doesn't interfere with layout

### 3. `docs/safety/crisis-resources.md` (NEW)

Plain page with crisis resources, using the Safety Classification skill's approved language:

```
---
id: crisis-resources
title: Crisis Resources
description: If you're experiencing a mental health crisis, these resources are available now.
---

# Crisis Resources

If you're experiencing a mental health crisis or suicidal thoughts, these resources are available now, 24/7.

## United States

- **988 Suicide & Crisis Lifeline:** Call or text **988** (also available via chat at 988lifeline.org)
- **Crisis Text Line:** Text **HOME** to **741741**
- **Veterans Crisis Line:** Call 988, then press 1; or text 838255

## United Kingdom / Ireland

- **Samaritans:** Call **116 123** (free, 24/7, UK and Ireland) — samaritans.org

## International

Crisis resources vary by country. For resources outside the US and UK:
- **Find a Helpline:** [findahelpline.com](https://findahelpline.com) — free, confidential support by country
- **International Association for Suicide Prevention:** [iasp.info/resources/Crisis_Centres](https://www.iasp.info/resources/Crisis_Centres)

---

If this is an emergency, call your local emergency number (911 in the US, 999 in the UK, 112 in the EU).

You are not alone. Support is available.
```

### 4. Module imports (17 files)

Each target module gets the banner import immediately after frontmatter:

```mdx
import CrisisResourceBanner from '@site/src/components/CrisisResourceBanner';

<CrisisResourceBanner />
```

**Target modules (14 shadow-tagged):**
1. `integral-life-practice-embodying-2nd-tier.mdx`
2. `integral-shadow-teal-trap.mdx`
3. `moral-line-shadow-moral-injury.mdx`
4. `self-line-integration-practice.mdx`
5. `shadow-321-process.mdx`
6. `shadow-collective-cultural.mdx`
7. `shadow-immunity-to-change.mdx`
8. `shadow-in-relationships.mdx`
9. `shadow-integration-101.md`
10. `shadow-persona-mask.mdx`
11. `shadow-positive-projection.mdx`
12. `shadow-spiritual-bypassing.mdx`
13. `shadow-work-foundation.mdx`
14. `spiritual-line-shadow-integration.mdx`

**Target modules (3 state-tagged):**
15. `causal-witness-state.mdx`
16. `nondual-awareness-orientation.mdx`
17. `subtle-state-access.mdx`

## Constraints
- No new npm dependencies
- Infima theme variables only (no hardcoded colors)
- Banner must not interfere with ModuleMeta or content layout
- Follows existing component patterns (`src/components/ComponentName/index.js` + `styles.module.css`)