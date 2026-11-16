'use client';

import { ArchScene } from '@/components/art/ArchScene';
import { PaintedHero } from '@/components/invitation/PaintedHero';
import { siteConfig } from '@/lib/site-config';

/**
 * The painted vineyard, or the drawn arch scene when no painting is set. The
 * painting keeps its centre pale under the vine garlands, so the mist behind
 * the names stays light.
 */
export function VineyardHero({ start }: { start: boolean }) {
  return (
    <PaintedHero
      src={siteConfig.heroArt}
      fallback={<ArchScene className="absolute inset-0 h-full w-full" />}
      start={start}
      mist={0.55}
    />
  );
}
