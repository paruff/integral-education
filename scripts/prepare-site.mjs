#!/usr/bin/env node
// Assembles the docs of one stage site into .sites-cache/<id>/docs (FR-18):
// the shared docs listed in sites/sites.json, then any per-site rewrite in
// sites/<id>/overrides/docs/ on top. A file is only written per site once its
// wording differs for that audience; everything else stays single-source in docs/.
// For light edits, sites/<id>/patches/<doc id>.json holds a list of
// { "replace": "exact text", "with": "new text" } and { "removeSection": "heading text" }.
// A patch whose text is no longer in the shared doc fails the build, so a change to the
// shared page cannot silently leave the site out of step.
// Usage: node scripts/prepare-site.mjs <id>
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

// Removes the section whose "## " heading contains `title`, up to the next heading of the same or a higher level.
function removeSection(text, title) {
  const lines = text.split('\n');
  const start = lines.findIndex((l) => /^#{1,6} /.test(l) && l.includes(title));
  if (start < 0) return null;
  const level = lines[start].match(/^#+/)[0].length;
  let end = lines.findIndex((l, i) => i > start && /^#{1,6} /.test(l) && l.match(/^#+/)[0].length <= level);
  if (end < 0) end = lines.length;
  return [...lines.slice(0, start), ...lines.slice(end)].join('\n');
}

export function applyPatches(text, patches, label) {
  let out = text;
  patches.forEach((p, i) => {
    if (p.removeSection !== undefined) {
      const next = removeSection(out, p.removeSection);
      if (next === null) throw new Error(`${label}: patch ${i + 1}: no section "${p.removeSection}"`);
      out = next;
    } else if (typeof p.replace === 'string' && typeof p.with === 'string') {
      if (!out.includes(p.replace)) throw new Error(`${label}: patch ${i + 1}: text not found: ${p.replace.slice(0, 60)}`);
      out = out.split(p.replace).join(p.with);
    } else {
      throw new Error(`${label}: patch ${i + 1}: use { replace, with } or { removeSection }`);
    }
  });
  return out;
}

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
  const patches = join(root, 'sites', site.id, 'patches');
  const patched = [];
  const walkPatches = (dir) => {
    if (!existsSync(dir)) return;
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      if (statSync(p).isDirectory()) {
        walkPatches(p);
        continue;
      }
      const id = p.slice(patches.length + 1).replace(/\.json$/, '');
      if (!site.docs.includes(id)) throw new Error(`${site.id}: patch "${id}" is not in the site's docs list`);
      if (existsSync(join(root, 'sites', site.id, 'overrides', 'docs', id + '.mdx')) || existsSync(join(root, 'sites', site.id, 'overrides', 'docs', id + '.md'))) {
        throw new Error(`${site.id}: "${id}" has both a patch and an override; use one`);
      }
      const target = ['.md', '.mdx'].map((e) => join(out, id + e)).find(existsSync);
      writeFileSync(target, applyPatches(readFileSync(target, 'utf8'), JSON.parse(readFileSync(p, 'utf8')), `${site.id}/${id}`));
      patched.push(id);
    }
  };
  walkPatches(patches);
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
  return { out, replaced, patched };
}

if (process.argv[1] && import.meta.url === new URL(process.argv[1], 'file://').href) {
  const id = process.argv[2];
  const site = JSON.parse(readFileSync('sites/sites.json', 'utf8')).find((s) => s.id === id);
  if (!site) {
    console.error(`unknown site "${id}"`);
    process.exit(2);
  }
  const { out, replaced, patched } = prepareSite(site);
  console.log(`prepared ${site.docs.length} docs for ${id} in ${out} (${replaced.length} rewritten, ${patched.length} patched for this site)`);
}
