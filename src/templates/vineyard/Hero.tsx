'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import { ArchScene } from '@/components/art/ArchScene';
import { useT } from '@/components/LanguageProvider';
import { siteConfig } from '@/lib/site-config';

/*
 * The hero starts while the film is still dissolving over it, so the first
 * line is held back until the footage has mostly cleared — the lettering then
 * surfaces out of the painting instead of racing the handover.
 */
const rise = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, delay: 0.6 + i * 0.22, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function VineyardHero({ start }: { start: boolean }) {
  const { couple, dateLabel, heroArt } = siteConfig;
  const t = useT();

  return (
    <section className="relative flex min-h-[var(--hero-h,100svh)] items-start justify-center overflow-hidden bg-t-bg-alt">
      {/* The painting settles as the film dissolves, so the cut has motion in it. */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.07 }}
        animate={{ scale: start ? 1 : 1.07 }}
        transition={{ duration: 2.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {heroArt ? (
          <Image
            src={heroArt}
            alt=""
            fill
            priority
            sizes="(max-width: 672px) 100vw, 672px"
            className="object-cover"
          />
        ) : (
          <ArchScene className="absolute inset-0 h-full w-full" />
        )}
      </motion.div>

      {/*
        Veils the upper half of the painting so the lettering stays readable,
        then clears completely by the waterline so the swans keep their colour.
      */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(250,243,232,0.42) 0%, rgba(250,243,232,0.70) 20%, rgba(250,243,232,0.72) 46%, rgba(250,243,232,0.22) 62%, rgba(250,243,232,0) 72%)',
        }}
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 px-6 pb-[8vh] pt-[12vh] text-center [text-shadow:0_1px_2px_rgba(250,243,232,0.85)]"
        initial="hidden"
        animate={start ? 'show' : 'hidden'}
      >
        <motion.p
          custom={0}
          variants={rise}
          className="text-sm tracking-[0.35em] text-t-accent sm:text-base"
        >
          {t.heroEyebrow}
        </motion.p>
        <motion.p
          custom={1}
          variants={rise}
          className="mt-1 text-xl tracking-[0.3em] text-t-ink-soft sm:text-2xl"
        >
          {dateLabel}
        </motion.p>

        <motion.h1 custom={2} variants={rise} className="mt-8 font-display text-t-accent">
          <span className="block text-6xl leading-[1.05] sm:text-7xl">{couple.partnerOne}</span>
          <span className="my-2 block text-4xl text-t-accent/80 sm:text-5xl">&amp;</span>
          <span className="block text-6xl leading-[1.05] sm:text-7xl">{couple.partnerTwo}</span>
        </motion.h1>

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
      </motion.div>
    </section>
  );
}
