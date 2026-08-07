'use client';

import React from 'react';
import styles from './CoordinatesFooter.module.css';

export function CoordinatesFooter() {
  return (
    <div className={styles.wrapper} aria-label="Build Coordinates & Metadata">
      <div className={styles.coords}>
        <span>LOC: 12°58&apos;N // 77°35&apos;E</span>
        <span className={styles.divider} aria-hidden="true">/</span>
        <span>SYS: THE DIALOGUE v0.1.0</span>
        <span className={styles.divider} aria-hidden="true">/</span>
        <span>STACK: NEXT.JS 15 + R3F</span>
      </div>
      <div className={styles.tagline}>
        <span>EDITED FOR ACCESSIBILITY — 0 AXE-CORE VIOLATIONS</span>
      </div>
    </div>
  );
}
