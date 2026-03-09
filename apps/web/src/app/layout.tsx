/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Monorepo Fullstack Starter — Web (Landing Page)
 *
 * @author  Dzikri Syairozi <dzikrisyairozi@gmail.com>
 * @see     https://github.com/dzikrisyairozi/monorepo-fullstack-starter
 * @license MIT
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { Metadata } from 'next';
import { Outfit, Instrument_Serif } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: 'italic',
  subsets: ['latin'],
  variable: '--font-instrument',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://web-starter.dzikrisyairozi.com'),
  title: {
    default: 'Premium Landing Page',
    template: '%s | Premium Landing Page',
  },
  description:
    'A stunning 3D Next.js landing page built with modern web technologies.',
  authors: [
    { name: 'Dzikri Syairozi', url: 'https://github.com/dzikrisyairozi' },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Premium Landing Page',
    title: 'Premium Landing Page',
    description:
      'A stunning 3D Next.js landing page built with modern web technologies.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premium Landing Page',
    description:
      'A stunning 3D Next.js landing page built with modern web technologies.',
    creator: '@dzikrisyairozi',
  },
  icons: {
    icon: '/favicon/favicon.ico',
    apple: '/favicon/apple-icon-180x180.png',
  },
  manifest: '/favicon/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} ${instrumentSerif.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
