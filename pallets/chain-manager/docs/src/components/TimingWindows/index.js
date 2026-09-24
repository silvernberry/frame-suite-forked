import React from 'react';
import styles from './styles.module.css';
import { SectionHeaderWithImage, Accent } from '@site/src/components/SectionHeader';

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="8" y="5" width="3" height="14"/><rect x="15" y="5" width="3" height="14"/>
  </svg>
);
const DocLinesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    <path d="M8 8h8M8 12h8M8 16h5"/>
  </svg>
);
const OverlapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="9" cy="12" r="6"/><circle cx="15" cy="12" r="6"/>
  </svg>
);
const CheckCircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="12" cy="12" r="9"/><path d="M8.5 12.5l2.3 2.3L16 9.5"/>
  </svg>
);
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M12 2 3 6v6c0 5 3.8 8.7 9 10 5.2-1.3 9-5 9-10V6l-9-4z"/><path d="M9 12h6"/>
  </svg>
);

const PercentIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/><path d="M18 6L6 18"/>
  </svg>
);
const GearIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <circle cx="12" cy="12" r="6.5"/><circle cx="12" cy="12" r="2.4"/>
    {[0, 90, 180, 270].map((deg) => (
      <rect key={deg} x="10.8" y="2.8" width="2.4" height="3" transform={`rotate(${deg} 12 12)`}/>
    ))}
  </svg>
);
const HourglassIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M6 3h12M6 21h12"/><path d="M7 3v4a5 5 0 0 0 10 0V3"/><path d="M7 21v-4a5 5 0 0 1 10 0v4"/>
  </svg>
);
const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="M6 7l1 13h10l1-13"/>
  </svg>
);

const PHASES = [
  {
    id: '01',
    title: 'Idle',
    description: 'No affidavit or election activity yet - the session has just begun.',
    range: '0–20%',
    rangeClass: 'idle',
    Icon: PauseIcon,
  },
  {
    id: '02',
    title: 'Affidavit Only',
    description: 'Authors may file affidavits declaring their election weight.',
    range: '20–50%',
    rangeClass: 'afdt',
    Icon: DocLinesIcon,
  },
  {
    id: '03',
    title: 'Affidavit + Election',
    description: 'Filing stays open while the election itself runs, side by side.',
    range: '50–80%',
    rangeClass: 'overlap',
    Icon: OverlapIcon,
  },
  {
    id: '04',
    title: 'Settlement',
    description: 'Filing closes; rewards and routine settlement take over.',
    range: '80–100%',
    rangeClass: 'settle',
    Icon: CheckCircleIcon,
  },
];

const CAPABILITIES = [
  { title: 'Percentage-Based', description: 'Windows scale with average session length, not fixed block numbers.', Icon: PercentIcon },
  { title: 'Automatic', description: 'No extrinsic opens or closes a window - the runtime just checks the current position.', Icon: GearIcon },
  { title: 'Cooldown-Protected', description: <><code>finality_after</code> and <code>finality_ticks</code> delay any offchain action until it&rsquo;s safe.</>, Icon: HourglassIcon },
  { title: 'Self-Clearing', description: "Session-scoped storage resets naturally - nothing needs to be swept by hand.", Icon: TrashIcon },
];

export default function TimingWindows() {
  return (
    <section className={styles.section} id="timing">

      <SectionHeaderWithImage
        eyebrow="Timing Windows"
        title={<>The Right Action. <Accent>At the Right Time.</Accent></>}
        description="Chain Manager operates within well-defined time windows to keep the runtime
            predictable. Affidavit filing and the election itself share one overlapping
            window - while penalties, deliberately, follow no window at all."
        image={require('@site/static/img/TimingWindow/sec5-title.png').default}
        imageAlt=""
      />

      <div className={styles.sessionBracket}>
        <svg viewBox="0 0 1000 26" preserveAspectRatio="none">
          <path d="M20,24 L20,8 L980,8 L980,24" fill="none" stroke="var(--cm-seal)" strokeWidth="1.5"/>
        </svg>
        <span className={styles.sessionPill}>One Session</span>
      </div>

      <div className={styles.phaseGrid}>
        {PHASES.map(({ id, title, description, range, rangeClass, Icon }) => (
          <div className={styles.phaseCard} key={id}>
            <div className={styles.phaseTop}>
              <span className={styles.phaseBadge}>{id}</span>
              <span className={styles.phaseIconWrap}><Icon/></span>
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
            <div className={`${styles.phaseRange} ${styles[rangeClass]}`}>{range}</div>
          </div>
        ))}
      </div>

      <div className={styles.penaltyCard}>
        <span className={styles.penaltyIconWrap}><ShieldIcon/></span>
        <div>
          <h3>Penalties - No Window</h3>
          <p>
            Triggered whenever an offence is reported, independent of every phase above.
            The one deliberate exception to this whole schedule.
          </p>
        </div>
        <span className={styles.penaltyTag}>Anytime</span>
      </div>

      <pre className={styles.formula}>
        <span className={styles.c1}>start_affidavit</span>{' = session_start + (AffidavitBeginsAt × avg_session_length)\n'}
        <span className={styles.c1}>end_affidavit</span>{'   = session_start + (AffidavitEndsAt   × avg_session_length)\n'}
        <span className={styles.c1}>start_election</span>{'  = start_affidavit + (ElectionBeginsAt × (end_affidavit − start_affidavit))\n'}
        <span className={styles.c1}>end_election</span>{'    = end_affidavit'}
      </pre>

      <div className={styles.capBar}>
        {CAPABILITIES.map(({ title, description, Icon }) => (
          <div className={styles.capItem} key={title}>
            <Icon/>
            <div><strong>{title}</strong><p>{description}</p></div>
          </div>
        ))}
      </div>

    </section>
  );
}