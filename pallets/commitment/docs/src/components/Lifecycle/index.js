import React from 'react';
import styles from './styles.module.css';

const Fn = ({ children }) => (
  <code className={styles.fnInline}>{children}</code>
);

const IconPreReserve = () => (
  <svg viewBox="0 0 24 24" fill="none" className={styles.stepIcon}>
    <path d="M12 2L22 12L12 22L2 12Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    <rect x="9.5" y="11" width="5" height="4" rx="0" stroke="currentColor" strokeWidth="1.1"/>
    <path d="M10 11V9.5a2 2 0 0 1 4 0V11" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
  </svg>
);

const IconPlace = () => (
  <svg viewBox="0 0 24 24" fill="none" className={styles.stepIcon}>
    <path d="M12 2L20.66 7v10L12 22 3.34 17V7Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.2"/>
    <circle cx="12" cy="12" r="1" fill="currentColor"/>
  </svg>
);

const IconRaise = () => (
  <svg viewBox="0 0 24 24" fill="none" className={styles.stepIcon}>
    <path d="M6 18l6-4 6 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.35"/>
    <path d="M6 14l6-4 6 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6"/>
    <path d="M6 10l6-4 6 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconAdjust = () => (
  <svg viewBox="0 0 24 24" fill="none" className={styles.stepIcon}>
    <path d="M12 3L3 12L12 21" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="rgba(212,175,55,0.08)"/>
    <path d="M12 3L21 12L12 21" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="rgba(212,175,55,0.18)"/>
    <line x1="12" y1="3" x2="12" y2="21" stroke="currentColor" strokeWidth="1.3"/>
  </svg>
);

const IconResolve = () => (
  <svg viewBox="0 0 24 24" fill="none" className={styles.stepIcon}>
    <rect x="3" y="3" width="18" height="18" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M7 12l3.5 3.5L17 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconWithdraw = () => (
  <svg viewBox="0 0 24 24" fill="none" className={styles.stepIcon}>
    <line x1="12" y1="3" x2="12" y2="17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <polyline points="7 12 12 17 17 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="4" y1="21" x2="20" y2="21" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const STEPS = [
  {
    num: '01',
    Icon: IconPreReserve,
    title: 'Pre-Reserve',
    desc: (
      <>
        Funds are moved from the proprietor's free balance into the{' '}
        <Fn>PrepareForCommit</Fn> hold - a reusable reserve shared
        across commitment operations. The reserved balance can be consumed by any
        consumer pallet using this commitment instance.
      </>
    ),
    fns: [],
  },
  {
    num: '02',
    Icon: IconPlace,
    title: 'Place',
    desc: (
      <>
        A commitment is created under a{' '}
        <Fn>(reason, digest)</Fn> pair. The digest defines how value is
        applied - Direct, Index, or Pool. A <Fn>VirtualReceipt</Fn> is
        issued as a claim over the committed value.
      </>
    ),
    fns: ['place(reason, digest, value)'],
  },
  {
    num: '03',
    Icon: IconRaise,
    title: 'Raise',
    desc: (
      <>
        Existing commitments can be increased by adding additional
        value under the same{' '}
        <Fn>(proprietor, reason, digest)</Fn> scope. Each increase
        creates a new <Fn>CommitInstance</Fn> while preserving
        independent resolution history.
      </>
    ),
    fns: ['raise(reason, digest, extra_value)'],
  },
  {
    num: '04',
    Icon: IconAdjust,
    title: 'Adjust',
    desc: (
      <>
        The digest state changes through lazy balance operations.
        <Fn>Mint</Fn> increases value for rewards, while{' '}
        <Fn>Reap</Fn> reduces value for penalties. Existing commitments
        automatically reflect the updated digest state during resolution.
      </>
    ),
    fns: ['mint_digest(digest, amount)', 'reap_digest(digest, amount)'],
  },
  {
    num: '05',
    Icon: IconResolve,
    title: 'Resolve',
    desc: (
      <>
        A commitment is evaluated using its{' '}
        <Fn>VirtualReceipt</Fn> against the current digest state.
        The final resolved value includes all previous digest-level
        adjustments, with any difference handled through explicit
        imbalance reconciliation.
      </>
    ),
    fns: ['resolve(proprietor, reason, digest)'],
  },
  {
    num: '06',
    Icon: IconWithdraw,
    title: 'Withdraw',
    desc: (
      <>
        The proprietor receives the final settled amount after resolution.
        The outcome reflects every mint, reap, and redistribution applied
        since placement - it may be more, less, or equal to the original
        deposit. The <Fn>VirtualReceipt</Fn> is consumed and the
        economic position closes.
      </>
    ),
    fns: [],
  },
];

export default function CommitmentLifecycle() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        <div className={styles.titleRow}>
          <span className={styles.eyebrow}>State Machine</span>
          <h2 className={styles.h1}>Commitment Lifecycle</h2>
          <div className={styles.divider} />
          <p className={styles.subtitle}>
            A commitment travels through a well-defined lifecycle - from
            pre-reservation through active bonding, lazy adjustment, and
            final resolution with explicit imbalance handling.
          </p>
        </div>

        <div className={styles.titleRule} />

        <div className={styles.bodyGrid}>

          <div className={styles.lifecycle}>
            {STEPS.map((step, i) => (
              <React.Fragment key={step.num}>
                <div
                  className={`${styles.fStep} ${
                    i === 0 ? styles.fStepFirst : ''
                  }`}
                >
                  <div className={styles.fNum}>{step.num}</div>
                  <div className={styles.fAccentVr} />
                  <div className={styles.fBody}>
                    <div className={styles.fHeaderRow}>
                      <div className={styles.fIconWrap}>
                        <step.Icon />
                      </div>
                      <span className={styles.fName}>{step.title}</span>
                    </div>
                    <p className={styles.fDesc}>{step.desc}</p>
                    <div className={styles.fnRow}>
                      {step.fns.map((fn) => (
                        <span key={fn} className={styles.fn}>
                          {fn}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={styles.stepDivider} />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className={styles.cardsCol}>
            <div className={styles.mascotCard}>
              <picture>
                <source
                  media="(max-width: 480px)"
                  srcSet={require('@site/static/img/assets/lifecycle-v2.png').default}
                />
                <source
                  media="(max-width: 640px)"
                  srcSet={require('@site/static/img/assets/lifecycle-square-v2.png').default}
                />
                <source
                  media="(max-width: 960px)"
                  srcSet={require('@site/static/img/assets/lifecycle-wide-v2.png').default}
                />
                <img
                  src={require('@site/static/img/assets/lifecycle-v2.png').default}
                  alt="Commitment lifecycle - six stages from pre-reserve through withdraw"
                  className={styles.cardFullImg}
                />
              </picture>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}