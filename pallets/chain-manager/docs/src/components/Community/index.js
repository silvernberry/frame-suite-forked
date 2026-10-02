import React from 'react';
import styles from './styles.module.css';

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);
const ChatBubbleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const LayersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
    <path d="M2 17l10 5 10-5"/>
    <path d="M2 12l10 5 10-5"/>
  </svg>
);
const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);
const MatrixIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M.632.55v22.9H2.28V24H0V0h2.28v.55zm7.043 7.26v1.157h.033c.309-.443.683-.784 1.117-1.024.433-.245.936-.365 1.5-.365.54 0 1.033.107 1.481.314.448.208.785.582 1.02 1.108.254-.374.6-.706 1.034-.992.434-.287.95-.43 1.546-.43.453 0 .872.056 1.26.167.388.11.716.286.993.53.276.245.489.559.646.951.152.392.23.863.23 1.417v5.728h-2.349V11.52c0-.286-.01-.559-.032-.812a1.755 1.755 0 0 0-.166-.633 1.025 1.025 0 0 0-.386-.419c-.174-.1-.4-.155-.689-.155-.289 0-.53.058-.723.172a1.265 1.265 0 0 0-.46.454 1.932 1.932 0 0 0-.247.626 3.608 3.608 0 0 0-.073.705v4.745h-2.35v-4.656c0-.252-.008-.5-.024-.744a1.991 1.991 0 0 0-.136-.652 1.016 1.016 0 0 0-.383-.457c-.177-.112-.426-.17-.746-.17-.109 0-.248.023-.417.07a1.269 1.269 0 0 0-.476.258 1.435 1.435 0 0 0-.37.518c-.1.22-.154.5-.154.835v5.002H5.312V7.81zm15.693 15.64V.55H21.72V0H24v24h-2.28v-.55z"/>
  </svg>
);
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const ExternalLinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <path d="M15 3h6v6"/>
    <path d="M10 14L21 3"/>
  </svg>
);

const CHANNELS = [
  {
    id: 'issues',
    title: 'GitHub Issues',
    description: "Found a bug or have a feature request? Open an issue and we'll take a look.",
    shortDesc: 'Report a bug or feature request.',
    tag: 'Report a bug',
    href: 'https://github.com/auguth/frame-suite/issues',
    tint: 'neutral',
    Icon: GitHubIcon,
  },
  {
    id: 'discussions',
    title: 'GitHub Discussions',
    description: 'General questions, ideas, and RFC proposals. Start or join a conversation.',
    shortDesc: 'Questions, ideas, and RFC proposals.',
    tag: 'Join discussion',
    href: 'https://github.com/auguth/frame-suite/discussions',
    tint: 'gold',
    Icon: ChatBubbleIcon,
  },
  {
    id: 'stackexchange',
    title: 'Substrate Stack Exchange',
    description: 'Technical Q&A for Substrate and FRAME developers.',
    shortDesc: 'Technical Q&A for developers.',
    tag: 'Ask a question',
    href: 'https://substrate.stackexchange.com',
    tint: 'neutral',
    Icon: LayersIcon,
  },
  {
    id: 'telegram',
    title: 'Telegram',
    description: 'Quick questions and community chat.',
    shortDesc: 'Quick questions and chat.',
    tag: 'Join group',
    href: 'https://t.me/auguthlabs',
    tint: 'seal',
    Icon: TelegramIcon,
  },
  {
    id: 'matrix',
    title: 'Matrix',
    description: 'Decentralised chat for the Substrate ecosystem.',
    shortDesc: 'Decentralised ecosystem chat.',
    tag: 'Open room',
    href: 'https://matrix.to/#/#auguthlabs:matrix.org',
    tint: 'blue',
    Icon: MatrixIcon,
  },
  {
    id: 'twitter',
    title: 'Twitter / X',
    description: 'Updates, announcements, and ecosystem news.',
    shortDesc: 'Updates and ecosystem news.',
    tag: 'Follow us',
    href: 'https://x.com/auguthlabs',
    tint: 'neutral',
    Icon: XIcon,
  },
];

export default function Community() {
  return (
    <section className={styles.section} id="community">
      <div className={styles.centerHead}>
        <h2 className={styles.sectionHead}>
          Need Help? <em className={styles.em}>We&rsquo;re Here.</em>
        </h2>
        <p className={styles.lede}>
          Ask questions, report bugs, share ideas. Pick the channel that works best for you.
        </p>
      </div>

      <div className={styles.corrGrid}>
        {CHANNELS.map(({ id, title, description, tag, href, tint, Icon }) => (
          <a key={id} className={styles.corrCard} href={href} target="_blank" rel="noopener noreferrer">
            <div className={`${styles.corrIcon} ${styles[tint]}`}><Icon/></div>
            <h3>{title}</h3>
            <p>{description}</p>
            <span className={styles.corrLink}>{tag}<ExternalLinkIcon/></span>
          </a>
        ))}
      </div>

      <div className={styles.corrList}>
        {CHANNELS.map(({ id, title, shortDesc, href, tint, Icon }) => (
          <a key={id} className={styles.corrRow} href={href} target="_blank" rel="noopener noreferrer">
            <div className={`${styles.corrIcon} ${styles[tint]}`}><Icon/></div>
            <div className={styles.corrRowText}><h3>{title}</h3><p>{shortDesc}</p></div>
            <ExternalLinkIcon/>
          </a>
        ))}
      </div>
    </section>
  );
}