import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllExperience } from '../../lib/content';
import { SITE_NAME } from '../../lib/config';

export const metadata: Metadata = {
  title: `About | ${SITE_NAME.replace('[REPLACE: ', '').replace(']', '')}`,
  description: 'Background, experience, and skills.',
};

export default function AboutPage() {
  const experiences = getAllExperience();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: 'var(--space-12) var(--space-6)', minHeight: '100vh' }}>
      <header style={{ marginBottom: 'var(--space-12)' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-4)' }}>
          About
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-lg)', lineHeight: 'var(--leading-relaxed)' }}>
          [REPLACE: I am a software engineer focused on bridging the gap between design and engineering. I build tools and interfaces that empower people to do their best work.]
        </p>
      </header>

      <section style={{ marginBottom: 'var(--space-16)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-8)', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: 'var(--space-4)' }}>
          Experience
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
          {experiences.map((exp) => (
            <div key={exp.id} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-xl)', margin: 0, color: 'var(--color-text-primary)' }}>
                  {exp.role} <span style={{ color: 'var(--color-accent-base)' }}>@ {exp.company}</span>
                </h3>
                <span style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-sm)', whiteSpace: 'nowrap' }}>
                  {new Date(exp.startDate).getFullYear()} - {exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'}
                </span>
              </div>
              
              {exp.highlights && exp.highlights.length > 0 && (
                <ul style={{ paddingLeft: 'var(--space-4)', margin: 0, color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-loose)' }}>
                  {exp.highlights.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 'var(--space-16)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-8)', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: 'var(--space-4)' }}>
          Skills
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-8)' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-base)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-4)' }}>Frontend</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-loose)' }}>
              <li>React & Next.js</li>
              <li>TypeScript</li>
              <li>Three.js & WebGL</li>
              <li>CSS Architecture</li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-base)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-4)' }}>Backend & Systems</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-loose)' }}>
              <li>Node.js</li>
              <li>PostgreSQL</li>
              <li>GraphQL & REST</li>
              <li>System Design</li>
            </ul>
          </div>
        </div>
      </section>

      <section style={{ textAlign: 'center', padding: 'var(--space-12) 0', borderTop: '1px solid var(--color-border-subtle)' }}>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
          Prefer the interactive version? Let&apos;s talk.
        </p>
        <Link 
          href="/?path=ROOT" 
          style={{ 
            display: 'inline-block', 
            padding: 'var(--space-4) var(--space-8)', 
            backgroundColor: 'var(--color-accent-base)', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: 'var(--radius-md)',
            fontWeight: 'var(--weight-medium)',
            fontFamily: 'var(--font-ui)'
          }}
        >
          Start the conversation
        </Link>
      </section>
    </div>
  );
}
