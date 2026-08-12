import React from 'react';
import styles from './styles.module.css';

const mascotImg = require('@site/static/img/title-mascots/tm-usecase.png').default;

const PosIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#fff" d="M12 2l7 3v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V5l7-3z" />
    <path fill="var(--badge-accent)" d="M10.3 13.4l-2-2-1.4 1.4 3.4 3.4 6.1-6.1-1.4-1.4z" />
  </svg>
);

const RollupsIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="4" y="14.5" width="16" height="4" rx="1.4" fill="#fff" opacity="0.55" />
    <rect x="5" y="9.7" width="14" height="4" rx="1.4" fill="#fff" opacity="0.78" />
    <rect x="6" y="5" width="12" height="4" rx="1.4" fill="#fff" />
  </svg>
);

const PermissionedIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="5" y="11" width="14" height="10" rx="2.5" fill="#fff" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="12" cy="15.4" r="1.5" fill="var(--badge-accent)" />
    <rect x="11.3" y="16.4" width="1.4" height="2.6" fill="var(--badge-accent)" />
  </svg>
);

const AiIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="7" y="7" width="10" height="10" rx="2" fill="#fff" />
    <rect x="10.4" y="10.4" width="3.2" height="3.2" fill="var(--badge-accent)" />
    <g stroke="#fff" strokeWidth="1.6" strokeLinecap="round">
      <path d="M9.5 4v2.2M14.5 4v2.2M9.5 17.8V20M14.5 17.8V20M4 9.5h2.2M4 14.5h2.2M17.8 9.5H20M17.8 14.5H20" />
    </g>
  </svg>
);

const ConsortiumIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 3l9 5H3l9-5z" fill="#fff" />
    <rect x="5" y="10" width="2.3" height="8" fill="#fff" />
    <rect x="10.85" y="10" width="2.3" height="8" fill="#fff" />
    <rect x="16.7" y="10" width="2.3" height="8" fill="#fff" />
    <rect x="4" y="19" width="16" height="2" rx="1" fill="#fff" />
  </svg>
);

const AppchainIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" fill="#fff" />
    <path d="M12 3v9l8 4.5v-9L12 3z" fill="var(--badge-accent)" opacity="0.32" />
    <path d="M12 12v9l-8-4.5v-9L12 12z" fill="var(--badge-accent)" opacity="0.16" />
  </svg>
);

const OracleIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="4" fill="#fff" />
    <ellipse cx="12" cy="12" rx="10" ry="4.2" fill="none" stroke="#fff" strokeWidth="1.6" opacity="0.75" />
  </svg>
);

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14M12 5v14" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" />
  </svg>
);

const TILES = [
  { label: 'Proof-of-Stake Chains', icon: <PosIcon />, from: '#3f9df0', to: '#0a3d91' },
  { label: 'Rollups & Sequencers', icon: <RollupsIcon />, from: '#3fd0f0', to: '#135677' },
  { label: 'Permissioned Networks', icon: <PermissionedIcon />, from: '#ffcb6b', to: '#c2760a' },
  { label: 'AI Execution Networks', icon: <AiIcon />, from: '#d783d4', to: '#e151bf' },
  { label: 'Consortium Chains', icon: <ConsortiumIcon />, from: '#6ece78', to: '#168036' },
  { label: 'Appchains', icon: <AppchainIcon />, from: '#97a4ce', to: '#180a91' },
  { label: 'Oracle Networks', icon: <OracleIcon />, from: '#c48af0', to: '#7020b0' },
  { label: '…and many more', icon: <PlusIcon />, from: '#b7c0cf', to: '#7c8aa0', muted: true },
];

const STEPS = [
  { text: <>Clone the <a href="#">template repository</a></> },
  { text: <>Follow the <a href="#">Installation Guide</a></> },
  { text: 'Build your own XP powered Runtime' },
];

export default function UseCases() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        <div className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>Use Cases</span>
            <h2 className={styles.title}>
              For any Substrate Chain that needs better 
              <span className={styles.accent}> Author Role Management</span>
            </h2>
            <p className={styles.desc}>
              Configure how block authors are managed by adjusting runtime
              parameters on-chain.
            </p>
          </div>
          <div className={styles.mascotWrap}>
            <div className={styles.mascot}>
              <img src={mascotImg} alt="Brand mascot, a raccoon in a blue hoodie" />
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {TILES.map((t) => (
            <div
              className={t.muted ? `${styles.tile} ${styles.tileMore}` : styles.tile}
              key={t.label}
            >
              <span
                className={styles.badge}
                style={{ '--badge-from': t.from, '--badge-to': t.to, '--badge-accent': t.to }}
              >
                {t.icon}
              </span>
              <span className={styles.tileLabel}>{t.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <div className={`${styles.card} ${styles.cardCta}`}>
            <h3>Manage the Role. Define the Future.</h3>
            <p>
              A robust, modular, and extensible framework for managing block
              authors - so you can focus on building the future of your
              network.
            </p>
            <a className={styles.btn} href="#">
              Get Started Today →
            </a>
          </div>

          <div className={`${styles.card} ${styles.cardSteps}`}>
            <h3>Ready to build with Pallet-Authors?</h3>
            <p>
              Pre-configured template &amp; runtime, example pallet, and full
              documentation included.
            </p>
            <div className={styles.steps}>
              {STEPS.map((s, i) => (
                <div className={styles.step} key={i}>
                  <span className={styles.stepNumber}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={styles.stepText}>{s.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}