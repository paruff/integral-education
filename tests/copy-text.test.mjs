import { test } from 'node:test';
import assert from 'node:assert/strict';
import { copyText } from '@site/src/utils/copyText.js';

// `navigator` is a read-only getter in Node, so it has to be redefined.
const setNavigator = (value) => Object.defineProperty(globalThis, 'navigator', { value, configurable: true, writable: true });

function fakeDom(execResult) {
  const body = { children: [], appendChild(n) { n.parentNode = body; this.children.push(n); }, removeChild(n) { this.children = this.children.filter((c) => c !== n); n.parentNode = null; } };
  globalThis.document = { body, createElement: () => ({ style: {}, select() {} }), execCommand: () => execResult };
  return body;
}

test('true when the clipboard API works', async () => {
  setNavigator({ clipboard: { writeText: async () => {} } });
  assert.equal(await copyText('x'), true);
});

test('falls back to execCommand, and cleans up the textarea', async () => {
  setNavigator({ clipboard: { writeText: async () => { throw new Error('denied'); } } });
  const body = fakeDom(true);
  assert.equal(await copyText('x'), true);
  assert.equal(body.children.length, 0);
});

test('false, not "copied", when both ways fail', async () => {
  setNavigator({ clipboard: { writeText: async () => { throw new Error('denied'); } } });
  const body = fakeDom(false);
  assert.equal(await copyText('x'), false);
  assert.equal(body.children.length, 0);
  setNavigator({});
  assert.equal(await copyText('x'), false, 'no clipboard API at all');
});
