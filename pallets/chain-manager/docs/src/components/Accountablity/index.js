import React from 'react';
import styles from './styles.module.css';
import SectionHeader, { Accent } from '@site/src/components/SectionHeader';

const STEP_1 = require('@site/static/img/Accountablity/sec-41.png').default;
const STEP_2 = require('@site/static/img/Accountablity/sec-41.png').default;
const STEP_3 = require('@site/static/img/Accountablity/sec-41.png').default;
const STEP_4 = require('@site/static/img/Accountablity/sec-41.png').default;

const ThresholdIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M3 6h18"/><path d="M12 20V8"/><path d="M8 12l4-4 4 4"/>
  </svg>
);
const CappedIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M3 5h18M3 19h18"/><path d="M12 15V9"/>
  </svg>
);
const PuzzleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M6 4h5v1.5a1.5 1.5 0 1 0 3 0V4h5v5h-1.5a1.5 1.5 0 1 0 0 3H19v5h-5v-1.5a1.5 1.5 0 1 0-3 0V17H6v-5h1.5a1.5 1.5 0 1 0 0-3H6V4z"/>
  </svg>
);

const BoltIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/>
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
const PersonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="12" cy="8" r="3.2"/><path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6"/>
  </svg>
);
const DivergeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M12 3v6"/><path d="M12 9L5 20M12 9l7 11"/>
  </svg>
);

const STEPS = [
  {
    id: '01',
    title: 'Offence Reported',
    image: STEP_1,
    alt: '',
    description: <><code>pallet_offences</code> reports the offence, whenever it happens - no fixed schedule.</>,
  },
  {
    id: '02',
    title: 'Transform Severity',
    image: STEP_2,
    alt: '',
    description: <><code>Config::PenaltyModel</code> turns raw severity into an applied penalty amount.</>,
  },
  {
    id: '03',
    title: 'Apply to Author',
    image: STEP_3,
    alt: '',
    description: <><code>PenalizeAuthors</code> reaches the author through <code>RoleAdapter::CompensateRoles::Ratio</code>.</>,
  },
  {
    id: '04',
    title: 'Success / Failure',
    image: STEP_4,
    alt: '',
    description: <><code>PenaltyInitiated</code> on success, <code>PenaltyFailed</code> otherwise.</>,
  },
];

const MODELS = [
  { title: 'Threshold Penalty', description: 'Clamps individual penalties to an upper bound.', Icon: ThresholdIcon },
  { title: 'Capped Penalty', description: 'Bounds penalties between a floor and a ceiling.', Icon: CappedIcon },
  { title: 'Your Own Model', description: 'Bring your own logic - each model is just a pluggable trait implementation.', Icon: PuzzleIcon },
];

const CAPABILITIES = [
  { title: 'Reactive, Not Scheduled', description: 'Fires the instant an offence is reported - no window, no session boundary.', Icon: BoltIcon },
  { title: 'Configurable Severity', description: <>Swap <code>Config::PenaltyModel</code> without touching how offences are detected.</>, Icon: GearIcon },
  { title: 'Per-Author', description: 'Applied individually, never as a blanket penalty across the validator set.', Icon: PersonIcon },
  { title: 'Independent of Rewards', description: 'Runs on its own trigger - entirely separate from the reward cycle.', Icon: DivergeIcon },
];

export default function Accountability() {
  return (
    <section className={styles.section} id="accountability">

      <SectionHeader
        eyebrow="Accountability"
        title={<>Rewards Wait. <Accent>Penalties Don't.</Accent></>}
        description="Good participation is rewarded once, at the close of every session. Misbehavior
          is penalized the moment it&rsquo;s reported - accountability doesn&rsquo;t
          wait for a schedule."
      />

      <div className={styles.asymRow}>
        <div className={`${styles.asymCard} ${styles.reward}`}>
          <span className={styles.timing}>Scheduled &middot; Once Per Session</span>
          <h3>Rewards</h3>
          <p>Settled once, at the close of every session - predictable, calculated, tied to the settlement step in the main cycle.</p>
        </div>
        <div className={`${styles.asymCard} ${styles.penalty}`}>
          <span className={styles.timing}>Reactive &middot; Anytime</span>
          <h3>Penalties</h3>
          <p>Triggered the moment an offence is reported - reactive, unscheduled, independent of session boundaries entirely.</p>
        </div>
      </div>

      <div className={styles.stepGrid}>
        {STEPS.map(({ id, title, image, alt, description }) => (
          <div className={styles.stepCard} key={id}>
            <div className={styles.stepTop}>
              <span className={styles.stepBadge}>{id}</span>
              <h3>{title}</h3>
            </div>
            <img className={styles.stepImg} src={image} alt={alt}/>
            <p className={styles.desc}>{description}</p>
          </div>
        ))}
      </div>

      <div className={styles.catHead}>Penalty Models</div>
      <div className={styles.modelGrid}>
        {MODELS.map(({ title, description, Icon }) => (
          <div className={styles.modelCard} key={title}>
            <div className={styles.modelBadge}><Icon/></div>
            <div><h3>{title}</h3><p>{description}</p></div>
          </div>
        ))}
      </div>

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