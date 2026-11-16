'use client';

import type { CSSProperties, ReactNode } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { HeroText } from '@/components/invitation/HeroText';

/**
 * A first screen that is one painting, full bleed, anchored to its bottom
 * edge so the scene and the couple are always in frame.
 *
 * How much of the painting's sky is left above the scene depends on the
 * screen's proportions — a phone's browser bars, a tablet, a desktop window —
 * so the lettering does not count on it. A mist of the band's own colour sits
 * behind the names and thins out below them: where the sky is tall it is
 * barely there, and where the scene climbs high it is what keeps the names
 * readable. It is an ellipse rather than a band, so whatever the painting
 * hangs in its top corners stays in colour.
 */
export function PaintedHero({
  src,
  fallback,
  start,
  mist = 0.9,
  nameClassName = '',
  children,
}: {
  /** The painting. With none, `fallback` is drawn in its place. */
  src?: string | null;
  fallback?: ReactNode;
  start: boolean;
  /** How dense the mist behind the names is, 0–1. Lower where the sky is already calm, or dark. */
  mist?: number;
  nameClassName?: string;
  /** The template's own touches laid over the painting (a tile strip, a frame). */
  children?: ReactNode;
}) {
  return (
    <section
      className="relative flex min-h-[var(--H)] items-start justify-center overflow-hidden bg-t-bg"
      // Never shorter than a small phone, whatever the window (a landscape
      // phone, a squat desktop window): the lettering needs the room.
      style={{ '--H': 'max(var(--hero-h, 100svh), 34rem)' } as CSSProperties}
    >
      {/* The painting settles as the opening hands over, so the cut has motion in it. */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.07 }}
        animate={{ scale: start ? 1 : 1.07 }}
        transition={{ duration: 2.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {src ? (
          <Image src={src} alt="" fill priority sizes="(max-width: 480px) 100vw, 480px" className="object-cover object-bottom" />
        ) : (
          fallback
        )}
      </motion.div>

      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 64% 30% at 50% 24%, rgb(var(--t-bg) / ${mist}) 0%, rgb(var(--t-bg) / ${mist}) 60%, rgb(var(--t-bg) / 0) 100%)`,
        }}
        aria-hidden="true"
      />

      {children}

      <HeroText
        start={start}
        className="px-6 [text-shadow:0_1px_2px_rgb(var(--t-bg)/0.9)]"
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
