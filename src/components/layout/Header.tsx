'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE_NAME } from '../../lib/config';

export function Header() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav>
      <Link href="/" className="nav-name">
        {SITE_NAME}
      </Link>
      <div className="nav-links">
        {navItems.map((item) => {
          const isActive = mounted && (pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href)));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={isActive ? 'active' : undefined}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default Header;
