import React from 'react';
import styles from './styles.module.css';
import SectionHeader, { Accent } from '@site/src/components/SectionHeader';

const STEP_1 = require('@site/static/img/ElectionEngine/sec-31.png').default;
const STEP_2 = require('@site/static/img/ElectionEngine/sec-32.png').default;
const STEP_3 = require('@site/static/img/ElectionEngine/sec-331.png').default;
const STEP_4 = require('@site/static/img/ElectionEngine/sec-34.png').default;
const STEP_5 = require('@site/static/img/ElectionEngine/sec-35.png').default;

const GearIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <circle cx="12" cy="12" r="6.5" /><circle cx="12" cy="12" r="2.4" />
    {[0, 90, 180, 270].map((deg) => (
      <rect key={deg} x="10.8" y="2.8" width="2.4" height="3" transform={`rotate(${deg} 12 12)`} />
    ))}
  </svg>
);
const ShuffleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M4 6h4l8 12h4" /><path d="M4 18h4l8-12h4" /><path d="M17 3l3 3-3 3M17 15l3 3-3 3" />
  </svg>
);
const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const CubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
);
const SlidersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M4 6h10M17 6h3" /><circle cx="14" cy="6" r="2" />
    <path d="M4 12h4M11 12h9" /><circle cx="8" cy="12" r="2" />
    <path d="M4 18h13" /><circle cx="18" cy="18" r="2" />
  </svg>
);
const RecycleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M4 12a8 8 0 0 1 14-5.3M4 6v4h4" /><path d="M20 12a8 8 0 0 1-14 5.3M20 18v-4h-4" />
  </svg>
);
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M12 2 3 6v6c0 5 3.8 8.7 9 10 5.2-1.3 9-5 9-10V6l-9-4z" />
  </svg>
);

const STEPS = [
  {
    id: '01',
    title: 'Check Eligibility',
    image: STEP_1,
    alt: '',
    description: 'Determine whether the election can run, based on timing, runner authorization, minimum candidates, and other runtime-defined conditions.',
  },
  {
    id: '02',
    title: 'Prepare Candidates',
    image: STEP_2,
    alt: '',
    description: <>Collect eligible candidates from <code>AuthorAffidavits</code> and attach their declared election weights.</>,
  },
  {
    id: '03',
    title: 'Elect Authors',
    image: STEP_3,
    alt: '',
    description: 'Run the configured algorithm to select authors for the next session - the runner who submits the winning call earns bonus points.',
  },
  {
    id: '04',
    title: 'Handle Result',
    image: STEP_4,
    alt: '',
    description: <>Process the outcome and trigger the matching hook - <code>ElectedInstance</code> on success, <code>ElectionAttemptFailed</code> otherwise.</>,
  },
  {
    id: '05',
    title: 'Reveal Authors',
    image: STEP_5,
    alt: '',
    description: <>Expose the elected authors for the current period via the <code>inspect_elects</code> extrinsic.</>,
  },
];

const PLUGGABLE = [
  { title: 'Weighted Selection', tagline: 'Stake or weight based', Icon: GearIcon },
  { title: 'Randomized', tagline: 'On-chain randomness', Icon: ShuffleIcon },
  { title: 'Reputation Based', tagline: 'Performance driven', Icon: StarIcon },
  { title: 'Custom Algorithm', tagline: 'Implement your own', Icon: CubeIcon },
];

const CAPABILITIES = [
  { title: 'Runtime Controlled', description: 'Election conditions, candidate sources, and selection logic are defined by your runtime.', Icon: CubeIcon },
  { title: 'Modular Interface', description: 'Simple trait-based abstraction for easy integration.', Icon: SlidersIcon },
  { title: 'Deterministic Flow', description: 'Clear stages and hooks for success and failure handling.', Icon: RecycleIcon },
  { title: 'Production Ready', description: 'Built with flexible policies and reorg-safe safeguards.', Icon: ShieldIcon },
];

export default function ElectionEngine() {
  return (
    <section className={styles.section} id="election">

      <SectionHeader
        eyebrow="Election Engine"
        title={<>Flexible Elections. <Accent>Your Rules.</Accent></>}
        description="Chain Manager provides a pluggable election engine that selects the authors for
          the next session. It handles eligibility, candidate preparation, author
          selection, and result processing - while letting you define the actual
          election logic."
      />

      <div className={styles.stepGrid}>
        {STEPS.map(({ id, title, image, alt, description }) => (
          <div className={styles.stepCard} key={id}>
            <div className={styles.stepTop}>
              <span className={styles.stepBadge}>{id}</span>
              <h3>{title}</h3>
            </div>
            <img className={styles.stepImg} src={image} alt={alt} />
            <p className={styles.desc}>{description}</p>
          </div>
        ))}
      </div>

      <div className={styles.pluggablePanel}>
        <h3>Pluggable by Design</h3>
        <p>
          Chain Manager defines a common interface - <code>ElectionManager + InspectWeight</code>.
          You provide the election logic. These are illustrative categories, not built-in
          implementations:
        </p>
        <div className={styles.pluggableGrid}>
          {PLUGGABLE.map(({ title, tagline, Icon }) => (
            <div className={styles.pluggableCard} key={title}>
              <Icon />
              <div><strong>{title}</strong><span>{tagline}</span></div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.capBar}>
        {CAPABILITIES.map(({ title, description, Icon }) => (
          <div className={styles.capItem} key={title}>
            <Icon />
            <div><strong>{title}</strong><p>{description}</p></div>
          </div>
        ))}
      </div>

    </section>
  );
}