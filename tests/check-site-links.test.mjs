import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { findLinkProblems, compareToBaseline } from '../scripts/check-site-links.mjs';

const BASE = '/integral-education/stage-a/';

function site(pages) {
  const dir = mkdtempSync(join(tmpdir(), 'site-'));
  for (const [path, html] of Object.entries(pages)) {
    mkdirSync(join(dir, path, '..'), { recursive: true });
    writeFileSync(join(dir, path), html);
  }
  return dir;
}

const link = (href) => `<a class="x" href="${href}">go</a>`;

test('links inside the site, anchors, assets and external links are fine', () => {
  const dir = site({
    'index.html': link(`${BASE}docs/a`) + link('#top') + link('https://example.org/x') + link('mailto:a@b.c') + link(`${BASE}img/logo.svg`),
    'docs/a/index.html': link('../b') + link(`${BASE}`),
    'docs/b/index.html': '',
    'img/logo.svg': '<svg/>',
  });
  assert.deepEqual(findLinkProblems(dir, BASE), []);
});

test('a link to the main site or another stage site is reported as outside the site (FR-18)', () => {
  const dir = site({
    'index.html': link('/integral-education/docs/maps/aqal-overview') + link('/integral-education/stage-b/'),
  });
  const problems = findLinkProblems(dir, BASE);
  assert.deepEqual(problems.map((p) => p.reason), ['outside-site', 'outside-site']);
});

test('a link to a page the site did not build is reported as broken, including relative links', () => {
  const dir = site({
    'docs/a/index.html': link('../missing') + link(`${BASE}docs/also-missing`),
    'docs/b/index.html': '',
  });
  const problems = findLinkProblems(dir, BASE);
  assert.deepEqual(problems.map((p) => [p.reason, p.href]), [
    ['broken', `${BASE}docs/also-missing`],
    ['broken', `${BASE}docs/missing`],
  ]);
});

test('baseline: known problems pass, new ones are fresh, fixed ones are listed', () => {
  const known = { page: 'a.html', href: '/x', reason: 'broken' };
  const gone = { page: 'b.html', href: '/y', reason: 'broken' };
  const fresh = { page: 'c.html', href: '/z', reason: 'outside-site' };
  const result = compareToBaseline([known, fresh], [known, gone]);
  assert.deepEqual(result.fresh, [fresh]);
  assert.deepEqual(result.fixed, [gone]);
});
