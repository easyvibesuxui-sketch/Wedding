'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { LineDivider, MonogramBadge } from '@/components/art/Ornaments';
import { Gate } from '@/components/invitation/Gate';
import { PaintedCorner, PaintedHero } from '@/components/invitation/PaintedHero';
import { siteConfig } from '@/lib/site-config';
import { STACKS } from '@/templates/style';
import type { OpeningProps, TemplateDef } from '@/templates/types';

import { TileBand } from './art';

/** The card inside the envelope is the page's own white, so it can become the page. */
const GLAZE = '#fbf8f1';
const ENVELOPE = { back: '#e9dfcb', pocket: '#f3ead9', flap: '#efe5d1' };

/**
 * The envelope lies on a majolica tablecloth. The flap lifts, the card rises
 * out of the pocket, then grows until it fills the screen — and the card,
 * being the page's own colour, simply becomes the invitation.
 */
function RivieraOpening({ onOpen }: OpeningProps) {
  return (
    <Gate onOpen={onOpen} duration={2500} promptClassName="text-white" scrim>
      {(opening) => <Envelope opening={opening} />}
    </Gate>
  );
}

function Envelope({ opening }: { opening: boolean }) {
  // 1: the flap is past upright, so it now sits behind the card.
  // 2: the card rises. 3: the card fills the screen.
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!opening) return;
    const timers = [
      window.setTimeout(() => setStage(1), 380),
      window.setTimeout(() => setStage(2), 700),
      window.setTimeout(() => setStage(3), 1350),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, [opening]);

  return (
    <>
      <motion.div className="absolute inset-0" animate={{ opacity: stage >= 3 ? 0 : 1 }} transition={{ duration: 0.6, delay: 0.3 }}>
        <TileBand className="absolute inset-0" />
        <div className="absolute inset-0 bg-[#0d2547]/25" />
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: 1400 }}>
        <div className="relative aspect-[1.45] w-[84vw] max-w-[360px]">
          <motion.div
            className="absolute inset-0 shadow-[0_24px_50px_rgba(10,30,60,0.35)]"
            style={{ background: ENVELOPE.back }}
            animate={{ opacity: stage >= 3 ? 0 : 1, y: stage >= 3 ? 60 : 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* The card: the invitation itself. */}
          <motion.div
            className="absolute inset-x-[5%] top-[6%] z-10 flex h-[88%] items-center justify-center border border-[#1d4f91]/30"
            style={{ background: GLAZE }}
            animate={
              stage >= 3
                ? { y: '-55%', scale: 5.2, opacity: [1, 1, 0] }
                : { y: stage >= 2 ? '-55%' : 0, scale: 1, opacity: 1 }
            }
            transition={stage >= 3 ? { duration: 1.1, ease: [0.55, 0, 0.35, 1], times: [0, 0.75, 1] } : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="font-display text-4xl text-[#1d4f91]"
              animate={{ opacity: stage >= 3 ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            >
              {siteConfig.couple.monogram}
            </motion.span>
          </motion.div>

          {/* The pocket's front, cut in a V so the flap folds into it. */}
          <motion.div
            className="absolute inset-0 z-20"
            style={{ background: ENVELOPE.pocket, clipPath: 'polygon(0 0, 50% 56%, 100% 0, 100% 100%, 0 100%)' }}
            animate={{ opacity: stage >= 3 ? 0 : 1, y: stage >= 3 ? 60 : 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* The flap: paper outside, tiles on its lining. */}
          <motion.div
            className={`absolute inset-x-0 top-0 h-[58%] origin-top ${stage >= 1 ? 'z-0' : 'z-30'}`}
            style={{ transformStyle: 'preserve-3d' }}
            animate={{ rotateX: opening ? 178 : 0, opacity: stage >= 3 ? 0 : 1 }}
            transition={{ rotateX: { duration: 0.8, ease: [0.65, 0, 0.35, 1] }, opacity: { duration: 0.4 } }}
          >
            <div
              className="absolute inset-0 [backface-visibility:hidden]"
              style={{ background: ENVELOPE.flap, clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
            />
            <div
              className="absolute inset-0 [backface-visibility:hidden] [transform:rotateX(180deg)]"
              style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
            >
              <TileBand className="absolute inset-0" />
            </div>
          </motion.div>

          {/* A lemon-yellow seal on the flap's point. */}
          <motion.div
            className="absolute left-1/2 top-[58%] z-40 flex h-14 w-14 items-center justify-center rounded-full shadow-md"
            style={{ x: '-50%', y: '-50%', background: 'radial-gradient(circle at 35% 30%, #fbe38a, #e0b52e 70%)' }}
            animate={{ scale: opening ? 0.6 : 1, opacity: opening ? 0 : 1 }}
            transition={{ duration: 0.35 }}
          >
            <span className="font-display text-xl text-[#1d4f91]">{siteConfig.couple.monogram}</span>
          </motion.div>
        </div>
      </div>
    </>
  );
}

/** The painted Amalfi coast, under a strip of the tiles. */
function RivieraHero({ start }: { start: boolean }) {
  return (
    <PaintedHero src="/art/riviera-hero.webp" start={start}>
      <TileBand className="absolute inset-x-0 top-0 h-8" />
    </PaintedHero>
  );
}

/** Amalfi blue and white: majolica tiles, lemons, and a card that slides out of its envelope. */
export const riviera: TemplateDef = {
  id: 'riviera',
  palette: {
    page: '#dfe8f2',
    bg: GLAZE,
    bgAlt: '#edf2f8',
    ink: '#1f3a5f',
    inkSoft: '#4a6283',
    accent: '#1d4f91',
    accentSoft: '#7fa3cf',
    line: '#9db6d6',
    cta: '#1d4f91',
    onCta: GLAZE,
    inverse: '#1d4f91',
    inverseInk: GLAZE,
    inverseInkSoft: '#d7e3f2',
    inverseAccent: '#f3d26b',
    inverseLine: '#7fa3cf',
  },
  fonts: { display: STACKS.parisienne, heading: STACKS.cormorant, body: STACKS.cormorant },
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
  reveal: 'mask',
  countdown: 'tiles',
  schedule: 'cards',
  photoFrame: 'arch',
  Opening: RivieraOpening,
  Hero: RivieraHero,
  Divider: LineDivider,
  Emblem: ({ size }) => <MonogramBadge size={size} shape="scallop" />,
  Corner: (props) => <PaintedCorner src="/art/riviera-lemon.webp" {...props} />,
};
