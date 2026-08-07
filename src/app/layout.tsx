import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SkipLink } from '../components/a11y/SkipLink';
import CircuitBackground from '../components/three/CircuitBackground';
import { DialogueProvider } from '../context/DialogueContext';
import { generatePersonSchema, generateWebSiteSchema } from '../lib/structured-data';

const fontDisplay = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['500', '600', '700'],
});

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600'],
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
    default: 'Savio John | Full-Stack & Mobile Engineer',
    template: '%s | Savio John',
  },
  description: 'Full-Stack & Mobile Engineer portfolio featuring interactive 3D particle network and system architecture showcases.',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Savio John | Full-Stack & Mobile Engineer',
    description: 'Full-Stack & Mobile Engineer portfolio featuring interactive 3D particle network and system architecture showcases.',
    url: siteUrl,
    siteName: 'Savio John Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Savio John | Full-Stack & Mobile Engineer',
    description: 'Full-Stack & Mobile Engineer portfolio featuring interactive 3D particle network and system architecture showcases.',
  },
};

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
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}
      suppressHydrationWarning
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
      <body className="antialiased" suppressHydrationWarning>
        <SkipLink />
        <CircuitBackground />
        <div className="vignette" />
        <DialogueProvider>
          {children}
        </DialogueProvider>
      </body>
    </html>
  );
}
