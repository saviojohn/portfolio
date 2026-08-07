'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import type { Project } from '../lib/types';
import { SITE_NAME, SOCIAL_LINKS } from '../lib/config';

interface ClientPageProps {
  allProjects: Project[];
}

type ViewMode = 'grid' | 'frontend' | 'backend' | 'ai' | 'cloud';

export function ClientPage({ allProjects }: ClientPageProps) {
  const [activeView, setActiveView] = useState<ViewMode>('grid');

  const showPanel = (key: ViewMode) => {
    setActiveView(key);
    document.dispatchEvent(new CustomEvent('circuit-select', { detail: { key } }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showGrid = () => {
    setActiveView('grid');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header />
      <main>
        <div className="stage">
          {/* ===== VIEW 0: GRID VIEW ===== */}
          <div className="view" id="viewGrid" hidden={activeView !== 'grid'}>
            <div className="eyebrow">frontend · backend · ai · cloud</div>
            <h1>{SITE_NAME}</h1>
            <p className="subhead">
              One board, every layer routed through it. Pick a signal and I&apos;ll take it from there.
            </p>

            <div className="port-panel">
              <button className="port" data-trace="frontend" onClick={() => showPanel('frontend')}>
                <span className="port-index">01</span>
                <span className="pins">
                  <span />
                  <span />
                  <span />
                </span>
                <span className="port-label">I&apos;m looking to hire someone</span>
              </button>

              <button className="port" data-trace="backend" onClick={() => showPanel('backend')}>
                <span className="port-index">02</span>
                <span className="pins">
                  <span />
                  <span />
                  <span />
                </span>
                <span className="port-label">I want to see what you build</span>
              </button>

              <button className="port" data-trace="ai" onClick={() => showPanel('ai')}>
                <span className="port-index">03</span>
                <span className="pins">
                  <span />
                  <span />
                  <span />
                </span>
                <span className="port-label">I might want to work together</span>
              </button>

              <button className="port" data-trace="cloud" onClick={() => showPanel('cloud')}>
                <span className="port-index">04</span>
                <span className="pins">
                  <span />
                  <span />
                  <span />
                </span>
                <span className="port-label">Just curious</span>
              </button>
            </div>
          </div>

          {/* ===== VIEW 01: HIRE ME ===== */}
          <div className="view" id="viewFrontend" hidden={activeView !== 'frontend'}>
            <div className="panel" data-accent="frontend">
              <button className="back-link" onClick={showGrid}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                back to signals
              </button>

              <div className="panel-eyebrow">01 · hiring</div>
              <h2>Full-stack engineer — web and mobile, moving into AI and cloud.</h2>
              <p className="panel-lede">
                I build production features end to end: React/Next.js and Flutter on the frontend, Python and Node on the backend, shipped on real teams with real users. Currently deepening AI integration work and real-time backend pipelines.
              </p>

              <div className="panel-actions">
                <a className="btn btn-primary" href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer">
                  Connect on LinkedIn
                </a>
                <Link className="btn btn-ghost" href="/contact">
                  Get in touch
                </Link>
              </div>

              <div className="card-grid">
                {allProjects.slice(0, 4).map((project) => (
                  <div key={project.slug} className="info-card">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="tags">
                      {project.tech?.slice(0, 3).map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ===== VIEW 02: SEE WHAT I BUILD ===== */}
          <div className="view" id="viewBackend" hidden={activeView !== 'backend'}>
            <div className="panel" data-accent="backend">
              <button className="back-link" onClick={showGrid}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                back to signals
              </button>

              <div className="panel-eyebrow">02 · projects</div>
              <h2>A few things I&apos;ve shipped.</h2>
              <p className="panel-lede">
                Spanning web admin tools, e-commerce storefronts, mobile fintech, and real-time backend APIs. Click through for case studies.
              </p>

              <div className="card-grid">
                {allProjects.map((project) => (
                  <div key={project.slug} className="info-card">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="tags">
                      {project.tech?.slice(0, 3).map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                    <Link className="card-link" href={`/projects/${project.slug}`}>
                      View case study →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ===== VIEW 03: WORK TOGETHER ===== */}
          <div className="view" id="viewAi" hidden={activeView !== 'ai'}>
            <div className="panel" data-accent="ai">
              <button className="back-link" onClick={showGrid}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                back to signals
              </button>

              <div className="panel-eyebrow">03 · collaboration</div>
              <h2>Open to the right kind of project.</h2>
              <p className="panel-lede">
                Genuinely interested in collaborations that stretch across the stack, especially anything touching cross-platform mobile, real-time architectures, or applied AI.
              </p>

              <div className="field-row">
                <span className="label">Currently open to</span>
                <span className="value">Full-stack & Mobile engineering roles, high-impact contract projects</span>
              </div>
              <div className="field-row">
                <span className="label">Best way to reach me</span>
                <span className="value">
                  Email (<a href={`mailto:${SOCIAL_LINKS.email}`} style={{ color: 'var(--amber)', textDecoration: 'none' }}>{SOCIAL_LINKS.email}</a>) or LinkedIn
                </span>
              </div>
              <div className="field-row">
                <span className="label">Response time</span>
                <span className="value">Usually within 24 hours</span>
              </div>

              <div className="panel-actions">
                <a
                  className="btn btn-primary"
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${SOCIAL_LINKS.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Email me
                </a>
                <a className="btn btn-ghost" href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer">
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* ===== VIEW 04: JUST CURIOUS ===== */}
          <div className="view" id="viewCloud" hidden={activeView !== 'cloud'}>
            <div className="panel" data-accent="cloud">
              <button className="back-link" onClick={showGrid}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                back to signals
              </button>

              <div className="panel-eyebrow">04 · just looking around</div>
              <h2>No pitch here — just what I&apos;m into.</h2>
              <p className="panel-lede">
                I like building things that feel like systems, not just screens — which is basically what this page is. Right now I&apos;m expanding out from frontend and mobile into backend depth, applied AI, and real-time WebSocket infrastructure.
              </p>

              <div className="panel-actions">
                <button className="btn btn-ghost" onClick={() => showPanel('backend')}>
                  See what I build →
                </button>
                <Link className="btn btn-ghost" href="/contact">
                  Say hi anyway →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ClientPage;
