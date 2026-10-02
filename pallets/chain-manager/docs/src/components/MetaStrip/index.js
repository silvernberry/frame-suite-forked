import React from 'react';
import styles from './styles.module.css';

const TAGS = [
  'Lazy Election',
  'Affidavit-Gated',
  'Session-Driven',
  'Pluggable Economics',
  'Fork-Aware OCWs',
  'Reactive Accountability',
  'Runtime Agnostic',
  'Modular Design',
  'Ephemeral Keys',
  'Pluggable Reward Curves',
];

export default function MetaStrip() {
  const loopedTags = [...TAGS, ...TAGS];

  return (
    <section className={styles.divider} aria-label="Capabilities">
      <div className={styles.container}>
        <h3 className={styles.tagline}>
          Elect with Purpose. <span className={styles.accent}>Settle with Precision.</span>
        </h3>
        <p className={styles.sub}>The validator orchestration your runtime actually needs.</p>

        <div className={styles.marqueeWrap}>
          <div className={styles.marqueeTrack}>
            {loopedTags.map((tag, i) => (
              <span className={styles.marqueeTag} key={`${tag}-${i}`}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}