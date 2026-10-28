import type { Metadata, Viewport } from 'next';
import { cookies, headers } from 'next/headers';

import { bodyFont, cyrillicFont, scriptFont } from '@/lib/fonts';
import { LANG_COOKIE, resolveLang } from '@/lib/i18n';
import { coupleNames, siteConfig } from '@/lib/site-config';
import { translations } from '@/lib/translations';
import './globals.css';

async function currentLang() {
  const [cookieStore, headerList] = await Promise.all([cookies(), headers()]);
  return resolveLang(cookieStore.get(LANG_COOKIE)?.value, headerList.get('accept-language'));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = translations[await currentLang()];

  return {
    title: `${coupleNames} — ${siteConfig.dateLabel}`,
    description: `${t.invitationBody[0]} ${t.venueName} — ${t.dateLong}.`,
  };
}

export const viewport: Viewport = {
  themeColor: '#f8ece0',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={await currentLang()}
      className={`${bodyFont.variable} ${cyrillicFont.variable} ${scriptFont.variable}`}
    >
      <body className="bg-cream-200 font-sans text-ink-600 antialiased">{children}</body>
    </html>
  );
}
