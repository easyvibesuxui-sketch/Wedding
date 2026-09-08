'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import { ArchScene } from '@/components/art/ArchScene';
import { siteConfig } from '@/lib/site-config';

const rise = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.15 + i * 0.18, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero({ start }: { start: boolean }) {
  const { couple, dateLabel, heroArt } = siteConfig;

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      {heroArt ? (
        <Image src={heroArt} alt="" fill priority sizes="100vw" className="object-cover" />
      ) : (
        <ArchScene className="absolute inset-0 h-full w-full" />
      )}

      {/* Lifts the lettering off the artwork without dulling it. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(70% 42% at 50% 34%, rgba(253,248,238,0.92), rgba(253,248,238,0.35) 62%, rgba(248,236,224,0) 82%)',
        }}
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 px-6 pb-24 pt-16 text-center"
        initial="hidden"
        animate={start ? 'show' : 'hidden'}
      >
        <motion.p custom={0} variants={rise} className="font-script text-3xl text-gold-500">
          Wedding Day
        </motion.p>
        <motion.p
          custom={1}
          variants={rise}
          className="mt-1 text-xl tracking-[0.3em] text-ink-500 sm:text-2xl"
        >
          {dateLabel}
        </motion.p>

        <motion.h1 custom={2} variants={rise} className="mt-10 font-script text-gold-600">
          <span className="block text-6xl leading-[1.05] sm:text-7xl">{couple.partnerOne}</span>
          <span className="my-2 block text-4xl text-gold-400 sm:text-5xl">&amp;</span>
          <span className="block text-6xl leading-[1.05] sm:text-7xl">{couple.partnerTwo}</span>
        </motion.h1>

        <motion.div custom={3} variants={rise} className="mt-16">
          <a
            href="#blessing"
            className="inline-flex flex-col items-center gap-1 text-gold-500 transition-colors hover:text-gold-600"
          >
            <span className="font-script text-2xl">Scroll down</span>
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
