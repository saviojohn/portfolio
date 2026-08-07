import React from 'react';
import type { Metadata } from 'next';
import { SITE_NAME, SOCIAL_LINKS } from '../../lib/config';
import { ContactForm } from '../../components/forms/ContactForm';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';

export const metadata: Metadata = {
  title: `Contact | ${SITE_NAME}`,
  description: 'Get in touch for engineering projects, collaborations, or technical opportunities.',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <div className="panel" data-accent="ai">
          <div className="panel-eyebrow">03 · collaboration & contact</div>
          <h2>Open to the right kind of project.</h2>
          <p className="panel-lede">
            Interested in collaborations that stretch across the stack, especially anything touching mobile, real-time messaging, or applied AI.
          </p>
          {/* --- New Collaboration Details Section --- */}
          <h3>03 · collaboration</h3>
          <p className="panel-lede">
            Genuinely interested in collaborations that stretch across the stack, especially anything touching cross‑platform mobile, real‑time architectures, or applied AI.
          </p>

          <div className="field-row">
            <span className="label">Currently open to</span>
            <span className="value">Full‑stack &amp; Mobile engineering roles, high‑impact contract projects</span>
          </div>

          <div className="field-row">
            <span className="label">Best way to reach me</span>
            <span className="value">
              Email <a href="https://mail.google.com/mail/?view=cm&fs=1&to=savio.john.t@gmail.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--amber)', textDecoration: 'none' }}>savio.john.t@gmail.com</a> or&nbsp;
              <a href="https://www.linkedin.com/in/savio-john-b927821b5/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">LinkedIn</a>
            </span>
          </div>

          <div className="field-row">
            <span className="label">Response time</span>
            <span className="value">Usually within 24 hours</span>
          </div>
          <div className="field-row">
            <span className="label">Location</span>
            <span className="value">Kochi, Kerala, India</span>
          </div>

          <div className="field-row">
            <span className="label">Currently Open To</span>
            <span className="value">Full-time roles, contract work, high-impact technical consulting</span>
          </div>

          <div className="field-row">
            <span className="label">Direct Email</span>
            <span className="value">
              <a href={`mailto:${SOCIAL_LINKS.email}`} style={{ color: 'var(--amber)', textDecoration: 'none' }}>
                {SOCIAL_LINKS.email}
              </a>
            </span>
          </div>

          <div className="field-row" style={{ marginBottom: '32px' }}>
            <span className="label">Social & Professional Channels</span>
            <div className="panel-actions" style={{ marginTop: '8px' }}>
              {SOCIAL_LINKS.linkedin && (
                <a className="btn btn-primary" href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              )}
              {SOCIAL_LINKS.github && (
                <a className="btn btn-ghost" href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              )}
            </div>
          </div>

          <div className="info-card">
            <h3>Send a Message</h3>
            <p style={{ marginBottom: '16px' }}>Or leave a note directly using the form below:</p>
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
