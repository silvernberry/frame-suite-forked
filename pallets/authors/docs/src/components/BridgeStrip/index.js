import React from 'react';
import styles from './styles.module.css';

const sections = [
  {
    label: 'Enrollment & Roles',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l7 3v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V5l7-3z" />
      </svg>
    ),
  },
  {
    label: 'Backing',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="8" r="5.5" />
        <circle cx="15" cy="14" r="5.5" />
      </svg>
    ),
  },
  {
    label: 'Elections',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4" />
        <path d="M12 2l7 3v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V5l7-3z" />
      </svg>
    ),
  },
  {
    label: 'Rewards & Penalties',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18M7 6h10M9 6l-4 8a4 4 0 008 0l-4-8zM15 6l-4 8a4 4 0 008 0l-4-8z" />
      </svg>
    ),
  },
  {
    label: 'Governance',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
      </svg>
    ),
  },
];

export default function BridgeStrip() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.taglineBlock}>
          <p className={styles.tagline}>
            Separate Roles. Align Incentives. Govern On-Chain.
          </p>
          <p className={styles.sub}>
            Everything an author role needs, in one pluggable pallet.
          </p>
        </div>

        <div className={styles.marqueeWrapper}>
          <div className={styles.marqueeTrack}>
            {[...sections, ...sections].map((s, i) => (
              <span key={i} className={styles.pill}>
                <span className={styles.pillIcon}>{s.icon}</span>
                {s.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}