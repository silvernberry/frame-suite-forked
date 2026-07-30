import React from 'react';
import styles from './styles.module.css';

const bondingFeat = require('@site/static/img/assets/key-features/feature-11.png').default;
const semanticFeat = require('@site/static/img/assets/key-features/feature-22.png').default;
const dynamicFeat = require('@site/static/img/assets/key-features/feature-33.png').default;
const modelsFeat = require('@site/static/img/assets/key-features/feature-44.png').default;
const variantsFeat = require('@site/static/img/assets/key-features/feature-55.png').default;
const fungibleFeat = require('@site/static/img/assets/key-features/feature-66.png').default;

const FEATURES = [
  {
    id: 'bonding',
    title: 'Reusable Bonding Primitive',
    desc: 'One pallet, shared across your entire runtime. Staking, escrow, governance, and pools all bond through the same infrastructure, eliminating duplicated locking logic across pallets.',
    image: bondingFeat,
    imageAlt: 'Mascot explaining reusable bonding',
  },
  {
    id: 'semantic',
    title: 'Semantic Structure',
    desc: 'Assets are bound under a reason and a digest, giving every commitment purposeful identity. No more raw opaque locks - every bond carries context.',
    image: semanticFeat,
    imageAlt: 'Mascot explaining semantic structure',
  },
  {
    id: 'dynamic',
    title: 'Dynamic Value Adjustment',
    desc: 'Digest-level rewards and penalties are applied lazily; value adjustments propagate to all committed proprietors without requiring eager recalculation on every block.',
    image: dynamicFeat,
    imageAlt: 'Mascot explaining dynamic value adjustment',
  },
  {
    id: 'models',
    title: 'Three Commitment Models',
    desc: 'Choose from Direct, Index, or Pool commitment models - each with progressive levels of grouping, delegation, and management built in out of the box.',
    image: modelsFeat,
    imageAlt: 'Mascot explaining three commitment models',
  },
  {
    id: 'variants',
    title: 'Positional Variants',
    desc: 'Long/short, affirmative/contrary, positive/negative - commitments can carry a semantic position, enabling directional staking, prediction markets, and multi-sided governance.',
    image: variantsFeat,
    imageAlt: 'Mascot explaining positional variants',
  },
  {
    id: 'fungible',
    title: 'Fungible-Agnostic',
    desc: 'Works with any asset implementing the Substrate fungible traits, no coupling to a specific token. Plug into your runtime\'s existing asset infrastructure without modification.',
    image: fungibleFeat,
    imageAlt: 'Mascot explaining fungible-agnostic design',
  },
];

function FeatureCard({ title, desc, image, imageAlt }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        {image ? (
          <img src={image} alt={imageAlt} className={styles.cardImg} />
        ) : (
          <div className={styles.cardPlaceholder}>
          </div>
        )}
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDesc}>{desc}</p>
      </div>
    </div>
  );
}

export default function KeyFeatures() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <div className={styles.header}>
          <span className={styles.eyebrow}>Capabilities</span>
          <h2 className={styles.title}>Key Features</h2>
          <div className={styles.divider} />
          <p className={styles.subtitle}>
            Everything you need to build structured, adjustable, and resolvable asset bonding 
            into your runtime - without writing the infrastructure from scratch.
          </p>
        </div>

        <div className={styles.grid}>
          {FEATURES.map((f) => (
            <FeatureCard key={f.id} {...f} />
          ))}
        </div>

      </div>
    </section>
  );
}