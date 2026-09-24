import React from 'react';
import styles from './styles.module.css';
import SectionHeader, { Accent } from '@site/src/components/SectionHeader';

const BookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);

const PersonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <circle cx="12" cy="8" r="3.2"/>
    <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6"/>
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const CoinStackIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <ellipse cx="12" cy="17" rx="7" ry="2.5"/>
    <ellipse cx="12" cy="13" rx="7" ry="2.5"/>
    <ellipse cx="12" cy="9" rx="7" ry="2.5"/>
    <path d="M5 9v8M19 9v8"/>
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M12 2 3 6v6c0 5 3.8 8.7 9 10 5.2-1.3 9-5 9-10V6l-9-4z"/>
    <path d="M9 12h6"/>
  </svg>
);

const DocLinesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    <path d="M8 8h8M8 12h8M8 16h5"/>
  </svg>
);

const ImagePlaceholderIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="4" width="18" height="14" rx="0"/>
    <circle cx="8.5" cy="9.5" r="1.5"/>
    <path d="M3 15l5-4 4 3 3-2.5L21 15"/>
  </svg>
);

const MECHANISMS = [
  {
    id: 'affidavits',
    title: 'Election Affidavits',
    description: 'The opt-in declaration that gets an author considered for the next election at all.',
    tag: 'ElectionAffidavits',
    badge: 'badgeAffidavits',
    Icon: DocLinesIcon,
  },
  {
    id: 'elections',
    title: 'Elections',
    description: 'Chosen each session via a pluggable algorithm. Chain Manager orchestrates the process; it never decides who wins.',
    tag: 'ElectAuthors',
    badge: 'badgeElections',
    Icon: BookIcon,
  },
  {
    id: 'authors',
    title: 'Authors',
    description: "Tracks each author's current state - session validator, election candidate, or recent winner - to gate whether they can step back at any moment.",
    tag: 'RoleActivity',
    badge: 'badgeAuthors',
    Icon: PersonIcon,
  },
  {
    id: 'points',
    title: 'Contribution Points',
    description: 'Tracked per block, per author, against whoever authored it. Feeds directly into reward distribution.',
    tag: 'AuthorPoints',
    badge: 'badgePoints',
    Icon: StarIcon,
  },
  {
    id: 'rewards',
    title: 'Rewards',
    description: 'Settled at the close of every session, sized by an inflation model and split by a payee model - both swappable.',
    tag: 'RewardAuthors',
    badge: 'badgeRewards',
    Icon: CoinStackIcon,
  },
  {
    id: 'penalties',
    title: 'Penalties',
    description: 'Applied whenever an offence is reported - not just at session boundaries. Independent of the reward cycle.',
    tag: 'PenalizeAuthors',
    badge: 'badgePenalties',
    Icon: ShieldIcon,
  },
];

export default function WhatItManages() {
  return (
    <section className={styles.section} id="manages">

      <SectionHeader
        eyebrow="Core Capabilities"
        title={<>What <Accent>Chain Manager</Accent> Manages</>}
        description="Six mechanisms, orchestrated in sequence every session - authors, elections,
          participation, points, rewards, and penalties, each with its own rules but a single
          shared schedule."
      />

      <div className={styles.cardGrid}>
        {MECHANISMS.map(({ id, title, description, tag, badge, Icon }) => (
          <div className={styles.card} key={id}>
            <div className={`${styles.iconBadge} ${styles[badge]}`}>
              <Icon/>
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
            <span className={styles.tag}>{tag}</span>
          </div>
        ))}
      </div>
    </section>
  );
}