import React from 'react';
import styles from './styles.module.css';

const Diamond = ({ color }) => (
  <svg
    viewBox="0 0 10 10"
    fill={color || 'currentColor'}
    className={styles.bulletIcon}
    aria-hidden="true"
  >
    <path d="M5 0L10 5L5 10L0 5Z" />
  </svg>
);

const MODELS = [
  {
    id: 'direct',
    num: 'Model - 1',
    title: 'Direct',
    accentColor: 'var(--pc-gold)',
    img16x9: require('@site/static/img/assets/three-models/direct-land-v2.png').default,
    img4x3:  require('@site/static/img/assets/three-models/direct-v2.png').default,
    imageAlt: 'Direct commitment model - one proprietor bonded to a single digest',
    points: [
      'One proprietor bonded straight to a single digest under a given reason - no intermediaries, no delegation.',
      'Optional position variants (Long / Short, Affirmative / Contrary) per digest with independent lazy balances.',
      'Ideal for escrow, collateral, single-target staking, and any direct one-to-one bonding use case.',
    ],
  },
  {
    id: 'index',
    num: 'Model - 2',
    title: 'Index',
    accentColor: 'var(--pc-emerald-lt)',
    img16x9: require('@site/static/img/assets/three-models/index-land-v2.png').default,
    img4x3:  require('@site/static/img/assets/three-models/index-v2.png').default,
    imageAlt: 'Index commitment model - value fans out across entries by share weight',
    points: [
      'Commit once to an index - value fans out proportionally across all entries by share weight automatically.',
      'Fully permissionless and unmanaged. No manager required; share weights define the distribution.',
      'Ideal for nomination baskets, delegation spreads, and multi-target proportional bonding.',
    ],
  },
  {
    id: 'pool',
    num: 'Model - 3',
    title: 'Pool',
    accentColor: 'var(--pc-gold-pale)',
    img16x9: require('@site/static/img/assets/three-models/pool-land-v2.png').default,
    img4x3:  require('@site/static/img/assets/three-models/pool-v2.png').default,
    imageAlt: 'Pool commitment model - manager controls slot allocation non-custodially',
    points: [
      'A manager controls slot allocation and rebalances dynamically - earning commission on resolution.',
      'Non-custodial architecture: the manager steers the pool without ever holding user funds.',
      'Ideal for staking pools, yield vaults, and any managed delegation with dynamic rebalancing.',
    ],
  },
];

function ModelCard({ num, title, accentColor, img16x9, img4x3, imageAlt, points }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTopImg}>
        <picture>
          <source media="(max-width: 650px)" srcSet={img16x9} />
          <img src={img4x3} alt={imageAlt} className={styles.img} />
        </picture>
      </div>
      <div className={styles.cardBody}>
        <span className={styles.modelNum} style={{ color: accentColor }}>
          {num}
        </span>
        <h3 className={styles.modelTitle} style={{ color: accentColor }}>
          {title}
        </h3>
        <ul className={styles.points}>
          {points.map((pt, i) => (
            <li key={i} className={styles.point}>
              <Diamond color={accentColor} />
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MascotCell() {
  return (
    <div className={styles.mascotCell}>
      <img
        src={require('@site/static/img/assets/three-models/mascot.png').default}
        alt="Commitment models mascot"
        className={styles.mascotImg}
      />
    </div>
  );
}

export default function ThreeModels() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        <div className={styles.header}>
          <span className={styles.eyebrow}>Commitment Architecture</span>
          <h2 className={styles.title}>The Three Models</h2>
          <div className={styles.divider} />
          <p className={styles.subtitle}>
            Choose the right commitment model for your use case. Each model
            represents a different level of structure, delegation, and value
            distribution.
          </p>
        </div>

        <div className={styles.grid}>
          {MODELS.map((m) => (
            <ModelCard key={m.id} {...m} />
          ))}
          <MascotCell />
        </div>

      </div>
    </section>
  );
}