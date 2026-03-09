/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Monorepo Fullstack Starter — Documentation Site
 *
 * @author  Dzikri Syairozi <dzikrisyairozi@gmail.com>
 * @see     https://github.com/dzikrisyairozi/monorepo-fullstack-starter
 * @license MIT
 * ─────────────────────────────────────────────────────────────────────────────
 */

import './globals.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { Outfit } from 'next/font/google';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://docs-starter.dzikrisyairozi.com'),
  title: {
    template: '%s | Monorepo Starter Docs',
    default: 'Monorepo Starter Docs',
  },
  description:
    'Documentation for the Monorepo Full-Stack Starter — a modern, production-ready monorepo with Next.js, Rust API, and shadcn/ui.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/docs',
    siteName: 'Monorepo Starter Docs',
    title: 'Monorepo Starter Docs',
    description: 'Documentation for the Monorepo Full-Stack Starter.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Monorepo Starter Docs',
    description: 'Documentation for the Monorepo Full-Stack Starter.',
    creator: '@dzikrisyairozi',
  },
  icons: {
    icon: '/favicon/favicon.ico',
    apple: '/favicon/apple-icon-180x180.png',
  },
  manifest: '/favicon/manifest.json',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={outfit.variable} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
