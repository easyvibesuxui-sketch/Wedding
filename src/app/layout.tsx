import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Great_Vibes, Noto_Serif_Georgian } from 'next/font/google';

import { coupleNames, siteConfig } from '@/lib/site-config';
import './globals.css';

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-serif',
  display: 'swap',
});

// Georgian glyphs are missing from Cormorant, so this face sits behind it in
// the stack and the browser picks it per-glyph.
const georgian = Noto_Serif_Georgian({
  subsets: ['georgian'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-georgian',
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
  description: `${siteConfig.copy.invitationBody} ${siteConfig.venue.name} — ${siteConfig.dateLong}.`,
};

export const viewport: Viewport = {
  themeColor: '#f8ece0',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ka" className={`${serif.variable} ${georgian.variable} ${script.variable}`}>
      <body className="bg-cream-200 font-serif text-ink-600 antialiased">{children}</body>
    </html>
  );
}
