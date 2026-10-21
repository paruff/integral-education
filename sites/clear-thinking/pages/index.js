import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

// Draft landing page (P9-01a). The audience-register rewrite is P9-05 and needs
// the target audience's readers, so this stays plain and makes no claims.
export default function Home() {
  return (
    <Layout title="Clear Thinking Path" description="A step-by-step path, one module at a time">
      <main className="container margin-vert--xl">
        <h1>Clear Thinking Path</h1>
        <p>
          A step-by-step path through seven modules, one at a time. You make a plan, work through a
          module, check what you remember, and move on when you are ready.
        </p>
        <Link className="button button--primary button--lg" to="/docs/quickstarts/traditional-to-rational">
          Start the path
        </Link>
      </main>
    </Layout>
  );
}
