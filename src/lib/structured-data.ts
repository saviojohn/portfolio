import { SITE_NAME, SITE_URL, SOCIAL_LINKS } from './config';
import type { BlogPost, Project } from './types';

const baseUrl = SITE_URL.replace('[REPLACE: ', '').replace(']', '');
const cleanName = SITE_NAME.replace('[REPLACE: ', '').replace(']', '');

export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: cleanName,
    url: baseUrl,
    jobTitle: 'Software Engineer', // Based on the About page bio
    sameAs: Object.values(SOCIAL_LINKS),
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: cleanName,
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/?path={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateArticleSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: new Date(post.publishedDate).toISOString(),
    author: {
      '@type': 'Person',
      name: cleanName,
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: cleanName,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/icon.png`, // Generic default icon
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug}`,
    },
  };
}

export function generateProjectSchema(project: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    author: {
      '@type': 'Person',
      name: cleanName,
      url: baseUrl,
    },
    datePublished: project.publishedDate ? new Date(project.publishedDate).toISOString() : undefined,
    url: `${baseUrl}/projects/${project.slug}`,
    keywords: project.tags?.join(', '),
  };
}
