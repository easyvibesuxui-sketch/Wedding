'use client';

import { useId } from 'react';
import { motion } from 'framer-motion';

import { MonogramBadge, SprigDivider } from '@/components/art/Ornaments';
import { Gate } from '@/components/invitation/Gate';
import { PaintedCorner, PaintedHero } from '@/components/invitation/PaintedHero';
import { Drift } from '@/components/invitation/Petals';
import { STACKS } from '@/templates/style';
import type { OpeningProps, TemplateDef } from '@/templates/types';

const BLUSH = '#fbf3f1';
const ROSE = '#b5707a';
/** Satin: a darker body with a sheen running along it. */
const SATIN = 'linear-gradient(90deg, #a35f69 0%, #c98d95 35%, #e8b9be 50%, #c98d95 65%, #a35f69 100%)';

/** A tied satin bow with trailing tails. */
function Bow({ className = '' }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 200 150" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" x2="1">
          <stop offset="0" stopColor="#a35f69" />
          <stop offset="0.45" stopColor="#e3b2b8" />
          <stop offset="1" stopColor="#a35f69" />
        </linearGradient>
      </defs>
      <path d="M92 70C70 96 60 120 44 146l18-4 6 8c10-28 22-52 34-74Z" fill={`url(#${id})`} />
      <path d="M108 70c22 26 32 50 48 76l-18-4-6 8c-10-28-22-52-34-74Z" fill={`url(#${id})`} />
      <path d="M96 62C70 30 26 18 14 40s18 50 82 30Z" fill={`url(#${id})`} />
      <path d="M104 62c26-32 70-44 82-22s-18 50-82 30Z" fill={`url(#${id})`} />
      <path d="M96 62C72 40 40 34 30 44" fill="none" stroke="#fbe7e9" strokeOpacity="0.6" strokeWidth="2" />
      <path d="M104 62c24-22 56-28 66-18" fill="none" stroke="#fbe7e9" strokeOpacity="0.6" strokeWidth="2" />
      <rect x="88" y="52" width="24" height="26" rx="8" fill="#9a5560" />
      <rect x="92" y="55" width="8" height="20" rx="4" fill="#e3b2b8" opacity="0.5" />
    </svg>
  );
}

/**
 * A gift-box lid tied with satin. The bow unties, the two ribbons slide off,
 * and the lid lifts away from the invitation inside.
 */
function RibbonOpening({ onOpen }: OpeningProps) {
  return (
    <Gate onOpen={onOpen} duration={1900} promptClassName="text-[#8a4f58]">
      {(opening) => (
        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{ background: '#f4dcd8' }}
          animate={{ y: opening ? '-102%' : 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="absolute inset-0 opacity-50" style={{ background: 'radial-gradient(90% 60% at 50% 40%, #fff6f4, transparent)' }} />
          <motion.div
            className="absolute inset-y-0 left-1/2 w-14 shadow-md"
            style={{ x: '-50%', background: SATIN }}
            animate={{ y: opening ? '105%' : 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.65, 0, 0.35, 1] }}
          />
          <motion.div
            className="absolute inset-x-0 top-[46%] h-14 shadow-md"
            style={{ background: SATIN.replace('90deg', '180deg') }}
            animate={{ x: opening ? '105%' : 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.65, 0, 0.35, 1] }}
          />
          <motion.div
            className="absolute left-1/2 top-[46%] w-56"
            style={{ x: '-50%', y: '-38%' }}
            animate={opening ? { scale: 0.3, rotate: -25, opacity: 0 } : { scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeIn' }}
          >
            <Bow />
          </motion.div>
        </motion.div>
      )}
    </Gate>
  );
}

/** Peonies and roses with a satin ribbon running through them. */
function RibbonHero({ start }: { start: boolean }) {
  return <PaintedHero src="/art/ribbon-hero.webp" start={start} />;
}

/** Blush and satin: a ribbon that unties and a lid that lifts. */
export const ribbon: TemplateDef = {
  id: 'ribbon',
  palette: {
    page: '#f1dfdc',
    bg: BLUSH,
    bgAlt: '#f6e6e3',
    ink: '#5a3d3f',
    inkSoft: '#866567',
    accent: ROSE,
    accentSoft: '#e2b7bd',
    line: '#e2b7bd',
    cta: ROSE,
    onCta: '#ffffff',
    inverse: '#b06b75',
    inverseInk: '#fff7f5',
    inverseInkSoft: '#f7dede',
    inverseAccent: '#ffffff',
    inverseLine: '#e7b2b8',
  },
  fonts: { display: STACKS.greatVibes, heading: STACKS.cormorant, body: STACKS.cormorant },
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
  seam: 'scallop',
  texture: 'linen',
  reveal: 'scale',
  countdown: 'tiles',
  schedule: 'spine',
  photoFrame: 'oval',
  Opening: RibbonOpening,
  Hero: RibbonHero,
  Divider: SprigDivider,
  Emblem: ({ size }) => <MonogramBadge size={size} shape="scallop" />,
  Corner: (props) => <PaintedCorner src="/art/ribbon-corner.webp" {...props} />,
  Ambient: () => <Drift tints={['#f2c9ce', '#f7dede', '#e8b9be']} />,
};
