// Fails when a module still carries a TODO/FIXME placeholder.
import { scan } from './lib/scan.mjs';
const hits = scan('docs/modules', /\.mdx?$/, /TODO|FIXME/);
for (const h of hits) console.log(h);
if (hits.length) { console.error('❌ Placeholder found (TODO/FIXME)'); process.exit(1); }
