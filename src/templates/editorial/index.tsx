'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import { LineDivider, MonogramBadge } from '@/components/art/Ornaments';
import { Gate } from '@/components/invitation/Gate';
import { PaintedCorner } from '@/components/invitation/PaintedHero';
import { useT } from '@/components/LanguageProvider';
import { coupleNames, siteConfig } from '@/lib/site-config';
import { STACKS } from '@/templates/style';
import type { OpeningProps, TemplateDef } from '@/templates/types';

const INK = '#111111';
const PAPER = '#fbfaf7';

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  transition: { duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] as const },
});

/**
 * A black curtain with the monogram set huge. It rises like a stage curtain —
 * the lettering lifting faster than the cloth — and the cover is underneath.
 */
function EditorialOpening({ onOpen }: OpeningProps) {
  return (
    <Gate onOpen={onOpen} duration={1400} promptClassName="text-white/80">
      {(opening) => (
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
          style={{ background: INK }}
          animate={{ y: opening ? '-100%' : 0 }}
          transition={{ duration: 1.15, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="text-center text-white"
            animate={opening ? { y: '-40vh', opacity: 0 } : { y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            <p className="font-display text-[7.5rem] italic leading-none">{siteConfig.couple.monogram}</p>
            <p className="mt-6 text-xs tracking-[0.5em]">{siteConfig.dateLabel}</p>
          </motion.div>
        </motion.div>
      )}
    </Gate>
  );
}

/** A magazine cover: masthead rule, the names set huge, the portrait in black and white. */
function EditorialHero({ start }: { start: boolean }) {
  const t = useT();
  const { couple, dateLabel, couplePhoto } = siteConfig;
  const show = start ? { opacity: 1, y: 0 } : {};

  return (
    <section className="relative flex min-h-[var(--hero-h,100svh)] flex-col overflow-hidden bg-t-bg px-6 pb-10 pt-16">
      <motion.div {...enter(0.2)} animate={show} className="flex items-center justify-between border-y border-t-ink py-2 text-[0.7rem] tracking-[0.3em] text-t-ink">
        <span>{t.heroEyebrow}</span>
        <span>{dateLabel}</span>
      </motion.div>

      <motion.h1 {...enter(0.35)} animate={show} className="mt-8 font-display text-[4.6rem] italic leading-[0.9] text-t-ink sm:text-[6rem]">
        {couple.partnerOne}
        <span className="block pl-10 font-body text-2xl not-italic tracking-[0.4em]">&amp;</span>
        <span className="block text-right">{couple.partnerTwo}</span>
      </motion.h1>

      {couplePhoto ? (
        <motion.div {...enter(0.55)} animate={show} className="relative mt-8 aspect-[4/5] w-full flex-1 overflow-hidden">
          <Image src={couplePhoto} alt={coupleNames} fill priority sizes="(max-width: 672px) 100vw, 672px" className="object-cover object-top grayscale" />
        </motion.div>
      ) : null}

      <motion.a
        {...enter(0.75)}
        animate={show}
        href="#blessing"
        className="mt-6 flex items-center justify-between border-t border-t-ink pt-3 text-[0.7rem] tracking-[0.3em] text-t-ink"
      >
        <span>{t.venueName}</span>
        <span aria-hidden="true">↓</span>
        <span className="sr-only">{t.scrollDown}</span>
      </motion.a>
    </section>
  );
}

/** Editorial: magazine type in black and white, and a curtain that rises. */
export const editorial: TemplateDef = {
  id: 'editorial',
  palette: {
    page: '#e8e6e1',
    bg: PAPER,
    bgAlt: '#f0eee9',
    ink: INK,
    inkSoft: '#555555',
    accent: INK,
    accentSoft: '#8a8a8a',
    line: '#bdbdbd',
    cta: INK,
    onCta: '#ffffff',
    inverse: INK,
    inverseInk: PAPER,
    inverseInkSoft: '#bdbdbd',
    inverseAccent: PAPER,
    inverseLine: '#555555',
  },
  fonts: { display: STACKS.playfair, heading: STACKS.playfair, body: STACKS.jost },
  headingStyle: 'caps',
  surfaces: {
    blessing: 'base',
    countdown: 'inverse',
    schedule: 'base',
    location: 'alt',
    details: 'base',
    // The ink ornament spills into the RSVP band, so that band stays light;
    // the portrait closes the issue on black instead.
    rsvp: 'alt',
    closing: 'inverse',
  },
  seam: 'none',
  texture: 'none',
  reveal: 'mask',
  countdown: 'digits',
  schedule: 'cards',
  photoFrame: 'plain',
  Opening: EditorialOpening,
  Hero: EditorialHero,
  Divider: LineDivider,
  Emblem: ({ size }) => <MonogramBadge size={size} shape="circle" />,
  Corner: (props) => <PaintedCorner src="/art/editorial-corner.webp" {...props} />,
};
