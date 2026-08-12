import React from 'react';
import styles from './styles.module.css';

const mascotImg = require('@site/static/img/title-mascots/tm-governance.png').default;

const CODE_LINES = [
  { t: 'comment', text: '#[pallet::genesis_config]' },
  {
    t: 'struct',
    kw: 'pub struct',
    name: 'GenesisConfig',
    generic: 'T',
    bound: 'Config',
  },
  { t: 'field', name: 'min_collateral', type: 'AuthorAsset', generic: 'T' },
  { t: 'field', name: 'max_exposure', type: 'AuthorAsset', generic: 'T' },
  { t: 'field', name: 'min_fund', type: 'AuthorAsset', generic: 'T' },
  {
    t: 'field',
    name: 'probation_period',
    type: 'BlockNumberFor',
    generic: 'T',
  },
  {
    t: 'field',
    name: 'reduce_probation_by',
    type: 'BlockNumberFor',
    generic: 'T',
  },
  {
    t: 'field',
    name: 'increase_probation_by',
    type: 'BlockNumberFor',
    generic: 'T',
  },
  { t: 'field', name: 'rewards_buffer', type: 'BlockNumberFor', generic: 'T' },
  {
    t: 'field',
    name: 'penalties_buffer',
    type: 'BlockNumberFor',
    generic: 'T',
  },
  { t: 'field', name: 'max_elected', type: 'u32', primitive: true },
  { t: 'field', name: 'min_elected', type: 'u32', primitive: true },
  { t: 'field', name: 'force_max_elected', type: 'bool', primitive: true },
  { t: 'close', text: '}' },
];

const STATS = [
  { value: '11', label: 'tunable parameters', accent: false },
  { value: '0', label: 'redeploys to change them', accent: false },
  { value: 'root', label: 'origin to override', accent: true },
];

const CATEGORIES = [
  { id: 'economics', label: 'Economics' },
  { id: 'lifecycle', label: 'Lifecycle' },
  { id: 'elections', label: 'Elections' },
];

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="11" width="16" height="9" rx="2" />
    <path d="M8 11V7a4 4 0 018 0v4" />
  </svg>
);

const ChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 20V10M12 20V4M20 20v-7" />
  </svg>
);

const FloorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 20h18" />
    <path d="M12 16V4M8 8l4-4 4 4" />
  </svg>
);

const HourglassIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </svg>
);

const ArrowDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 5v14M6 13l6 6 6-6" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 19V5M6 11l6-6 6 6" />
  </svg>
);

const GiftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="9" width="18" height="12" rx="1.5" />
    <path d="M3 13h18M12 9v12" />
    <path d="M12 9c-1.8 0-3.2-1-3.2-2.6S9 3.5 10.2 3.5c1.6 0 1.8 2.6 1.8 5.5zM12 9c1.8 0 3.2-1 3.2-2.6S15 3.5 13.8 3.5C12.2 3.5 12 6.1 12 9z" />
  </svg>
);

const WarningIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3l9 16H3l9-16z" />
    <path d="M12 10v4M12 17.5h.01" />
  </svg>
);

const MaxPeopleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="9" cy="8" r="3" />
    <circle cx="17" cy="9" r="2.4" />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M14.5 20c0-2.6-.6-4.6-1.8-6 .9-.6 2-.9 3.3-.9 2.7 0 5 2 5 4.5" />
  </svg>
);

const MinPeopleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="8" r="3.5" />
    <path d="M4.5 20c0-4.1 3.4-7.5 7.5-7.5s7.5 3.4 7.5 7.5" />
  </svg>
);

const ToggleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="8" width="20" height="8" rx="4" />
    <circle cx="16" cy="12" r="2.6" fill="currentColor" stroke="none" />
  </svg>
);

const PARAMS = [
  {
    field: 'min_collateral',
    category: 'economics',
    title: 'Minimum collateral',
    desc: 'The self-stake an author must lock to enrol. Cannot be zero.',
    default: '1',
    icon: <LockIcon />,
  },
  {
    field: 'max_exposure',
    category: 'economics',
    title: 'Maximum exposure',
    desc: 'Caps how much a single backing operation may contribute.',
    default: 'max_value',
    icon: <ChartIcon />,
  },
  {
    field: 'min_fund',
    category: 'economics',
    title: 'Minimum fund',
    desc: 'Floor on any single backing contribution. Cannot be zero.',
    default: '1',
    icon: <FloorIcon />,
  },
  {
    field: 'probation_period',
    category: 'lifecycle',
    title: 'Probation period',
    desc: 'Blocks a new or demoted author stays under review.',
    default: '10 blocks',
    icon: <HourglassIcon />,
  },
  {
    field: 'reduce_probation_by',
    category: 'lifecycle',
    title: 'Probation relief',
    desc: 'Blocks trimmed when good behavior is observed.',
    default: '1 block',
    icon: <ArrowDownIcon />,
  },
  {
    field: 'increase_probation_by',
    category: 'lifecycle',
    title: 'Probation extension',
    desc: 'Blocks added when unsafe behavior is detected.',
    default: '1 block',
    icon: <ArrowUpIcon />,
  },
  {
    field: 'rewards_buffer',
    category: 'lifecycle',
    title: 'Rewards buffer',
    desc: 'Delay before a reward finalizes, deterministic timing.',
    default: '3 blocks',
    icon: <GiftIcon />,
  },
  {
    field: 'penalties_buffer',
    category: 'lifecycle',
    title: 'Penalties buffer',
    desc: 'Delay before a penalty enforces; room to remedy.',
    default: '4 blocks',
    icon: <WarningIcon />,
  },
  {
    field: 'max_elected',
    category: 'elections',
    title: 'Maximum elected',
    desc: 'Upper bound on authors chosen per election round.',
    default: '100',
    icon: <MaxPeopleIcon />,
  },
  {
    field: 'min_elected',
    category: 'elections',
    title: 'Minimum elected',
    desc: 'Quorum an election must reach to be valid.',
    default: '10',
    icon: <MinPeopleIcon />,
  },
  {
    field: 'force_max_elected',
    category: 'elections',
    title: 'Enforce the cap',
    desc: 'True hard-truncates at max_elected; false lets all pass.',
    default: 'false',
    icon: <ToggleIcon />,
  },
];

function CodeLine({ line }) {
  if (line.t === 'comment') {
    return <div className={styles.syntaxComment}>{line.text}</div>;
  }
  if (line.t === 'struct') {
    return (
      <div>
        <span className={styles.syntaxKeyword}>{line.kw}</span>{' '}
        <span className={styles.syntaxType}>{line.name}</span>
        &lt;<span className={styles.syntaxGeneric}>{line.generic}</span>:{' '}
        <span className={styles.syntaxType}>{line.bound}</span>&gt; {'{'}
      </div>
    );
  }
  if (line.t === 'close') {
    return <div>{line.text}</div>;
  }
  return (
    <div>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span className={styles.syntaxKeyword}>pub</span> {line.name}:{' '}
      <span
        className={
          line.primitive ? styles.syntaxPrimitive : styles.syntaxType
        }>
        {line.type}
      </span>
      {!line.primitive && (
        <>
          &lt;<span className={styles.syntaxGeneric}>{line.generic}</span>
          &gt;
        </>
      )}
      ,
    </div>
  );
}

export default function Governance() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>Runtime Governance</span>
            <h2 className={styles.title}>
              Governance
              <br />
              <span className={styles.accent}>Steers</span> the Network
            </h2>
            <p className={styles.desc}>
              Configure how block authors are managed by adjusting runtime
              parameters on-chain - without redeploying your runtime.
            </p>
            <div className={styles.mascotSlot}>
              <img
                src={mascotImg}
                alt="Governance mascot at a control console illustration"
                className={styles.mascotImg}
              />
            </div>
          </div>

          <div className={styles.codePanel}>
            <div className={styles.codeTab}>
              <div className={styles.windowDots}>
                <span className={styles.dotRed} />
                <span className={styles.dotYellow} />
                <span className={styles.dotGreen} />
                <span className={styles.tabLabel}>pallet-authors / lib.rs</span>
              </div>
              <span className={styles.tabBadge}>GENESIS_CONFIG</span>
            </div>
            <pre className={styles.code}>
              {CODE_LINES.map((line, i) => (
                <CodeLine line={line} key={i} />
              ))}
            </pre>
          </div>
        </div>

        <div className={styles.leverRow}>
          <div className={styles.leverText}>
            <h3 className={styles.leverTitle}>Every field is a lever.</h3>
            <p className={styles.leverDesc}>
              The eleven genesis fields group into three concerns: the
              economics of holding a role, the lifecycle an author moves
              through, and how elections resolve.
            </p>
          </div>

          <div className={styles.statTrio}>
            {STATS.map((s, i) => (
              <React.Fragment key={s.label}>
                {i > 0 && <span className={styles.statDivider} />}
                <div className={styles.stat}>
                  <div
                    className={`${styles.statValue} ${
                      s.accent ? styles.statValueAccent : ''
                    }`}>
                    {s.value}
                  </div>
                  <div className={styles.statLabel}>{s.label}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.legend}>
          {CATEGORIES.map((c) => (
            <span key={c.id} className={styles.legendItem}>
              <span
                className={styles.legendDot}
                style={{ background: `var(--gov-cat-${c.id})` }}
              />
              {c.label}
            </span>
          ))}
        </div>

        <div className={styles.grid}>
          {PARAMS.map((p) => (
            <div className={styles.card} key={p.field}>
              <div className={styles.cardHead}>
                <div className={styles.fieldTag}>
                  <span
                    className={styles.fieldDot}
                    style={{ background: `var(--gov-cat-${p.category})` }}
                  />
                  <span
                    className={styles.fieldName}
                    style={{ color: `var(--gov-cat-${p.category}-text)` }}>
                    {p.field}
                  </span>
                </div>
                <span
                  className={styles.cardIcon}
                  style={{
                    background: `var(--gov-cat-${p.category}-icon-bg)`,
                    color: `var(--gov-cat-${p.category}-icon-text)`,
                  }}>
                  {p.icon}
                </span>
              </div>
              <div className={styles.cardTitle}>{p.title}</div>
              <p className={styles.cardDesc}>{p.desc}</p>
              <span
                className={styles.defaultPill}
                style={{
                  background: `var(--gov-cat-${p.category}-bg)`,
                  color: `var(--gov-cat-${p.category}-text)`,
                }}>
                default: {p.default}
              </span>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <div className={styles.footerCard} style={{ background: 'var(--gov-footer-gradient-blue)' }}>
            <div className={styles.footerEye} style={{ color: 'var(--pa-white)' }}>
              FLEXIBLE &middot; ON-CHAIN &middot; FUTURE-PROOF
            </div>
            <div className={styles.footerTitle}>Policy is data, not code.</div>
            <p className={styles.footerDesc}>
              Each field is overridable at runtime through{' '}
              <code className={styles.inlineCode}>ForceGenesisConfig</code>,
              so the network evolves by changing values - never by
              shipping a new pallet.
            </p>
          </div>
          <div className={styles.footerCard} style={{ background: 'var(--gov-footer-gradient-pink)' }}>
            <div className={styles.footerEye} style={{ color: 'var(--pa-white)' }}>
              ACCOUNTABLE BY DESIGN
            </div>
            <div className={styles.footerTitle}>You stay in control.</div>
            <p className={styles.footerDesc}>
              Overrides are gated to root or a governance origin. Parameters
              move; the guarantees around collateral, probation, and quorum
              don&apos;t.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}