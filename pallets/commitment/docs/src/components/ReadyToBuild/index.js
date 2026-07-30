import React from 'react';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

const mascotImg = require('@site/static/img/assets/ready-to-build.png').default;

const Kw = ({ children }) => (
  <code className={styles.kw}>{children}</code>
);

const PolkadotLogo = () => (
  <svg
    className={styles.polkadotLogo}
    viewBox="0 0 256 256"
    fill="#E6007A"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M31.0155 57.7181C14.6547 76.7768 14.2233 103.306 30.0862 116.92C45.9492 130.566 72.0667 126.15 88.4607 107.058C104.821 87.9995 105.253 61.4701 89.3899 47.8567C83.1841 42.511 75.3522 39.9543 67.1884 39.9543C54.5113 39.9543 40.9713 46.1302 31.0155 57.7181Z" />
    <path d="M26.2694 156.332C13.9574 170.941 19.3003 195.744 38.2164 211.715C57.1326 227.686 82.4868 228.815 94.7989 214.205C107.111 199.596 101.768 174.793 82.8518 158.822C72.8296 150.355 61.0153 146.072 50.2962 146.072C40.7718 146.072 32.077 149.459 26.3026 156.332" />
    <path d="M137.343 209.789C115.142 216.795 99.8429 231.072 103.161 241.664C106.513 252.256 127.221 255.178 149.423 248.139C171.625 241.133 186.923 226.856 183.605 216.264C181.481 209.59 172.454 205.938 160.507 205.938C153.505 205.938 145.54 207.166 137.343 209.756" />
    <path d="M102.597 18.5365C98.0176 31.7514 112.553 48.8179 135.12 56.6871C157.686 64.5562 179.689 60.2066 184.268 46.9917C188.848 33.7768 174.313 16.7103 151.746 8.84109C144.146 6.18482 136.58 4.9231 129.744 4.9231C116.303 4.9231 105.617 9.77078 102.597 18.5365Z" />
    <path d="M204.048 45.169C197.51 47.7921 199.07 66.884 207.499 87.7357C215.928 108.621 228.041 123.396 234.579 120.773C241.083 118.15 239.557 99.0912 231.128 78.2063C223.362 58.9484 212.444 44.8702 205.674 44.8702C205.11 44.8702 204.579 44.9698 204.048 45.169Z" />
    <path d="M209.058 172.038C199.766 192.192 196.547 210.553 201.89 213.01C207.233 215.468 219.114 201.124 228.406 180.969C237.731 160.815 240.917 142.453 235.607 139.996C235.209 139.797 234.778 139.731 234.28 139.731C228.472 139.731 217.654 153.411 209.058 172.038Z" />
  </svg>
);

const leftFeatures = [
  {
    text: 'Reusable by design',
    desc: 'One pallet, shared across every consumer in your runtime.',
  },
  {
    text: 'Three commitment models',
    desc: 'Direct, Index, and Pool - each with progressive levels of structure.',
  },
  {
    text: 'No std assumptions',
    desc: <><Kw>no_std + WASM</Kw> compatible out of the box.</>,
  },
  {
    text: 'Lazy evaluation',
    desc: 'Zero per-block recomputation - balances materialise on demand.',
  },
  {
    text: 'Fully on-chain',
    desc: 'No oracles, no bridges. Pure on-chain commitment logic.',
  },
];

const rightFeatures = [
  {
    text: 'Fungible-agnostic',
    desc: 'Works with any asset implementing Substrate fungible traits.',
  },
  {
    text: 'Positional variants',
    desc: 'Long/Short, Affirmative/Contrary - semantic positions per digest.',
  },
  {
    text: 'Explicit imbalance',
    desc: 'Every reap returns an imbalance. No silent mint or burn, ever.',
  },
  {
    text: 'Pluggable balance model',
    desc: 'Swap the BalanceFamily plugin without touching commitment logic.',
  },
  {
    text: 'Multiple instances',
    desc: <>Instantiate independently per use case via <Kw>I: 'static</Kw>.</>,
  },
];

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

const FeatureList = ({ features }) => (
  <ul className={styles.featureList}>
    {features.map((f, i) => (
      <li key={i} className={styles.feature}>
        <Diamond/>
        <div className={styles.featureBody}>
          <span className={styles.featureText}>{f.text}</span>
          <span className={styles.featureDesc}>{f.desc}</span>
        </div>
      </li>
    ))}
  </ul>
);

const CtaCardContent = () => (
  <>
    <div className={styles.ctaTop}>
      <span className={styles.ctaEyebrow}>Get Started</span>
      <p className={styles.ctaHeadline}>
        Ready to build with{' '}
        <em className={styles.ctaEm}>pallet-commitment?</em>
      </p>
      <p className={styles.ctaDesc}>
        Pre-configured template &amp; runtime, example pallet, and full
        documentation included.
      </p>
    </div>

    <div className={styles.ctaHr} />

    <div className={styles.ctaBody}>
      <div className={styles.ctaSteps}>
        <div className={styles.ctaStep}>
          <span className={styles.ctaNum}>01</span>
          Clone the{' '}
          <a
            href="https://github.com/auguth/commitment-substrate-template"
            className={styles.ctaLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            template repository
          </a>
        </div>
        <div className={styles.ctaStep}>
          <span className={styles.ctaNum}>02</span>
          Follow the{' '}
          <Link to="/docs/getting-started/installation" className={styles.ctaLink}>
            Installation Guide
          </Link>
        </div>
        <div className={styles.ctaStep}>
          <span className={styles.ctaNum}>03</span>
          Build your own commitment-powered Runtime
        </div>
      </div>
      {/* <div className={styles.ctaBtns}>
        <a
          href="https://github.com/auguth/pallet-commitment"
          className={styles.btnPrimary}
          target="_blank"
          rel="noopener noreferrer"
        >
          Start with Template
        </a>
        <Link to="/docs/intro" className={styles.btnSecondary}>
          Read the Docs
        </Link>
      </div> */}
    </div>

    <div className={styles.ctaHr} />

    <div className={styles.sdkBadges}>
      <a
        href="https://github.com/paritytech/polkadot-sdk"
        className={styles.sdkBadge}
        target="_blank"
        rel="noopener noreferrer"
      >
        <PolkadotLogo />
        Powered by Polkadot SDK
      </a>
      <a
        href="https://docs.substrate.io"
        className={styles.subBadge}
        target="_blank"
        rel="noopener noreferrer"
      >
        Built with Substrate &amp; FRAME
      </a>
    </div>
  </>
);

export default function ReadyToBuild() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        <div className={styles.desktopBlock}>
          <div className={styles.titleBlock}>
            <span className={styles.eyebrow}>For Builders</span>
            <h2 className={styles.title}>Ready to Build</h2>
            <div className={styles.divider} />
            <p className={styles.subtitle}>
              pallet-commitment ships with full documentation, a pre-configured
              runtime template, and example pallets - everything you need to
              drop it into your Substrate runtime today.
            </p>
          </div>

          <div className={styles.rule} />

          <div className={styles.grid}>
            <FeatureList features={leftFeatures} />
            <div className={styles.colRule} />
            <div className={styles.ctaCol}>
              <div className={styles.ctaCard}>
                <CtaCardContent />
              </div>
            </div>
            <div className={styles.colRule} />
            <FeatureList features={rightFeatures} />
          </div>
        </div>

        <div className={styles.tabletBlock}>
          <div className={styles.titleBlock}>
            <span className={styles.eyebrow}>For Builders</span>
            <h2 className={styles.title}>Ready to Build</h2>
            <div className={styles.divider} />
            <p className={styles.subtitle}>
              pallet-commitment ships with full documentation, a pre-configured
              runtime template, and example pallets - everything you need to
              drop it into your Substrate runtime today.
            </p>
          </div>

          <div className={styles.rule} />

          <div className={styles.tabletGrid}>
            <FeatureList features={leftFeatures} />
            <div className={styles.colRule} />
            <FeatureList features={rightFeatures} />
          </div>

          <div className={styles.rule} />

          <div className={styles.ctaCard}>
            <div className={styles.tabletCtaRow}>
              <div className={styles.tabletCtaContent}>
                <CtaCardContent />
              </div>
              <div className={styles.tabletCtaImage}>
                <img
                  src={mascotImg}
                  alt="Mascot - ready to build"
                  className={styles.mascotImg}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.mobileBlock}>
          <div className={styles.titleBlock}>
            <span className={styles.eyebrow}>For Builders</span>
            <h2 className={styles.title}>Ready to Build</h2>
            <div className={styles.divider} />
            <p className={styles.subtitle}>
              pallet-commitment ships with full documentation, a pre-configured
              runtime template, and example pallets.
            </p>
          </div>

          <div className={styles.rule} />

          <FeatureList features={leftFeatures} />

          <div className={styles.rule} />

          <div className={styles.ctaCard}>
            <CtaCardContent />
          </div>

          <div className={styles.rule} />

          <FeatureList features={rightFeatures} />
        </div>

      </div>
    </section>
  );
}