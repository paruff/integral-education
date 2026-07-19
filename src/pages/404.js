import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './404.module.css';

const RECOVERY_LINKS = [
  {
    to: '/',
    label: 'Homepage',
    description: 'Return to the main page and browse featured modules and paths.',
  },
  {
    to: '/start',
    label: 'Find Your Path',
    description: 'Take our quick self-assessment to discover the best learning path for you.',
  },
  {
    to: '/docs/modules/mindfulness-basics',
    label: 'Mindfulness Basics',
    description: 'Start with foundational mindfulness — the most popular entry point on the platform.',
  },
];

export default function NotFound() {
  return (
    <Layout
      title="Page Not Found"
      description="The page you are looking for does not exist or has moved."
    >
      <main className={styles.container}>
        <div className={styles.content}>
          <div className={styles.statusCode} aria-hidden="true">404</div>
          <h1 className={styles.heading}>Page Not Found</h1>
          <p className={styles.lead}>
            The page you were looking for doesn't exist here — it may have been
            moved, renamed, or the link might have a typo.
          </p>
          <p className={styles.explanation}>
            This platform is a work in progress, and module URLs occasionally
            change as content evolves. You can use the search bar in the top
            navigation to find what you need, or try one of the popular pages
            below to get back on track.
          </p>

          <section className={styles.recoverySection} aria-labelledby="recovery-heading">
            <h2 id="recovery-heading" className={styles.recoveryHeading}>
              Where would you like to go?
            </h2>
            <div className={styles.recoveryGrid}>
              {RECOVERY_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={styles.recoveryCard}
                >
                  <h3 className={styles.recoveryCardTitle}>{link.label}</h3>
                  <p className={styles.recoveryCardDesc}>{link.description}</p>
                  <span className={styles.recoveryCardCta}>
                    Go there &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <div className={styles.helpSection}>
            <p className={styles.helpText}>
              If you believe this is a broken link that should be fixed, please{' '}
              <Link
                href="https://github.com/paruff/integral-education/issues/new"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Report a broken link on GitHub (opens in new tab)"
              >
                report it on GitHub
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
