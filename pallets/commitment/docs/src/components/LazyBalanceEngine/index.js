import React from 'react';
import styles from './styles.module.css';


const virtualTypes = require('@site/static/img/assets/lazy-balances/virtual-types-v2.png').default;
const balanceFamily = require('@site/static/img/assets/lazy-balances/balance-family-v2.png').default;
const lazyOperations = require('@site/static/img/assets/lazy-balances/lazy-operations-v2.png').default;

const Chip = ({ children }) => (
  <span className={styles.chip}>{children}</span>
);

const SubItem = ({ title, desc, divider = true }) => (
  <div className={styles.subItem}>
    <h4 className={styles.subTitle}>{title}</h4>
    <p className={styles.subDesc}>{desc}</p>
    {divider && <div className={styles.subDivider} />}
  </div>
);

const CONCEPTS = [
  {
    id: 'virtual-types',
    num: 'Concept  01',
    title: 'Virtual Types',
    accent: 'var(--pc-gold)',
    imageLeft: true,
    image: virtualTypes,
    imageAlt: 'Mascot explaining Virtual Types',
    hook: '"I hold state, not value. Every adjustment reaches the holder lazily - precisely at the moment of truth."',
    items: [
      {
        title: 'VirtualBalance',
        desc: 'Live lazy accumulator at the digest level. Acts as the shared source of truth for every receipt bound to that digest. Never recomputed per block - queried only on demand.',
      },
      {
        title: 'VirtualReceipt',
        desc: 'Issued at commit time. Acts like a claim ticket - it carries no concrete amount, only a reference. When redeemed at resolution, it reflects every mint and reap since deposit.',
      },
      {
        title: 'VirtualSnapshot',
        desc: 'A point-in-time capture of the balance state. Used for proportional and time-weighted calculations - enabling fair distribution across receipts committed at different moments.',
        divider: false,
      },
    ],
    chips: ['VirtualBalance', 'VirtualReceipt', 'VirtualSnapshot'],
  },
  {
    id: 'plugin-dispatch',
    num: 'Concept  02',
    title: 'Plugin Dispatch',
    accent: 'var(--pc-emerald)',
    imageLeft: false,
    image: balanceFamily,
    imageAlt: 'Mascot explaining Plugin Dispatch',
    hook: '"The pallet does not know the math. It only speaks LazyInput - the BalanceFamily answers in LazyOutput."',
    items: [
      {
        title: 'BalanceFamily',
        desc: 'The runtime-supplied plugin anchor. Defines the complete semantics of every balance operation - deposit, mint, reap, withdraw. Swappable without touching any commitment logic.',
      },
      {
        title: 'LazyInput',
        desc: 'Tagged operation carrier. Each call is wrapped into a typed input - discriminated by a root tag - and dispatched into the plugin family for execution.',
      },
      {
        title: 'LazyOutput',
        desc: 'Result boundary returned by the plugin. Carries computed values, issued receipts, or explicit error outcomes. No silent failures - every result is typed and handled.',
        divider: false,
      },
    ],
    chips: ['BalanceFamily', 'LazyInput', 'LazyOutput'],
  },
  {
    id: 'lazy-ops',
    num: 'Concept  03',
    title: 'Lazy Operations',
    accent: 'var(--pc-gold)',
    imageLeft: true,
    image: lazyOperations,
    imageAlt: 'Mascot explaining Lazy Operations',
    hook: '"Four operations. One promise - your balance is always right when you need it, never computed when you don\'t."',
    items: [
      {
        title: 'Deposit',
        desc: 'The entry operation. Accepts value into the VirtualBalance and returns a VirtualReceipt - the immutable claim ticket stored alongside the CommitInfo.',
      },
      {
        title: 'Mint',
        desc: 'Grows the digest VirtualBalance - distributing rewards to all receipt holders proportionally. No per-receipt update. Every holder benefits lazily at withdrawal time.',
      },
      {
        title: 'Reap',
        desc: 'Shrinks the digest VirtualBalance - penalising all holders proportionally. Returns an explicit imbalance to the caller. No silent burns - full accounting.',
      },
      {
        title: 'Withdraw',
        desc: 'The exit operation. Redeems the VirtualReceipt against the current digest state. The final value is materialised here - reflecting every mint and reap since deposit.',
        divider: false,
      },
    ],
    chips: ['deposit()', 'mint()', 'reap()', 'withdraw()'],
  },
];
 
const IconZeroCost = ({ color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 22 22" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-hourglass-off">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M18 18v2a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1v-2a6 6 0 0 1 6 -6" />
    <path d="M6 6a6 6 0 0 0 6 6m3.13 -.88a6 6 0 0 0 2.87 -5.12v-2a1 1 0 0 0 -1 -1h-10" />
    <path d="M3 3l18 18" />
  </svg>
);
 
const IconPluggable = ({ color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 22 22" fill="none" stroke={color} 
  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-plug-connected">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M7 12l5 5l-1.5 1.5a3.536 3.536 0 1 1 -5 -5l1.5 -1.5" />
    <path d="M17 12l-5 -5l1.5 -1.5a3.536 3.536 0 1 1 5 5l-1.5 1.5" />
    <path d="M3 21l2.5 -2.5" />
    <path d="M18.5 5.5l2.5 -2.5" />
    <path d="M10 11l-2 2" />
    <path d="M13 14l-2 2" />
  </svg>
);
 
const IconImbalance = ({ color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 22 22" fill="none" stroke={color}
  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-scale">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M7 20l10 0" />
    <path d="M6 6l6 -1l6 1" />
    <path d="M12 3l0 17" />
    <path d="M9 12l-3 -6l-3 6a3 3 0 0 0 6 0" />
    <path d="M21 12l-3 -6l-3 6a3 3 0 0 0 6 0" />
  </svg>
);

const STATS = [
  {
    title: 'Zero Per-Block Cost',
    desc: 'No eager recomputation. Balances materialise only at the moment of resolution - keeping runtime overhead minimal.',
    accent: 'var(--pc-gold)',
    Icon: IconZeroCost,
  },
  {
    title: 'Fully Pluggable',
    desc: 'The runtime supplies a BalanceFamily plugin defining all balance semantics - swap it without touching any commitment logic.',
    accent: 'var(--pc-emerald)',
    Icon: IconPluggable,
  },
  {
    title: 'Explicit Imbalance',
    desc: 'Every reap returns an explicit imbalance to the caller - no silent mints or burns. Full accounting fidelity on every resolution.',
    accent: 'var(--pc-gold)',
    Icon: IconImbalance,
  },
];

function ConceptRow({ num, title, accent, imageLeft, image, imageAlt, hook, items, chips }) {
  const infoPane = (
    <div className={styles.infoPane}>
      <span className={styles.conceptNum}>{num}</span>
      <h3 className={styles.conceptTitle} style={{ color: accent }}>{title}</h3>
      <blockquote className={styles.hookQuote}>
        <span className={styles.hookBar} style={{ background: accent }} />
        {hook}
      </blockquote>
      <div className={styles.itemList}>
        {items.map((item) => (
          <SubItem key={item.title} {...item} />
        ))}
      </div>
      <div className={styles.chipRow}>
        {chips.map((c) => (
          <Chip key={c}>{c}</Chip>
        ))}
      </div>
    </div>
  );

  const imgPane = (
    <div className={styles.imgPane}>
      {image ? (
        <img src={image} alt={imageAlt} className={styles.img} />
      ) : (
        <div className={styles.imgPlaceholder}>
        </div>
      )}
    </div>
  );

  return (
    <div className={styles.conceptRow}>
      {imageLeft ? imgPane : infoPane}
      {imageLeft ? infoPane : imgPane}
    </div>
  );
}

export default function LazyBalanceEngine() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        <div className={styles.header}>
          <span className={styles.eyebrow}>Under the Hood</span>
          <h2 className={styles.title}>Lazy Balance Engine</h2>
          <div className={styles.divider} />
          <p className={styles.subtitle}>
            Values stored as virtual types - materialised only at the moment
            of resolution. Zero per-block computation. Fully pluggable balance
            semantics via a runtime-supplied plugin family.
          </p>
        </div>

        <div className={styles.concepts}>
          {CONCEPTS.map((c) => (
            <ConceptRow key={c.id} {...c} />
          ))}
        </div>

        <div className={styles.statStrip}>
          {STATS.map((s) => (
            <div key={s.title} className={styles.statCell}>
              <div className={styles.statIcon}>
                <s.Icon color={s.accent} />
              </div>
              <h4 className={styles.statTitle} style={{ color: s.accent }}>{s.title}</h4>
              <p className={styles.statDesc}>{s.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}