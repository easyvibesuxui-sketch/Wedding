'use client';

import { motion } from 'framer-motion';

import { DecoDivider, MonogramBadge } from '@/components/art/Ornaments';
import { Gate } from '@/components/invitation/Gate';
import { HeroText } from '@/components/invitation/HeroText';
import { siteConfig } from '@/lib/site-config';
import { STACKS } from '@/templates/style';
import type { OpeningProps, TemplateDef } from '@/templates/types';

const BLACK = '#111111';
const GOLD = '#d4af5a';

/** Rays fanning out from a point at the bottom centre. */
function Sunburst({ className = '', rays = 28 }: { className?: string; rays?: number }) {
  return (
    <svg viewBox="0 0 400 220" className={className} fill="none" stroke="currentColor" aria-hidden="true">
      {Array.from({ length: rays + 1 }, (_, i) => {
        const a = Math.PI - (i / rays) * Math.PI;
        return (
          <line
            key={i}
            x1="200"
            y1="220"
            x2={(200 + 260 * Math.cos(a)).toFixed(1)}
            y2={(220 - 260 * Math.sin(a)).toFixed(1)}
            strokeWidth={i % 2 ? 0.6 : 1.2}
            strokeOpacity={i % 2 ? 0.5 : 0.9}
          />
        );
      })}
      <path d="M120 220a80 80 0 0 1 160 0M90 220a110 110 0 0 1 220 0" strokeWidth="1" />
    </svg>
  );
}

/** Stepped corners in gold line, around a band's content. */
function DecoFrame({ children }: { children: React.ReactNode }) {
  const corner = 'pointer-events-none absolute h-8 w-8 border-t-line';
  return (
    <div className="relative mx-auto max-w-md px-6 py-14">
      <span className={`${corner} left-0 top-0 border-l border-t`} />
      <span className={`${corner} left-2 top-2 border-l border-t`} />
      <span className={`${corner} right-0 top-0 border-r border-t`} />
      <span className={`${corner} right-2 top-2 border-r border-t`} />
      <span className={`${corner} bottom-0 left-0 border-b border-l`} />
      <span className={`${corner} bottom-2 left-2 border-b border-l`} />
      <span className={`${corner} bottom-0 right-0 border-b border-r`} />
      <span className={`${corner} bottom-2 right-2 border-b border-r`} />
      {children}
    </div>
  );
}

/**
 * Black-and-gold gates with a sunburst across them and a medallion where
 * they meet. The medallion turns, and the gates slide back into the walls.
 */
function DecoOpening({ onOpen }: OpeningProps) {
  return (
    <Gate onOpen={onOpen} duration={1900} promptClassName="text-[#d4af5a]">
      {(opening) => (
        <>
          {(['left', 'right'] as const).map((side) => (
            <motion.div
              key={side}
              className={`absolute inset-y-0 w-1/2 overflow-hidden ${side === 'left' ? 'left-0' : 'right-0'}`}
              style={{ background: BLACK }}
              animate={{ x: opening ? (side === 'left' ? '-100%' : '100%') : 0 }}
              transition={{ duration: 1.25, delay: 0.55, ease: [0.76, 0, 0.24, 1] }}
            >
              {/* Each gate holds half of the one sunburst, so it reads whole when closed. */}
              <div className={`absolute top-1/2 w-[200%] -translate-y-full text-[#d4af5a] ${side === 'left' ? 'left-0' : 'right-0'}`}>
                <Sunburst className="w-full" />
              </div>
              <div className={`absolute inset-y-0 w-px bg-[#d4af5a]/60 ${side === 'left' ? 'right-2' : 'left-2'}`} />
              <div className={`absolute inset-y-0 w-px bg-[#d4af5a]/30 ${side === 'left' ? 'right-4' : 'left-4'}`} />
              <div className="absolute inset-x-6 bottom-10 top-10 border-y border-[#d4af5a]/50" />
            </motion.div>
          ))}
          <motion.div
            className="absolute left-1/2 top-1/2 flex h-28 w-28 items-center justify-center border border-[#d4af5a] bg-[#111111]"
            style={{ x: '-50%', y: '-50%' }}
            animate={opening ? { rotate: 225, scale: 0.4, opacity: 0 } : { rotate: 45, scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          >
            <div className="flex h-24 w-24 -rotate-45 items-center justify-center border border-[#d4af5a]/50">
              <span className="font-display text-2xl tracking-[0.1em] text-[#d4af5a]">{siteConfig.couple.monogram}</span>
            </div>
          </motion.div>
        </>
      )}
    </Gate>
  );
}

function DecoHero({ start }: { start: boolean }) {
  return (
    <section className="relative flex min-h-[var(--hero-h,100svh)] items-center justify-center overflow-hidden bg-t-bg px-6 py-20">
      <motion.div
        className="absolute inset-x-0 top-[8%] text-t-accent"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={start ? { opacity: 0.55, scale: 1 } : {}}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: '50% 100%' }}
      >
        <Sunburst className="mx-auto w-[130%] max-w-none -translate-x-[11%]" rays={40} />
      </motion.div>
      <div className="absolute inset-4 border border-t-line/60" aria-hidden="true" />
      <div className="absolute inset-6 border border-t-line/30" aria-hidden="true" />
      <HeroText start={start} names="line" className="mt-24" nameClassName="uppercase" />
    </section>
  );
}

/** Art Deco: black and gold geometry, and sunburst gates that slide open. */
export const deco: TemplateDef = {
  id: 'deco',
  palette: {
    page: '#000000',
    bg: BLACK,
    bgAlt: '#1b1a17',
    ink: '#efe6d0',
    inkSoft: '#bfb59c',
    accent: GOLD,
    accentSoft: '#8c7437',
    line: '#8c7437',
    cta: GOLD,
    onCta: BLACK,
    inverse: '#e9dfc7',
    inverseInk: '#1a1a1a',
    inverseInkSoft: '#4a4436',
    inverseAccent: '#7d5f17',
    inverseLine: '#b39a5c',
  },
  fonts: { display: STACKS.cinzel, heading: STACKS.cinzel, body: STACKS.jost },
  headingStyle: 'caps',
  surfaces: {
    blessing: 'base',
    countdown: 'alt',
    schedule: 'inverse',
    location: 'base',
    details: 'alt',
    rsvp: 'base',
    closing: 'alt',
  },
  seam: 'steps',
  texture: 'none',
  reveal: 'scale',
  countdown: 'tiles',
  schedule: 'cards',
  photoFrame: 'deco',
  Opening: DecoOpening,
  Hero: DecoHero,
  Divider: DecoDivider,
  Emblem: ({ size }) => <MonogramBadge size={size} shape="diamond" />,
  Frame: DecoFrame,
  framed: ['blessing', 'details'],
};
