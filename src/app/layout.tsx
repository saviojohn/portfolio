import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const fontDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '700', '900'],
});

const fontUi = DM_Sans({
  subsets: ['latin'],
  variable: '--font-ui',
  display: 'swap',
  weight: ['300', '400', '500', '700'],
});

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: {
    default: 'The Dialogue | Portfolio',
    template: '%s | The Dialogue',
  },
  description: 'An interactive portfolio exploring frontend engineering, design systems, and creative technology.',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'The Dialogue | Portfolio',
    description: 'An interactive portfolio exploring frontend engineering, design systems, and creative technology.',
    url: siteUrl,
    siteName: 'The Dialogue',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Dialogue | Portfolio',
    description: 'An interactive portfolio exploring frontend engineering, design systems, and creative technology.',
  },
};

import { SkipLink } from '../components/a11y/SkipLink';
import { DialogueProvider } from '../context/DialogueContext';
import { generatePersonSchema, generateWebSiteSchema } from '../lib/structured-data';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = generatePersonSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <html 
      lang="en" 
      data-theme="dark"
      className={`${fontDisplay.variable} ${fontUi.variable} ${fontMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="antialiased">
        <SkipLink />
        <DialogueProvider>
          <main id="main-content">
            {children}
          </main>
        </DialogueProvider>
      </body>
    </html>
  );
}
