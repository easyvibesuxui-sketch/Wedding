'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import { siteConfig } from '@/lib/site-config';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export function Hero() {
  const { couple, invitationLine, dateLabel, venue, heroImage } = siteConfig;

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-sage-700">
      {/* Placeholder romantic background — swap `heroImage` for your own photo. */}
      <Image
        src={heroImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Keeps the text legible over any photo. */}
      <div className="absolute inset-0 bg-sage-800/55" aria-hidden="true" />
      {/* Soft fade into the ivory page below, confined to the bottom edge. */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent from-85% to-ivory-100"
        aria-hidden="true"
      />

      <motion.div
        className="relative mx-auto max-w-2xl px-6 py-24 text-center text-ivory-50"
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.18, delayChildren: 0.15 }}
      >
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs uppercase tracking-widest text-gold-200 sm:text-sm"
        >
          {invitationLine}
        </motion.p>

        <motion.h1
          variants={fadeUp}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 font-serif text-5xl font-light leading-tight tracking-wide sm:text-7xl"
        >
          <span className="block">{couple.partnerOne}</span>
          <span className="my-3 block text-2xl text-gold-200 sm:my-4 sm:text-3xl">&amp;</span>
          <span className="block">{couple.partnerTwo}</span>
        </motion.h1>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <div className="divider mb-6" aria-hidden="true">
            <span className="text-[0.6rem]">&#9670;</span>
          </div>
          <p className="text-sm uppercase tracking-wider sm:text-base">{dateLabel}</p>
          <p className="mt-2 text-sm text-ivory-200/90">{venue.name}</p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12"
        >
          <a
            href="#rsvp"
            className="inline-block border border-gold-200/80 px-8 py-3 text-xs uppercase tracking-widest text-ivory-50 transition-colors hover:bg-gold-200 hover:text-sage-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-sage-800"
          >
            RSVP
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
