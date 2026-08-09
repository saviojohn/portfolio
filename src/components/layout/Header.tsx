'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE_NAME } from '../../lib/config';

export function Header() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/certifications', label: 'Certifications' },
    { href: '/resume', label: 'Resume' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="header-container">
      <nav className="nav-bar">
        <Link href="/" className="nav-name">
          <span className="nav-status-dot" title="Available for selected projects" />
          <span className="nav-brand-text">{SITE_NAME}</span>
        </Link>

        {/* Mobile Hamburger Toggle Button */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Desktop & Mobile Navigation Links */}
        <div className={`nav-links ${mobileMenuOpen ? 'nav-links-open' : ''}`}>
          {navItems.map((item) => {
            const isActive = mounted && (pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href)));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link-item ${isActive ? 'active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}

export default Header;
