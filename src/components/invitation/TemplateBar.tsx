'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

import { useT } from '@/components/LanguageProvider';
import { TEMPLATE_IDS, type TemplateId } from '@/templates/types';

/**
 * Shown only while a design is being previewed from the gallery: the way back
 * to it, and the neighbouring designs one tap away. Guests opening the real
 * invitation never see it.
 */
export function TemplateBar({ current, visible }: { current: TemplateId; visible: boolean }) {
  const t = useT();
  const index = TEMPLATE_IDS.indexOf(current);
  const prev = TEMPLATE_IDS[(index - 1 + TEMPLATE_IDS.length) % TEMPLATE_IDS.length];
  const next = TEMPLATE_IDS[(index + 1) % TEMPLATE_IDS.length];

  const button =
    'flex h-10 w-10 items-center justify-center rounded-full text-t-ink transition-colors hover:bg-t-accent/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-t-accent';

  return (
    <motion.nav
      aria-label={t.galleryTitle}
      className="fixed bottom-6 left-4 z-40 flex items-center gap-1 rounded-full border border-t-line/60 bg-t-bg/95 p-1 shadow-sm backdrop-blur-sm"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 8 }}
      transition={{ duration: 0.5, delay: visible ? 0.6 : 0 }}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
    >
      <Link href={`/?t=${prev}`} aria-label={t.galleryPrev} className={button}>
        <svg width="10" height="16" viewBox="0 0 10 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M8 2 2 8l6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
      <Link
        href="/templates"
        className="max-w-[13rem] truncate rounded-full px-3 py-2 text-xs tracking-[0.12em] text-t-ink transition-colors hover:bg-t-accent/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-t-accent"
      >
        {t.templates[current].name} · {t.galleryBack}
      </Link>
      <Link href={`/?t=${next}`} aria-label={t.galleryNext} className={button}>
        <svg width="10" height="16" viewBox="0 0 10 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="m2 2 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </motion.nav>
  );
}
