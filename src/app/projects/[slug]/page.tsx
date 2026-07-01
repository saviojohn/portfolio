import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllProjects } from '../../../lib/content';
import { SITE_NAME } from '../../../lib/config';
import { generateProjectSchema } from '../../../lib/structured-data';

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getAllProjects().find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} | ${SITE_NAME.replace('[REPLACE: ', '').replace(']', '')}`,
    description: project.description,
  };
}

export default async function ProjectCaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const project = getAllProjects().find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const schema = generateProjectSchema(project);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--color-bg-base)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* Simple navigation header */}
      <header style={{ padding: 'var(--space-6)', borderBottom: '1px solid var(--color-border-subtle)' }}>
        <Link href="/projects" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
          ← Back to Projects
        </Link>
      </header>

      <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
        {/* Commentary sidebar (left 25%) */}
        <aside style={{ width: '25%', padding: 'var(--space-8)', borderRight: '1px solid var(--color-border-subtle)', backgroundColor: 'var(--color-bg-surface-1)' }}>
          <div style={{ position: 'sticky', top: 'var(--space-8)' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-4)' }}>
              Portfolio Commentary
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic', lineHeight: 'var(--leading-relaxed)' }}>
              &quot;Every project has a turning point. For {project.title}, it was balancing scale with simplicity.&quot;
            </p>
          </div>
        </aside>

        {/* Main Case Study */}
        <main style={{ flex: 1, padding: 'var(--space-12) var(--space-8)', maxWidth: '800px' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-5xl)', marginBottom: 'var(--space-4)' }}>
            {project.title}
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-8)' }}>
            {project.description}
          </p>

          <div style={{ width: '100%', height: '400px', backgroundColor: 'var(--color-bg-surface-3)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-12)' }} />

          {project.problem && (
            <section style={{ marginBottom: 'var(--space-8)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>The Problem</h3>
              <p style={{ color: 'var(--color-text-primary)', lineHeight: 'var(--leading-loose)' }}>{project.problem}</p>
            </section>
          )}

          {project.solution && (
            <section style={{ marginBottom: 'var(--space-8)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>The Solution</h3>
              <p style={{ color: 'var(--color-text-primary)', lineHeight: 'var(--leading-loose)' }}>{project.solution}</p>
            </section>
          )}

          {project.architecture && (
            <section style={{ marginBottom: 'var(--space-8)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>Architecture</h3>
              <p style={{ color: 'var(--color-text-primary)', lineHeight: 'var(--leading-loose)' }}>{project.architecture}</p>
            </section>
          )}

          {project.results && (
            <section style={{ marginBottom: 'var(--space-8)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>Results</h3>
              <p style={{ color: 'var(--color-text-primary)', lineHeight: 'var(--leading-loose)' }}>{project.results}</p>
            </section>
          )}

          {project.metrics && (
            <section style={{ marginBottom: 'var(--space-12)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>Key Metrics</h3>
              <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--color-bg-surface-2)', borderRadius: 'var(--radius-md)', color: 'var(--color-accent-base)', fontWeight: 'bold' }}>
                {project.metrics}
              </div>
            </section>
          )}

          {/* What's next choices */}
          <div style={{ marginTop: 'var(--space-16)', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--color-border-subtle)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-6)' }}>What&apos;s next?</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <Link href="/?path=ROOT.A.A_AFTER_PROJ" style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-bg-surface-2)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-md)', color: 'var(--color-text-primary)', textDecoration: 'none' }}>
                Discuss how I approach problems like this
              </Link>
              <Link href="/?path=ROOT.D.META" style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-bg-surface-2)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-md)', color: 'var(--color-text-primary)', textDecoration: 'none' }}>
                See how this portfolio was built
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
