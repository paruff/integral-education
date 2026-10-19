import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { findVocabulary, compareVocabulary } from '../scripts/check-site-vocabulary.mjs';
import { prepareSite, applyPatches } from '../scripts/prepare-site.mjs';

const terms = [{ term: 'stage' }, { term: 'Green', caseSensitive: true }, { term: 'AQAL', caseSensitive: true }];

test('vocabulary: finds banned terms and their plurals, counts them, ignores parts of other words', () => {
  const found = findVocabulary({ 'a.mdx': 'Stage one. Two stages. Backstage and stagecoach.' }, terms);
  assert.deepEqual(found, [{ file: 'a.mdx', term: 'stage', count: 2 }]);
});

test('vocabulary: case-sensitive terms do not match ordinary words', () => {
  const found = findVocabulary({ 'a.mdx': 'A green field. The Green view. AQAL and aqal.' }, terms);
  assert.deepEqual(found.map((f) => [f.term, f.count]), [['AQAL', 1], ['Green', 1]]);
});

test('vocabulary baseline: more uses fail, fewer ask for a baseline update, equal passes', () => {
  const baseline = [{ file: 'a.mdx', term: 'stage', count: 3 }, { file: 'b.mdx', term: 'Green', count: 1 }];
  const same = compareVocabulary(baseline, baseline);
  assert.deepEqual([same.more, same.fewer], [[], []]);
  const changed = compareVocabulary(
    [{ file: 'a.mdx', term: 'stage', count: 4 }, { file: 'c.mdx', term: 'AQAL', count: 1 }],
    baseline
  );
  assert.deepEqual(changed.more.map((e) => e.file), ['a.mdx', 'c.mdx']);
  assert.deepEqual(changed.fewer.map((e) => e.file), ['b.mdx']);
});

function project() {
  const root = mkdtempSync(join(tmpdir(), 'prep-'));
  mkdirSync(join(root, 'docs/modules'), { recursive: true });
  writeFileSync(join(root, 'docs/modules/a.mdx'), 'shared A');
  writeFileSync(join(root, 'docs/modules/b.md'), 'shared B');
  writeFileSync(join(root, 'docs/modules/unlisted.md'), 'not for this site');
  return root;
}

test('prepareSite: copies only the listed docs, whatever their extension', () => {
  const root = project();
  const { out, replaced } = prepareSite({ id: 's', docs: ['modules/a', 'modules/b'] }, root);
  assert.equal(readFileSync(join(out, 'modules/a.mdx'), 'utf8'), 'shared A');
  assert.equal(readFileSync(join(out, 'modules/b.md'), 'utf8'), 'shared B');
  assert.ok(!existsSync(join(out, 'modules/unlisted.md')));
  assert.deepEqual(replaced, []);
});

test('prepareSite: a per-site rewrite replaces the shared doc, even with a different extension', () => {
  const root = project();
  mkdirSync(join(root, 'sites/s/overrides/docs/modules'), { recursive: true });
  writeFileSync(join(root, 'sites/s/overrides/docs/modules/b.mdx'), 'site B');
  const { out, replaced } = prepareSite({ id: 's', docs: ['modules/a', 'modules/b'] }, root);
  assert.equal(readFileSync(join(out, 'modules/b.mdx'), 'utf8'), 'site B');
  assert.ok(!existsSync(join(out, 'modules/b.md')), 'the shared copy is gone');
  assert.deepEqual(replaced, ['modules/b']);
});

test('prepareSite: a missing doc or an override outside the docs list is an error', () => {
  const root = project();
  assert.throws(() => prepareSite({ id: 's', docs: ['modules/nope'] }, root), /no doc/);
  mkdirSync(join(root, 'sites/s/overrides/docs/modules'), { recursive: true });
  writeFileSync(join(root, 'sites/s/overrides/docs/modules/other.mdx'), 'x');
  assert.throws(() => prepareSite({ id: 's', docs: ['modules/a'] }, root), /not in the site's docs list/);
});

test('vocabulary: text matching an ignore pattern (a cited surname) is not counted', () => {
  const text = 'Higgins, J. P. T., & Green, S. (Eds.). The Green view.';
  const ignore = [{ pattern: '& Green, S\\.' }];
  assert.deepEqual(findVocabulary({ 'a.mdx': text }, terms, ignore), [{ file: 'a.mdx', term: 'Green', count: 1 }]);
  assert.deepEqual(findVocabulary({ 'a.mdx': text }, terms), [{ file: 'a.mdx', term: 'Green', count: 2 }]);
});

test('patches: replace changes every occurrence of the exact text', () => {
  assert.equal(applyPatches('a stage b stage', [{ replace: 'stage', with: 'step' }], 't'), 'a step b step');
});

test('patches: a replace whose text is no longer there fails loudly', () => {
  assert.throws(() => applyPatches('nothing here', [{ replace: 'gone', with: 'x' }], 't'), /text not found/);
});

test('patches: removeSection removes a heading, its body and deeper headings, up to the next heading of the same level', () => {
  const doc = '## One\nkeep\n## Mapping\ndrop\n### Sub\ndrop too\n## Three\nkeep';
  assert.equal(applyPatches(doc, [{ removeSection: 'Mapping' }], 't'), '## One\nkeep\n## Three\nkeep');
  assert.equal(applyPatches('## A\nx\n## Last\ny', [{ removeSection: 'Last' }], 't'), '## A\nx');
  assert.throws(() => applyPatches(doc, [{ removeSection: 'Nope' }], 't'), /no section/);
});

test('patches: an unknown patch shape is rejected', () => {
  assert.throws(() => applyPatches('x', [{ nope: 1 }], 't'), /use \{ replace, with \}/);
});

test('prepareSite: applies a patch to the shared copy, and refuses a patch plus an override for one doc', () => {
  const root = project();
  mkdirSync(join(root, 'sites/s/patches/modules'), { recursive: true });
  writeFileSync(join(root, 'sites/s/patches/modules/a.json'), JSON.stringify([{ replace: 'shared', with: 'site' }]));
  const { out, patched } = prepareSite({ id: 's', docs: ['modules/a'] }, root);
  assert.equal(readFileSync(join(out, 'modules/a.mdx'), 'utf8'), 'site A');
  assert.equal(readFileSync(join(root, 'docs/modules/a.mdx'), 'utf8'), 'shared A', 'the shared doc is untouched');
  assert.deepEqual(patched, ['modules/a']);

  mkdirSync(join(root, 'sites/s/overrides/docs/modules'), { recursive: true });
  writeFileSync(join(root, 'sites/s/overrides/docs/modules/a.mdx'), 'rewritten');
  assert.throws(() => prepareSite({ id: 's', docs: ['modules/a'] }, root), /both a patch and an override/);
});
