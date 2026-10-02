import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const CENTER_IMG = require('@site/static/img/folio-main.png').default;

const IconAffidavits = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M9 14l2 2 4-4" />
  </svg>
);

const IconElections = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 3v15" />
    <path d="M7 7h10" />
    <path d="M7 7l-3.5 6.5a3.5 3.5 0 0 0 7 0z" />
    <path d="M17 7l-3.5 6.5a3.5 3.5 0 0 0 7 0z" />
    <path d="M8 21h8" />
  </svg>
);

const IconParticipation = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 2.5l8 4.5v10l-8 4.5-8-4.5v-10z" />
  </svg>
);

const IconRewards = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="8" r="5.5" />
    <path d="M8.3 12.8L6.5 21l5.5-3 5.5 3-1.8-8.2" />
  </svg>
);

const IconPenalties = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M6.6 6.6l10.8 10.8" />
  </svg>
);

const ICONS = {
  affidavits: IconAffidavits,
  elections: IconElections,
  participation: IconParticipation,
  rewards: IconRewards,
  penalties: IconPenalties,
};

const NODES = [
  { id: 'affidavits', label: 'Affidavits', desc: 'Voluntary weight declarations, filed within a timed window.', href: '#affidavit', baseAngle: -90, color: '#8B5E34' },
  { id: 'elections', label: 'Elections', desc: 'A pluggable algorithm selects the next session\u2019s authors.', href: '#election', baseAngle: -18, color: '#3B5B7A' },
  { id: 'participation', label: 'Participation', desc: 'Elected authors produce blocks and earn points, every block.', href: '#how', baseAngle: 54, color: '#6B7F4F' },
  { id: 'rewards', label: 'Rewards', desc: 'Points settle into payouts once, at the close of every session.', href: '#rewards', baseAngle: 126, color: '#C9962C' },
  { id: 'penalties', label: 'Penalties', desc: 'Applied the instant an offence is reported - on no schedule at all.', href: '#accountability', baseAngle: 198, color: '#8A1F1F' },
];

const BASE_SPEED = 6;
const HOVER_SPEED = 0.9;
const EASE = 3;

export default function HeroOrbit() {
  const wrapRef = useRef(null);
  const bubbleRef = useRef(null);
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

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (selectedRef.current === null) return;
      if (bubbleRef.current && !bubbleRef.current.contains(e.target)) {
        setSelectedIdx(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const selected = selectedIdx !== null ? NODES[selectedIdx] : null;

  return (
    <div className={styles.orbitWrap} ref={wrapRef}>

      <div className={styles.center}>
        <div className={styles.centerBadge}>
          <img src={CENTER_IMG} alt="Folio, the Chain Manager mascot" className={styles.centerImg}/>
        </div>
      </div>

      {NODES.map(({ id, label, desc, href, baseAngle, color }, i) => {
        const Icon = ICONS[id];
        return (
          <Link
            key={id}
            to={href}
            className={`${styles.node} ${hoveredIdx === i ? styles.nodeHover : ''} ${selectedIdx === i ? styles.nodeSelected : ''} ${selectedIdx !== null && selectedIdx !== i ? styles.nodeDim : ''}`}
            style={{ '--base-angle': `${baseAngle}deg`, '--node-color': color }}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            onFocus={() => setHoveredIdx(i)}
            onBlur={() => setHoveredIdx(null)}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleSelect(i); window.location.hash = href; }}
            aria-label={`${label} - jump to section`}
          >
            <span className={styles.nodeInner}>
              <span className={styles.nodeIconBox}>
                <Icon className={styles.nodeIcon} />
              </span>
              <span className={styles.nodeLabel}>{label}</span>
            </span>
          </Link>
        );
      })}

      {selected && (
        <div className={styles.detailBubble} role="status" ref={bubbleRef}>
          <strong>{selected.label}</strong>
          <p>{selected.desc}</p>
        </div>
      )}

    </div>
  );
}