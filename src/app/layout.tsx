import type { Metadata } from 'next';

import { coupleNames, siteConfig } from '@/lib/site-config';
import './globals.css';

export const metadata: Metadata = {
  title: `${coupleNames} — ${siteConfig.dateLabel}`,
  description: `${siteConfig.invitationLine} at ${siteConfig.venue.name}, ${siteConfig.dateLabel}.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
