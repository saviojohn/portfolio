import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllProjects } from '../../../lib/content';
import { SITE_NAME } from '../../../lib/config';
import { generateProjectSchema } from '../../../lib/structured-data';
import { Header } from '../../../components/layout/Header';
import { Footer } from '../../../components/layout/Footer';

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
    title: `${project.title} | ${SITE_NAME}`,
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Header />
      <main>
        <div className="panel" data-accent="backend">
          <Link href="/projects" className="back-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            back to projects
          </Link>

          <div className="panel-eyebrow">case study · {project.slug}</div>
          <h2>{project.title}</h2>
          <p className="panel-lede">{project.description}</p>

          <div className="info-card" style={{ marginBottom: '32px' }}>
            <div className="tags" style={{ marginBottom: '12px' }}>
              {project.tech?.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            {project.metrics && (
              <div className="field-row">
                <span className="label">Key Metrics</span>
                <span className="value">{project.metrics}</span>
              </div>
            )}
          </div>

          {project.problem && (
            <div className="field-row">
              <span className="label">The Challenge</span>
              <span className="value" style={{ lineHeight: '1.6' }}>{project.problem}</span>
            </div>
          )}

          {project.solution && (
            <div className="field-row">
              <span className="label">The Solution</span>
              <span className="value" style={{ lineHeight: '1.6' }}>{project.solution}</span>
            </div>
          )}

          {project.architecture && (
            <div className="field-row">
              <span className="label">System Architecture</span>
              <span className="value" style={{ lineHeight: '1.6' }}>{project.architecture}</span>
            </div>
          )}

          {project.results && (
            <div className="field-row">
              <span className="label">Results & Impact</span>
              <span className="value" style={{ lineHeight: '1.6' }}>{project.results}</span>
            </div>
          )}

          <div className="panel-actions" style={{ marginTop: '36px' }}>
            <Link className="btn btn-primary" href="/contact">
              Discuss a similar project →
            </Link>
            <Link className="btn btn-ghost" href="/projects">
              Back to all projects
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
