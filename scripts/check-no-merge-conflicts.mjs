// Fails when a tracked text file contains git conflict markers.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
const files = execFileSync('git', ['ls-files', '*.md', '*.mdx', '*.js', '*.mjs', '*.json', '*.yml', '*.yaml'], { encoding: 'utf8' })
  .split('\n').filter(Boolean);
const marker = /^(<<<<<<< |=======$|>>>>>>> )/;
let bad = 0;
for (const f of files) {
  readFileSync(f, 'utf8').split('\n').forEach((line, i) => {
    if (marker.test(line)) { console.log(`${f}:${i + 1}:${line}`); bad++; }
  });
}
if (bad) { console.error('❌ Merge conflict markers found'); process.exit(1); }
