import React from 'react';
import Link from '@docusaurus/Link';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import ModuleComplete from '@site/src/components/ModuleComplete';
import moduleMap, { QUICKSTARTS } from '@site/src/data/moduleMap';
import styles from './styles.module.css';

const DEFAULT_REFLECT_LINK = '/docs/reflections/daily-template';

function normalizeDocId(id) {
  if (!id) return undefined;
  if (id.startsWith('modules/')) return id.slice('modules/'.length);
  return id;
}

export default function ModuleFooter({ moduleId: explicitId, moduleTitle: explicitTitle }) {
  const { metadata } = useDoc();
  const moduleId = explicitId || normalizeDocId(metadata?.id);
  const moduleTitle = explicitTitle || metadata?.title || moduleId;
  const mapped = moduleId ? moduleMap[moduleId] : undefined;
  const quickstart = mapped?.quickstart ? QUICKSTARTS[mapped.quickstart] : null;

  return (
    <aside className={styles.footer} aria-label="Module actions">
      <div className={styles.ctaSection}>
        {mapped?.next ? (
          <Link className={styles.primaryCta} to={mapped.next.to}>
            Next: {mapped.next.title} →
          </Link>
        ) : (
          <Link className={styles.primaryCta} to="/docs/modules">
            Explore all modules →
          </Link>
        )}

        {quickstart && (
          <Link className={styles.quickstartLink} to={quickstart.to}>
            Return to {quickstart.title}
          </Link>
        )}

        <Link className={styles.reflectLink} to={DEFAULT_REFLECT_LINK}>
          Log in your Daily Reflection
        </Link>
      </div>

      {moduleId && (
        <ModuleComplete moduleId={moduleId} moduleTitle={moduleTitle} />
      )}
    </aside>
  );
}