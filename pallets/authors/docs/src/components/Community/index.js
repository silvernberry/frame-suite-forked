import React from 'react';
import styles from './styles.module.css';

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#fff"
      d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.6 9.6 0 0 1 12 6.8c.85 0 1.71.11 2.51.33 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10.02 10.02 0 0 0 22 12c0-5.52-4.48-10-10-10z"
    />
  </svg>
);

const DiscussionIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#fff"
      d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"
    />
  </svg>
);

const StackExchangeIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="5" y="4" width="14" height="3" rx="1" fill="#fff" opacity="0.55" />
    <rect x="5" y="9" width="14" height="3" rx="1" fill="#fff" opacity="0.78" />
    <path
      fill="#fff"
      d="M5 14h14v3a2 2 0 0 1-2 2h-6l-4 3v-3H7a2 2 0 0 1-2-2v-3z"
    />
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#fff"
      d="M21.5 3.5L2.7 10.8c-1.2.5-1.2 1.2-.2 1.5l4.8 1.5 1.8 5.6c.2.6.4.8.9.8.4 0 .6-.2.9-.5l2.2-2.1 4.6 3.4c.8.5 1.4.2 1.6-.8l3-14.1c.3-1.2-.5-1.8-1.4-1.6z"
    />
  </svg>
);

const MatrixIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="none"
      stroke="#fff"
      strokeWidth="2.2"
      strokeLinecap="round"
      d="M8 4v16M6 4h2M6 20h2M16 4v16M18 4h-2M18 20h-2"
    />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path stroke="#fff" strokeWidth="2.4" strokeLinecap="round" d="M4 4l16 16M20 4L4 20" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M7 17L17 7M7 7h10v10" />
  </svg>
);

const CHANNELS = [
  {
    name: 'GitHub Issues',
    desc: "Found a bug or have a feature request? Open an issue and we\'ll take a look.",
    cta: 'Report a bug',
    href: '#',
    from: '#30363d',
    to: '#0d1117',
    icon: <GitHubIcon />,
  },
  {
    name: 'GitHub Discussions',
    desc: 'General questions, ideas, and RFC proposals. Start or join a conversation.',
    cta: 'Join the discussion',
    href: '#',
    from: '#8b5cf6',
    to: '#5b21b6',
    icon: <DiscussionIcon />,
  },
  {
    name: 'Substrate Stack Exchange',
    desc: 'Technical Q&A for Substrate and FRAME developers. Best for specific how-to questions.',
    cta: 'Ask a question',
    href: '#',
    from: '#f97355',
    to: '#c2410c',
    icon: <StackExchangeIcon />,
  },
  {
    name: 'Telegram',
    desc: 'Quick questions and community chat. Join the group and say hi.',
    cta: 'Join the chat',
    href: '#',
    from: '#3fb9f0',
    to: '#0a7bb8',
    icon: <TelegramIcon />,
  },
  {
    name: 'Matrix',
    desc: 'Decentralised chat for the Substrate ecosystem. Find us in the Auguth Labs room.',
    cta: 'Join the room',
    href: '#',
    from: '#1fd1a8',
    to: '#0d9488',
    icon: <MatrixIcon />,
  },
  {
    name: 'Twitter / X',
    desc: 'Follow for updates, announcements and ecosystem news.',
    cta: 'Follow us',
    href: '#',
    from: '#2b2f36',
    to: '#000000',
    icon: <XIcon />,
  },
];

export default function Community() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>Community</span>

        <h2 className={styles.title}>
          Need to Reach Us.
          <span className={styles.accent}>We're here.</span>
        </h2>
        <p className={styles.desc}>
          Ask questions, report bugs, share ideas. Pick the channel that
          works best for you.
        </p>

        <div className={styles.grid}>
          {CHANNELS.map((c) => (
            <a className={styles.card} href={c.href} key={c.name}>
              <span
                className={styles.badge}
                style={{ '--badge-from': c.from, '--badge-to': c.to }}
              >
                {c.icon}
              </span>
              <h3 className={styles.cardTitle}>{c.name}</h3>
              <p className={styles.cardDesc}>{c.desc}</p>
              <span className={styles.cardLink}>
                {c.cta}
                <ArrowIcon />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}