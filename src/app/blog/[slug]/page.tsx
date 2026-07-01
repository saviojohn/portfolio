import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllBlogPosts } from '../../../lib/content';
import { SITE_NAME } from '../../../lib/config';
import { Badge } from '../../../components/ui/Badge';
import fs from 'fs';
import path from 'path';
import { generateArticleSchema } from '../../../lib/structured-data';

// If @next/mdx is configured, dynamic import works. Otherwise we can just read the file and use a basic renderer.
// The prompt specifies to use @next/mdx if installed.

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getAllBlogPosts().find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | ${SITE_NAME.replace('[REPLACE: ', '').replace(']', '')}`,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedDate,
    }
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getAllBlogPosts().find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Fallback for reading time since we don't have the raw content readily parsed in getAllBlogPosts
  const rawPath = path.join(process.cwd(), 'src/content/blog', `${slug}.mdx`);
  let rawContent = '';
  let readingTime = '5 min read';
  try {
    rawContent = fs.readFileSync(rawPath, 'utf8');
    const words = rawContent.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    readingTime = `${minutes} min read`;
  } catch {
    // Ignore error
  }

  // We just render the raw content safely, as dynamic import of MDX with frontmatter fails without remark-frontmatter.
  const PostContent = () => (
    <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'var(--font-ui)', color: 'var(--color-text-primary)' }}>
      {rawContent.replace(/---[\s\S]*?---/, '').trim()}
    </div>
  );

  const schema = generateArticleSchema(post);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-base)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <header style={{ padding: 'var(--space-6)', borderBottom: '1px solid var(--color-border-subtle)', maxWidth: '800px', margin: '0 auto' }}>
        <Link href="/blog" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
          ← Back to Writing
        </Link>
      </header>

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: 'var(--space-12) var(--space-6)' }}>
        <header style={{ marginBottom: 'var(--space-12)' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-5xl)', marginBottom: 'var(--space-6)', color: 'var(--color-text-primary)' }}>
            {post.title}
          </h1>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: 'var(--space-6)' }}>
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              {post.tags?.map((tag) => (
                <Badge key={tag} label={tag} color="neutral" />
              ))}
            </div>
            
            <div style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-sm)' }}>
              {new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • {readingTime}
            </div>
          </div>
        </header>

        <article style={{ lineHeight: 'var(--leading-loose)', color: 'var(--color-text-secondary)', fontSize: 'var(--text-lg)' }}>
          <PostContent />
        </article>
      </main>
    </div>
  );
}
