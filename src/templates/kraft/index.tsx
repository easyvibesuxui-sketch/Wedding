'use client';

import { motion } from 'framer-motion';

import { MonogramBadge } from '@/components/art/Ornaments';
import { Gate } from '@/components/invitation/Gate';
import { PaintedCorner, PaintedHero } from '@/components/invitation/PaintedHero';
import { siteConfig } from '@/lib/site-config';
import { STACKS } from '@/templates/style';
import type { OpeningProps, TemplateDef } from '@/templates/types';

const KRAFT = '#dcc6a3';
const KRAFT_DARK = '#c7ab83';
const TWINE = '#efe4cf';

/** A hand-drawn heart and two dashes, like a doodle in pen. */
function Doodle({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={`h-7 w-28 text-t-accent ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <path d="M6 22c10-2 22 2 34-1" />
      <path d="M80 21c12 1 22-2 34 0" />
      <path d="M60 32C48 23 46 15 51 11s9 0 9 4c0-4 4-8 9-4s3 12-9 21Z" />
    </svg>
  );
}

/** Twine tied in a simple bow. */
function Knot({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} fill="none" stroke={TWINE} strokeWidth="5" strokeLinecap="round" aria-hidden="true">
      <path d="M60 40C40 14 12 18 18 34s30 10 42 6Z" />
      <path d="M60 40c20-26 48-22 42-6s-30 10-42 6Z" />
      <path d="M58 42 40 74M62 42l20 32" />
      <circle cx="60" cy="40" r="6" fill={TWINE} stroke="none" />
    </svg>
  );
}

/**
 * A kraft envelope wrapped in twine. The knot slips, the twine slides away,
 * the flap folds back and the envelope drops out of sight.
 */
function KraftOpening({ onOpen }: OpeningProps) {
  return (
    <Gate onOpen={onOpen} duration={2100} promptClassName="text-[#4a3424]">
      {(opening) => (
        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{ background: KRAFT }}
          animate={{ y: opening ? '104%' : 0 }}
          transition={{ duration: 0.95, delay: 1.1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="tex-kraft absolute inset-0" />
          {/* The flap, folding back over the top edge. */}
          <motion.div
            className="absolute inset-x-0 top-0 h-[52%] origin-top"
            style={{ background: KRAFT_DARK, clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
            animate={{ rotateX: opening ? 180 : 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.65, 0, 0.35, 1] }}
          />
          {/* Twine round the envelope, both ways. */}
          <motion.div
            className="absolute inset-y-0 left-1/2 w-1.5"
            style={{ x: '-50%', background: TWINE }}
            animate={{ y: opening ? '-105%' : 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
          />
          <motion.div
            className="absolute inset-x-0 top-[52%] h-1.5"
            style={{ background: TWINE }}
            animate={{ x: opening ? '-105%' : 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.65, 0, 0.35, 1] }}
          />
          <motion.div
            className="absolute left-1/2 top-[52%] w-28"
            style={{ x: '-50%', y: '-50%' }}
            animate={opening ? { scale: 0.4, opacity: 0, rotate: 30 } : { scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Knot />
          </motion.div>
          <p className="absolute inset-x-0 top-[62%] text-center font-display text-4xl text-[#4a3424]">
            {siteConfig.couple.monogram}
          </p>
        </motion.div>
      )}
    </Gate>
  );
}

/** A barn at golden hour, strung with lights, in the wildflower meadow. */
function KraftHero({ start }: { start: boolean }) {
  return <PaintedHero src="/art/kraft-hero.webp" start={start} />;
}

/** Kraft paper, twine, wildflowers and a polaroid — for a garden or barn wedding. */
export const kraft: TemplateDef = {
  id: 'kraft',
  palette: {
    page: '#bfa580',
    bg: KRAFT,
    bgAlt: '#f3ebdd',
    ink: '#3b2a1c',
    inkSoft: '#5e4630',
    accent: '#6b3f1f',
    accentSoft: '#a57b52',
    line: '#8a6a48',
    cta: '#6b3f1f',
    onCta: '#f3ebdd',
    inverse: '#4a3424',
    inverseInk: '#f3ebdd',
    inverseInkSoft: '#d9c7ad',
    inverseAccent: '#e3c48f',
    inverseLine: '#8a6a48',
  },
  fonts: { display: STACKS.caveat, heading: STACKS.caveat, body: STACKS.jost },
  headingStyle: 'plain',
  surfaces: {
    blessing: 'alt',
    countdown: 'inverse',
    schedule: 'alt',
    location: 'base',
    details: 'alt',
    rsvp: 'base',
    closing: 'alt',
  },
  seam: 'torn',
  texture: 'kraft',
  reveal: 'rise',
  countdown: 'tiles',
  schedule: 'cards',
  photoFrame: 'polaroid',
  Opening: KraftOpening,
  Hero: KraftHero,
  Divider: Doodle,
  Corner: (props) => <PaintedCorner src="/art/kraft-corner.webp" {...props} />,
  Emblem: ({ size }) => <MonogramBadge size={size} shape="circle" />,
};
