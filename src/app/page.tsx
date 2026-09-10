import { cookies, headers } from 'next/headers';

import { Invitation } from '@/components/invitation/Invitation';
import { LANG_COOKIE, resolveLang } from '@/lib/i18n';

// The language depends on the request, so this page is rendered per request.
export const dynamic = 'force-dynamic';

export default function InvitationPage() {
  const lang = resolveLang(
    cookies().get(LANG_COOKIE)?.value,
    headers().get('accept-language'),
  );

  return <Invitation initialLang={lang} />;
}
