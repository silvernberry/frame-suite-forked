import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const manages = [
  'Enrollment & Collateral',
  'Author Backing',
  'Probation',
  'Elections',
  'Rewards & Penalties',
  'Governance',
];

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M4 12l5 5L20 6"
      fill="none"
      stroke="#fff"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const DocIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const BlockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" />
    <path d="M3 7l9 5 9-5M12 12v10" />
  </svg>
);

const ConsensusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="2.6" />
    <circle cx="12" cy="4" r="1.8" />
    <circle cx="19" cy="16" r="1.8" />
    <circle cx="5" cy="16" r="1.8" />
    <path d="M12 6.4V9.6M14.1 13.3l3.2 1.9M9.9 13.3l-3.2 1.9" />
  </svg>
);

const ValidationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2l7 3v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V5l7-3z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const NetworkingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.5 3.8 5.6 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.6-3.8-9S9.5 5.5 12 3z" />
  </svg>
);

const otherModules = [
  { label: 'Block Production', icon: <BlockIcon /> },
  { label: 'Consensus', icon: <ConsensusIcon /> },
  { label: 'Validation', icon: <ValidationIcon /> },
  { label: 'Networking', icon: <NetworkingIcon /> },
];

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 2l7 3v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V5l7-3z"
      stroke="#fff"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M9.5 12l1.8 1.8L15 10"
      stroke="#fff"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
 
export default function HeroSection() {
  return (
    <header className={styles.hero}>
      <div className={styles.intro}>
        <p className={styles.eyebrow}>
          <span className={styles.eyebrowIcon}>
            <ShieldIcon />
          </span>
          Role Management for Block Authors
        </p>
        <h1 className={styles.headline}>
          Separate Roles
          <br />
          From <span className={styles.accent}>Responsibilities</span>
        </h1>
        <p className={styles.subtitle}>
          Pallet Authors manages the author role - enrollment, staking,
          elections, incentives, and governance - while other runtime
          modules define and enforce what authors do.
        </p>

        <div className={styles.actions}>
          <Link to="/docs/getting-started/installation" className={styles.btnPrimary}>
            Get Started
            <ArrowIcon />
          </Link>
          <Link to="/docs/intro" className={styles.btnSecondary}>
            <DocIcon />
            Read Docs
          </Link>
        </div>
      </div>

      <div className={styles.diagram}>
        <div className={styles.card}>
          <h2 className={styles.columnHeading}>Pallet Authors Manages</h2>
          <ul className={styles.list}>
            {manages.map((item) => (
              <li key={item}>
                <span className={styles.check}>
                  <CheckIcon />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.mascotSlot}>
          <img
            src={require('@site/static/img/hero/hero-mascot.png').default}
            alt="Pallet Authors role management illustration"
            className={styles.mascotImg}
          />
        </div>

        <div className={styles.card}>
          <h2 className={styles.columnHeading}>Other Modules Manage</h2>
          <ul className={styles.list}>
            {otherModules.map((item) => (
              <li key={item.label}>
                <span className={styles.iconChip}>{item.icon}</span>
                {item.label}
              </li>
            ))}
          </ul>
          <p className={styles.andMore}>&hellip; and more</p>
        </div>
      </div>
    </header>
  );
}