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
        <p className={styles.rigorSignal}>
          Built on peer-reviewed developmental psychology — Kegan, Cook-Greuter, Kohlberg — with every claim tiered by evidence quality, not just integral theory retold.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--lg homepage-primary-cta"
            to="/docs/intro">
            Get Started →
          </Link>
          <Link
            className={styles.secondaryCta}
            to="/start">
            Find Your Path →
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
        <section className="container margin-top--lg homepage-section">
          <h2>Built on the AQAL Framework</h2>
          <p>
            We use AQAL to organize learning across inner growth, relationships, behavior, and
            systems. <Link to="/docs/maps/aqal-overview">Learn more</Link>.
          </p>
        </section>
        <section className="container homepage-section">
          <h2>How It Works</h2>
          <div className="homepage-loop-grid">
            <div className="homepage-loop-item">
              <span className="homepage-loop-icon">📘</span>
              <p>
                <strong>Learn</strong>: Build one practical concept at a time.
              </p>
            </div>
            <div className="homepage-loop-item">
              <span className="homepage-loop-icon">🛠️</span>
              <p>
                <strong>Practice</strong>: Apply the skill with a focused activity.
              </p>
            </div>
            <div className="homepage-loop-item">
              <span className="homepage-loop-icon">🪞</span>
              <p>
                <strong>Reflect</strong>: Track what shifted in your perspective.
              </p>
            </div>
            <div className="homepage-loop-item">
              <span className="homepage-loop-icon">✅</span>
              <p>
                <strong>Assess</strong>: Check progress with clear criteria.
              </p>
            </div>
            <div className="homepage-loop-item">
              <span className="homepage-loop-icon">🌱</span>
              <p>
                <strong>Integrate</strong>: Transfer the learning into daily life.
              </p>
            </div>
          </div>
        </section>
        <p className={styles.scaleStat}>
          75 modules · 7 developmental lines · Evidence-tiered citations throughout
        </p>
        <p className={styles.rigorSignal} style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
          We hold ourselves to the same evidence standard: <Link to="/docs/about/what-this-platform-does">what this platform can and cannot do</Link>, grounded in population-level developmental research.
        </p>
        <section className="container homepage-section">
          <h2>🧭 QuickStarts</h2>
          <p>Choose a curated learning path and begin your journey in minutes.</p>
          <div className="homepage-card-grid">
            <article className="homepage-card">
              <h3>Personal → Integral</h3>
              <p>Move from self-growth basics to AQAL-informed development habits.</p>
              <p className="homepage-card-meta">Estimated time: 20 min</p>
              <Link className="homepage-card-cta" to="/docs/quickstarts/personal-to-integral">
                Begin →
              </Link>
            </article>
            <article className="homepage-card">
              <h3>Amber → Rational</h3>
              <p>Build critical thinking skills while transitioning into modern worldview logic.</p>
              <p className="homepage-card-meta">Estimated time: 20 min</p>
              <Link className="homepage-card-cta" to="/docs/quickstarts/amber-to-rational">
                Begin →
              </Link>
            </article>
            <article className="homepage-card">
              <h3>Interpersonal Line Development</h3>
              <p>Build perspective-taking, conflict repair, and cross-difference dialogue — from relational awareness to full interpersonal integration.</p>
              <p className="homepage-card-meta">Estimated time: 25–40 min per module</p>
              <Link className="homepage-card-cta" to="/docs/quickstarts/interpersonal-line-development">
                Begin →
              </Link>
            </article>
            <article className="homepage-card">
              <h3>Emotional Line Development</h3>
              <p>Build emotional vocabulary, regulation, and relational skill — from naming feelings to full emotional integration.</p>
              <p className="homepage-card-meta">Estimated time: 20–40 min per module</p>
              <Link className="homepage-card-cta" to="/docs/quickstarts/emotional-line-development">
                Begin →
              </Link>
            </article>
          </div>
        </section>
        <section className="container homepage-section">
          <h2>📚 Featured Modules</h2>
          <p>Stand-alone learning units covering key domains of integral development.</p>
          <div className="homepage-module-grid">
            <article className="homepage-card">
              <h3>Mindfulness Basics</h3>
              <p>Focus area: Attention and present-moment awareness.</p>
              <div className="homepage-card-meta-row">
                <span className="homepage-level-badge">Beginner</span>
                <span className="homepage-card-meta">Read time: 8 min</span>
              </div>
              <Link className="homepage-card-cta" to="/docs/modules/mindfulness-basics">
                Open module →
              </Link>
            </article>
            <article className="homepage-card">
              <h3>Emotional Granularity</h3>
              <p>Focus area: Naming emotions with nuance to improve regulation.</p>
              <div className="homepage-card-meta-row">
                <span className="homepage-level-badge">Intermediate</span>
                <span className="homepage-card-meta">Read time: 10 min</span>
              </div>
              <Link className="homepage-card-cta" to="/docs/modules/emotional-granularity">
                Open module →
              </Link>
            </article>
            <article className="homepage-card">
              <h3>Amber/Mythic Orientation</h3>
              <p>Understand your current developmental stage with dignity — grounded in Kegan, Cook-Greuter, and Fowler, not just typology.</p>
              <div className="homepage-card-meta-row">
                <span className="homepage-level-badge">Beginner</span>
                <span className="homepage-card-meta">Read time: 8 min</span>
              </div>
              <Link className="homepage-card-cta" to="/docs/modules/amber-mythic-orientation">
                Open module →
              </Link>
            </article>
          </div>
          <p className="margin-top--md">
            <Link to="/docs/modules">View all learning modules</Link>
          </p>
        </section>
        <section className="container homepage-section margin-bottom--xl">
          <h2>🗺️ Maps & Tools</h2>
          <p>Reference maps and daily practices to orient your development.</p>
          <div className="homepage-tools-grid">
            <article className="homepage-tool-card">
              <h3>
                <span>🧭</span> AQAL Overview
              </h3>
              <p>Get a quick map of quadrants, levels, lines, states, and types.</p>
              <Link className="homepage-card-cta" to="/docs/maps/aqal-overview">
                Open map →
              </Link>
            </article>
            <article className="homepage-tool-card">
              <h3>
                <span>🗺️</span> AQAL Competency Map
              </h3>
              <p>See core skills by quadrant so you can choose your next practice target.</p>
              <Link className="homepage-card-cta" to="/docs/maps/aqal-competency-map">
                Open map →
              </Link>
            </article>
            <article className="homepage-tool-card">
              <h3>
                <span>📝</span> Daily Reflection
              </h3>
              <p>Use a structured template to capture observations and integration notes.</p>
              <Link className="homepage-card-cta" to="/docs/reflections/daily-template">
                Open reflection →
              </Link>
            </article>
            <article className="homepage-tool-card">
              <h3>
                <span>🖱️</span> Interactive Prototype
              </h3>
              <p>Preview pathway selection, safety checks, and assessment flow in one place.</p>
              <Link className="homepage-card-cta" to="/prototype">
                Open prototype →
              </Link>
            </article>
          </div>
        </section>
      </main>
    </Layout>
  );
}