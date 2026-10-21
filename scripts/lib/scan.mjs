import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// Returns "file:line:text" for every line under dir (recursive) whose file matches
// fileRe and whose text matches lineRe.
export function scan(dir, fileRe, lineRe) {
  const hits = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) hits.push(...scan(p, fileRe, lineRe));
    else if (fileRe.test(e.name)) {
      readFileSync(p, 'utf8').split('\n').forEach((l, i) => lineRe.test(l) && hits.push(`${p}:${i + 1}:${l}`));
    }
  }
  return hits;
}
