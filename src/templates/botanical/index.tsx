'use client';

import { motion } from 'framer-motion';

import { MonogramBadge, SprigDivider } from '@/components/art/Ornaments';
import { Gate } from '@/components/invitation/Gate';
import { PaintedCorner, PaintedHero } from '@/components/invitation/PaintedHero';
import { Drift } from '@/components/invitation/Petals';
import { siteConfig } from '@/lib/site-config';
import { STACKS } from '@/templates/style';
import type { OpeningProps, TemplateDef } from '@/templates/types';

const SAGE = '#6f8466';

/** A eucalyptus stem: round, overlapping leaves in two greens. */
function Eucalyptus({ className = '' }: { className?: string }) {
  const leaves = [
    { x: 168, y: 18, r: 14, a: -20 },
    { x: 150, y: 34, r: 16, a: 30 },
    { x: 132, y: 52, r: 17, a: -35 },
    { x: 114, y: 70, r: 18, a: 25 },
    { x: 96, y: 90, r: 18, a: -30 },
    { x: 78, y: 108, r: 17, a: 35 },
    { x: 58, y: 126, r: 16, a: -25 },
    { x: 38, y: 142, r: 14, a: 30 },
  ];
  return (
    <svg viewBox="0 0 200 170" className={className} aria-hidden="true">
      <path d="M192 4C140 46 90 100 18 164" fill="none" stroke="#7c8a6e" strokeWidth="2" strokeLinecap="round" />
      {leaves.map((l, i) => (
        <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.a})`}>
          <ellipse cx={i % 2 ? 12 : -12} cy="0" rx={l.r} ry={l.r * 0.86} fill={i % 3 === 0 ? '#9fb39a' : '#b7c6ae'} opacity="0.85" />
          <ellipse cx={i % 2 ? 9 : -9} cy="-3" rx={l.r * 0.5} ry={l.r * 0.35} fill="#e7eee2" opacity="0.55" />
        </g>
      ))}
    </svg>
  );
}

/**
 * A sheet of frosted vellum lies over the invitation, the names pressed into
 * it beside a sprig. On a tap it lifts away and the page underneath — already
 * there, softened by the vellum — comes into focus.
 */
function BotanicalOpening({ onOpen }: OpeningProps) {
  return (
    <Gate onOpen={onOpen} duration={1700} promptClassName="text-[#6f8466]">
      {(opening) => (
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center bg-[#f4f1ea]/70 backdrop-blur-xl"
          animate={opening ? { y: '-104%', rotate: -3, opacity: 0.6 } : { y: 0, rotate: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
        >
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgba(255,255,255,0.8)]" />
          <Eucalyptus className="w-48 -rotate-12" />
          <p className="mt-4 font-display text-5xl italic text-[#56694e]">{siteConfig.couple.monogram}</p>
          <p className="mt-3 text-sm tracking-[0.3em] text-[#56694e]/80">{siteConfig.dateLabel}</p>
        </motion.div>
      )}
    </Gate>
  );
}

/** An orangery overflowing with eucalyptus and blush roses. */
function BotanicalHero({ start }: { start: boolean }) {
  return <PaintedHero src="/art/botanical-hero.webp" start={start} nameClassName="italic" />;
}

/** Sage and blush watercolour, eucalyptus, and a vellum sheet that lifts away. */
export const botanical: TemplateDef = {
  id: 'botanical',
  palette: {
    page: '#e4e8dc',
    bg: '#f4f1ea',
    bgAlt: '#ebefe5',
    ink: '#3e4a3d',
    inkSoft: '#66705f',
    accent: SAGE,
    accentSoft: '#b9c7ae',
    line: '#b9c7ae',
    cta: SAGE,
    onCta: '#f4f1ea',
    inverse: '#7c8f72',
    inverseInk: '#f8f5ee',
    inverseInkSoft: '#e6ebdf',
    inverseAccent: '#f7e1d7',
    inverseLine: '#c5d1bb',
  },
  fonts: { display: STACKS.cormorant, heading: STACKS.cormorant, body: STACKS.jost },
  headingStyle: 'italic',
  surfaces: {
    blessing: 'base',
    countdown: 'inverse',
    schedule: 'alt',
    location: 'base',
    details: 'alt',
    rsvp: 'base',
    closing: 'alt',
  },
  seam: 'wave',
  texture: 'paper',
  reveal: 'blur',
  countdown: 'digits',
  schedule: 'spine',
  photoFrame: 'oval',
  Opening: BotanicalOpening,
  Hero: BotanicalHero,
  Divider: SprigDivider,
  Emblem: ({ size }) => <MonogramBadge size={size} shape="arch" />,
  Corner: (props) => <PaintedCorner src="/art/botanical-corner.webp" {...props} />,
  Ambient: () => <Drift shape="leaf" tints={['#b7c6ae', '#9fb39a', '#e9c6bf']} />,
};
