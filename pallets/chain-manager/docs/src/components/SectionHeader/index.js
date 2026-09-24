import React from 'react';
import styles from './styles.module.css';


export function Accent({ children }) {
  return <span className={styles.accent}>{children}</span>;
}


export default function SectionHeader({ eyebrow, title, description, className }) {
  return (
    <div className={`${styles.headerRow} ${className || ''}`}>
      <div className={styles.eyebrowRow}>
        <span className={styles.eyebrow}>{eyebrow}</span>
      </div>
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.desc}>{description}</p>}
    </div>
  );
}

export function SectionHeaderWithImage({ eyebrow, title, description, image, imageAlt, className }) {
  return (
    <div className={`${styles.headerRowImg} ${className || ''}`}>
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        className={styles.textCol}
      />
      <img
        src={image}
        alt={imageAlt || ''}
        className={styles.headerImg}
      />
    </div>
  );
}