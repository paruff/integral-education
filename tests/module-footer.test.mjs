import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ModuleFooter from '@site/src/components/ModuleFooter/index.js';

const render = (moduleId) => renderToStaticMarkup(createElement(ModuleFooter, { moduleId, moduleTitle: moduleId }));

test('a middle step links Next to the following step, plus a Return link to its QuickStart', () => {
  const html = render('traditional-orientation');
  assert.ok(html.includes('href="/docs/modules/rational-orientation"'));
  assert.ok(html.includes('Next:'));
  assert.ok(html.includes('Return to Clear Thinking Path'));
});

test('the last step links back to its QuickStart, once, with no dead /docs/modules link', () => {
  const html = render('evidence-evaluation');
  assert.ok(html.includes('Back to Clear Thinking Path'));
  assert.equal(html.split('href="/docs/quickstarts/traditional-to-rational"').length - 1, 1);
  assert.ok(!html.includes('Next:'));
  assert.ok(!html.includes('href="/docs/modules"'));
});

test('a module in no QuickStart falls back to Explore all modules', () => {
  const html = render('cognitive-bias-101');
  assert.ok(html.includes('Explore all modules'));
  assert.ok(!html.includes('Return to'));
});
