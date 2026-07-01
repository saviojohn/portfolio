import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME } from '../../lib/config';
import { Badge } from '../../components/ui/Badge';

export const metadata: Metadata = {
  title: `Meta | ${SITE_NAME.replace('[REPLACE: ', '').replace(']', '')}`,
  description: 'How this portfolio was built. Tech stack, architecture, and design decisions.',
};

export default function MetaPage() {
  const stack = ['Next.js 15', 'React 19', 'TypeScript', 'CSS Modules', 'GSAP', 'Three.js', 'MDX'];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: 'var(--space-12) var(--space-6)', minHeight: '100vh' }}>
      <header style={{ marginBottom: 'var(--space-12)' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-4)' }}>
          Meta
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-lg)', lineHeight: 'var(--leading-relaxed)' }}>
          A portfolio is a product. This page documents how I built this one.
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
        <section>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-6)', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: 'var(--space-4)' }}>
            The Tech Stack
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            {stack.map((tech) => (
              <Badge key={tech} label={tech} color="neutral" />
            ))}
          </div>
          <p style={{ marginTop: 'var(--space-6)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-loose)' }}>
            I chose Next.js App Router for the foundation to leverage Server Components for the MDX content layer, while keeping the interactive dialogue strictly client-side. CSS Modules were chosen over Tailwind to demonstrate fundamental CSS architecture and token-driven design.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-6)', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: 'var(--space-4)' }}>
            The Dialogue Engine
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-loose)', marginBottom: 'var(--space-4)' }}>
            Instead of a standard static site, I wanted the portfolio to feel like an interview. The dialogue engine is a custom state machine built entirely in React using a <code>useReducer</code> context. It parses a static JSON tree representing dialogue nodes and handles dynamic routing, memory persistence, and path rewinding.
          </p>
          <ul style={{ paddingLeft: 'var(--space-4)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-loose)' }}>
            <li>O(1) node lookup</li>
            <li>localStorage sync for returning visitors</li>
            <li>URL state sync for deep linking (e.g. sharing a specific conversation path)</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-6)', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: 'var(--space-4)' }}>
            Source Code
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-loose)' }}>
            The entire source code is available on GitHub. Feel free to fork it, learn from it, or critique it.
          </p>
          <div style={{ marginTop: 'var(--space-6)' }}>
            <a 
              href="[REPLACE: https://github.com/yourusername/portfolio]" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: 'var(--color-accent-base)', fontWeight: 'var(--weight-medium)', textDecoration: 'none' }}
            >
              View on GitHub ↗
            </a>
          </div>
        </section>

        <section style={{ textAlign: 'center', marginTop: 'var(--space-8)', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--color-border-subtle)' }}>
          <Link href="/?path=ROOT" style={{ color: 'var(--color-text-primary)', textDecoration: 'underline' }}>
            Back to the conversation
          </Link>
        </section>
      </div>
    </div>
  );
}
