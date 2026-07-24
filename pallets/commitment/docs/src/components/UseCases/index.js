import React from 'react';
import styles from './styles.module.css';

const staking = require('@site/static/img/assets/use-cases/staking-1.png').default;
const pools = require('@site/static/img/assets/use-cases/pools-1.png').default;
const governance = require('@site/static/img/assets/use-cases/governance-1.png').default;
const escrow = require('@site/static/img/assets/use-cases/escrow-1.png').default;
const bonds = require('@site/static/img/assets/use-cases/bond-1.png').default;
const predection = require('@site/static/img/assets/use-cases/predection-1.png').default;

const Diamond = () => (
  <svg
    viewBox="0 0 10 10"
    className={styles.bulletIcon}
    aria-hidden="true"
  >
    <path d="M5 0.5L9.5 5L5 9.5L0.5 5Z" fill="var(--pc-gold)" fillOpacity="0.12" stroke="var(--pc-gold)" strokeWidth="0.7" />
    <circle cx="5" cy="5" r="0.8" fill="var(--pc-gold)" />
  </svg>
);

const Chip = ({ children }) => (
  <span className={styles.chip}>{children}</span>
);

const USE_CASES = [
  {
    id: 'staking',
    num: '01',
    title: 'Staking',
    image: staking,
    imageAlt: 'Mascot · Staking',
    points: [
      'Bond stake under a staking reason. Direct model for validators, Index for nominators.',
      'Era rewards lazily minted into the digest - distributed proportionally to all receipts at resolution.',
    ],
  },
  {
    id: 'governance',
    num: '02',
    title: 'Governance',
    image: governance,
    imageAlt: 'Mascot · Governance',
    points: [
      'Commit voting power with Affirmative / Contrary position variants per proposal digest.',
      'Reward correct predictions via mint. Slash manipulation via reap on resolution.',
    ],
  },
  {
    id: 'staking-pools',
    num: '03',
    title: 'Staking Pools',
    image: pools,
    imageAlt: 'Mascot · Staking Pools',
    points: [
      'Manager rebalances slots across validators non-custodially. Commission collected on resolution.',
      'Delegators commit once to the pool - rewards fan out automatically through digest adjustments.',
    ],
  },
  {
    id: 'escrow',
    num: '04',
    title: 'Escrow',
    image: escrow,
    imageAlt: 'Mascot · Escrow',
    points: [
      'Bond under a contract digest. Release on condition fulfilment. Slash on breach via reap.',
      'Explicit imbalance returned to the consumer pallet - no silent mint or burn ever.',
    ],
  },
  {
    id: 'bonds',
    num: '05',
    title: 'Bonds',
    image: bonds,
    imageAlt: 'Mascot · Bonds',
    points: [
      'Issue structured on-chain bonds backed by committed assets under a reason and digest.',
      'Adjust coupon value via mint, handle defaults via reap - all resolved with full accounting.',
    ],
  },
  {
    id: 'prediction',
    num: '06',
    title: 'Prediction Markets',
    image: predection,
    imageAlt: 'Mascot · Prediction Markets',
    points: [
      'Long / Short variants on market digests. Participants commit to positions against an oracle.',
      'Oracle settlement mints the winning side - losing side is reaped proportionally on resolve.',
    ],
  },
];

const MASCOT_CHIPS = ['direct', 'index', 'pool', 'variants', 'lazy eval'];

function UseCaseCard({ num, title, image, imageAlt, points }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.cardImg}>
          {image ? (
            <img src={image} alt={imageAlt} className={styles.img} />
          ) : (
            <div className={styles.imgPh} />
          )}
        </div>
        <div className={styles.cardMeta}>
          <span className={styles.cardNum}>{num}</span>
          <h3 className={styles.cardTitle}>{title}</h3>
        </div>
      </div>
      <ul className={styles.points}>
        {points.map((pt, i) => (
          <li key={i} className={styles.point}>
            <Diamond />
            <span>{pt}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function UseCases() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        <div className={styles.header}>
          <span className={styles.eyebrow}>Applications</span>
          <h2 className={styles.title}>Use Cases</h2>
          <div className={styles.divider} />
          <p className={styles.subtitle}>
            pallet-commitment is not built for one use case. Any runtime need
            that requires structured, adjustable, and resolvable asset bonding
            fits naturally - from staking to escrow to prediction markets.
          </p>
        </div>

        <div className={styles.banner}>
          <div className={styles.bannerImg}>
            <picture>
              <source
                media="(max-width: 450px)"
                srcSet={require('@site/static/img/assets/use-cases/banner-square-12.png').default}
              />
              <source
                media="(max-width: 450px)"
                srcSet={require('@site/static/img/assets/use-cases/banner-between-12.png').default}
              />
              <source
                media="(max-width: 900px)"
                srcSet={require('@site/static/img/assets/use-cases/banner-wide-12.png').default}
              />
              <source
                media="(max-width: 960px)"
                srcSet={require('@site/static/img/assets/use-cases/banner-square-12.png').default}
              />
              <source
                media="(max-width: 1350px)"
                srcSet={require('@site/static/img/assets/use-cases/banner-between-12.png').default}
              />
              <img
                src={require('@site/static/img/assets/use-cases/banner-wide-12.png').default}
                alt="Commitment lifecycle - six stages from pre-reserve through withdraw"
                className={styles.img}
              />
            </picture>
          </div>
          <div className={styles.bannerInfo}>
            <h3 className={styles.bannerQuote}>"One Bond.<br />Every Domain."</h3>
            <p className={styles.bannerDesc}>
                One pallet. Any fungible asset. Any bonding pattern. 
                From single-target staking to managed pools - the same infrastructure handles it all.
            </p>
            <div className={styles.chipRow}>
              {MASCOT_CHIPS.map((c) => (
                <Chip key={c}>{c}</Chip>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {USE_CASES.map((uc) => (
            <UseCaseCard key={uc.id} {...uc} />
          ))}
        </div>

      </div>
    </section>
  );
}