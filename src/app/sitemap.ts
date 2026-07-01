import type { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/config';
import { getAllProjects, getAllBlogPosts, getAllExperiments } from '../lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL.replace('[REPLACE: ', '').replace(']', '');

  const staticRoutes = ['', '/projects', '/blog', '/about', '/contact', '/meta'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const projectRoutes = getAllProjects().map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: project.publishedDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const blogRoutes = getAllBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.publishedDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Experiments don't currently have a dedicated route based on the prompt, 
  // but if they did, they'd look like this. I will include them per the prompt.
  const experimentRoutes = getAllExperiments().map((exp) => ({
    url: `${baseUrl}/experiments/${exp.slug}`,
    lastModified: exp.publishedDate,
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes, ...experimentRoutes];
}
