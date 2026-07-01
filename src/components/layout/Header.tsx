'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useDialogue } from '../../hooks/useDialogue';
import { SITE_NAME } from '../../lib/config';
import styles from './Header.module.css';

export function Header() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);
  const { path, rewind, reset } = useDialogue();

  // Basic branch mapper for breadcrumb
  const branchMap: Record<string, string> = {
    A: 'Hiring',
    B: 'CTO',
    C: 'Founder',
    D: 'Explorer',
    A1: 'Frontend',
    A2: 'Full-stack',
    A3: 'Best Work',
    B1: 'Architecture',
    B2: 'Code Quality',
    B3: 'Problem Solving',
    C1: 'From Scratch',
    C2: 'Level Up',
    C3: 'Range',
    D1: 'Work',
    D2: 'Thinking',
  };

  useEffect(() => {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme') as 'dark' | 'light';
    if (currentTheme) setTheme(currentTheme);
  }, []);

  // Manage focus return for accessibility
  useEffect(() => {
    if (menuOpen) {
      wasOpenRef.current = true;
    } else if (wasOpenRef.current) {
      hamburgerRef.current?.focus();
      wasOpenRef.current = false;
    }
  }, [menuOpen]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const isDialogueActive = path.length > 1;
  const p1 = path[1];
  const p2 = path[2];
  const currentBranchName = p1 ? branchMap[p1] : null;
  const currentSubBranchName = p2 ? branchMap[p2] : null;

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link href="/" className={styles.logo} onClick={() => reset()}>
          {SITE_NAME.replace('[REPLACE: ', '').replace(']', '')}
        </Link>
        
        {isDialogueActive && (
          <div className={styles.breadcrumb}>
            <button 
              className={styles.backButton} 
              onClick={() => rewind(1)}
              aria-label="Go back one step"
            >
              ← Back
            </button>
            {currentBranchName && <span>› {currentBranchName}</span>}
            {currentSubBranchName && <span>› {currentSubBranchName}</span>}
          </div>
        )}
      </div>

      <div className={styles.right}>
        <nav className={styles.navLinks}>
          <Link href="/meta" className={styles.navLink}>Meta</Link>
          <Link href="/contact" className={styles.navLink}>Contact</Link>
          <button 
            className={styles.themeToggle} 
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? '☀' : '🌙'}
          </button>
        </nav>

        <button 
          ref={hamburgerRef}
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle mobile menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
        <Link href="/meta" className={styles.navLink} onClick={() => setMenuOpen(false)}>Meta</Link>
        <Link href="/contact" className={styles.navLink} onClick={() => setMenuOpen(false)}>Contact</Link>
        <button 
          className={styles.navLink} 
          onClick={() => { toggleTheme(); setMenuOpen(false); }}
          style={{ textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          Toggle Theme ({theme === 'dark' ? 'Light' : 'Dark'})
        </button>
      </div>
    </header>
  );
}
