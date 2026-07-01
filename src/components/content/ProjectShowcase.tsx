import React from 'react';
import type { ContentFilter } from '../../lib/dialogue/types';
import type { Project } from '../../lib/types';
import { ProjectCard } from './ProjectCard';
import styles from './ProjectShowcase.module.css';

interface ProjectShowcaseProps {
  filter: ContentFilter;
  projects: Project[];
}

export function ProjectShowcase({ filter, projects: allProjects }: ProjectShowcaseProps) {
  let projects = allProjects;

  // Apply filters
  if (filter.tags && filter.tags.length > 0) {
    projects = projects.filter(p => 
      p.tags?.some(tag => filter.tags?.includes(tag))
    );
  }

  if (filter.featured !== undefined) {
    projects = projects.filter(p => p.featured === filter.featured);
  }

  if (filter.limit && filter.limit > 0) {
    projects = projects.slice(0, filter.limit);
  }

  return (
    <div className={styles.showcase}>
      {projects.map((project) => (
        <div 
          key={project.slug} 
          className={project.featured ? styles.featuredItem : ''}
        >
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
}
