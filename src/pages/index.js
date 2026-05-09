import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">Develop yourself across mind, body, and relationships</h1>
        <p className="hero__subtitle">
          Build practical skills for thinking clearly, relating better, and acting with purpose.
          Designed for curious adults, coaches, educators, and teams.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--lg homepage-primary-cta"
            to="/docs/intro">
            Get Started →
          </Link>
          <Link
            className={styles.secondaryCta}
            to="/prototype">
            Open Prototype
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
      description="Develop practical skills for clearer thinking, better relationships, and purposeful action.">
      <HomepageHeader />
      <main>
        <section className="container margin-top--lg">
          <h2>Built on the AQAL Framework</h2>
          <p>
            We use AQAL to organize learning across inner growth, relationships, behavior, and
            systems. <Link to="/docs/maps/aqal-overview">Learn more</Link>.
          </p>
        </section>
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
              <Link to="/docs/maps/aqal-competency-map">AQAL Competency Map</Link>
              <br />
              <Link to="/docs/reflections/daily-template">Daily Reflection</Link>
              <br />
              <Link to="/prototype">Interactive Prototype</Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
