import { cookies, headers } from 'next/headers';

import { Invitation } from '@/components/invitation/Invitation';
import { LANG_COOKIE, resolveLang } from '@/lib/i18n';
import { siteConfig } from '@/lib/site-config';
import { isTemplateId } from '@/templates/types';

// The language depends on the request, so this page is rendered per request.
export const dynamic = 'force-dynamic';

export default async function InvitationPage({
  searchParams,
}: {
  searchParams: Promise<{ t?: string }>;
}) {
  const [cookieStore, headerList, { t }] = await Promise.all([cookies(), headers(), searchParams]);
  const lang = resolveLang(cookieStore.get(LANG_COOKIE)?.value, headerList.get('accept-language'));
  // `?t=<id>` previews another design without changing the configured one.
  const previewing = isTemplateId(t);

  return (
    <Invitation
      initialLang={lang}
      templateId={previewing ? t : siteConfig.template}
      previewing={previewing}
    />
  );
}
