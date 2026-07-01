import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getAllBlogPosts } from '../../lib/content';
import { SITE_NAME } from '../../lib/config';
import { Badge } from '../../components/ui/Badge';

export const metadata: Metadata = {
  title: `Blog | ${SITE_NAME.replace('[REPLACE: ', '').replace(']', '')}`,
  description: 'Articles, thoughts, and technical writing.',
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  if (posts.length === 0) {
    redirect('/');
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: 'var(--space-12) var(--space-6)', minHeight: '100vh' }}>
      <header style={{ marginBottom: 'var(--space-12)' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-4)' }}>
          Writing
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-lg)' }}>
          Thoughts on engineering, design, and building things that matter.
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        {posts.map((post) => (
          <Link 
            key={post.slug} 
            href={`/blog/${post.slug}`}
            style={{ 
              display: 'block', 
              padding: 'var(--space-6)', 
              backgroundColor: 'var(--color-bg-surface-1)', 
              border: '1px solid var(--color-border-subtle)', 
              borderRadius: 'var(--radius-md)', 
              textDecoration: 'none',
              transition: 'all var(--duration-fast) var(--ease-out-expo)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--space-2)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', color: 'var(--color-text-primary)', margin: 0 }}>
                {post.title}
              </h2>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)' }}>
                {new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-4)' }}>
              {post.excerpt}
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                {post.tags?.map((tag) => (
                  <Badge key={tag} label={tag} color="neutral" />
                ))}
              </div>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)' }}>
                5 min read
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
