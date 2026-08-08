'use client';

import React from 'react';
import { SITE_NAME, SOCIAL_LINKS } from '../../lib/config';
import { clearMemory } from '../../lib/dialogue/memory';
import { useDialogue } from '../../hooks/useDialogue';

export function Footer() {
  const { reset } = useDialogue();

  const handleClearMemory = () => {
    clearMemory();
    window.location.reload();
  };

  const handleStartOver = (e: React.MouseEvent) => {
    e.preventDefault();
    reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer>
      <div className="footer-socials">
        {SOCIAL_LINKS.github && (
          <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.9c-2.78.62-3.37-1.19-3.37-1.19-.46-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.57 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.9-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9v2.82c0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"/>
            </svg>
          </a>
        )}
        {SOCIAL_LINKS.linkedin && (
          <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3-.02-2.96-1.8-2.96-1.8 0-2.08 1.4-2.08 2.86V21h-4V9Z"/>
            </svg>
          </a>
        )}
        {SOCIAL_LINKS.email && (
          <a href={`mailto:${SOCIAL_LINKS.email}`} aria-label="Email">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 5.5A1.5 1.5 0 0 1 3.5 4h17A1.5 1.5 0 0 1 22 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 18.5v-13Zm2.2.5 7.8 6.1L19.8 6H4.2Zm15.8 1.6-7.4 5.8a1 1 0 0 1-1.2 0L4 7.6V18h16V7.6Z"/>
            </svg>
          </a>
        )}
      </div>
      <div>&copy; {new Date().getFullYear()} {SITE_NAME}</div>
      <div className="footer-actions">
        <a href="#" onClick={handleStartOver}>Start over</a>
        <button onClick={handleClearMemory}>Clear memory</button>
      </div>
    </footer>
  );
}

export default Footer;
