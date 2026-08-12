import React from 'react';
import styles from './styles.module.css';

const mascotImg = require('@site/static/img/title-mascots/tm-backing-v3.png').default;

const FrameworkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2l7 3v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V5l7-3z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const SupportIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="9" cy="8" r="3" />
    <circle cx="17" cy="9" r="2.4" />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M14.5 20c0-2.6-.6-4.6-1.8-6 .9-.6 2-.9 3.3-.9 2.7 0 5 2 5 4.5" />
  </svg>
);

const IncentivesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="3.5" />
  </svg>
);

const RiskIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 6l7.5 7.5 5-5L23 18" />
    <path d="M17 18h6v-6" />
  </svg>
);

const FACTS = [
  {
    id: 'framework',
    title: (
      <>
        One backing framework.
        <br />
        <span className={styles.factAccent}>Three</span> staking models.
      </>
    ),
    desc: null,
    icon: <FrameworkIcon />,
  },
  {
    id: 'support',
    title: 'More Support',
    desc: 'Stronger election weight',
    icon: <SupportIcon />,
  },
  {
    id: 'incentives',
    title: 'Aligned Incentives',
    desc: 'Supporters share outcomes',
    icon: <IncentivesIcon />,
  },
  {
    id: 'risk',
    title: 'Reduced Risk',
    desc: 'Diversified backing options',
    icon: <RiskIcon />,
  },
];

const METHODS = [
  {
    id: 1,
    title: 'Direct Backing',
    desc: 'Stake directly behind one author.',
    img: require('@site/static/img/authorbacking/direct-v3.png').default,
  },
  {
    id: 2,
    title: 'Index Backing',
    desc: 'Stake into a weighted index.',
    img: require('@site/static/img/authorbacking/index-v3.png').default,
  },
  {
    id: 3,
    title: 'Pool Backing',
    desc: 'Delegated through a managed staking pool.',
    img: require('@site/static/img/authorbacking/pool-v1.png').default,
  },
];

export default function AuthorBacking() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>Backing an Author</span>
            <h2 className={styles.title}>Backing an Author is Staking</h2>
            <p className={styles.desc}>
              Supporters express trust by staking behind an author. Backing
              increases an author&apos;s election weight and aligns economic
              incentives.
            </p>
          </div>
          <div className={styles.mascotWrap}>
            <div className={styles.mascot}>
              <img src={mascotImg} alt="Supporter staking behind an author illustration" />
            </div>
          </div>
        </div>

        <div className={styles.divider}>
          <span className={styles.line}></span>
          <span>Three Ways to Provide Backing</span>
          <span className={`${styles.line} ${styles.r}`}></span>
        </div>

        <div className={styles.methodsWrap}>
          <div className={styles.methods}>
            {METHODS.map((method) => (
              <div className={styles.method} key={method.id}>
                <div className={styles.methodHead}>
                  <span className={styles.methodNum}>{method.id}</span>
                  <span className={styles.methodTitle}>{method.title}</span>
                </div>
                <p className={styles.methodDesc}>{method.desc}</p>
                <img
                  src={method.img}
                  alt={`${method.title} flow diagram`}
                  className={styles.methodMascot}
                />
              </div>
            ))}
          </div>

          <div className={styles.factStrip}>
            {FACTS.map((fact) => (
              <div className={styles.fact} key={fact.id}>
                <span className={styles.factSwatch}>{fact.icon}</span>
                <div>
                  <div className={styles.factTitle}>{fact.title}</div>
                  {fact.desc && (
                    <div className={styles.factDesc}>{fact.desc}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}