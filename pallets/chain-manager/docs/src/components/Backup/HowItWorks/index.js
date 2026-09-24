import React from 'react';
import styles from './styles.module.css';

/* ---- Header image icon ---- */
const ImagePlaceholderIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="4" width="18" height="14" rx="0"/>
    <circle cx="8.5" cy="9.5" r="1.5"/>
    <path d="M3 15l5-4 4 3 3-2.5L21 15"/>
  </svg>
);

/* ---- Step icons (main cycle) ---- */
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="10" cy="10" r="6"/><path d="M14.5 14.5L20 20"/>
  </svg>
);
const BallotIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="4" y="9" width="16" height="12"/><path d="M4 9l8-6 8 6"/><path d="M12 13v4"/>
  </svg>
);
const DeviceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="3" y="5" width="18" height="11" rx="0"/><path d="M2 19h20"/>
  </svg>
);
const BarsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M5 20V13M12 20V8M19 20v-6"/>
  </svg>
);
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M12 2 3 6v6c0 5 3.8 8.7 9 10 5.2-1.3 9-5 9-10V6l-9-4z"/>
  </svg>
);
const CheckCircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="12" cy="12" r="9"/><path d="M8.5 12.5l2.3 2.3L16 9.5"/>
  </svg>
);
const RecycleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M4 12a8 8 0 0 1 14-5.3M4 6v4h4"/><path d="M20 12a8 8 0 0 1-14 5.3M20 18v-4h-4"/>
  </svg>
);

/* ---- Affidavit lane icons ---- */
const PencilIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M4 20l1-4L16 5l3 3L8 19l-4 1z"/><path d="M14 7l3 3"/>
  </svg>
);
const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M3 11l18-8-8 18-2-8-8-2z"/>
  </svg>
);
const DatabaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <ellipse cx="12" cy="6" rx="8" ry="3"/>
    <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/>
    <path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>
  </svg>
);
const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="2.6"/>
  </svg>
);
const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="M6 7l1 13h10l1-13"/>
  </svg>
);

const STEPS = [
  {
    id: '01',
    title: 'Election Preparation',
    description: 'Check election conditions, gather candidates, and prepare them with their declared election weights.',
    Icon: SearchIcon,
  },
  {
    id: '02',
    title: 'Election',
    description: 'Run the configured election algorithm to select authors for the next session.',
    Icon: BallotIcon,
  },
  {
    id: '03',
    title: 'Author Participation',
    description: 'Elected authors take their seats as session validators and begin their consensus-critical duties.',
    Icon: DeviceIcon,
  },
  {
    id: '04',
    title: 'Contribution Tracking',
    description: 'Participation and block authorship are recorded as temporary contribution points.',
    Icon: BarsIcon,
  },
  {
    id: '05',
    title: 'Accountability',
    Icon: ShieldIcon,
    wide: true,
    split: [
      { label: 'Rewards', description: 'Points are used to calculate and distribute rewards.', variant: 'reward' },
      { label: 'Penalties', description: 'Offence reports can trigger penalties at any time.', variant: 'penalty' },
    ],
  },
  {
    id: '06',
    title: 'Settlement',
    description: 'Rewards are distributed to authors and temporary points are cleared.',
    Icon: CheckCircleIcon,
  },
  {
    id: '07',
    title: 'Next Election',
    description: 'The cycle repeats, with updated conditions and a new set of author decisions.',
    Icon: RecycleIcon,
  },
];

const AFFIDAVIT_STEPS = [
  { title: 'Generate', description: 'Create the affidavit declaring your election weight.', Icon: PencilIcon },
  { title: 'Submit', description: 'File it within the open submission window.', Icon: SendIcon },
  { title: 'Stored', description: 'Held and available for the upcoming election.', Icon: DatabaseIcon },
  { title: 'Consumed', description: 'Read by the election adapter, not mutated by it.', Icon: EyeIcon },
  { title: 'Cleared', description: "Session-scoped storage that doesn't carry forward.", Icon: TrashIcon },
];

export default function HowItWorks() {
  return (
    <section className={styles.section} id="how">

      <div className={styles.headerRow}>
        <div className={styles.headerText}>
          <div className={styles.eyebrowRow}>
            <span className={styles.eyebrowDash}/>
            <span className={styles.eyebrowTxt}>How It Works</span>
          </div>
          <h2 className={styles.sectionHead}>
            A Complete Cycle for <span className={styles.accent}>Validator Coordination</span>
          </h2>
          <p className={styles.lede}>
            Chain Manager runs a continuous cycle that prepares candidates, elects authors,
            tracks contributions, handles rewards and penalties, and moves on to the next
            election - keeping validator selection fair and predictable, every session.
          </p>
        </div>
        {/* <div className={styles.headerImg}>
          <div className={styles.imgIcon}><ImagePlaceholderIcon/></div>
          <span className={styles.imgFilename}>docusaurus-social-card.jpg</span>
          <p className={styles.imgBrief}>
            Illustration - placeholder. The mascot beside a small cycle motif, with two
            handwritten-style notes near it: &ldquo;Different roles, one coordinated
            cycle&rdquo; and &ldquo;Authors drive progress.&rdquo;
          </p>
        </div> */}
      </div>

      <div className={styles.stepGrid}>
        {STEPS.map(({ id, title, description, Icon, split, wide }) => (
          <div className={`${styles.stepCard} ${wide ? styles.stepCardWide : ''}`} key={id}>
            <div className={styles.stepTop}>
              <span className={styles.stepBadge}>{id}</span>
              <span className={styles.stepMascot}><Icon/></span>
            </div>
            <h3>{title}</h3>
            {split ? (
              <div className={styles.splitRow}>
                {split.map(({ label, description: d, variant }) => (
                  <div className={`${styles.splitCard} ${styles[`splitCard${variant === 'reward' ? 'Reward' : 'Penalty'}`]}`} key={label}>
                    <strong>{label}</strong>
                    <p>{d}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>{description}</p>
            )}
          </div>
        ))}
      </div>

      <div className={styles.laneCard}>
        <span className={styles.laneBadge}>Affidavits &middot; Input to Election</span>
        <h3>Authors can declare their election weight</h3>
        <p>
          Authors may voluntarily submit an affidavit with their desired election weight.
          Valid for the upcoming session, and readable by any external module that needs
          it - feeds directly into Election Preparation, above.
        </p>
        <div className={styles.laneSteps}>
          {AFFIDAVIT_STEPS.map(({ title, description, Icon }) => (
            <div className={styles.laneStep} key={title}>
              <div className={styles.laneStepIcon}><Icon/></div>
              <h4>{title}</h4>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}