# NAV-05 Design

## Impacted Components

| File | Change Type |
|------|-------------|
| `sidebars.js` | Update `description` of the Modules generated-index to include the scope boundary note |

## Current State

In `sidebars.js`, lines 126-131, the Modules category has a `link` of type `generated-index` with a brief description:

```js
{
  type: 'category',
  label: 'Modules',
  link: {
    type: 'generated-index',
    slug: '/modules',
    title: 'Modules',
    description: 'Browse standalone learning units across the integral curriculum.',
  },
  items: [ /* ... */ ],
},
```

This description says nothing about the scope boundary. A visitor at Red or Magic-Mythic sees no content addressed to them and no explanation.

## Technical Approach

Replace the existing one-sentence `description` with an expanded version that:
1. Keeps the original purpose ("browse standalone learning units")
2. Adds the scope boundary statement
3. Explains why (earlier stages require different containers)
4. Signals that fork-specific content is the planned path forward
5. Remains factual and non-apologetic in tone

### Proposed Description

```
Browse standalone learning units across the integral curriculum.
Self-guided content currently begins at the Amber/Mythic stage.
Earlier stages (Magic, Red) involve developmental needs — nervous system
safety, tribal belonging, embodied selfhood — that are better supported
through relational and somatic containers than self-guided text.
Fork-specific content for earlier stages is planned.
```

This is a multi-line description string in JavaScript (template literal or concatenation), rendered as a single block on the generated-index page.

### Tone Check

The proposed text avoids:
- Apologetic framing ("unfortunately", "we don't have", "sorry")
- Judgement of earlier stages
- Over-promising timelines

It meets the issue's requirement of being "factual and non-apologetic — this is honest scoping, not a confession of failure."

### AQAL Overview Consideration

The AQAL Overview page (lines 71-87) already lists all stages from Beige through Turquoise in its Level table. Adding the boundary note there would duplicate information across pages. Placing it solely on the Modules index is the single-source approach — that is where visitors discover content availability.

## Placement Rationale

- **Modules index** is where visitors browse content — the scope note is immediately relevant there
- The generated-index `description` field is the natural Docusaurus mechanism for this (no new files, no `_category_.json`)
- The AQAL Overview is a reference page about AQAL theory, not about platform content — keeping the scope note on the content index respects that distinction

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Description too long for card layout | Low | Minor layout shift | Multi-line string accepted by Docusaurus; text is ~4 lines |
| Tone misjudged as apologetic | Low | User dissatisfaction | Review tone against spec requirement: "factual and non-apologetic" |
| Build fails | Low | Blocked PR | Run `npm run build` before commit |
