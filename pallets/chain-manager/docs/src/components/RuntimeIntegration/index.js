import React from 'react';
import styles from './styles.module.css';
import { SectionHeaderWithImage, Accent } from '@site/src/components/SectionHeader';

/* ---- Pipeline column icons ---- */
const CubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M12 2 3 6v6c0 5 3.8 8.7 9 10 5.2-1.3 9-5 9-10V6l-9-4z"/>
  </svg>
);
const NetworkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="6" cy="6" r="2.3"/><circle cx="18" cy="6" r="2.3"/><circle cx="12" cy="18" r="2.3"/>
    <path d="M8 7l2.5 9M16 7l-2.5 9M8.3 6h7.4"/>
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 12l5 5L20 6"/>
  </svg>
);

/* ---- Capability bar icons ---- */
const GearIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <circle cx="12" cy="12" r="6.5"/><circle cx="12" cy="12" r="2.4"/>
    {[0, 90, 180, 270].map((deg) => (
      <rect key={deg} x="10.8" y="2.8" width="2.4" height="3" transform={`rotate(${deg} 12 12)`}/>
    ))}
  </svg>
);
const SlidersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M4 6h10M17 6h3"/><circle cx="14" cy="6" r="2"/>
    <path d="M4 12h4M11 12h9"/><circle cx="8" cy="12" r="2"/>
    <path d="M4 18h13"/><circle cx="18" cy="18" r="2"/>
  </svg>
);
const PuzzleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M6 4h5v1.5a1.5 1.5 0 1 0 3 0V4h5v5h-1.5a1.5 1.5 0 1 0 0 3H19v5h-5v-1.5a1.5 1.5 0 1 0-3 0V17H6v-5h1.5a1.5 1.5 0 1 0 0-3H6V4z"/>
  </svg>
);
const CheckCircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="12" cy="12" r="9"/><path d="M8.5 12.5l2.3 2.3L16 9.5"/>
  </svg>
);

const PIPELINE = [
  {
    id: 'runtime',
    className: 'runtime',
    Icon: CubeIcon,
    title: 'Your Runtime',
    description: 'Define the policy, and provide the implementations Chain Manager delegates to.',
    items: [
      <>Implement <code>RoleManager + CompensateRoles + FundRoles</code></>,
      <>Implement <code>ElectionManager + InspectWeight</code></>,
      <>Choose or write a <code>RewardModel</code></>,
      <>Choose or write an <code>InflationModel</code></>,
      <>Choose or write a <code>PenaltyModel</code></>,
    ],
  },
  {
    id: 'manager',
    className: 'manager',
    Icon: ShieldIcon,
    title: 'Chain Manager',
    description: 'Trait-based abstractions for the whole validator lifecycle.',
    items: [
      'Election Engine',
      'Affidavit Model',
      'Contribution Points',
      'Reward System',
      'Penalty System',
      'Runtime Hooks',
    ],
  },
  {
    id: 'ecosystem',
    className: 'ecosystem',
    Icon: NetworkIcon,
    title: 'Your Ecosystem',
    description: 'Compose with the rest of your runtime and external systems.',
    items: [
      <>Session &amp; consensus - <code>pallet_session</code></>,
      <>Block authorship - <code>pallet_authorship</code></>,
      <>Offence reporting - <code>pallet_offences</code></>,
      'Your asset / treasury pallet',
      'Your role / stake pallet',
    ],
  },
];

const CAPABILITIES = [
  { title: 'Modular Design', description: 'Each mechanism is a separate, focused abstraction with a clear interface.', Icon: GearIcon },
  { title: 'Flexible Policies', description: 'Implement your own algorithms, curves, and models - nothing is hardcoded.', Icon: SlidersIcon },
  { title: 'Easy Integration', description: 'Designed to sit alongside your existing session, staking, and asset pallets.', Icon: PuzzleIcon },
  { title: 'Runtime Agnostic', description: "Swap adapters to fit a new runtime without touching Chain Manager's own logic.", Icon: CheckCircleIcon },
];

export default function RuntimeIntegration() {
  return (
    <section className={styles.section} id="integration">

      <SectionHeaderWithImage
        eyebrow="Runtime Integration"
        title={<>Your Runtime. <Accent>Your Rules.</Accent></>}
        description="Chain Manager is a set of pluggable traits and abstractions. You configure the
            policy, it orchestrates the lifecycle, and the result composes with the rest of
            your runtime - full control, without rebuilding consensus logic from
            scratch."
        image={require('@site/static/img/TimingWindow/sec5-title.png').default}
        imageAlt=""
      />

      <div className={styles.pipelineRow}>
        {PIPELINE.map(({ id, className, Icon, title, description, items }, i) => (
          <React.Fragment key={id}>
            <div className={`${styles.pipeCol} ${styles[className]}`}>
              <div className={styles.pipeIcon}><Icon/></div>
              <h3>{title}</h3>
              <p>{description}</p>
              <ul className={styles.pipeList}>
                {items.map((item, j) => (
                  <li key={j}><CheckIcon/>{item}</li>
                ))}
              </ul>
            </div>
            {i < PIPELINE.length - 1 && (
              <div className={styles.pipeArrow}><span>&rarr;</span></div>
            )}
          </React.Fragment>
        ))}
      </div>

      <pre className={styles.codeblock}>
        <span className={styles.c1}>{'// Cargo.toml\n'}</span>
        {'pallet-chain-manager = { path = '}<span className={styles.c2}>"../pallets/chain-manager"</span>{', default-features = '}<span className={styles.c2}>false</span>{' }\n\n'}
        <span className={styles.c1}>{'// runtime configuration\n'}</span>
        <span className={styles.c2}>impl</span>{' pallet_chain_manager::Config '}<span className={styles.c2}>for</span>{' Runtime {\n'}
        {'    '}<span className={styles.c2}>type</span>{' RoleAdapter         = pallet_authors::Pallet<Self>;\n'}
        {'    '}<span className={styles.c2}>type</span>{' ElectionAdapter     = pallet_authors::FairElection<Self>;\n'}
        {'    '}<span className={styles.c2}>type</span>{' Asset               = pallet_balances::Pallet<Self>;\n'}
        {'    '}<span className={styles.c2}>type</span>{' RewardModel         = frame_plugins::SharesPay;\n'}
        {'    '}<span className={styles.c2}>type</span>{' InflationModel      = frame_plugins::ConstantPayout;\n'}
        {'    '}<span className={styles.c2}>type</span>{' PenaltyModel        = frame_plugins::ThresholdPenalty;\n'}
        {'    '}<span className={styles.c2}>type</span>{' AffidavitCrypto     = pallet_chain_manager::crypto::sr25519::AffidavitCryptoSr25519;\n'}
        {'    '}<span className={styles.c2}>type</span>{' MaxAffidavitWeights = ConstU32<500>;\n'}
        {'    '}<span className={styles.c2}>type</span>{' NextSessionRotation = pallet_session::PeriodicSessions<Period, Offset>;\n'}
        {'    '}<span className={styles.c2}>type</span>{' Points              = u64;\n'}
        {'    '}<span className={styles.c2}>type</span>{' PointsAdapter       = ChainManager;\n'}
        {'    '}<span className={styles.c1}>{'// ...'}</span>{'\n}'}
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