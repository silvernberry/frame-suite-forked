import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 12h16M14 6l6 6-6 6"/>
  </svg>
);

const STEPS = [
  {
    id: '01',
    content: <>Clone the <Link to="/docs/getting-started/example-runtime">template repositry</Link></>,
  },
  {
    id: '02',
    content: <>Follow the <Link to="/docs/getting-started/installation">installation Guide</Link></>,
  },
  {
    id: '03',
    content: 'Configure your own election, reward, and penalty models',
  },
];

export default function ReadyToBuild() {
  return (
    <section className={styles.section}>
      <div className={styles.row}>

        <div className={styles.ctaPanel}>
          <h2>Manage the Lifecycle. <span className={styles.ctaAccent}>Ship the Chain.</span></h2>
          <p>
            A session-driven framework for validator elections, rewards, and penalties
            &mdash; so you can focus on your chain, not your consensus plumbing.
          </p>
          <Link to="/docs/getting-started/installation" className={styles.ctaButton}>
            Get Started Today
            <ArrowIcon/>
          </Link>
        </div>

        <div className={styles.checklistPanel}>
          <h3>Ready to Integrate Chain Manager?</h3>
          <p>Pre-configured trait implementations, a working example runtime, and full documentation included.</p>
          <ol className={styles.stepList}>
            {STEPS.map(({ id, content }) => (
              <li key={id}>
                <span className={styles.stepBadge}>{id}</span>
                <span>{content}</span>
              </li>
            ))}
          </ol>
        </div>

      </div>
    </section>
  );
}