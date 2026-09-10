import type { Metadata, Viewport } from 'next';
import { cookies, headers } from 'next/headers';

import { bodyFont, cyrillicFont, scriptFont } from '@/lib/fonts';
import { LANG_COOKIE, resolveLang } from '@/lib/i18n';
import { coupleNames, siteConfig } from '@/lib/site-config';
import { translations } from '@/lib/translations';
import './globals.css';

function currentLang() {
  return resolveLang(cookies().get(LANG_COOKIE)?.value, headers().get('accept-language'));
}

export function generateMetadata(): Metadata {
  const t = translations[currentLang()];

  return {
    title: `${coupleNames} — ${siteConfig.dateLabel}`,
    description: `${t.invitationBody[0]} ${t.venueName} — ${t.dateLong}.`,
  };
}

export const viewport: Viewport = {
  themeColor: '#f8ece0',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={currentLang()}
      className={`${bodyFont.variable} ${cyrillicFont.variable} ${scriptFont.variable}`}
    >
      <body className="bg-cream-200 font-sans text-ink-600 antialiased">{children}</body>
    </html>
  );
}
