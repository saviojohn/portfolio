'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { SOCIAL_LINKS } from '../../lib/config';
import { clearMemory } from '../../lib/dialogue/memory';
import { useDialogue } from '../../hooks/useDialogue';
import { IconLink } from '../ui/IconLink';
import styles from './Footer.module.css';

export function Footer() {
  const { reset } = useDialogue();

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(
      "%cHello curious developer! \n%cI see you peeking under the hood. The source code for this site's dialogue engine is open and available on my GitHub.",
      "font-size: 16px; font-weight: bold; color: #a855f7;",
      "font-size: 12px; color: #9494a0;"
    );
  }, []);

  const handleClearMemory = () => {
    clearMemory();
    window.location.reload();
  };

  const handleStartOver = (e: React.MouseEvent) => {
    e.preventDefault();
    reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Basic SVG icons for social links
  const icons = {
    github: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
    ),
    linkedin: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
    ),
    twitter: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
    ),
    email: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
    )
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.socials}>
          {Object.entries(SOCIAL_LINKS).map(([platform, url]) => (
            <IconLink 
              key={platform} 
              href={url} 
              icon={icons[platform as keyof typeof icons]} 
              aria-label={platform} 
              external 
            />
          ))}
        </div>
      </div>
      <div className={styles.bottom}>
        <span>&copy; {new Date().getFullYear()} The Dialogue</span>
        <div className={styles.links}>
          <Link href="/" onClick={handleStartOver} className={styles.linkButton}>Start over</Link>
          <button onClick={handleClearMemory} className={styles.linkButton}>Clear memory</button>
        </div>
      </div>
    </footer>
  );
}
