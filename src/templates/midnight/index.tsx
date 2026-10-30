'use client';

import { motion } from 'framer-motion';

import { MonogramBadge, SprigDivider } from '@/components/art/Ornaments';
import { Gate } from '@/components/invitation/Gate';
import { PaintedHero } from '@/components/invitation/PaintedHero';
import { Fireflies } from '@/components/invitation/Petals';
import { siteConfig } from '@/lib/site-config';
import { STACKS } from '@/templates/style';
import type { OpeningProps, TemplateDef } from '@/templates/types';

const GREEN = '#14261f';
const GOLD = '#cfae6a';

/** A curl of fine gold line for each corner of a frame. */
function Curl({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={`absolute h-10 w-10 text-t-accent ${className}`} fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <path d="M2 46V18C2 9 9 2 18 2h28" />
      <path d="M8 46V22c0-8 6-14 14-14h24" strokeOpacity="0.5" />
      <path d="M14 14c4-4 10-4 12 0s-2 8-6 6-2-6 2-6" />
      <circle cx="4" cy="4" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Double hairline frame with curled corners, around a band's content. */
function FineFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto max-w-md border border-t-line/80 px-6 py-14">
      <div className="pointer-events-none absolute inset-1.5 border border-t-line/40" aria-hidden="true" />
      <Curl className="-left-1 -top-1" />
      <Curl className="-right-1 -top-1 -scale-x-100" />
      <Curl className="-bottom-1 -left-1 -scale-y-100" />
      <Curl className="-bottom-1 -right-1 -scale-100" />
      {children}
    </div>
  );
}

/** Points of light that twinkle in place. Deterministic, so server and client agree. */
const STARS = Array.from({ length: 26 }, (_, i) => ({
  left: (i * 37) % 100,
  top: (i * 53) % 100,
  size: 1 + (i % 3),
  delay: (i % 7) * 0.6,
}));

function Twinkle({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {STARS.map((s, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-t-accent motion-reduce:opacity-60"
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size }}
          animate={{ opacity: [0.15, 0.9, 0.15] }}
          transition={{ duration: 3.2, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/**
 * A gatefold card, sealed at the middle. The seal gives, and the two leaves
 * part to the sides like a garden gate, uncovering the invitation.
 */
function MidnightOpening({ onOpen }: OpeningProps) {
  return (
    <Gate onOpen={onOpen} duration={1800} promptClassName="text-[#cfae6a]">
      {(opening) => (
        <div className="absolute inset-0" style={{ perspective: 1600 }}>
          {(['left', 'right'] as const).map((side) => (
            <motion.div
              key={side}
              className={`absolute inset-y-0 w-1/2 overflow-hidden ${side === 'left' ? 'left-0 origin-left' : 'right-0 origin-right'}`}
              style={{ background: GREEN }}
              animate={opening ? { x: side === 'left' ? '-100%' : '100%', rotateY: side === 'left' ? 24 : -24 } : { x: 0, rotateY: 0 }}
              transition={{ duration: 1.35, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
            >
              <Twinkle />
              {/* Each leaf carries half of the gold frame. */}
              <div
                className={`absolute inset-y-6 border border-[#cfae6a]/70 ${side === 'left' ? 'left-6 right-0 border-r-0' : 'left-0 right-6 border-l-0'}`}
              />
              <div
                className={`absolute inset-y-9 border border-[#cfae6a]/35 ${side === 'left' ? 'left-9 right-0 border-r-0' : 'left-0 right-9 border-l-0'}`}
              />
            </motion.div>
          ))}

          <motion.div
            className="absolute left-1/2 top-1/2 flex items-center justify-center rounded-full p-3"
            style={{ x: '-50%', y: '-50%', background: `radial-gradient(circle at 35% 30%, #e9cf8f, ${GOLD} 55%, #8f7334)` }}
            animate={opening ? { scale: 1.3, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.45 }}
          >
            <span className="flex h-24 w-24 items-center justify-center rounded-full border border-[#14261f]/40 font-display text-3xl text-[#14261f]">
              {siteConfig.couple.monogram}
            </span>
          </motion.div>
        </div>
      )}
    </Gate>
  );
}

/** A moonlit garden, fireflies among the roses, under the empty night. */
function MidnightHero({ start }: { start: boolean }) {
  return <PaintedHero src="/art/midnight-hero.webp" start={start} />;
}

/** Midnight green with fine gold frames, fireflies, and a gatefold card that parts. */
export const midnight: TemplateDef = {
  id: 'midnight',
  palette: {
    page: '#0b1612',
    bg: GREEN,
    bgAlt: '#1a3028',
    ink: '#efe6d3',
    inkSoft: '#c9bfa8',
    accent: GOLD,
    accentSoft: '#8f7a4c',
    line: '#8f7a4c',
    cta: GOLD,
    onCta: GREEN,
    inverse: '#efe6d3',
    inverseInk: '#1d2e27',
    inverseInkSoft: '#4b5a52',
    inverseAccent: '#7f6224',
    inverseLine: '#b8a37a',
  },
  fonts: { display: STACKS.greatVibes, heading: STACKS.cormorant, body: STACKS.cormorant },
  headingStyle: 'italic',
  surfaces: {
    blessing: 'base',
    countdown: 'alt',
    schedule: 'base',
    location: 'inverse',
    details: 'alt',
    rsvp: 'base',
    closing: 'alt',
  },
  seam: 'rule',
  texture: 'none',
  reveal: 'blur',
  countdown: 'digits',
  schedule: 'spine',
  photoFrame: 'arch',
  Opening: MidnightOpening,
  Hero: MidnightHero,
  Divider: SprigDivider,
  Emblem: ({ size }) => <MonogramBadge size={size} shape="circle" />,
  Ambient: () => <Fireflies tint="#e9cf8f" />,
  Frame: FineFrame,
  framed: ['blessing', 'rsvp'],
};
