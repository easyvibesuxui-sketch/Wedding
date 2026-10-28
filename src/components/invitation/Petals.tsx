'use client';

import { motion } from 'framer-motion';

/** Deterministic so the server and client markup always agree. */
const PATH = [
  { left: 6, delay: 0, duration: 17, size: 14, drift: 5 },
  { left: 18, delay: 5.5, duration: 21, size: 11, drift: -4 },
  { left: 31, delay: 2.5, duration: 19, size: 16, drift: 7 },
  { left: 47, delay: 8, duration: 23, size: 12, drift: -6 },
  { left: 62, delay: 1.5, duration: 18, size: 15, drift: 4 },
  { left: 74, delay: 6.5, duration: 22, size: 10, drift: -5 },
  { left: 88, delay: 3.5, duration: 20, size: 13, drift: 6 },
];

const SHAPES = {
  petal: { viewBox: '0 0 20 12', ratio: 1.6, d: 'M0 6C5 0 15 0 20 6 15 12 5 12 0 6Z' },
  leaf: { viewBox: '0 0 22 12', ratio: 1.8, d: 'M0 6C6-1 16-1 22 6 16 13 6 13 0 6Zm2 0h18' },
  spark: { viewBox: '0 0 12 12', ratio: 1, d: 'M6 0l1.4 4.6L12 6l-4.6 1.4L6 12l-1.4-4.6L0 6l4.6-1.4Z' },
} as const;

/** Slow drift of petals, leaves or sparks over the whole page. Hidden from reduced-motion users. */
export function Drift({ shape = 'petal', tints }: { shape?: keyof typeof SHAPES; tints: string[] }) {
  const s = SHAPES[shape];

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden motion-reduce:hidden" aria-hidden="true">
      {PATH.map((item, i) => (
        <motion.svg
          key={i}
          viewBox={s.viewBox}
          width={item.size * s.ratio}
          height={item.size}
          className="absolute -top-8"
          style={{ left: `${item.left}%` }}
          initial={{ y: '-10vh', x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: '110vh',
            x: ['0vw', `${item.drift}vw`, `${-item.drift * 0.6}vw`],
            rotate: [0, 180, 340],
            opacity: [0, 0.75, 0.75, 0],
          }}
          transition={{ duration: item.duration, delay: item.delay, repeat: Infinity, ease: 'linear' }}
        >
          <path d={s.d} fill={tints[i % tints.length]} opacity="0.85" />
        </motion.svg>
      ))}
    </div>
  );
}

const FLIES = [
  { left: 12, top: 30, delay: 0, duration: 7 },
  { left: 28, top: 62, delay: 2.2, duration: 9 },
  { left: 46, top: 18, delay: 1.1, duration: 8 },
  { left: 63, top: 74, delay: 3.4, duration: 10 },
  { left: 78, top: 40, delay: 0.6, duration: 7.5 },
  { left: 90, top: 66, delay: 2.8, duration: 9.5 },
];

/** Soft points of light that wander and pulse — for the dark templates. */
export function Fireflies({ tint }: { tint: string }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden motion-reduce:hidden" aria-hidden="true">
      {FLIES.map((fly, i) => (
        <motion.span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full"
          style={{ left: `${fly.left}%`, top: `${fly.top}%`, background: tint, boxShadow: `0 0 10px 3px ${tint}` }}
          animate={{ x: [0, 18, -10, 0], y: [0, -24, -8, 0], opacity: [0, 0.9, 0.4, 0] }}
          transition={{ duration: fly.duration, delay: fly.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}
