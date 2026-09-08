'use client';

import { motion } from 'framer-motion';

/** Deterministic so the server and client markup always agree. */
const PETALS = [
  { left: 6, delay: 0, duration: 17, size: 14, drift: 5, tint: '#e9c9c0' },
  { left: 18, delay: 5.5, duration: 21, size: 11, drift: -4, tint: '#e5cf9a' },
  { left: 31, delay: 2.5, duration: 19, size: 16, drift: 7, tint: '#f0d8c4' },
  { left: 47, delay: 8, duration: 23, size: 12, drift: -6, tint: '#e9c9c0' },
  { left: 62, delay: 1.5, duration: 18, size: 15, drift: 4, tint: '#e5cf9a' },
  { left: 74, delay: 6.5, duration: 22, size: 10, drift: -5, tint: '#f0d8c4' },
  { left: 88, delay: 3.5, duration: 20, size: 13, drift: 6, tint: '#e9c9c0' },
];

/** Slow drift of petals over the whole page. Hidden from reduced-motion users. */
export function Petals() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden motion-reduce:hidden"
      aria-hidden="true"
    >
      {PETALS.map((petal, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 20 12"
          width={petal.size * 1.6}
          height={petal.size}
          className="absolute -top-8"
          style={{ left: `${petal.left}%` }}
          initial={{ y: '-10vh', x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: '110vh',
            x: [`0vw`, `${petal.drift}vw`, `${-petal.drift * 0.6}vw`],
            rotate: [0, 180, 340],
            opacity: [0, 0.75, 0.75, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <path d="M0 6C5 0 15 0 20 6 15 12 5 12 0 6Z" fill={petal.tint} opacity="0.85" />
        </motion.svg>
      ))}
    </div>
  );
}
