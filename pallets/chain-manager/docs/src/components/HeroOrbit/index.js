import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

// Shared placeholder - every node image (including the center Folio badge)
// points here for now. Swap an individual node's `image` field to its own
// require() once real art exists; nothing else about the component needs
// to change.
const AFFIDAVIT = require('@site/static/img/HeroOrbit/affidavit.png').default;
const ELECTION = require('@site/static/img/HeroOrbit/election.png').default;
const PARTICIPATION = require('@site/static/img/HeroOrbit/participation.png').default;
const REWARD = require('@site/static/img/HeroOrbit/reward.png').default;
const PENALTY = require('@site/static/img/HeroOrbit/penalty.png').default;

/* baseAngle: degrees around the circle, 0 = top, clockwise.
   href: anchor on this page - adjust to match your actual section ids. */
const NODES = [
  { id: 'affidavits', label: 'Affidavits', desc: 'Voluntary weight declarations, filed within a timed window.', image: AFFIDAVIT, href: '#affidavit', baseAngle: -90 },
  { id: 'elections', label: 'Elections', desc: 'A pluggable algorithm selects the next session\u2019s authors.', image: ELECTION, href: '#election', baseAngle: -18 },
  { id: 'participation', label: 'Participation', desc: 'Elected authors produce blocks and earn points, every block.', image: PARTICIPATION, href: '#how', baseAngle: 54 },
  { id: 'rewards', label: 'Rewards', desc: 'Points settle into payouts once, at the close of every session.', image: REWARD, href: '#rewards', baseAngle: 126 },
  { id: 'penalties', label: 'Penalties', desc: 'Applied the instant an offence is reported \u2014 on no schedule at all.', image: PENALTY, href: '#accountability', baseAngle: 198 },
];

const CENTER_IMG = require('@site/static/img/HeroOrbit/folio-main.png').default;; // swap independently once Folio's default pose exists

const BASE_SPEED = 6;     // degrees / second, resting rotation
const HOVER_SPEED = 0.9;  // degrees / second, while hovering any node
const EASE = 3;           // speed transition responsiveness

export default function HeroOrbit() {
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
        <div className={styles.centerBadge}>
          <img src={CENTER_IMG} alt="Folio, the Chain Manager mascot" className={styles.centerImg}/>
        </div>
      </div>

      {NODES.map(({ id, label, desc, image, href, baseAngle }, i) => (
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
            <img src={image} alt={label} className={styles.nodeImg}/>
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