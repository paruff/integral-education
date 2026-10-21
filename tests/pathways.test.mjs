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

test('src/data/moduleNav.js matches the QuickStart step tables (run scripts/generate-pathways.mjs)', async () => {
  const { buildModuleNav, renderNav } = await import('../scripts/generate-pathways.mjs');
  assert.equal(readFileSync('src/data/moduleNav.js', 'utf8'), renderNav(buildModuleNav(buildPathways())));
});

test('every module footer "Next:" follows its QuickStart step order', async () => {
  const { default: moduleMap } = await import('../src/data/moduleMap.js');
  for (const { id, modules } of buildPathways()) {
    modules.forEach((m, i) => {
      const entry = moduleMap[m];
      assert.ok(entry, `${m} has no footer entry`);
      if (entry.quickstart !== id) return; // module shared with an earlier QuickStart
      const want = modules[i + 1];
      assert.equal(entry.next?.to ?? null, want ? `/docs/modules/${want}` : null, `${id}: Next after ${m}`);
    });
  }
});
