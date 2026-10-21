// Fails when a module body has an H1 ("# ") — the page title is the only H1 (WCAG).
import { scan } from './lib/scan.mjs';
const hits = scan('docs/modules', /\.mdx?$/, /^# /);
for (const h of hits) console.log(h);
if (hits.length) { console.error('❌ H1 heading found in module body (use ## not #)'); process.exit(1); }
