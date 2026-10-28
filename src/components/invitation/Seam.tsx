'use client';

import type { CSSProperties } from 'react';

import { useTemplate } from '@/components/TemplateProvider';
import { TEXTURE_CLASS } from '@/templates/style';
import type { SeamKind } from '@/templates/types';

/** Shapes drawn as the top edge of a band, in a 1440×48 box filled below the edge. */
const PATHS: Partial<Record<SeamKind, string>> = {
  torn: 'M0 48V22c96-10 152 6 248 2s140-18 236-15 152 19 248 15 140-20 236-16 152 18 248 14 152-12 224-6V48z',
  wave: 'M0 48V26C240 2 480 2 720 26s480 24 720 0V48z',
  arch: 'M0 48V44Q720-36 1440 44V48z',
  steps: 'M0 48V38h500v-8h120v-9h70v-9h60v9h70v9h120v8h500v10z',
};

function svgMask(path: string): string {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 48' preserveAspectRatio='none'><path d='${path}'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

function maskFor(kind: SeamKind): CSSProperties | null {
  const path = PATHS[kind];
  if (path) {
    const image = svgMask(path);
    return {
      maskImage: image,
      WebkitMaskImage: image,
      maskSize: '100% 100%',
      WebkitMaskSize: '100% 100%',
      maskRepeat: 'no-repeat',
      WebkitMaskRepeat: 'no-repeat',
    };
  }
  if (kind === 'scallop') {
    const image = 'radial-gradient(circle at 50% 100%, #000 13.5px, transparent 14px)';
    return {
      maskImage: image,
      WebkitMaskImage: image,
      maskSize: '28px 14px',
      WebkitMaskSize: '28px 14px',
      maskRepeat: 'repeat-x',
      WebkitMaskRepeat: 'repeat-x',
      maskPosition: 'center bottom',
      WebkitMaskPosition: 'center bottom',
    };
  }
  if (kind === 'cloud') {
    const image =
      'radial-gradient(circle at 50% 100%, #000 62%, transparent 63%), radial-gradient(circle at 50% 100%, #000 62%, transparent 63%)';
    return {
      maskImage: image,
      WebkitMaskImage: image,
      maskSize: '92px 38px, 150px 56px',
      WebkitMaskSize: '92px 38px, 150px 56px',
      maskRepeat: 'repeat-x',
      WebkitMaskRepeat: 'repeat-x',
      maskPosition: '0 bottom, 46px bottom',
      WebkitMaskPosition: '0 bottom, 46px bottom',
    };
  }
  return null;
}

/**
 * The edge a band draws over the one above it. It is the band itself, cut to
 * shape with a mask and carrying the same surface and grain, so the join can
 * never show a stripe of a slightly different colour.
 */
export function Seam() {
  const { seam, texture } = useTemplate();

  if (seam === 'none') return null;

  if (seam === 'rule') {
    return (
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-center" aria-hidden="true">
        <span className="h-px w-full bg-t-line/50" />
        <span className="absolute h-2 w-2 rotate-45 border border-t-line bg-t-surface" />
      </div>
    );
  }

  const tall = seam === 'cloud' || seam === 'arch';

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-[calc(100%-1px)] bg-t-surface ${TEXTURE_CLASS[texture]} ${
        tall ? 'h-10 sm:h-14' : 'h-6 sm:h-9'
      }`}
      style={maskFor(seam) ?? undefined}
      aria-hidden="true"
    />
  );
}
