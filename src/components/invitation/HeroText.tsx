'use client';

import { motion } from 'framer-motion';

import { useT } from '@/components/LanguageProvider';
import { siteConfig } from '@/lib/site-config';

const rise = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, delay: 0.45 + i * 0.2, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

/**
 * The words every hero carries — eyebrow, date, the couple's names and the
 * prompt to scroll — rising in once the opening hands over. The template
 * chooses the setting: names stacked in a script, or on one line in capitals.
 */
export function HeroText({
  start,
  names = 'stacked',
  cue = true,
  className = '',
  nameClassName = '',
}: {
  start: boolean;
  names?: 'stacked' | 'line';
  /** The prompt to scroll. A painted hero leaves it out: it would sit on the painting. */
  cue?: boolean;
  className?: string;
  nameClassName?: string;
}) {
  const t = useT();
  const { couple, dateLabel } = siteConfig;

  return (
    <motion.div className={`relative z-10 text-center ${className}`} initial="hidden" animate={start ? 'show' : 'hidden'}>
      <motion.p custom={0} variants={rise} className="text-sm tracking-[0.35em] text-t-accent sm:text-base">
        {t.heroEyebrow}
      </motion.p>
      <motion.p custom={1} variants={rise} className="mt-1 text-xl tracking-[0.3em] text-t-ink-soft sm:text-2xl">
        {dateLabel}
      </motion.p>

      <motion.h1 custom={2} variants={rise} className={`mt-8 font-display text-t-accent ${nameClassName}`}>
        {names === 'stacked' ? (
          <>
            <span className="block text-6xl leading-[1.05] sm:text-7xl">{couple.partnerOne}</span>
            <span className="my-2 block text-4xl opacity-80 sm:text-5xl">&amp;</span>
            <span className="block text-6xl leading-[1.05] sm:text-7xl">{couple.partnerTwo}</span>
          </>
        ) : (
          <span className="block text-4xl leading-tight tracking-[0.12em] sm:text-5xl">
            {couple.partnerOne} <span className="opacity-70">&amp;</span> {couple.partnerTwo}
          </span>
        )}
      </motion.h1>

      {cue ? (
        <motion.div custom={3} variants={rise} className="mt-12">
          <a
            href="#blessing"
            className="inline-flex flex-col items-center gap-1 text-t-accent transition-colors hover:text-t-ink"
          >
            <span className="text-xs tracking-[0.28em]">{t.scrollDown}</span>
            <motion.svg
              width="26"
              height="14"
              viewBox="0 0 26 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            >
              <path d="M2 2l11 10L24 2" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </a>
        </motion.div>
      ) : null}
    </motion.div>
  );
}
