import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { RetrievalCardView } from '@site/src/components/RetrievalCard/index.js';

const base = {
  question: 'What is confirmation bias?',
  answer: 'Seeking information that confirms existing beliefs',
  cardNumber: 1,
  totalCards: 4,
};
const render = (props) => renderToStaticMarkup(createElement(RetrievalCardView, { ...base, ...props }));

test('before reveal: no model answer and no self-rating buttons', () => {
  const html = render({ stage: 'question' });
  assert.ok(html.includes(base.question));
  assert.ok(!html.includes(base.answer));
  assert.ok(!html.includes('I remembered'));
  assert.ok(html.includes('Write your answer'));
});

test('after reveal: model answer comes before the self-rating buttons', () => {
  const html = render({ stage: 'revealed' });
  const answerAt = html.indexOf(base.answer);
  const rateAt = html.indexOf('I remembered');
  assert.ok(answerAt > -1, 'model answer shown');
  assert.ok(rateAt > answerAt, 'rating comes after the model answer');
  assert.ok(html.includes('Model answer'));
});

test("the learner's own attempt is shown beside the model answer", () => {
  const html = render({ stage: 'revealed', attempt: 'Looking for agreeing evidence' });
  assert.ok(html.includes('Your answer'));
  assert.ok(html.includes('Looking for agreeing evidence'));
});

test('criteria, when given, are listed before the self-rating buttons', () => {
  const html = render({ stage: 'revealed', criteria: ['Names seeking', 'Names confirming'] });
  assert.ok(html.indexOf('Names confirming') > -1);
  assert.ok(html.indexOf('Names confirming') < html.indexOf('I remembered'));
});

test('after rating: shows the outcome badge only', () => {
  const html = render({ stage: 'rated', outcome: 'needs-review' });
  assert.ok(html.includes('Marked for review'));
  assert.ok(!html.includes('I remembered'));
});
