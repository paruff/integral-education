import { readFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { transformAsync } from '@babel/core';

const ROOT = new URL('../', import.meta.url);
const SRC = new URL('src/', ROOT).href;
const STUBS = {
  '@docusaurus/useDocusaurusContext':
    "export default function useDocusaurusContext() { return { siteConfig: { projectName: globalThis.__SITE_ID__ ?? 'integral-education' } }; }",
  '@docusaurus/plugin-content-docs/client':
    'export function useDoc() { return { metadata: {} }; }',
  '@docusaurus/Link':
    "import React from 'react'; export default function Link({ to, children }) { return React.createElement('a', { href: to }, children); }",
};

export async function resolve(specifier, context, next) {
  if (STUBS[specifier]) return { url: `stub:${specifier}`, shortCircuit: true };
  if (specifier.endsWith('.css')) return { url: 'stub:css', shortCircuit: true };
  if (specifier.startsWith('@site/')) {
    const base = new URL(specifier.slice('@site/'.length), ROOT);
    for (const ext of ['', '.js', '/index.js']) {
      try {
        const url = new URL(base.href + ext);
        const path = fileURLToPath(url);
        await readFile(path);
        return { url: pathToFileURL(path).href, shortCircuit: true };
      } catch {
        // try the next extension
      }
    }
  }
  // Stub sources import bare packages (react): resolve those from the repo, not from the stub: URL.
  if (context.parentURL?.startsWith('stub:')) return next(specifier, { ...context, parentURL: ROOT.href });
  return next(specifier, context);
}

export async function load(url, context, next) {
  if (url === 'stub:css') {
    // CSS modules: every class name resolves to itself.
    return {
      format: 'module',
      source: 'export default new Proxy({}, { get: (_, key) => String(key) });',
      shortCircuit: true,
    };
  }
  if (url.startsWith('stub:')) {
    return { format: 'module', source: STUBS[url.slice('stub:'.length)], shortCircuit: true };
  }
  if (url.startsWith(SRC) && url.endsWith('.js')) {
    const source = await readFile(fileURLToPath(url), 'utf8');
    const { code } = await transformAsync(source, {
      filename: fileURLToPath(url),
      babelrc: false,
      configFile: false,
      presets: [['@babel/preset-react', { runtime: 'automatic' }]],
    });
    return { format: 'module', source: code, shortCircuit: true };
  }
  return next(url, context);
}
