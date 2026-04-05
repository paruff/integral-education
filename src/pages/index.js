import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Get Started →
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Mastery Across All Quadrants — AQAL-aware integral education platform">
      <HomepageHeader />
      <main>
        <div className="container margin-vert--xl">
          <div className="row">
            <div className="col col--4">
              <h3>🧭 QuickStarts</h3>
              <p>Choose a curated learning path and begin your journey in minutes.</p>
              <Link to="/docs/quickstarts/personal-to-integral">Personal → Integral</Link>
              <br />
              <Link to="/docs/quickstarts/amber-to-rational">Amber → Rational</Link>
            </div>
            <div className="col col--4">
              <h3>📚 Modules</h3>
              <p>Standalone learning units covering key domains of integral development.</p>
              <Link to="/docs/modules/mindfulness-basics">Mindfulness Basics</Link>
              <br />
              <Link to="/docs/modules/emotional-granularity">Emotional Granularity</Link>
              <br />
              <Link to="/docs/modules/shadow-integration-101">Shadow Integration</Link>
            </div>
            <div className="col col--4">
              <h3>🗺️ Maps & Tools</h3>
              <p>Reference maps and daily practices to orient your development.</p>
              <Link to="/docs/maps/aqal-overview">AQAL Overview</Link>
              <br />
              <Link to="/docs/reflections/daily-template">Daily Reflection</Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
