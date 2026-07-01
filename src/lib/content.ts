import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Project, BlogPost, Experiment, Experience } from './types';

const contentDirectory = path.join(process.cwd(), 'src/content');

function getFiles(dir: string): string[] {
  try {
    return fs.readdirSync(dir).filter(file => file.endsWith('.mdx'));
  } catch {
    // Return empty array if directory doesn't exist
    return [];
  }
}

export function getAllProjects(): Project[] {
  const directory = path.join(contentDirectory, 'projects');
  const filenames = getFiles(directory);

  const projects: Project[] = filenames.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    const fullPath = path.join(directory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    const pubDate = data.publishedDate instanceof Date 
      ? data.publishedDate.toISOString() 
      : (data.publishedDate ? String(data.publishedDate) : new Date().toISOString());

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      tags: data.tags || [],
      tech: data.tech || [],
      problem: data.problem || '',
      solution: data.solution || '',
      architecture: data.architecture || '',
      results: data.results || '',
      metrics: data.metrics || '',
      featured: data.featured || false,
      publishedDate: pubDate,
    };
  });

  // Sort: featured first, then date descending
  return projects.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
  });
}

export function getAllBlogPosts(): BlogPost[] {
  const directory = path.join(contentDirectory, 'blog');
  const filenames = getFiles(directory);

  const posts: BlogPost[] = filenames.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    const fullPath = path.join(directory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    const pubDate = data.publishedDate instanceof Date 
      ? data.publishedDate.toISOString() 
      : (data.publishedDate ? String(data.publishedDate) : new Date().toISOString());

    return {
      slug,
      title: data.title || '',
      excerpt: data.excerpt || '',
      tags: data.tags || [],
      publishedDate: pubDate,
    };
  });

  return posts.sort((a, b) => {
    return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
  });
}

export function getAllExperiments(): Experiment[] {
  const directory = path.join(contentDirectory, 'experiments');
  const filenames = getFiles(directory);

  const experiments: Experiment[] = filenames.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    const fullPath = path.join(directory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    const pubDate = data.publishedDate instanceof Date 
      ? data.publishedDate.toISOString() 
      : (data.publishedDate ? String(data.publishedDate) : new Date().toISOString());

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      tags: data.tags || [],
      tech: data.tech || [],
      publishedDate: pubDate,
    };
  });

  return experiments.sort((a, b) => {
    return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
  });
}

export function getAllExperience(): Experience[] {
  const directory = path.join(contentDirectory, 'experience');
  const filenames = getFiles(directory);

  const experience: Experience[] = filenames.map((filename) => {
    const id = filename.replace(/\.mdx$/, '');
    const fullPath = path.join(directory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    const sDate = data.startDate instanceof Date 
      ? data.startDate.toISOString() 
      : (data.startDate ? String(data.startDate) : new Date().toISOString());

    const eDate = data.endDate instanceof Date 
      ? data.endDate.toISOString() 
      : (data.endDate ? String(data.endDate) : '');

    return {
      id,
      company: data.company || '',
      role: data.role || '',
      startDate: sDate,
      endDate: eDate,
      highlights: data.highlights || [],
    };
  });

  // Sort experience by start date descending (newest first)
  return experience.sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });
}

// Helpers for extracting unique tags
export function getUniqueProjectTags(): string[] {
  const projects = getAllProjects();
  const tags = new Set<string>();
  projects.forEach((p) => p.tags?.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}

export function getUniqueBlogTags(): string[] {
  const posts = getAllBlogPosts();
  const tags = new Set<string>();
  posts.forEach((p) => p.tags?.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}
