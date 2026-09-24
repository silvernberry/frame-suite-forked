import React from 'react';
import styles from './styles.module.css';
import SectionHeader, { Accent } from '@site/src/components/SectionHeader';

const offchain_step_1 = require('@site/static/img/HowItWorks/sec-21.png').default;
const offchain_step_2 = require('@site/static/img/HowItWorks/sec-22.png').default;
const offchain_step_3 = require('@site/static/img/HowItWorks/sec-23.png').default;
const offchain_step_4 = require('@site/static/img/HowItWorks/sec-24.png').default;
const onchain_step_5 = require('@site/static/img/HowItWorks/sec-25.png').default;
const onchain_step_6 = require('@site/static/img/HowItWorks/sec-26.png').default;
const onchain_step_71 = require('@site/static/img/HowItWorks/sec-271.png').default;
const onchain_step_72 = require('@site/static/img/HowItWorks/sec-272.png').default;
const onchain_step_8 = require('@site/static/img/HowItWorks/sec-28.png').default;

const OFFCHAIN_STEPS = [
  {
    id: '01',
    title: 'Init Key',
    image: offchain_step_1,
    alt: '',
    description: 'Bootstraps an active affidavit key if none exists yet - the first thing every block checks.',
  },
  {
    id: '02',
    title: 'Try Election',
    image: offchain_step_2,
    alt: '',
    description: 'Attempts the election the moment its window opens. Already run this round? It no-ops safely.',
  },
  {
    id: '03',
    title: 'Declare Affidavit',
    image: offchain_step_3,
    alt: '',
    description: <>Submits this round&rsquo;s declared weight for <code>N+1</code> - and stages a fresh key for <code>N+2</code> in the same transaction.</>,
  },
  {
    id: '04',
    title: 'Rotate Key',
    image: offchain_step_4,
    alt: '',
    description: <>Confirms the <code>N+2</code> key is finalized and fork-safe before treating it as the active one.</>,
  },
];

const ONCHAIN_STEPS = [
  {
    id: '05',
    title: 'Author Participation',
    image: onchain_step_5,
    alt: '',
    description: <><code>pallet_session</code> activates the elected set once the new session begins. They produce blocks and are watched for offences, for the whole session.</>,
  },
  {
    id: '06',
    title: 'Contribution Tracking',
    image: onchain_step_6,
    alt: '',
    description: <>Every block, <code>on_initialize</code> credits that block&rsquo;s author - via <code>pallet_authorship</code> - with one point in the current session&rsquo;s tally.</>,
  },
  {
    id: '07',
    title: 'Settlement',
    wide: true,
    split: [
      {
        label: 'Rewards',
        variant: 'reward',
        image: onchain_step_71,
        alt: '',
        description: <><code>end_session</code> pays out accumulated points for the closing session - once, on schedule.</>,
      },
      {
        label: 'Penalties',
        variant: 'penalty',
        image: onchain_step_72,
        alt: '',
        description: <>Triggered by <code>OnOffenceHandler</code> the instant an offence is reported - any time, on its own trigger.</>,
      },
    ],
  },
  {
    id: '08',
    title: 'Next Election',
    image: onchain_step_8,
    alt: '',
    description: <><code>new_session</code> reveals the result already computed off-chain; <code>start_session</code> advances <code>CurrentSession</code> and the whole cycle repeats.</>,
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.section} id="how">

      <SectionHeader
        eyebrow="How It Works"
        title={<>Two Engines, Working <Accent>on Their Own Terms</Accent></>}
        description="One offchain pipeline that runs every block, on every node. A separate set of on-chain hooks that run automatically, as part of normal block and session execution. Neither waits for the other."
      />

      <div className={styles.introCard}>
        <div>
          <span className={styles.introLabel}>Before We Go Deeper</span>
          <h3>What Is an Affidavit?</h3>
          <p>
            A signed, voluntary declaration - an author states the election weight
            they want considered for the upcoming session. It isn&rsquo;t a vote and it
            doesn&rsquo;t move any value; it&rsquo;s a claim, backed by a disposable signing
            key, that gets checked once by the election adapter and then cleared.
          </p>
        </div>

        <div className={styles.specimen}>
          <div className={styles.specimenTitle}>Sample Affidavit</div>
          <div className={styles.specRow}><span className={styles.specLabel}>Affidavit No.</span><span className={styles.specVal}>0x4F2&hellip;A91</span></div>
          <div className={styles.specRow}><span className={styles.specLabel}>Session</span><span className={styles.specVal}>N + 1</span></div>
          <div className={styles.specRow}><span className={styles.specLabel}>Declared Weight</span><span className={styles.specVal}>ElectionWeight&lt;T&gt;</span></div>
          <div className={styles.specRow}><span className={styles.specLabel}>Submitted by</span><span className={styles.specVal}>afdt_key_&#9679;&#9679;&#9679;</span></div>
          {/* <div className={styles.specimenStamp}>SAMPLE - FOR ILLUSTRATION</div> */}
        </div>
      </div>

      {/* --- OFF-CHAIN --- */}
      <div className={styles.engineHead}>
        <span className={`${styles.engineLabel} ${styles.off}`}>Off-Chain &middot; Every Block</span>
        <p className={styles.engineNote}>
          All four routines below run inside one <code>offchain_worker</code> call -
          independently, on every node.
        </p>
      </div>

      <div className={styles.pipeBracket}>
        <svg viewBox="0 0 1000 24" preserveAspectRatio="none">
          <path d="M20,22 L20,6 L980,6 L980,22" fill="none" stroke="var(--cm-seal)" strokeWidth="1.5"/>
        </svg>
        <span className={styles.pipePill}>one offchain_worker() call</span>
      </div>

      <div className={styles.stepGrid}>
        {OFFCHAIN_STEPS.map(({ id, title, image, alt, description }) => (
          <div className={`${styles.stepCard} ${styles.offc}`} key={id}>
            <div className={styles.stepTop}>
              <span className={styles.stepBadge}>{id}</span>
              <h3>{title}</h3>
            </div>
            <img className={styles.stepImg} src={image} alt={alt}/>
            <p>{description}</p>
          </div>
        ))}
      </div>

      <div className={styles.noteCard}>
        <span className={styles.noteLabel}>A Note on Session Numbering</span>
        <h3>What N, N+1, and N+2 Actually Mean</h3>
        <div className={styles.noteRow}>
          <span className={styles.noteTag}>N</span>
          <p>The session running right now. Contribution points accrue here, block by block.</p>
        </div>
        <div className={styles.noteRow}>
          <span className={styles.noteTag}>N+1</span>
          <p>The session being decided. The declared weight, the signing key that authorizes it, and the election result itself all target exactly one session ahead - nothing looks further than this for the actual outcome.</p>
        </div>
        <div className={styles.noteRow}>
          <span className={styles.noteTag}>N+2</span>
          <p>Not a second election. It&rsquo;s how far ahead the <em>signing key</em> is staged. The moment <strong>Declare Affidavit</strong> succeeds for N+1, a fresh key is already being registered for N+2 - confirmed and fork-safe (that&rsquo;s <strong>Rotate Key</strong>&rsquo;s job) before the current key is ever spent.</p>
        </div>
        <p className={styles.noteFoot}>
          At any moment, exactly one election is in flight, targeting exactly one session
          ahead. N+2 is security bookkeeping running one step ahead of it - not a
          longer lookahead.
        </p>
      </div>

      {/* --- ON-CHAIN --- */}
      <div className={styles.engineHead}>
        <span className={`${styles.engineLabel} ${styles.on}`}>On-Chain &middot; Automatic</span>
        <p className={styles.engineNote}>
          These run as part of normal block and session execution - no offchain
          worker involved.
        </p>
      </div>

      <div className={styles.stepGrid}>
        {ONCHAIN_STEPS.map(({ id, title, image, alt, description, split, wide }) => (
          <div className={`${styles.stepCard} ${styles.onc} ${wide ? styles.stepCardWide : ''}`} key={id}>
            <div className={styles.stepTop}>
              <span className={styles.stepBadge}>{id}</span>
              <h3>{title}</h3>
            </div>
            {split ? (
              <div className={styles.splitRow}>
                {split.map(({ label, image: splitImage, alt: splitAlt, description: d, variant }) => (
                  <div
                    className={`${styles.splitCard} ${styles[`splitCard${variant === 'reward' ? 'Reward' : 'Penalty'}`]}`}
                    key={label}
                  >
                    <img className={styles.stepImg} src={splitImage} alt={splitAlt}/>
                    <strong>{label}</strong>
                    <p>{d}</p>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <img className={styles.stepImg} src={image} alt={alt}/>
                <p>{description}</p>
              </>
            )}
          </div>
        ))}
      </div>

    </section>
  );
}