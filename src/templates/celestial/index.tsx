'use client';

import { useEffect, useId } from 'react';
import { animate, motion, useMotionTemplate, useMotionValue } from 'framer-motion';

import { MonogramBadge, StarDivider } from '@/components/art/Ornaments';
import { Gate } from '@/components/invitation/Gate';
import { PaintedHero } from '@/components/invitation/PaintedHero';
import { STACKS } from '@/templates/style';
import type { OpeningProps, TemplateDef } from '@/templates/types';

const NIGHT = '#0f1a33';
const MOON = '#f1e7c9';

/** Fixed star positions, so server and client draw the same sky. */
const STARS = Array.from({ length: 60 }, (_, i) => ({
  x: (i * 61) % 100,
  y: (i * 29 + (i % 5) * 7) % 100,
  r: i % 9 === 0 ? 1.6 : i % 3 === 0 ? 1.1 : 0.7,
  d: (i % 8) * 0.5,
}));

function Sky({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {STARS.map((s, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white motion-reduce:opacity-70"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.r * 2, height: s.r * 2 }}
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{ duration: 3.6, delay: s.d, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/** A crescent: the moon disc with the night cut out of one side. */
function Crescent({ size = 110 }: { size?: number }) {
  const id = useId();
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <defs>
        <mask id={`${id}-cut`}>
          <rect width="100" height="100" fill="#fff" />
          <circle cx="64" cy="40" r="38" fill="#000" />
        </mask>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0%" stopColor={MOON} stopOpacity="0.45" />
          <stop offset="100%" stopColor={MOON} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill={`url(#${id}-glow)`} />
      <circle cx="50" cy="52" r="34" fill={MOON} mask={`url(#${id}-cut)`} />
    </svg>
  );
}

/** A constellation drawn between a few of the stars, as on a star chart. */
function Constellation({ className = '' }: { className?: string }) {
  const points = [
    [20, 30], [60, 18], [104, 40], [140, 26], [176, 58], [150, 96], [104, 84],
  ];
  return (
    <svg viewBox="0 0 200 120" className={className} fill="none" stroke="currentColor" aria-hidden="true">
      <path d={`M${points.map((p) => p.join(' ')).join('L')}`} strokeWidth="0.7" strokeOpacity="0.6" strokeDasharray="2 3" />
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2.4 : 1.6} fill="currentColor" stroke="none" />
      ))}
    </svg>
  );
}

/**
 * The night sky with a crescent moon. On a tap the moon swells into a window
 * that widens until the whole invitation shows through it.
 */
function CelestialOpening({ onOpen }: OpeningProps) {
  return (
    <Gate onOpen={onOpen} duration={1700} promptClassName="text-[#e6d3a3]">
      {(opening) => <Iris opening={opening} />}
    </Gate>
  );
}

function Iris({ opening }: { opening: boolean }) {
  // The radius of the window, in vmax so it always outgrows the screen.
  const radius = useMotionValue(0);
  const mask = useMotionTemplate`radial-gradient(circle at 50% 44%, transparent ${radius}vmax, #000 calc(${radius}vmax + 1px))`;

  useEffect(() => {
    if (!opening) return;
    const controls = animate(radius, 120, { duration: 1.5, ease: [0.7, 0, 0.3, 1] });
    return () => controls.stop();
  }, [opening, radius]);

  return (
    <motion.div className="absolute inset-0" style={{ background: NIGHT, maskImage: mask, WebkitMaskImage: mask }}>
      <Sky />
      <motion.div
        className="absolute left-1/2 top-[44%]"
        style={{ x: '-50%', y: '-50%' }}
        animate={opening ? { scale: 2.4, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeIn' }}
      >
        <Crescent size={130} />
      </motion.div>
    </motion.div>
  );
}

/** Vineyard hills under the Milky Way, the moon low on the horizon. */
function CelestialHero({ start }: { start: boolean }) {
  return <PaintedHero src="/art/celestial-hero.webp" start={start} nameClassName="italic" />;
}

/** A starlit night: moon, constellations, and a page that opens out of the moon. */
export const celestial: TemplateDef = {
  id: 'celestial',
  palette: {
    page: '#080e1f',
    bg: NIGHT,
    bgAlt: '#15224a',
    ink: '#e8ecf5',
    inkSoft: '#aab4cc',
    accent: '#e6d3a3',
    accentSoft: '#7c88a8',
    line: '#4a5a86',
    cta: '#e6d3a3',
    onCta: NIGHT,
    inverse: '#e9ecf4',
    inverseInk: '#18234a',
    inverseInkSoft: '#4a5578',
    inverseAccent: '#6d5a2c',
    inverseLine: '#b8c0d6',
  },
  fonts: { display: STACKS.cormorant, heading: STACKS.cormorant, body: STACKS.jost },
  headingStyle: 'spaced',
  surfaces: {
    blessing: 'base',
    countdown: 'alt',
    schedule: 'base',
    location: 'inverse',
    details: 'alt',
    rsvp: 'base',
    closing: 'alt',
  },
  seam: 'cloud',
  texture: 'none',
  reveal: 'blur',
  countdown: 'digits',
  schedule: 'spine',
  photoFrame: 'circle',
  Opening: CelestialOpening,
  Hero: CelestialHero,
  Divider: StarDivider,
  Emblem: ({ size }) => <MonogramBadge size={size} shape="circle" />,
  Corner: (props) => <Constellation {...props} />,
};
