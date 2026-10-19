import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildPathways, render } from '../scripts/generate-pathways.mjs';

test('src/data/pathways.json matches the QuickStart step tables (run scripts/generate-pathways.mjs)', () => {
  assert.equal(readFileSync('src/data/pathways.json', 'utf8'), render(buildPathways()));
});

test('every QuickStart has a pathway with at least three modules', () => {
  const pathways = buildPathways();
  assert.equal(pathways.length, 13);
  for (const p of pathways) assert.ok(p.modules.length >= 3, `${p.id} has ${p.modules.length} modules`);
});
