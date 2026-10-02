import React from 'react';
import Link from '@docusaurus/Link';
import HeroOrbit from '@site/src/components/HeroOrbit';
import styles from './styles.module.css';

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 12h16M14 6l6 6-6 6"/>
  </svg>
);
const DocIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);
const CubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);
const GearIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <circle cx="12" cy="12" r="6.5"/>
    <circle cx="12" cy="12" r="2.4"/>
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
      <rect key={deg} x="10.8" y="2.8" width="2.4" height="3" transform={`rotate(${deg} 12 12)`}/>
    ))}
  </svg>
);
const NetworkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="6" cy="6" r="2.3"/><circle cx="18" cy="6" r="2.3"/><circle cx="12" cy="18" r="2.3"/>
    <path d="M8 7l2.5 9M16 7l-2.5 9M8.3 6h7.4"/>
  </svg>
);

export default function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.inner}>

        <div className={styles.left}>
          <div className={styles.eyebrowRow}>
            <span className={styles.eyebrowTxt}>Coordinate &middot; Incentivize &middot; Secure</span>
          </div>

          <h1 className={styles.title}>Turn Authors into a Stronger Chain</h1>

          <p className={styles.tagline}>
            <span className={styles.ti}>Nominate.</span>{' '}
            <span className={styles.ts}>Elect.</span>{' '}
            <span className={styles.ti}>Settle.</span>{' '}
            <span className={styles.ts}>Repeat.</span>
          </p>

          <p className={styles.desc}>
            Chain Manager provides a modular framework to manage author elections, track participation, distribute rewards, 
            apply penalties, and process elction affidavits - keeping your chain secure, fair and predictable.
          </p>

          <div className={styles.ctaRow}>
            <Link to="/docs/getting-started/installation" className={`${styles.btn} ${styles.btnSeal}`}>
              Get Started
              <ArrowIcon/>
            </Link>
            <Link to="/docs/intro" className={`${styles.btn} ${styles.btnOutline}`}>
              <DocIcon/>
              Read the Docs
            </Link>
          </div>

          <div className={styles.features}>
            <div className={styles.featItem}><CubeIcon/>Modular &amp; Pluggable</div>
            <div className={styles.featItem}><GearIcon/>Runtime Ready</div>
            <div className={styles.featItem}><NetworkIcon/>Chain Agnostic</div>
          </div>
        </div>

        <div className={styles.right}>
          <HeroOrbit/>
        </div>

      </div>
    </header>
  );
}