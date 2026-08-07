import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllProjects } from '../../lib/content';
import { SITE_NAME } from '../../lib/config';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';

export const metadata: Metadata = {
  title: `Projects | ${SITE_NAME}`,
  description: 'Selected projects and technical case studies by Savio John.',
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <>
      <Header />
      <main>
        <div className="panel" data-accent="backend">
          <div className="panel-eyebrow">02 · projects</div>
          <h2>Selected Works & Case Studies</h2>
          <p className="panel-lede">
            Spanning cross-platform mobile apps, real-time AI support platforms, retail admin panels, and Python backend APIs.
          </p>

          <div className="card-grid">
            {projects.map((project) => (
              <div key={project.slug} className="info-card">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tags">
                  {project.tech?.slice(0, 3).map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <Link href={`/projects/${project.slug}`} className="card-link">
                  View case study →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
