import type { Metadata } from 'next';
import { cookies, headers } from 'next/headers';

import { Gallery } from '@/components/gallery/Gallery';
import { LANG_COOKIE, resolveLang } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Invitation designs',
  robots: { index: false, follow: false },
};

// The language depends on the request, as on the invitation itself.
export const dynamic = 'force-dynamic';

export default async function TemplatesPage() {
  const [cookieStore, headerList] = await Promise.all([cookies(), headers()]);
  const lang = resolveLang(cookieStore.get(LANG_COOKIE)?.value, headerList.get('accept-language'));

  return <Gallery initialLang={lang} />;
}
