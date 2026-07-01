import type { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/config';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_URL.replace('[REPLACE: ', '').replace(']', '');

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
