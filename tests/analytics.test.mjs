import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { onRouteDidUpdate } from '@site/src/clientModules/goatcounter.js';

const require = createRequire(import.meta.url);

test('the vendored count.js never sends the query string', () => {
  const src = readFileSync('static/js/goatcounter-count.js', 'utf8');
  // get_query() reads the URL locally and sends nothing; the two places that send are get_path() and the q field.
  assert.ok(!/loc\.search|q:\s*location\.search/.test(src), 'count.js must not send the query string');
});

test('analytics loads our own copy of count.js, and only when a code is set', () => {
  const load = (code) => {
    const old = process.env.GOATCOUNTER_CODE;
    if (code === undefined) delete process.env.GOATCOUNTER_CODE;
    else process.env.GOATCOUNTER_CODE = code;
    delete require.cache[require.resolve('../analytics.js')];
    const a = require('../analytics.js');
    if (old === undefined) delete process.env.GOATCOUNTER_CODE;
    else process.env.GOATCOUNTER_CODE = old;
    return a;
  };
  assert.deepEqual(load(undefined).scripts, []);
  const [script] = load('abc').scripts;
  assert.equal(script.src, '/integral-education/js/goatcounter-count.js');
  assert.ok(readFileSync('static/js/goatcounter-count.js', 'utf8').length > 1000);
});

test('route changes send the pathname only, and typing in search is not a page view', () => {
  const sent = [];
  globalThis.window = { goatcounter: { count: (v) => sent.push(v) } };
  const at = (pathname, search = '') => ({ pathname, search });
  onRouteDidUpdate({ location: at('/a'), previousLocation: null });
  onRouteDidUpdate({ location: at('/search', '?q=pan'), previousLocation: at('/docs/x') });
  onRouteDidUpdate({ location: at('/search', '?q=panic'), previousLocation: at('/search', '?q=pan') });
  delete globalThis.window;
  assert.deepEqual(sent, [{ path: '/search' }]);
});
