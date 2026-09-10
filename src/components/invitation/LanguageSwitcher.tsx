'use client';

import { motion } from 'framer-motion';

import { useLanguage } from '@/components/LanguageProvider';
import { LANGS, LANG_LABELS } from '@/lib/i18n';

/**
 * Sits above the invitation once the envelope is open. It is deliberately
 * quiet — most guests will already be reading their own language.
 */
export function LanguageSwitcher({ visible }: { visible: boolean }) {
  const { lang, setLang } = useLanguage();

  return (
    <motion.div
      className="fixed right-4 top-4 z-40 flex gap-1 rounded-full border border-gold-300/60 bg-cream-100/85 p-1 backdrop-blur-sm"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -8 }}
      transition={{ duration: 0.6, delay: visible ? 0.8 : 0 }}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
      aria-hidden={!visible}
    >
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-current={code === lang ? 'true' : undefined}
          className={`rounded-full px-3 py-1 text-[0.7rem] tracking-[0.12em] transition-colors ${
            code === lang
              ? 'bg-wine-500 text-cream-100'
              : 'text-ink-500 hover:bg-gold-300/25 hover:text-ink-700'
          }`}
        >
          {LANG_LABELS[code]}
        </button>
      ))}
    </motion.div>
  );
}
