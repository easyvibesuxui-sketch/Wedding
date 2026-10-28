'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { useLanguage } from '@/components/LanguageProvider';
import { LANGS, LANG_LABELS } from '@/lib/i18n';

/**
 * Sits above the invitation once the envelope is open. It is deliberately
 * quiet — most guests will already be reading their own language — and it
 * steps aside while the guest scrolls down, so it never sits over a line they
 * are reading; scrolling back up, or returning to the top, brings it back.
 */
export function LanguageSwitcher({ visible }: { visible: boolean }) {
  const { lang, setLang } = useLanguage();
  const tucked = useTuckedOnScroll();
  const shown = visible && !tucked;

  return (
    <motion.div
      className="fixed right-4 top-4 z-40 flex gap-1 rounded-full border border-t-line/60 bg-t-bg/95 p-1 shadow-sm backdrop-blur-sm"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : -8 }}
      transition={{ duration: tucked ? 0.25 : 0.6, delay: visible && !tucked ? 0.2 : 0 }}
      style={{ pointerEvents: shown ? 'auto' : 'none' }}
      aria-hidden={!shown}
    >
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-current={code === lang ? 'true' : undefined}
          className={`rounded-full px-3 py-1 text-[0.7rem] tracking-[0.12em] transition-colors ${
            code === lang
              ? 'bg-t-cta text-t-on-cta'
              : 'text-t-ink-soft hover:bg-t-accent/15 hover:text-t-ink'
          }`}
        >
          {LANG_LABELS[code]}
        </button>
      ))}
    </motion.div>
  );
}

/** True while the page is being scrolled down past the first screen. */
function useTuckedOnScroll(): boolean {
  const [tucked, setTucked] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 6) return;
      setTucked(y > last && y > window.innerHeight * 0.6);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return tucked;
}
