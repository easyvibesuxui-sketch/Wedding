'use client';

import { Flourish } from '@/components/art/Flourish';
import { GrapeCluster } from '@/components/art/GrapeCluster';
import { Seal } from '@/components/art/Seal';
import { VineCorner } from '@/components/art/VineCorner';
import { Drift } from '@/components/invitation/Petals';
import { siteConfig } from '@/lib/site-config';
import { STACKS } from '@/templates/style';
import type { TemplateDef } from '@/templates/types';

import { VineyardHero } from './Hero';
import { VineyardOpening } from './Opening';

/** Watercolour vineyard, gold and wine — the painted original. */
export const vineyard: TemplateDef = {
  id: 'vineyard',
  palette: {
    page: '#eadfce',
    bg: '#f8ece0',
    bgAlt: '#faf3e8',
    ink: '#5c4f42',
    inkSoft: '#7a6a58',
    accent: '#a8842f',
    accentSoft: '#d4b169',
    line: '#d4b169',
    cta: '#7a1f2b',
    onCta: '#faf3e8',
    inverse: '#5e1923',
    inverseInk: '#f6ead8',
    inverseInkSoft: '#e3cfb3',
    inverseAccent: '#e5cf9a',
    inverseLine: '#c19a45',
  },
  fonts: { display: STACKS.greatVibes, heading: STACKS.helvetica, body: STACKS.helvetica },
  headingStyle: 'spaced',
  surfaces: {
    blessing: 'base',
    countdown: 'inverse',
    schedule: 'alt',
    location: 'base',
    details: 'alt',
    rsvp: 'base',
    closing: 'alt',
  },
  seam: 'torn',
  texture: 'paper',
  reveal: 'rise',
  countdown: 'digits',
  schedule: 'spine',
  photoFrame: 'plain',
  Opening: VineyardOpening,
  Hero: VineyardHero,
  Divider: Flourish,
  Emblem: ({ size }) => <Seal label={siteConfig.couple.monogram} size={size} />,
  Corner: (props) => <VineCorner corner="top-right" {...props} />,
  Marker: GrapeCluster,
  Ambient: () => <Drift tints={['#e9c9c0', '#e5cf9a', '#f0d8c4']} />,
};
