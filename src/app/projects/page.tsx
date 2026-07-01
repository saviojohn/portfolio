import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllProjects } from '../../lib/content';
import { ProjectCard } from '../../components/content/ProjectCard';
import { SITE_NAME } from '../../lib/config';

export const metadata: Metadata = {
  title: `Projects | ${SITE_NAME.replace('[REPLACE: ', '').replace(']', '')}`,
  description: 'A traditional index of all portfolio projects and case studies.',
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'var(--space-8) var(--space-6)' }}>
      <header style={{ marginBottom: 'var(--space-12)' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-4)' }}>
          Selected Works
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-6)' }}>
          A traditional, chronological index of case studies.
        </p>
        <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-bg-surface-2)', borderRadius: 'var(--radius-md)', display: 'inline-block' }}>
          <Link href="/" style={{ color: 'var(--color-accent-base)', fontWeight: 'var(--weight-medium)', textDecoration: 'none' }}>
            Want the interactive version? Start the conversation →
          </Link>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
