'use client';

import { motion, type Variant } from 'framer-motion';

import { useTemplate } from '@/components/TemplateProvider';
import type { RevealKind } from '@/templates/types';

type RevealProps = {
  children: React.ReactNode;
  /** Stagger several children inside the same section. */
  delay?: number;
  className?: string;
};

const FROM: Record<RevealKind, Variant> = {
  rise: { opacity: 0, y: 22 },
  // The block is uncovered from the top down, like ink drawn onto the page.
  mask: { opacity: 0, y: 10, clipPath: 'inset(0% 0% 100% 0%)' },
  blur: { opacity: 0, filter: 'blur(10px)' },
  scale: { opacity: 0, scale: 0.94 },
};

const TO: Record<RevealKind, Variant> = {
  rise: { opacity: 1, y: 0 },
  mask: { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' },
  blur: { opacity: 1, filter: 'blur(0px)' },
  scale: { opacity: 1, scale: 1 },
};

/**
 * Brings its children in the first time they are scrolled to, the way the
 * template asks. It triggers as soon as any part is on screen — a fraction
 * threshold can never be met by a block taller than the screen, which left
 * such blocks blank. For a guest who asks for less motion, the template's
 * MotionConfig drops the movement and leaves only the fade.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const { reveal } = useTemplate();

  return (
    <motion.div
      className={className}
      variants={{ hidden: FROM[reveal], shown: TO[reveal] }}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 'some', margin: '0px 0px -12% 0px' }}
      transition={{ duration: reveal === 'mask' ? 1 : 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
