import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

/* ---------- Left-column icons ---------- */
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

/* ---------- Orbit icons ---------- */
const AffidavitIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    <path d="M8 8h8M8 12h8M8 16h5"/>
  </svg>
);
const BallotIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="4" y="9" width="16" height="12"/><path d="M4 9l8-6 8 6"/><path d="M12 13v4"/>
  </svg>
);
const PersonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="12" cy="8" r="3.2"/><path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6"/>
  </svg>
);
const CoinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="12" cy="12" r="9"/><path d="M12 7v10M9 9.5c0-1.4 1.3-2.5 3-2.5s3 1.1 3 2.5-1.3 2-3 2-3 .8-3 2.2 1.3 2.5 3 2.5 3-1.1 3-2.5"/>
  </svg>
);
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M12 2 3 6v6c0 5 3.8 8.7 9 10 5.2-1.3 9-5 9-10V6l-9-4z"/><path d="M9 12h6"/>
  </svg>
);

/* Swap for require('@site/static/img/folio-default.png').default
   once Folio's default pose is finalized and saved to that path. */
const FolioPlaceholder = () => (
  <svg viewBox="0 0 100 120" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M18 8h50l14 14v90H18z" fill="var(--cm-paper-void)"/>
    <path d="M68 8v14h14z" fill="var(--cm-paper-deep)"/>
    <circle cx="40" cy="42" r="3.5" fill="currentColor" stroke="none"/>
    <circle cx="62" cy="42" r="3.5" fill="currentColor" stroke="none"/>
    <path d="M38 58q13 12 26 0" strokeLinecap="round"/>
    <circle cx="51" cy="88" r="13" fill="var(--cm-seal)" stroke="var(--cm-seal-deep)"/>
    <path d="M45 88l4 4 8-9" stroke="var(--cm-paper)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* baseAngle: degrees around the circle, 0 = top, clockwise.
   href: anchor on this page - adjust to match your actual section ids. */
const NODES = [
  { id: 'affidavits', label: 'Affidavits', desc: 'Voluntary weight declarations, filed within a timed window.', Icon: AffidavitIcon, href: '#affidavit', baseAngle: -90 },
  { id: 'elections', label: 'Elections', desc: 'A pluggable algorithm selects the next session\u2019s authors.', Icon: BallotIcon, href: '#election', baseAngle: -18 },
  { id: 'participation', label: 'Participation', desc: 'Elected authors produce blocks and earn points, every block.', Icon: PersonIcon, href: '#how', baseAngle: 54 },
  { id: 'rewards', label: 'Rewards', desc: 'Points settle into payouts once, at the close of every session.', Icon: CoinIcon, href: '#rewards', baseAngle: 126 },
  { id: 'penalties', label: 'Penalties', desc: 'Applied the instant an offence is reported \u2014 on no schedule at all.', Icon: ShieldIcon, href: '#accountability', baseAngle: 198 },
];

const BASE_SPEED = 6;     // degrees / second, resting rotation
const HOVER_SPEED = 0.9;  // degrees / second, while hovering any node
const EASE = 3;           // speed transition responsiveness

function OrbitHero() {
  const wrapRef = useRef(null);
  const angleRef = useRef(0);
  const speedRef = useRef(BASE_SPEED);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const hoveredRef = useRef(null);
  const selectedRef = useRef(null);

  hoveredRef.current = hoveredIdx;
  selectedRef.current = selectedIdx;

  useEffect(() => {
    let raf;
    let last = performance.now();

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const targetSpeed =
        selectedRef.current !== null ? 0 :
        hoveredRef.current !== null ? HOVER_SPEED :
        BASE_SPEED;

      speedRef.current += (targetSpeed - speedRef.current) * Math.min(1, dt * EASE);
      angleRef.current = (angleRef.current + speedRef.current * dt) % 360;

      if (wrapRef.current) {
        wrapRef.current.style.setProperty('--live-angle', `${angleRef.current}deg`);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleSelect = useCallback((idx) => {
    setSelectedIdx((prev) => (prev === idx ? null : idx));
  }, []);

  const selected = selectedIdx !== null ? NODES[selectedIdx] : null;

  return (
    <div className={styles.orbitWrap} ref={wrapRef}>

      <div className={styles.center}>
        <div className={styles.centerBadge}><FolioPlaceholder/></div>
      </div>

      {NODES.map(({ id, label, desc, Icon, href, baseAngle }, i) => (
        <Link
          key={id}
          to={href}
          className={`${styles.node} ${hoveredIdx === i ? styles.nodeHover : ''} ${selectedIdx === i ? styles.nodeSelected : ''} ${selectedIdx !== null && selectedIdx !== i ? styles.nodeDim : ''}`}
          style={{ '--base-angle': `${baseAngle}deg` }}
          onMouseEnter={() => setHoveredIdx(i)}
          onMouseLeave={() => setHoveredIdx(null)}
          onFocus={() => setHoveredIdx(i)}
          onBlur={() => setHoveredIdx(null)}
          onClick={(e) => { e.preventDefault(); handleSelect(i); window.location.hash = href; }}
          aria-label={`${label} - jump to section`}
        >
          <span className={styles.nodeInner}>
            <Icon/>
            <span className={styles.nodeLabel}>{label}</span>
          </span>
        </Link>
      ))}

      {selected && (
        <div className={styles.detailBubble} role="status">
          <button
            className={styles.detailClose}
            onClick={() => setSelectedIdx(null)}
            aria-label="Close and resume"
          >
            &times;
          </button>
          <strong>{selected.label}</strong>
          <p>{selected.desc}</p>
          <Link to={selected.href} className={styles.detailLink}>
            View section &rarr;
          </Link>
        </div>
      )}

    </div>
  );
}

export default function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.inner}>

        <div className={styles.left}>
          <div className={styles.eyebrowRow}>
            <span className={styles.eyebrowDash}/>
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
          <OrbitHero/>
        </div>

      </div>
    </header>
  );
}