export const LANGS = ['ka', 'en', 'ru'] as const;
export type Lang = (typeof LANGS)[number];

/** Short labels for the switcher, in each language's own script. */
export const LANG_LABELS: Record<Lang, string> = {
  ka: 'ქარ',
  en: 'ENG',
  ru: 'РУС',
};

/**
 * Guests whose phone is set to Georgian or Russian get the invitation in that
 * language; everyone else gets English, which is the likeliest second language
 * for a guest travelling in. The switcher is always one tap away.
 */
export const FALLBACK_LANG: Lang = 'en';

/** Remembers a language the guest chose by hand, so it survives a reload. */
export const LANG_COOKIE = 'invitation-lang';

export function isLang(value: string | undefined | null): value is Lang {
  return LANGS.includes(value as Lang);
}

/**
 * Picks a language from an `Accept-Language` header, honouring the quality
 * values the browser sends rather than just taking the first entry.
 */
export function langFromAcceptLanguage(header: string | null | undefined): Lang {
  if (!header) return FALLBACK_LANG;

  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';');
      const q = params.find((p) => p.trim().startsWith('q='));
      return { tag: tag.trim().toLowerCase(), q: q ? Number(q.split('=')[1]) : 1 };
    })
    .filter((entry) => entry.tag && !Number.isNaN(entry.q))
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const base = tag.split('-')[0];
    if (isLang(base)) return base;
  }

  return FALLBACK_LANG;
}

/** A hand-picked language always wins over the browser's preference. */
export function resolveLang(cookieValue: string | undefined, acceptLanguage: string | null): Lang {
  return isLang(cookieValue) ? cookieValue : langFromAcceptLanguage(acceptLanguage);
}
