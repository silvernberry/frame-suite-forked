import React from 'react';
import styles from './styles.module.css';

const features = [
  {
    label: 'Semantic Bonds',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L22 12L12 22L2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    label: 'Lazy Evaluation',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12c0-4 2-7 5-9" />
        <path d="M21 12c0 4-2 7-5 9" />
        <path d="M3 12h18" />
        <path d="M12 3c2 2 3 5 3 9s-1 7-3 9" />
        <path d="M12 3c-2 2-3 5-3 9s1 7 3 9" />
      </svg>
    ),
  },
  {
    label: 'Three Models',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L20.66 7v10L12 22 3.34 17V7Z" />
      </svg>
    ),
  },
  {
    label: 'Position Variants',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    label: 'Fungible-Agnostic',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    label: 'Explicit Imbalance',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18" />
        <path d="M8 21h8" />
        <path d="M5 8l3-5 3 5" />
        <path d="M13 8l3-5 3 5" />
        <path d="M5 8h6M13 8h6" />
      </svg>
    ),
  },
  {
    label: 'Plugin Balance',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    label: 'Multi-Instance',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="0" />
        <rect x="14" y="3" width="7" height="7" rx="0" />
        <rect x="3" y="14" width="7" height="7" rx="0" />
        <path d="M14 17.5h7M17.5 14v7" />
      </svg>
    ),
  },
  {
    label: 'VirtualReceipt',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2h12v20l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5-2 1.5V2z" />
        <path d="M9 7h6M9 11h6M9 15h4" />
      </svg>
    ),
  },
  {
    label: 'Reusable Primitive',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
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
            Bond with Purpose. Resolve with Precision.
          </p>
          <p className={styles.sub}>
            The only commitment primitive your runtime will ever need.
          </p>
        </div>

        <div className={styles.marqueeWrapper}>
          <div className={styles.marqueeTrack}>
            {[...features, ...features].map((f, i) => (
              <span key={i} className={styles.pill}>
                <span className={styles.pillIcon}>{f.icon}</span>
                {f.label}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}