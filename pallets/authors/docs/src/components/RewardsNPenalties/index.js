import React from 'react';
import styles from './styles.module.css';

const mascotImg = require('@site/static/img/title-mascots/tm-penalties.png').default;

const rewardCardImg = require('@site/static/img/docusaurus-social-card.jpg').default;
const penaltyCardImg = require('@site/static/img/docusaurus-social-card.jpg').default;

const SparkleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3l1.9 4.9L19 9l-4.9 1.9L12 16l-1.9-4.9L5 9l4.9-1.9L12 3z" />
    <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
  </svg>
);

const DoubleArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M3 12h18" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const BlockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="var(--pa-trust)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <rect x="4" y="10" width="16" height="10" rx="1.5" /><path d="M4 10l8-6 8 6" />
  </svg>
);
const BarsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="var(--pa-trust)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M4 20V10M12 20V4M20 20v-7" />
  </svg>
);
const TrendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="var(--pa-trust)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M3 17l5-5 3 3 6-7M15 8h4v4" />
  </svg>
);
const AsteriskIcon = ({ color = 'var(--pa-trust)' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="2.6" />
    <path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M5.6 18.4l1.6-1.6M16.8 7.2l1.6-1.6" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="var(--penalty)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M4 4l7 7M20 4l-7 7M4 20l7-7M20 20l-7-7" />
  </svg>
);
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="var(--penalty)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" />
  </svg>
);
const ShieldXIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="var(--penalty)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" />
    <line x1="9" y1="9" x2="15" y2="14" /><line x1="15" y1="9" x2="9" y2="14" />
  </svg>
);

const ScaleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3v18M8 21h8" />
    <path d="M12 6l-5.5 1.2L4 13a3.2 3.2 0 0 0 6.2 0L8 7.2M12 6l5.5 1.2L20 13a3.2 3.2 0 0 1-6.2 0l2.2-5.8" />
  </svg>
);
const RocketTrendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 17l5-5 3 3 6-7M18 8h3v3" />
  </svg>
);
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#fff" d="M12 2l7 3v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V5l7-3z" /></svg>
);
const SlidersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 6h10M4 12h6M4 18h10M17 5v3M17 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM13 17v3M13 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2l2.6 5.9L21 8.6l-4.7 4.2L17.6 19 12 15.9 6.4 19l1.3-6.2L3 8.6l6.4-.7L12 2z" />
  </svg>
);
const PuzzleIcon = () => (
  <svg viewBox="0 0 24 24" fill="var(--pa-trust)" aria-hidden="true">
    <path d="M20.5 11H19V7.5C19 6.12 17.88 5 16.5 5H13V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4.5C3.13 5 2 6.13 2 7.5v3.68h1.5c1.19 0 2.16.97 2.16 2.16s-.97 2.16-2.16 2.16H2v3.68C2 20.87 3.13 22 4.5 22h3.68v-1.5c0-1.19.97-2.16 2.16-2.16s2.16.97 2.16 2.16V22h3.68c1.37 0 2.5-1.13 2.5-2.5V16h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z" />
  </svg>
);
const ShieldXFlowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" />
    <line x1="9" y1="9" x2="15" y2="14" />
    <line x1="15" y1="9" x2="9" y2="14" />
  </svg>
);

const BandShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2l7 3v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V5l7-3z" />
  </svg>
);
const GearIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);
const UpgradeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 2l4 4-4 4M21 6H9a4 4 0 0 0-4 4v1M7 22l-4-4 4-4M3 18h12a4 4 0 0 0 4-4v-1" />
  </svg>
);
const PeopleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 6L4 12L9 18M15 6L20 12L15 18" />
  </svg>
);

const REWARD_MODELS = [
  { icon: <BlockIcon />, title: 'Per Block Rewards', desc: 'Reward per block production' },
  { icon: <BarsIcon />, title: 'Stake Proportional', desc: 'More stake, more rewards' },
  { icon: <TrendIcon />, title: 'Performance Based', desc: 'Reward based on metrics' },
  { icon: <AsteriskIcon />, title: 'Custom Model', desc: 'Your own reward logic' },
];

const PENALTY_MODELS = [
  { icon: <XIcon />, title: 'Equivocation Slash', desc: 'Slash for double signing' },
  { icon: <ClockIcon />, title: 'Downtime Slash', desc: 'Slash for being offline' },
  { icon: <ShieldXIcon />, title: 'Invalid Behavior Slash', desc: 'Slash for invalid actions' },
  { icon: <AsteriskIcon color="var(--penalty)" />, title: 'Custom Model', desc: 'Your own penalty logic' },
];

const EXAMPLE_MODELS = [
  { icon: <ScaleIcon />, color: 'blue', title: 'Balanced Mode', desc: 'Moderate rewards, moderate penalties.' },
  { icon: <RocketTrendIcon />, color: 'teal', title: 'High Reward Model', desc: 'High inflation for fast growth.' },
  { icon: <ShieldIcon />, color: 'red', title: 'High Security Model', desc: 'High penalties to maximize security.' },
  { icon: <SlidersIcon />, color: 'slate', title: 'Your Custom Model', desc: 'Design the tokenomics that fits your network.' },
];

const SYSTEM_BENEFITS = [
  'Governance friendly',
  'Upgrade logic without migrations',
  'Support any economic design',
];

const BAND_ITEMS = [
  { icon: <BandShieldIcon />, title: 'Economic Security', desc: 'Incentivize good behavior, discourage bad behavior.' },
  { icon: <GearIcon />, title: 'Pluggable & Modular', desc: 'Change reward or penalty logic without changing the core.' },
  { icon: <UpgradeIcon />, title: 'Upgradeable', desc: 'Evolve your economic model as the network grows.' },
  { icon: <PeopleIcon />, title: 'Community Driven', desc: 'Governance decides which models to use and when.' },
  { icon: <CodeIcon />, title: 'Developer Friendly', desc: 'Build and integrate your own models easily.' },
];

function PluginCard({ variant, title, subtitle, lead, models, tag, img}) {
  const cardClass = variant === 'penalties' ? `${styles.card} ${styles.penalties}` : `${styles.card} ${styles.rewards}`;
  return (
    <div className={cardClass}>
      <h3>
        {title} <small>{subtitle}</small>
      </h3>
      <p className={styles.lead}>{lead}</p>

      <div className={styles.cardMascot}>
        <img src={img} alt="" />
      </div>

      <p className={styles.subhead}>Plugin Models (Examples)</p>
      <div className={styles.miniList}>
        {models.map((m) => (
          <div className={styles.miniItem} key={m.title}>
            <span className={variant === 'penalties' ? `${styles.miniIcon} ${styles.miniIconPenalty}` : `${styles.miniIcon} ${styles.miniIconReward}`}>
              {m.icon}
            </span>
            <div>
              <p className={styles.t}>{m.title}</p>
              <p className={styles.d}>{m.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.cardTag}>{tag}</div>
    </div>
  );
}

export default function RewardsPenalties() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>Rewards &amp; Penalties</span>
            <h2 className={styles.title}>
              Good work gets <span className={styles.blue}>rewards</span>. Bad behavior gets{' '}
              <span className={styles.red}>penalties</span>.
            </h2>
            <p className={styles.desc}>
              All reward and penalty logic is <b>pluggable</b>. Choose any model or build your own.
            </p>
          </div>
          <div className={styles.mascotWrap}>
            <div className={styles.mascot}>
              <img src={mascotImg} alt="Brand mascot, a raccoon in a blue hoodie" />
            </div>
          </div>
        </div>

        <div className={styles.topRow}>
          <PluginCard
            variant="rewards"
            title="Rewards"
            subtitle="(Inflationary)"
            lead="Good contributions are rewarded. Inflation creates new tokens and distributes them."
            models={REWARD_MODELS}
            tag="Inflationary · Configurable · Pluggable"
            img={rewardCardImg}
          />
          <PluginCard
            variant="penalties"
            title="Penalties"
            subtitle="(For Bad Behavior)"
            lead="Misbehavior is penalized. Slashing removes stake as punishment."
            models={PENALTY_MODELS}
            tag="Deterrent · Fair · Pluggable"
            img={penaltyCardImg}
          />
        </div>

        <div className={styles.bottomRow}>
          <div className={styles.modelsCol}>
            <h3 className={styles.modelsHeading}>Use existing models or create your own.</h3>
            <div className={styles.modelGrid}>
              {EXAMPLE_MODELS.map((m) => (
                <div className={styles.modelItem} key={m.title}>
                  <span className={`${styles.modelIcon} ${styles['icon-' + m.color]}`}>{m.icon}</span>
                  <h4>{m.title}</h4>
                  <p>{m.desc}</p>
                </div>
              ))}
            </div>
            <div className={styles.endless}>
              <SparkleIcon />
              <span>The possibilities are endless!</span>
            </div>
          </div>

          <div className={`${styles.card} ${styles.system}`}>
            <h3>Fully Pluggable System</h3>
            <p className={styles.lead}>Swap reward or penalty logic anytime without changing the core.</p>

            <div className={styles.flowRow}>
              <div className={styles.flowPill}>
                <span className={styles.flowIcon}><StarIcon /></span>
                <span>Rewards Plugin</span>
              </div>
              <span className={styles.flowArrow}><DoubleArrowIcon /></span>
              <div className={styles.flowHub}>
                <span className={styles.flowIcon}><PuzzleIcon /></span>
                <span>Plugin Interface</span>
              </div>
              <span className={styles.flowArrow}><DoubleArrowIcon /></span>
              <div className={styles.flowPill}>
                <span className={styles.flowIcon}><ShieldXFlowIcon /></span>
                <span>Penalties Plugin</span>
              </div>
            </div>

            <p className={styles.subhead} style={{ color: 'rgba(255,255,255,0.7)' }}>
              Benefits
            </p>
            <ul className={styles.benefits}>
              {SYSTEM_BENEFITS.map((b) => (
                <li key={b}>
                  <CheckIcon />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.band}>
          {BAND_ITEMS.map((b) => (
            <div className={styles.bandItem} key={b.title}>
              <span className={styles.bandIcon}>{b.icon}</span>
              <h4 className={styles.bandTitle}>{b.title}</h4>
              <p className={styles.bandDesc}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}