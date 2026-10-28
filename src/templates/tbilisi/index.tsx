'use client';

import { motion } from 'framer-motion';

import { MonogramBadge, RosetteDivider } from '@/components/art/Ornaments';
import { Gate } from '@/components/invitation/Gate';
import { PaintedCorner, PaintedHero } from '@/components/invitation/PaintedHero';
import { STACKS } from '@/templates/style';
import type { OpeningProps, TemplateDef } from '@/templates/types';

/** The painted teal of the old wooden balconies and doors. */
const TEAL = '#2f5d5a';
const DOORS = '/art/tbilisi-doors.webp';

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
              {/*
                One painting of the closed doors, cropped so its leaves meet on
                the centre line; each leaf shows its own half, so they close
                into one picture and part along the real join.
              */}
              <div className="absolute inset-0 overflow-hidden">
                <div
                  className={`absolute inset-y-0 w-[200%] bg-cover bg-center ${side === 'left' ? 'left-0' : 'right-0'}`}
                  style={{ backgroundImage: `url(${DOORS})`, backgroundColor: TEAL }}
                />
              </div>
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

/** The painted old town: carved balconies above the river, Narikala on the ridge. */
function TbilisiHero({ start }: { start: boolean }) {
  return <PaintedHero src="/art/tbilisi-hero.webp" start={start} nameClassName="italic" />;
}

/** Old Tbilisi: painted balconies and pomegranates, terracotta and teal, and carved doors that swing open. */
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
    cta: TEAL,
    onCta: '#f5ebdd',
    inverse: TEAL,
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
  Corner: (props) => <PaintedCorner src="/art/tbilisi-pomegranate.webp" {...props} />,
};
