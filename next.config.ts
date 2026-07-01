import type { NextConfig } from 'next';
import withBundleAnalyzerInit from '@next/bundle-analyzer';

const withBundleAnalyzer = withBundleAnalyzerInit({
  enabled: process.env.ANALYZE === 'true',
});

/** Security headers applied to all responses */
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // 'unsafe-eval' required for Three.js GLSL shader compilation; 'unsafe-inline' for Next.js hydration and dev tools
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      // 'unsafe-inline' required for Next.js App Router inline styles; Google Fonts CSS
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      'font-src \'self\' https://fonts.gstatic.com',
      // blob: required for Three.js canvas operations
      "img-src 'self' data: blob:",
      "connect-src 'self'",
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
    ].join('; '),
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
];

const nextConfig: NextConfig = {
  // Enable MDX support
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],

  // Security headers on all routes
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        // No caching for API routes
        source: '/api/(.*)',
        headers: [{ key: 'Cache-Control', value: 'no-store' }],
      },
      {
        // Immutable cache for hashed static assets
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 480, 768, 1024, 1440, 2560],
    imageSizes: [16, 32, 64, 128, 256],
  },

  // Strict type checking in builds
  typescript: {
    ignoreBuildErrors: false,
  },

  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default withBundleAnalyzer(nextConfig);
