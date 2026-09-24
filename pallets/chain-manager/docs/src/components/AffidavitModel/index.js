import React from 'react';
import styles from './styles.module.css';
import SectionHeader, { Accent } from '@site/src/components/SectionHeader';

const STEP_1 = require('@site/static/img/AffidavitModel/sec-41.png').default;
const STEP_2 = require('@site/static/img/AffidavitModel/sec-42.png').default;
const STEP_3 = require('@site/static/img/AffidavitModel/sec-43.png').default;
const STEP_4 = require('@site/static/img/AffidavitModel/sec-44.png').default;
const STEP_5 = require('@site/static/img/AffidavitModel/sec-45.png').default;
const STEP_6 = require('@site/static/img/AffidavitModel/sec-46.png').default;
const STEP_7 = require('@site/static/img/AffidavitModel/sec-47.png').default;

const ShieldCheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M12 2 3 6v6c0 5 3.8 8.7 9 10 5.2-1.3 9-5 9-10V6l-9-4z"/>
    <path d="M8.5 12.5l2.3 2.3L16 9.5"/>
  </svg>
);
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>
  </svg>
);
const LeafIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M4 20c8 0 16-4 16-16-8 0-16 8-16 16z"/><path d="M4 20c3-6 8-10 14-13"/>
  </svg>
);
const KeyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="7" cy="15" r="4"/><path d="M10.5 11.5L20 2M16 6l3 3M13 9l2 2"/>
  </svg>
);
const PuzzleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M6 4h5v1.5a1.5 1.5 0 1 0 3 0V4h5v5h-1.5a1.5 1.5 0 1 0 0 3H19v5h-5v-1.5a1.5 1.5 0 1 0-3 0V17H6v-5h1.5a1.5 1.5 0 1 0 0-3H6V4z"/>
  </svg>
);

const STEPS = [
  {
    id: '01',
    title: 'Check Eligibility',
    image: STEP_1,
    alt: '',
    description: <>Confirm the author has already called <code>validate</code> and holds an active affidavit key for the upcoming session.</>,
  },
  {
    id: '02',
    title: 'Generate Affidavit',
    image: STEP_2,
    alt: '',
    description: 'Create the affidavit, declaring an election weight of self-stake plus backing.',
  },
  {
    id: '03',
    title: 'Submit Affidavit',
    image: STEP_3,
    alt: '',
    description: <>File it within the open submission window via <code>declare</code> - the same transaction also stages a fresh signing key for the round after.</>,
  },
  {
    id: '04',
    title: 'Rotate Key',
    image: STEP_4,
    alt: '',
    description: 'The freshly staged key must be confirmed finalized and fork-safe before it becomes the one used for the next declaration.',
  },
  {
    id: '05',
    title: 'Store for Election',
    image: STEP_5,
    alt: '',
    description: <>Held in <code>AuthorAffidavits</code>, keyed by session and author, bounded by <code>MaxAffidavitWeights</code>.</>,
  },
  {
    id: '06',
    title: 'Consumed by Election',
    image: STEP_6,
    alt: '',
    description: 'Read by the election adapter during candidate preparation - never mutated by it.',
  },
  {
    id: '07',
    title: 'Cleared After Use',
    image: STEP_7,
    alt: '',
    description: "Session-scoped storage that doesn't carry forward once the session ends.",
  },
];

const CAPABILITIES = [
  { title: 'Voluntary', description: 'Authors choose whether to submit an affidavit.', Icon: ShieldCheckIcon },
  { title: 'Time-Bound', description: 'Filed only within the automatically-timed submission window.', Icon: ClockIcon },
  { title: 'Ephemeral', description: 'Session-scoped, and cleared once the session ends.', Icon: LeafIcon },
  { title: 'Author-Relayed', description: "Filed with a disposable key, never the author's stash or authority key.", Icon: KeyIcon },
  { title: 'Runtime-Read', description: 'Read by whatever election logic the runtime provides - never owned by Chain Manager.', Icon: PuzzleIcon },
];

export default function AffidavitModel() {
  return (
    <section className={styles.section} id="affidavit">

      <SectionHeader
        eyebrow="Affidavit Model"
        title={<>Self-Declared Weights. <Accent>A Fairer Election.</Accent></>}
        description="          Chain Manager lets authors voluntarily submit affidavits declaring their desired
          election weight for the upcoming session. Affidavits are optional, ephemeral, and
          consumed by the election process - giving your runtime a flexible way to
          factor in author intent."
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