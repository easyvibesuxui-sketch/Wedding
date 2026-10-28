import type { CSSProperties } from 'react';

import type { Palette, Surface, TemplateDef } from './types';

/*
 * Font stacks. Each Latin face is followed by the face that carries its
 * Georgian (and Cyrillic, where the Latin face has none), so the browser picks
 * per glyph and a line never drops to whatever the device happens to have.
 * Sans stacks take Georgian from Helvetica Neue LT GEO; serif and script
 * stacks take it from Noto Serif Georgian.
 */
export const STACKS = {
  helvetica: 'var(--font-body), var(--font-cyrillic), "Helvetica Neue", Arial, sans-serif',
  jost: 'var(--font-jost), var(--font-body), var(--font-cyrillic), sans-serif',
  cormorant: 'var(--font-cormorant), var(--font-ka-serif), Georgia, serif',
  playfair: 'var(--font-playfair), var(--font-ka-serif), Georgia, serif',
  cinzel: 'var(--font-cinzel), var(--font-forum), var(--font-ka-serif), serif',
  greatVibes: 'var(--font-script), var(--font-ka-serif), cursive',
  parisienne: 'var(--font-parisienne), var(--font-script), var(--font-ka-serif), cursive',
  caveat: 'var(--font-caveat), var(--font-ka-serif), cursive',
} as const;

/** `#a8842f` → `168 132 47`, the channel form the Tailwind tokens read. */
function channels(hex: string): string {
  const value = hex.replace('#', '');
  const full = value.length === 3 ? [...value].map((c) => c + c).join('') : value;
  const n = Number.parseInt(full, 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}

const VARS: Record<keyof Palette, string> = {
  page: '--t-page',
  bg: '--t-bg',
  bgAlt: '--t-bg-alt',
  ink: '--t-ink',
  inkSoft: '--t-ink-soft',
  accent: '--t-accent',
  accentSoft: '--t-accent-soft',
  line: '--t-line',
  cta: '--t-cta',
  onCta: '--t-on-cta',
  inverse: '--t-inverse',
  inverseInk: '--t-inverse-ink',
  inverseInkSoft: '--t-inverse-ink-soft',
  inverseAccent: '--t-inverse-accent',
  inverseLine: '--t-inverse-line',
};

/** The CSS variables a template sets on the element that holds it. */
export function templateStyle(template: TemplateDef): CSSProperties {
  const style: Record<string, string> = {
    '--t-font-display': template.fonts.display,
    '--t-font-heading': template.fonts.heading,
    '--t-font-body': template.fonts.body,
    // Bands start on the base surface until one says otherwise.
    '--s-bg': channels(template.palette.bg),
  };
  for (const key of Object.keys(VARS) as (keyof Palette)[]) {
    style[VARS[key]] = channels(template.palette[key]);
  }
  return style as CSSProperties;
}

/*
 * Class names written out in full: Tailwind keeps only the classes it can
 * find spelled out in the source, so `surface-${name}` would be dropped.
 */
export const SURFACE_CLASS: Record<Surface, string> = {
  base: 'surface-base',
  alt: 'surface-alt',
  inverse: 'surface-inverse',
};

export const TEXTURE_CLASS: Record<TemplateDef['texture'], string> = {
  paper: 'tex-paper',
  linen: 'tex-linen',
  kraft: 'tex-kraft',
  none: '',
};
