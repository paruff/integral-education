// Lets `node --test` import site source: ESM in .js files, JSX, the `@site/`
// alias, CSS modules and Docusaurus-only modules. Loaded with `--import`.
// ponytail: uses Docusaurus's own transitive @babel/core; pin it in
// devDependencies if a Docusaurus upgrade ever drops it.
import { register } from 'node:module';

register('./loader.mjs', import.meta.url);
