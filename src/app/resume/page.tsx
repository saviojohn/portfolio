import React from 'react';
import type { Metadata } from 'next';
import { SITE_NAME, SOCIAL_LINKS } from '../../lib/config';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { ResumeClientActions } from './ResumeClientActions';
import styles from './Resume.module.css';

export const metadata: Metadata = {
  title: `Resume | ${SITE_NAME}`,
  description: 'Official resume of Savio John — Full-Stack Software Engineer specializing in Mobile (Flutter), Web (Next.js/React), and Backend (Python/FastAPI).',
};

export default function ResumePage() {
  const skillsData = [
    {
      category: 'Mobile',
      skills: 'Flutter · Dart · Riverpod · Provider · GoRouter · Dio · Firebase Cloud Messaging · APNs · WebSocket / Socket.IO · Flutter Secure Storage · Config-Driven UI · iOS & Android',
    },
    {
      category: 'Frontend / Web',
      skills: 'React · Next.js (App & Pages Router) · TypeScript · Redux Toolkit · Recharts · Material UI (MUI) · Formik / Yup · Config-Driven UI · Google Tag Manager · QR Code Gen. & Scanning · PDF Generation (react-pdf) · WhatsApp Business API',
    },
    {
      category: 'Backend',
      skills: 'Python · FastAPI · Pydantic · PostgreSQL · Async SQLAlchemy · Alembic · Redis · RabbitMQ · python-socketio · Firebase Admin SDK · AWS SES (boto3) · OpenAI API',
    },
    {
      category: 'Tools & Practices',
      skills: 'REST API Integration · Git · Docker · CI/CD (GitHub Actions) · JWT Auth · i18n / Localization · Excel Export (SheetJS) · Unit / Widget / Golden / Integration Testing (pytest, flutter_test)',
    },
  ];

  const projectsData = [
    {
      title: 'CogniView — AI Movie Discovery App',
      tech: 'React 19, Redux Toolkit, OpenAI API, TMDB API, Firebase',
      github: 'https://github.com/saviojohn/CogniView',
      bullets: [
        'Built a GPT-3.5-powered natural-language movie recommendation engine with parallel TMDB metadata resolution, Firebase auth, and 3-language localized UI',
      ],
    },
    {
      title: 'Crypto Order Book & Market Indicators Dashboard',
      tech: 'Next.js 15, TypeScript, MUI 7, Recharts, Binance WebSockets',
      github: 'https://github.com/saviojohn/orderbook-market-indicators',
      bullets: [
        'Built a custom WebSocket hook streaming live top-10 bid/ask depth for BTC/ETH/XRP, with Recharts-based cumulative depth charts, a rolling spread buffer, and a buy/sell pressure indicator',
      ],
    },
  ];

  return (
    <>
      <Header />
      <main>
        <div className={styles.resumeContainer}>
          <ResumeClientActions email={SOCIAL_LINKS.email} />

          <article className={styles.resumeCard}>
            {/* Header Section */}
            <header className={styles.headerSection}>
              <h1 className={styles.name}>SAVIO JOHN</h1>
              <p className={styles.title}>Full-Stack Software Engineer — Mobile · Web · Backend</p>

              <div className={styles.contactGrid}>
                <span>📍 Kochi, Kerala, India</span>
                <a href={`mailto:${SOCIAL_LINKS.email}`} className={styles.contactItem}>
                  ✉ {SOCIAL_LINKS.email}
                </a>
                <span>📞 +91-8248155832</span>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                  🔗 linkedin.com/in/savio-john-b927821b5/
                </a>
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                  💻 github.com/saviojohn
                </a>
                <a href="https://saviojohn.github.io/portfolio" target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                  🌐 saviojohn.github.io/portfolio
                </a>
              </div>
            </header>

            {/* EXPERIENCE */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>EXPERIENCE</h2>
              <div className={styles.experienceItem}>
                <div className={styles.experienceHeader}>
                  <h3 className={styles.companyRole}>
                    Software Engineer — <span className={styles.companyName}>DataEquinox</span>
                  </h3>
                  <span className={styles.dateLocation} style={{ fontSize: '13px', fontWeight: 600, color: 'var(--cyan)' }}>
                    Dec 2023 – Present
                  </span>
                </div>

                {/* Mobile (Flutter) */}
                <div style={{ marginTop: '12px', marginBottom: '6px', fontWeight: 600, color: 'var(--text)', fontSize: '15px' }}>
                  Mobile (Flutter)
                </div>
                <ul className={styles.bulletList}>
                  <li>
                    Built a customer-facing fintech mobile app end-to-end (Flutter, Riverpod, GoRouter, Dio) — Flutter Secure Storage-backed auth, KYC document verification, multi-currency wallets, config-driven FX/remittance transfer flows, and in-app support chat — spanning 15 feature modules on iOS and Android
                  </li>
                  <li>
                    Implemented a real-time sync layer (Socket.IO, 14+ event types) keeping wallet balances, transaction status, and chat updated without manual refresh, plus FCM/APNs push notifications with deep-link navigation
                  </li>
                  <li>
                    Shipped bilingual EN/JA localization (~1,232 keys/locale) with backend locale-map resolution that preserves in-progress transfer/KYC state across language switches
                  </li>
                </ul>

                {/* Backend (FastAPI) */}
                <div style={{ marginTop: '14px', marginBottom: '6px', fontWeight: 600, color: 'var(--text)', fontSize: '15px' }}>
                  Backend (FastAPI)
                </div>
                <ul className={styles.bulletList}>
                  <li>
                    Built an end-to-end Firebase Cloud Messaging pipeline (device registry, RabbitMQ workers, Redis dedupe/rate-limiting) for a FastAPI remittance backend (PostgreSQL, Alembic, Dockerized), delivering push notifications across 4 customer event types
                  </li>
                  <li>
                    Implemented a secure forgot-password flow (OTP via AWS SES, Redis-backed sessions, rate limiting, JWT invalidation on reset), covered by 13 automated tests
                  </li>
                </ul>

                {/* Web (Next.js / React) */}
                <div style={{ marginTop: '14px', marginBottom: '6px', fontWeight: 600, color: 'var(--text)', fontSize: '15px' }}>
                  Web (Next.js / React)
                </div>
                <ul className={styles.bulletList}>
                  <li>
                    Built customer-account modules (address/profile CRUD, wishlist, dual-auth order invoices for guest and logged-in users) with Formik/Yup validated forms and Google Tag Manager e-commerce instrumentation (10+ event types) for a retail storefront
                  </li>
                  <li>
                    Built and deployed (Firebase Hosting, GitHub Actions CI/CD) a staff/security gate-pass admin module integrating 17 REST endpoints for CRUD, filtering, pagination, and QR-based check-in/check-out workflows, with thermal-print (80mm) pass generation and Excel export
                  </li>
                  <li>
                    Built WhatsApp template creation, campaign broadcast hardening, and Meta embedded signup onboarding for a business messaging platform supporting 25+ reseller brand configurations across 6 locales
                  </li>
                </ul>
              </div>
            </section>

            {/* PERSONAL PROJECTS */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>PERSONAL PROJECTS</h2>
              {projectsData.map((proj, idx) => (
                <div key={idx} style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px', marginBottom: '4px' }}>
                    <h3 className={styles.companyRole} style={{ fontSize: '16px' }}>
                      {proj.title} <span style={{ fontWeight: 400, fontSize: '14px', color: 'var(--muted)', fontStyle: 'italic' }}>({proj.tech})</span>
                    </h3>
                  </div>
                  <ul className={styles.bulletList} style={{ marginBottom: '4px' }}>
                    {proj.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12.5px', color: 'var(--muted)', paddingLeft: '20px' }}>
                    GitHub: <a href={proj.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cyan)', textDecoration: 'underline' }}>{proj.github.replace('https://', '')}</a>
                  </div>
                </div>
              ))}
            </section>

            {/* SKILLS */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>SKILLS</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {skillsData.map((s, idx) => (
                  <div key={idx} style={{ fontSize: '14px', lineHeight: '1.6' }}>
                    <strong style={{ color: 'var(--cyan)', fontFamily: 'var(--font-display)', minWidth: '140px', display: 'inline-block' }}>
                      {s.category}:
                    </strong>{' '}
                    <span style={{ color: 'var(--muted)' }}>{s.skills}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* EDUCATION */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>EDUCATION</h2>
              <div className={styles.experienceHeader}>
                <h3 className={styles.companyRole}>
                  Amrita Vishwa Vidyapeetham — <span className={styles.companyName}>Bachelor of Computer Applications (BCA)</span>
                </h3>
                <span className={styles.dateLocation} style={{ fontSize: '13px', fontWeight: 600, color: 'var(--cyan)' }}>
                  2020 – 2023
                </span>
              </div>
            </section>

            {/* CERTIFICATIONS */}
            <section className={styles.section} style={{ marginBottom: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 className={styles.sectionTitle} style={{ margin: 0 }}>CERTIFICATIONS</h2>
                <a href="/certifications" className="btn btn-ghost" style={{ fontSize: '12px', padding: '4px 10px' }}>
                  View Badges &amp; Credentials ↗
                </a>
              </div>
              <ul className={styles.bulletList} style={{ margin: 0 }}>
                <li>
                  <strong>JavaScript, React &amp; Frontend System Design</strong> — NamasteDev (Akshay Saini)
                </li>
                <li>
                  <strong>Databases for Developers (98%)</strong> — Oracle Dev Gym · <strong>Introduction to SQL (#17733495)</strong> — DataCamp
                </li>
                <li>
                  <strong>Microsoft AI Classroom Series</strong> — Microsoft &amp; NASSCOM · <strong>AWS Builders Series</strong> — Amazon Web Services
                </li>
              </ul>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
