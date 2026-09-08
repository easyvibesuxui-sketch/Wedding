'use client';

import { motion } from 'framer-motion';

type RevealProps = {
  children: React.ReactNode;
  /** Stagger several children inside the same section. */
  delay?: number;
  className?: string;
};

/** Fades and lifts its children into view the first time they are scrolled to. */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
