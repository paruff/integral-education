#!/usr/bin/env node
// Assembles the docs of one stage site into .sites-cache/<id>/docs (FR-18):
// the shared docs listed in sites/sites.json, then any per-site rewrite in
// sites/<id>/overrides/docs/ on top. A file is only written per site once its
// wording differs for that audience; everything else stays single-source in docs/.
// Usage: node scripts/prepare-site.mjs <id>
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { readFileSync } from 'node:fs';

export function prepareSite(site, root = '.') {
  const out = join(root, '.sites-cache', site.id, 'docs');
  rmSync(out, { recursive: true, force: true });
  for (const id of site.docs) {
    const src = ['.md', '.mdx'].map((e) => join(root, 'docs', id + e)).find(existsSync);
    if (!src) throw new Error(`${site.id}: no doc "${id}" in docs/`);
    const dest = join(out, id + src.slice(src.lastIndexOf('.')));
    mkdirSync(dirname(dest), { recursive: true });
    cpSync(src, dest);
  }
  const overrides = join(root, 'sites', site.id, 'overrides', 'docs');
  const replaced = [];
  const walk = (dir) => {
    if (!existsSync(dir)) return;
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      if (statSync(p).isDirectory()) walk(p);
      else {
        const rel = p.slice(overrides.length + 1);
        const id = rel.replace(/\.mdx?$/, '');
        if (!site.docs.includes(id)) throw new Error(`${site.id}: override "${rel}" is not in the site's docs list`);
        for (const e of ['.md', '.mdx']) rmSync(join(out, id + e), { force: true });
        const dest = join(out, rel);
        mkdirSync(dirname(dest), { recursive: true });
        cpSync(p, dest);
        replaced.push(id);
      }
    }
  };
  walk(overrides);
  return { out, replaced };
}

if (process.argv[1] && import.meta.url === new URL(process.argv[1], 'file://').href) {
  const id = process.argv[2];
  const site = JSON.parse(readFileSync('sites/sites.json', 'utf8')).find((s) => s.id === id);
  if (!site) {
    console.error(`unknown site "${id}"`);
    process.exit(2);
  }
  const { out, replaced } = prepareSite(site);
  console.log(`prepared ${site.docs.length} docs for ${id} in ${out} (${replaced.length} rewritten for this site)`);
}
