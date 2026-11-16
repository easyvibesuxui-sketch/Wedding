'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

import { useTuckedOnScroll } from '@/components/invitation/useTuckedOnScroll';
import { useT } from '@/components/LanguageProvider';
import { TEMPLATE_IDS, type TemplateId } from '@/templates/types';

/**
 * Shown only while a design is being previewed from the gallery: the way back
 * to it, and the neighbouring designs one tap away. Guests opening the real
 * invitation never see it. Like the language switcher, it steps aside while
 * the page is being read.
 */
export function TemplateBar({ current, visible }: { current: TemplateId; visible: boolean }) {
  const t = useT();
  const tucked = useTuckedOnScroll();
  const shown = visible && !tucked;
  const index = TEMPLATE_IDS.indexOf(current);
  const prev = TEMPLATE_IDS[(index - 1 + TEMPLATE_IDS.length) % TEMPLATE_IDS.length];
  const next = TEMPLATE_IDS[(index + 1) % TEMPLATE_IDS.length];

  const button =
    'flex h-8 w-8 items-center justify-center rounded-full text-t-ink transition-colors hover:bg-t-accent/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-t-accent';

  return (
    <motion.nav
      aria-label={t.galleryTitle}
      className="fixed bottom-4 left-4 z-40 flex items-center rounded-full border border-t-line/60 bg-t-bg/95 p-0.5 shadow-sm backdrop-blur-sm"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : 8 }}
      transition={{ duration: tucked ? 0.25 : 0.5, delay: shown ? 0.2 : 0 }}
      style={{ pointerEvents: shown ? 'auto' : 'none' }}
    >
      <Link href={`/?t=${prev}`} aria-label={t.galleryPrev} className={button}>
        <svg width="10" height="16" viewBox="0 0 10 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M8 2 2 8l6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
      <Link
        href="/templates"
        aria-label={`${t.templates[current].name} · ${t.galleryBack}`}
        className="max-w-[9rem] truncate rounded-full px-2 py-1.5 text-[0.7rem] tracking-[0.1em] text-t-ink transition-colors hover:bg-t-accent/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-t-accent"
      >
        {t.templates[current].name}
      </Link>
      <Link href={`/?t=${next}`} aria-label={t.galleryNext} className={button}>
        <svg width="10" height="16" viewBox="0 0 10 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="m2 2 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </motion.nav>
  );
}
