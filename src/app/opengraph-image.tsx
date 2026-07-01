import { ImageResponse } from 'next/og';
import { SITE_NAME } from '../lib/config';

// Image metadata
export const alt = 'Portfolio Open Graph Image';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  const name = SITE_NAME.replace('[REPLACE: ', '').replace(']', '');

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
              fontSize: 80,
              color: '#ffffff',
              fontFamily: '"Playfair Display", serif',
              margin: 0,
              marginBottom: 40,
              fontWeight: 600,
              textAlign: 'center',
            }}
          >
            {name}
          </h1>
          <p
            style={{
              fontSize: 40,
              color: '#a855f7',
              fontFamily: '"Playfair Display", serif',
              margin: 0,
              textAlign: 'center',
            }}
          >
            This isn&apos;t a typical portfolio. It&apos;s a conversation.
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
