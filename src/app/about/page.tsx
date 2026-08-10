import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllExperience } from '../../lib/content';
import { SITE_NAME, SOCIAL_LINKS } from '../../lib/config';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';

export const metadata: Metadata = {
  title: `About | ${SITE_NAME}`,
  description: 'Background, experience, education, and skills of Savio John.',
};

export default function AboutPage() {
  const experiences = getAllExperience();

  return (
    <>
      <Header />
      <main>
        <div className="panel" data-accent="frontend">
          <div className="panel-eyebrow">01 · background & experience</div>
          <h2>Software Engineer — Full-Stack & Mobile</h2>
          <p className="panel-lede">
            Software Engineer based in Kochi, Kerala, India. Specializing in cross-platform mobile applications (Flutter/Dart), modern web applications (React, Next.js, Redux, MUI), asynchronous backends (Python, FastAPI, PostgreSQL), and real-time messaging architectures (Socket.IO, Firebase FCM).
          </p>

          <div className="panel-actions">
            <a className="btn btn-primary" href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer">
              Connect on LinkedIn
            </a>
            <Link className="btn btn-ghost" href="/contact">
              Get in touch
            </Link>
          </div>

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', margin: '32px 0 16px' }}>Work Experience</h3>
          <div className="card-grid" style={{ marginBottom: '32px' }}>
            {experiences.map((exp) => (
              <div key={exp.id} className="info-card" style={{ gridColumn: '1 / -1' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                  <h3 style={{ margin: 0 }}>
                    {exp.role} <span style={{ color: 'var(--cyan)' }}>@ {exp.company}</span>
                  </h3>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--faint)' }}>
                    {new Date(exp.startDate).getFullYear()} - {exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'}
                  </span>
                </div>
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul style={{ paddingLeft: '18px', margin: 0, color: 'var(--muted)', fontSize: '13.5px', lineHeight: '1.6' }}>
                    {exp.highlights.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', margin: '32px 0 16px' }}>Education</h3>
          <div className="card-grid" style={{ marginBottom: '32px' }}>
            <div className="info-card" style={{ gridColumn: '1 / -1' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                <h3 style={{ margin: 0, color: 'var(--cyan)' }}>Amrita Vishwa Vidyapeetham, Amritapuri</h3>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--faint)' }}>Kollam, Kerala, India</span>
              </div>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '13.5px' }}>
                Bachelor of Computer Applications (BCA), 2020 – 2023.
              </p>
            </div>
          </div>

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', margin: '32px 0 16px' }}>Core Capabilities</h3>
          <div className="card-grid">
            <div className="info-card">
              <h3>Mobile & Cross-Platform</h3>
              <p>Flutter, Dart, Riverpod, Provider, iOS & Android Native Integration, FCM Push Notifications & Deep Linking.</p>
              <div className="tags">
                <span>Flutter</span>
                <span>Dart</span>
                <span>Riverpod</span>
              </div>
            </div>
            <div className="info-card">
              <h3>Frontend & Web Systems</h3>
              <p>React, Next.js (App & Pages Router), TypeScript, Redux Toolkit, Material UI (MUI), GTM Telemetry.</p>
              <div className="tags">
                <span>Next.js</span>
                <span>React</span>
                <span>TypeScript</span>
              </div>
            </div>
            <div className="info-card">
              <h3>Backend & Real-Time APIs</h3>
              <p>Python, FastAPI, Async PostgreSQL, SQLAlchemy 2.0, Alembic, Socket.IO, RabbitMQ & Redis.</p>
              <div className="tags">
                <span>Python</span>
                <span>FastAPI</span>
                <span>Socket.IO</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
