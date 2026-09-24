import React from 'react';
import styles from './styles.module.css';
import SectionHeader, { Accent } from '@site/src/components/SectionHeader';

const STEP_1 = require('@site/static/img/ContibutionRewards/sec-61.png').default;
const STEP_2 = require('@site/static/img/ContibutionRewards/sec-62.png').default;
const STEP_3 = require('@site/static/img/ContibutionRewards/sec-63.png').default;
const STEP_4 = require('@site/static/img/ContibutionRewards/sec-64.png').default;
const STEP_5 = require('@site/static/img/ContibutionRewards/sec-65.png').default;
const STEP_6 = require('@site/static/img/ContibutionRewards/sec-66.png').default;

const FlatLineIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M3 20h18"/><path d="M4 10h16"/>
  </svg>
);
const StaircaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M3 20h18"/><path d="M4 6h5v4h5v4h5"/>
  </svg>
);
const SigmoidIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M3 19c4 0 4-14 9-14M12 5c5 0 5 14 9 14"/>
  </svg>
);
const UnevenBarsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M5 20V13M12 20V6M19 20V16"/>
  </svg>
);
const EvenBarsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M5 20V9M12 20V9M19 20V9"/>
  </svg>
);
const PuzzleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M6 4h5v1.5a1.5 1.5 0 1 0 3 0V4h5v5h-1.5a1.5 1.5 0 1 0 0 3H19v5h-5v-1.5a1.5 1.5 0 1 0-3 0V17H6v-5h1.5a1.5 1.5 0 1 0 0-3H6V4z"/>
  </svg>
);

const DatabaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <ellipse cx="12" cy="6" rx="8" ry="3"/>
    <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/>
    <path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>
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
const BoltIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/>
  </svg>
);
const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M6 8a6 6 0 1 1 12 0c0 4 2 5 2 5H4s2-1 2-5z"/><path d="M10 19a2 2 0 0 0 4 0"/>
  </svg>
);

const STEPS = [
  {
    id: '01',
    title: 'Contribute',
    image: STEP_1,
    alt: 'Placeholder illustration for Contribute',
    description: 'Block by block, an author produces a block and is credited for it.',
  },
  {
    id: '02',
    title: 'Earn Points',
    image: STEP_2,
    alt: '',
    description: <>Contribution accrues in <code>BlockPointsStore</code>, incremented automatically via <code>on_initialize</code>.</>,
  },
  {
    id: '03',
    title: 'Calculate Payout',
    image: STEP_3,
    alt: '',
    description: 'The inflation model - Constant, Halving, or Sigmoid Payout - sizes the total pool for the session.',
  },
  {
    id: '04',
    title: 'Determine Payees',
    image: STEP_4,
    alt: '',
    description: <>The reward model - <code>SharesPay</code> or <code>EqualPay</code> - decides how that pool splits between authors.</>,
  },
  {
    id: '05',
    title: 'Distribute Rewards',
    image: STEP_5,
    alt: '',
    description: <><code>RewardAuthors</code> settles the payout through <code>Config::Asset</code> and the role adapter&rsquo;s <code>CompensateRoles</code>.</>,
  },
  {
    id: '06',
    title: 'Clear Points',
    image: STEP_6,
    alt: '',
    description: 'Session-scoped storage - nothing carries over once the session settles.',
  },
];

const MODELS = [
  { title: 'Constant Payout', description: 'A fixed payout, independent of participation.', tag: 'Inflation', badge: 'inflate', Icon: FlatLineIcon },
  { title: 'Halving Payout', description: 'Payout that decays by half at fixed intervals.', tag: 'Inflation', badge: 'inflate', Icon: StaircaseIcon },
  { title: 'Sigmoid Payout', description: 'A smooth transition between two payout regimes.', tag: 'Inflation', badge: 'inflate', Icon: SigmoidIcon },
  { title: 'Shares Pay', description: 'Distribution by points, proportional and remainder-corrected.', tag: 'Reward', badge: 'reward', Icon: UnevenBarsIcon },
  { title: 'Equal Pay', description: 'Uniform distribution across every participant.', tag: 'Reward', badge: 'reward', Icon: EvenBarsIcon },
  { title: 'Your Own Model', description: 'Bring your own logic - each model is just a pluggable trait implementation.', tag: 'Custom', badge: 'custom', Icon: PuzzleIcon },
];

const CAPABILITIES = [
  { title: 'Points Are Temporary', description: 'Author points measure contribution - they are not the final reward itself.', Icon: DatabaseIcon },
  { title: 'Pluggable Models', description: 'Swap the payout curve and the payee split independently of each other.', Icon: GearIcon },
  { title: 'Automatic', description: 'Points accrue every block, with no extrinsic required.', Icon: BoltIcon },
  { title: 'Per-Author Events', description: <><code>RewardInitiated</code> or <code>RewardFailed</code>, for every author, every session.</>, Icon: BellIcon },
];

export default function ContributionRewards() {
  return (
    <section className={styles.section} id="rewards">

      <SectionHeader
        eyebrow="Contribution & Rewards"
        title={<>Every Block Counted. <Accent>Every Author Paid.</Accent></>}
        description="Every block, the author who produced it earns a point. Every session, those
          points decide who gets paid, how much, and by what curve - all of it
          configurable, none of it hardcoded."
      />

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

      <div className={styles.catHead}>Reward Models</div>
      <div className={styles.modelGrid}>
        {MODELS.map(({ title, description, tag, badge, Icon }) => (
          <div className={styles.modelCard} key={title}>
            <div className={`${styles.modelBadge} ${styles[badge]}`}><Icon/></div>
            <h3>{title}</h3>
            <p>{description}</p>
            <span className={styles.modelTag}>{tag}</span>
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