import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME, SOCIAL_LINKS } from '../../lib/config';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';

export const metadata: Metadata = {
  title: `Meta | ${SITE_NAME}`,
  description: 'Architecture, technical design system, and implementation details of this portfolio.',
};

export default function MetaPage() {
  const stack = ['Next.js 15 App Router', 'React 19', 'TypeScript', 'Three.js 3D Canvas', 'MDX Content Pipeline', 'Design System Tokens'];

  return (
    <>
      <Header />
      <main>
        <div className="panel" data-accent="cloud">
          <div className="panel-eyebrow">04 · architecture & meta</div>
          <h2>A system, not a template.</h2>
          <p className="panel-lede">
            This portfolio is built as a complete software product: a custom dialogue state machine, procedural 3D Three.js circuit board canvas, and MDX content pipeline.
          </p>

          <div className="info-card" style={{ marginBottom: '24px' }}>
            <h3>The Tech Stack</h3>
            <p>Built with modern web standards and clean separation of concerns:</p>
            <div className="tags">
              {stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="field-row">
            <span className="label">3D Circuit Engine</span>
            <span className="value">
              Custom Three.js WebGL canvas rendering procedural Manhattan-style circuit traces, glowing signal pulses, mouse parallax tilt, and interactive choice selection highlights.
            </span>
          </div>

          <div className="field-row">
            <span className="label">Dialogue Engine & Memory</span>
            <span className="value">
              State-machine tree with O(1) node resolution, localStorage visit memory tracking, dynamic URL path state encoding, and step rewinding.
            </span>
          </div>

          <div className="panel-actions" style={{ marginTop: '32px' }}>
            {SOCIAL_LINKS.github && (
              <a className="btn btn-primary" href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer">
                View GitHub Source →
              </a>
            )}
            <Link className="btn btn-ghost" href="/projects">
              Browse Projects
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
