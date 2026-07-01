import { describe, it, expect } from 'vitest';
import { 
  generatePersonSchema, 
  generateWebSiteSchema, 
  generateArticleSchema,
  generateProjectSchema
} from '../../src/lib/structured-data';

describe('Structured Data', () => {
  it('generatePersonSchema() includes required schema.org fields', () => {
    const schema = generatePersonSchema();
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('Person');
    expect(schema.name).toBeTruthy();
    expect(schema.url).toBeTruthy();
  });

  it('generateWebSiteSchema() includes correct @type', () => {
    const schema = generateWebSiteSchema();
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('WebSite');
  });

  it('generateArticleSchema() maps post fields correctly', () => {
    const post = {
      slug: 'test-post',
      title: 'Test Post',
      publishedDate: '2023-01-01',
      excerpt: 'Test Excerpt',
      content: 'Content',
    };
    const schema = generateArticleSchema(post as any);
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('Article');
    expect(schema.headline).toBe('Test Post');
    expect(schema.datePublished).toContain('2023-01-01');
  });

  it('generateProjectSchema() includes correct fields', () => {
    const project = {
      slug: 'test-proj',
      title: 'Test Proj',
      description: 'Test Desc',
    };
    const schema = generateProjectSchema(project as any);
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('CreativeWork');
    expect(schema.name).toBe('Test Proj');
  });
});
