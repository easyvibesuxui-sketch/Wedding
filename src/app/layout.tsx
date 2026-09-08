import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Great_Vibes } from 'next/font/google';

import { coupleNames, siteConfig } from '@/lib/site-config';
import './globals.css';

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-serif',
  display: 'swap',
});

const script = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${coupleNames} — ${siteConfig.dateLabel}`,
  description: `${siteConfig.invitationBody} ${siteConfig.venue.name}, ${siteConfig.dateLong}.`,
};

export const viewport: Viewport = {
  themeColor: '#f8ece0',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${script.variable}`}>
      <body className="bg-cream-200 font-serif text-ink-600 antialiased">{children}</body>
    </html>
  );
}
