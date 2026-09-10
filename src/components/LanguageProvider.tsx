'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { LANG_COOKIE, type Lang } from '@/lib/i18n';
import { translations, type Dictionary } from '@/lib/translations';

type LanguageValue = {
  lang: Lang;
  t: Dictionary;
  setLang: (next: Lang) => void;
};

const LanguageContext = createContext<LanguageValue | null>(null);

/**
 * Holds the language the page is being read in. The server picks the initial
 * one from the guest's browser, so the first paint is already correct; picking
 * another switches instantly and is remembered in a cookie for the next visit.
 */
export function LanguageProvider({
  initialLang,
  children,
}: {
  initialLang: Lang;
  children: React.ReactNode;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    document.documentElement.lang = next;
    // A year is plenty: the invitation has one date.
    document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
  }, []);

  const value = useMemo(() => ({ lang, t: translations[lang], setLang }), [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageValue {
  const value = useContext(LanguageContext);
  if (!value) throw new Error('useLanguage must be used inside a LanguageProvider');
  return value;
}

/** Shorthand for the common case of only needing the words. */
export function useT(): Dictionary {
  return useLanguage().t;
}
