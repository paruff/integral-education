import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkQuickStart } from '../scripts/check-quickstarts.mjs';

const fence = '```';
const thresholds = { a: 'Three or more criteria.', b: 'Four or more criteria.', c: '9/12', d: '12/16' };
const thresholdOf = (slug) => thresholds[slug];

const plan = (steps, extra = '') => `
## Plan your pathway

Decide first: "When [time/place], I will [first step]."

**Suggested pace:** one module every 2 weeks.

**Visible progress:** see [My Progress](../my-progress).

**Mastery before moving on:** meet each threshold; this gate is advisory.

${fence}mermaid
flowchart TD
  accTitle: Pathway
  accDescr: Four modules with a mixed review after the third.
${steps}
${fence}

| Step | Module | Pass when |
|---|---|---|
| 1 | [Alpha](../modules/a) | Three or more criteria. |
| 2 | [Beta](../modules/b) | Four or more criteria. |
| 3 | [Gamma](../modules/c) | 9/12 |
| 4 | [Delta](../modules/d) | 12/16 |
${extra}
## Next
`;

const good = `  S1["1. Alpha"] --> S2["2. Beta"] --> S3["3. Gamma"] --> R1(["Mixed review"]) --> S4["4. Delta"]`;

test('a QuickStart with every scaffold passes', () => {
  assert.deepEqual(checkQuickStart(plan(good), thresholdOf), []);
});

test('a QuickStart with no plan section is reported', () => {
  assert.equal(checkQuickStart('## Title\n', thresholdOf).length, 1);
});

test('more than three modules without a mixed review is reported (FR-05)', () => {
  const noReview = `  S1["1. Alpha"] --> S2["2. Beta"] --> S3["3. Gamma"] --> S4["4. Delta"]`;
  assert.ok(checkQuickStart(plan(noReview), thresholdOf).some((p) => p.includes('FR-05')));
});

test('a threshold that drifts from the module is reported (FR-07)', () => {
  const problems = checkQuickStart(plan(good), (slug) => (slug === 'b' ? 'Five or more.' : thresholds[slug]));
  assert.ok(problems.some((p) => p.includes('step 2') && p.includes('FR-07')));
});

test('a missing threshold or module is reported', () => {
  const blank = plan(good).replace('| Four or more criteria. |', '|  |');
  assert.ok(checkQuickStart(blank, thresholdOf).some((p) => p.includes('step 2: no mastery threshold')));
  assert.ok(checkQuickStart(plan(good), (slug) => (slug === 'a' ? undefined : thresholds[slug])).some((p) => p.includes('does not exist')));
});

test('a map that disagrees with the table is reported (FR-16)', () => {
  const wrong = good.replace('"2. Beta"', '"2. Other"');
  assert.ok(checkQuickStart(plan(wrong), thresholdOf).some((p) => p.includes('do not match')));
});

test('missing planning, progress, pace and gate wording are each reported', () => {
  const bare = plan(good)
    .replace('When [time/place], I will', 'Plan')
    .replace('[My Progress](../my-progress)', 'your progress')
    .replace('**Suggested pace:**', '**Pace**')
    .replace('this gate is advisory', 'strict');
  const problems = checkQuickStart(bare, thresholdOf);
  for (const fr of ['planning prompt', 'My Progress', 'Suggested pace', 'advisory']) {
    assert.ok(problems.some((p) => p.includes(fr)), `expected a "${fr}" problem`);
  }
});
