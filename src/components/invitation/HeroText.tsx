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
 * The words every hero carries — eyebrow, date and the couple's names —
 * rising in once the opening hands over.
 *
 * Everything is sized from the hero's height (`--H`, set by the hero), not
 * from the window's width: a phone's browser bars take a fifth of the screen
 * away, and lettering sized for the full screen then ran down into the
 * painting. Sized this way the block always ends about two fifths down.
 */
export function HeroText({
  start,
  className = '',
  nameClassName = '',
}: {
  start: boolean;
  className?: string;
  nameClassName?: string;
}) {
  const t = useT();
  const { couple, dateLabel } = siteConfig;

  return (
    <motion.div
      className={`relative z-10 text-center ${className}`}
      // Clear of the language switcher on a short screen, airier on a tall one.
      style={{ paddingTop: 'max(4.5rem, calc(var(--H, 100svh) * 0.085))' }}
      initial="hidden"
      animate={start ? 'show' : 'hidden'}
    >
      <motion.p custom={0} variants={rise} className="text-sm tracking-[0.35em] text-t-accent">
        {t.heroEyebrow}
      </motion.p>
      <motion.p custom={1} variants={rise} className="mt-1 text-xl tracking-[0.3em] text-t-ink-soft">
        {dateLabel}
      </motion.p>

      <motion.h1
        custom={2}
        variants={rise}
        className={`font-display text-t-accent ${nameClassName}`}
        style={{
          marginTop: 'calc(var(--H, 100svh) * 0.03)',
          fontSize: 'clamp(2.5rem, calc(var(--H, 100svh) * 0.068), 4.25rem)',
        }}
      >
        <span className="block leading-[1.05]">{couple.partnerOne}</span>
        <span className="my-[0.1em] block text-[0.6em] leading-[1.2] opacity-80">&amp;</span>
        <span className="block leading-[1.05]">{couple.partnerTwo}</span>
      </motion.h1>
    </motion.div>
  );
}
