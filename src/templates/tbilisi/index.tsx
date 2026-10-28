'use client';

import { motion } from 'framer-motion';

import { MonogramBadge, RosetteDivider } from '@/components/art/Ornaments';
import { Gate } from '@/components/invitation/Gate';
import { HeroText } from '@/components/invitation/HeroText';
import { STACKS } from '@/templates/style';
import type { OpeningProps, TemplateDef } from '@/templates/types';

import { Balcony, Door, FretCorner, Fretwork, WOOD } from './art';

/**
 * Carved double doors of an old Tbilisi courtyard. On a tap they swing
 * inwards on their hinges, and the courtyard behind them is the invitation.
 */
function TbilisiOpening({ onOpen }: OpeningProps) {
  return (
    <Gate onOpen={onOpen} duration={1900} promptClassName="text-[#f5ebdd]" scrim>
      {(opening) => (
        <div className="absolute inset-0" style={{ perspective: 1100 }}>
          {(['left', 'right'] as const).map((side) => (
            <motion.div
              key={side}
              className={`absolute inset-y-0 w-1/2 ${side === 'left' ? 'left-0 origin-left' : 'right-0 origin-right'}`}
              // Inwards, into the courtyard: a positive turn carries the left
              // leaf's free edge away from the viewer.
              animate={opening ? { rotateY: side === 'left' ? 105 : -105 } : { rotateY: 0 }}
              transition={{ duration: 1.6, ease: [0.55, 0.05, 0.25, 1] }}
            >
              <Door side={side} />
              {/* The leaf darkens as it turns away from the light. */}
              <motion.div
                className="absolute inset-0 bg-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: opening ? 0.55 : 0 }}
                transition={{ duration: 1.6 }}
              />
            </motion.div>
          ))}
        </div>
      )}
    </Gate>
  );
}

function TbilisiHero({ start }: { start: boolean }) {
  return (
    <section className="relative flex min-h-[var(--hero-h,100svh)] flex-col items-center justify-center overflow-hidden bg-t-bg px-6 pb-28 pt-20">
      {/* An arched window with a carved surround. */}
      <motion.div
        className="relative w-full max-w-[21rem] rounded-t-[999px] p-3"
        style={{ background: WOOD.teal }}
        initial={{ opacity: 0, y: 24 }}
        animate={start ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.3, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="absolute inset-0 overflow-hidden rounded-t-[999px] opacity-70">
          <Fretwork />
        </div>
        <div className="relative rounded-t-[999px] bg-t-bg px-5 pb-10 pt-24">
          <HeroText start={start} nameClassName="italic" />
        </div>
      </motion.div>

      {/* The balcony rail running under the window. */}
      <div className="absolute inset-x-0 bottom-6 text-t-accent/70">
        <Balcony />
      </div>
    </section>
  );
}

/** Old Tbilisi: carved balconies, terracotta and teal, and wooden doors that swing open. */
export const tbilisi: TemplateDef = {
  id: 'tbilisi',
  palette: {
    page: '#e3d3bd',
    bg: '#f5ebdd',
    bgAlt: '#efe0cc',
    ink: '#3d2b22',
    inkSoft: '#6b5446',
    accent: '#a4452c',
    accentSoft: '#d48b6a',
    line: '#c9a27f',
    cta: WOOD.teal,
    onCta: '#f5ebdd',
    inverse: WOOD.teal,
    inverseInk: '#f5ebdd',
    inverseInkSoft: '#cfe0dc',
    inverseAccent: '#e8b27c',
    inverseLine: '#7fa8a2',
  },
  fonts: { display: STACKS.cormorant, heading: STACKS.cormorant, body: STACKS.cormorant },
  headingStyle: 'caps',
  surfaces: {
    blessing: 'base',
    countdown: 'alt',
    schedule: 'inverse',
    location: 'base',
    details: 'alt',
    rsvp: 'base',
    closing: 'alt',
  },
  seam: 'arch',
  texture: 'paper',
  reveal: 'rise',
  countdown: 'tiles',
  schedule: 'spine',
  photoFrame: 'arch',
  Opening: TbilisiOpening,
  Hero: TbilisiHero,
  Divider: RosetteDivider,
  Emblem: ({ size }) => <MonogramBadge size={size} shape="octagon" />,
  Corner: FretCorner,
};
