
import React from 'react';
import styles from './styles.module.css';
 
/**
 * A hairline security-paper divider, reused between every section
 * on the page. Kept as its own component (rather than baked into
 * Hero, or any one section) since nothing else about it is
 * section-specific.
 */
export default function Guilloche() {
  return <div className={styles.guilloche} role="presentation" />;
}
 