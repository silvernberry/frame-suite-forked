import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const auguthImg = require('@site/static/img/auguth_labs_logo.png').default;

const links = [
  { label: 'Github', href: 'https://github.com/auguth/' },
  { label: 'Docs', to: '/docs/intro', internal: true },
  { label: 'Crates', href: 'https://crates.io/crates/pallet-authors' },
  { label: 'Source', href: 'https://docs.rs/pallet-authors/latest/src/pallet_authors/lib.rs.html' },
  { label: 'Template', href: 'https://github.com/auguth/xp-substrate-template' },
];

const social = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/auguth-labs/' },
  { label: 'Email', href: 'mailto:auguthlabs@gmail.com' },
  { label: 'Discussions', href: 'https://github.com/auguth/frame-suite/discussions' },
  { label: 'Matrix', href: 'https://matrix.to/#/#auguthlabs:matrix.org' },
  { label: 'Twitter', href: 'https://twitter.com/auguthlab' },
];

const LicLogo = () => (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5.5 21h13M12 21V7m0 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm2-1.8c3.073.661 2.467 2.8 5 2.8M5 8c3.359 0 2.192-2.115 5.012-2.793M7 9.556V7.75m0 1.806-1.95 4.393a.773.773 0 0 0 .37.962.785.785 0 0 0 .362.089h2.436a.785.785 0 0 0 .643-.335.776.776 0 0 0 .09-.716L7 9.556Zm10 0V7.313m0 2.243-1.95 4.393a.773.773 0 0 0 .37.962.786.786 0 0 0 .362.089h2.436a.785.785 0 0 0 .643-.335.775.775 0 0 0 .09-.716L17 9.556Z"
    />
  </svg>
);

const LinkIcon = () => (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961"
    />
  </svg>
);

const SocialIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="12"
    height="12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const AuguthBlock = () => (
  <div className={styles.auguthBlock}>
    <div className={styles.auguthImgBox}>
      <img src={auguthImg} alt="Auguth Labs" className={styles.auguthImg} />
    </div>
    <p className={styles.auguthSub}>
      Part of Auguth Labs
      <br />
      open-source softwares.
    </p>
    <p className={styles.auguthSub}>
      Built for the Substrate
      <br />
      framework.
    </p>
  </div>
);

const LinksBlock = () => (
  <div className={styles.linksBlock}>
    <div className={styles.col}>
      <p className={styles.colHeading}>Links</p>
      {links.map((l) =>
        l.internal ? (
          <Link key={l.label} to={l.to} className={styles.colLink}>
            {l.label}
          </Link>
        ) : (
          <a
            key={l.label}
            href={l.href}
            className={styles.colLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {l.label}
          </a>
        )
      )}
    </div>
    <div className={styles.col}>
      <p className={styles.colHeading}>Socials</p>
      {social.map((s) => (
        <a
          key={s.label}
          href={s.href}
          className={styles.colLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {s.label}
        </a>
      ))}
    </div>
  </div>
);

export default function HomeFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.box}>
        <div className={styles.desktopRow}>
          <div className={styles.leftBlock}>
            <div className={styles.pxpBlock}>
              <div className={styles.brandRow}>
                <span className={styles.brandName}>Pallet-Authors</span>
              </div>
              <p className={styles.tagline}>
                An economically secured role system for
                <br />
                managing authors (validators) with collateral,
                <br />
                staking, elections, and lifecycle primitives
              </p>
              <a
                href="https://www.mozilla.org/en-US/MPL/2.0/"
                className={styles.licBadge}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LicLogo />
                Mozila Public Licence 2.0
              </a>
            </div>
            <div className={styles.innerVsep} />
            <LinksBlock />
          </div>

          <div className={styles.outerVsep} />

          <div className={styles.desktopAuguth}>
            <AuguthBlock />
          </div>
        </div>

        <div className={styles.tabletLayout}>
          <div className={styles.tabletTop}>
            <div className={styles.brandRow}>
              <span className={styles.brandName}>Pallet-Authors</span>
            </div>
            <p className={styles.tagline}>
              An economically secured role system for
              <br />
              managing authors (validators) with collateral,
              <br />
              staking, elections, and lifecycle primitives
            </p>
            <a
              href="https://www.mozilla.org/en-US/MPL/2.0/"
              className={styles.licBadge}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LicLogo />
              Mozila Public Licence 2.0
            </a>
          </div>
          <div className={styles.hdivider} />
          <div className={styles.tabletBottom}>
            <AuguthBlock />
            <div className={styles.outerVsep} />
            <LinksBlock />
          </div>
        </div>

        <div className={styles.mobileLayout}>
          <div className={styles.brandRow}>
            <span className={styles.brandName}>Pallet-Authors</span>
          </div>
          <p className={styles.tagline}>
            An economically secured role system for
            <br />
            managing authors (validators) with collateral,
            <br />
            staking, elections, and lifecycle primitives
          </p>
          <a
            href="https://www.mozilla.org/en-US/MPL/2.0/"
            className={styles.licBadge}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LicLogo />
            Mozila Public Licence 2.0
          </a>
          <div className={styles.hdivider} />
          <LinksBlock />
          <div className={styles.hdivider} />
          <AuguthBlock />
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            2026 Auguth Labs (OPC) Pvt Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}