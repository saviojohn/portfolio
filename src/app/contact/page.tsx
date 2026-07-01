import React from 'react';
import type { Metadata } from 'next';
import { SITE_NAME, SOCIAL_LINKS } from '../../lib/config';
import { ContactForm } from '../../components/forms/ContactForm';
import { IconLink } from '../../components/ui/IconLink';

export const metadata: Metadata = {
  title: `Contact | ${SITE_NAME.replace('[REPLACE: ', '').replace(']', '')}`,
  description: 'Get in touch for projects, speaking, or just to say hi.',
};

export default function ContactPage() {
  const dummyIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
  );

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: 'var(--space-12) var(--space-6)', minHeight: '100vh' }}>
      <header style={{ marginBottom: 'var(--space-12)' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-4)' }}>
          Contact
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-lg)', lineHeight: 'var(--leading-relaxed)' }}>
          If you skipped the dialogue and came straight here — I respect the efficiency. Let&apos;s talk about what you&apos;re building.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-12)' }}>
        <section>
          <ContactForm />
        </section>

        <section style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: 'var(--space-8)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-6)' }}>
            Other ways to connect
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
            {Object.entries(SOCIAL_LINKS).map(([platform, url]) => (
              <IconLink 
                key={platform} 
                href={url} 
                icon={dummyIcon} 
                label={platform} 
                external 
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
