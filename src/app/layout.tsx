import type { Metadata, Viewport } from 'next';

import { bodyFont, scriptFont } from '@/lib/fonts';
import { coupleNames, siteConfig } from '@/lib/site-config';
import './globals.css';

export const metadata: Metadata = {
  title: `${coupleNames} — ${siteConfig.dateLabel}`,
  description: `${siteConfig.copy.invitationBody} ${siteConfig.venue.name} — ${siteConfig.dateLong}.`,
};

export const viewport: Viewport = {
  themeColor: '#f8ece0',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ka" className={`${bodyFont.variable} ${scriptFont.variable}`}>
      <body className="bg-cream-200 font-sans text-ink-600 antialiased">{children}</body>
    </html>
  );
}
