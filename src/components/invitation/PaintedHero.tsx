'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import { HeroText } from '@/components/invitation/HeroText';

/**
 * A first screen that is one painting, full bleed. The paintings leave their
 * upper part as pale sky for the lettering; a veil in the band's own colour
 * keeps it readable, then clears so the scene below keeps its colour. The
 * painting settles as the opening hands over, so the cut has motion in it.
 */
export function PaintedHero({
  src,
  start,
  nameClassName = '',
  children,
}: {
  src: string;
  start: boolean;
  nameClassName?: string;
  /** The template's own touches laid over the painting (a tile strip, a rail). */
  children?: React.ReactNode;
}) {
  return (
    <section className="relative flex min-h-[var(--hero-h,100svh)] items-start justify-center overflow-hidden bg-t-bg">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.07 }}
        animate={{ scale: start ? 1 : 1.07 }}
        transition={{ duration: 2.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image src={src} alt="" fill priority sizes="(max-width: 672px) 100vw, 672px" className="object-cover object-bottom" />
      </motion.div>

      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgb(var(--t-bg) / 0.72) 0%, rgb(var(--t-bg) / 0.6) 30%, rgb(var(--t-bg) / 0.25) 48%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      {children}

      <HeroText
        start={start}
        cue={false}
        // Measured from the hero, not the window, so a gallery miniature sets
        // the names exactly where a phone does.
        className="px-6 pt-[calc(var(--hero-h,100svh)*0.11)] [text-shadow:0_1px_2px_rgb(var(--t-bg)/0.9)]"
        nameClassName={nameClassName}
      />
    </section>
  );
}

/** A painted, cut-out corner ornament. */
export function PaintedCorner({ src, className = '' }: { src: string; className?: string }) {
  return (
    <Image src={src} alt="" width={900} height={900} aria-hidden="true" className={`select-none ${className}`} />
  );
}
