import { ImageResponse } from 'next/og';
import { getAllBlogPosts } from '../../../lib/content';

export const alt = 'Blog Post Open Graph Image';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getAllBlogPosts().find((p) => p.slug === slug);

  if (!post) {
    return new Response('Not found', { status: 404 });
  }

  const formattedDate = new Date(post.publishedDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0e0e10',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #a855f7',
            padding: '80px',
            borderRadius: '24px',
            width: '100%',
            height: '100%',
          }}
        >
          <h1
            style={{
              fontSize: 64,
              color: '#ffffff',
              fontFamily: '"Playfair Display", serif',
              margin: 0,
              marginBottom: 40,
              fontWeight: 600,
              textAlign: 'center',
            }}
          >
            {post.title}
          </h1>
          <p
            style={{
              fontSize: 32,
              color: '#a855f7',
              fontFamily: '"Playfair Display", serif',
              margin: 0,
              textAlign: 'center',
            }}
          >
            {formattedDate}
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
