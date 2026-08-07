'use client';

import React from 'react';
import Link from 'next/link';
import { SITE_NAME } from '../../lib/config';

export function Header() {
  return (
    <nav>
      <Link href="/" className="nav-name">
        {SITE_NAME}
      </Link>
      <div className="nav-links">
        <Link href="/about">About</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/meta">Meta</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  );
}

export default Header;
