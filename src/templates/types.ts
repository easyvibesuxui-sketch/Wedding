import type { ComponentType, ReactNode } from 'react';

export const TEMPLATE_IDS = [
  'vineyard',
  'riviera',
  'tbilisi',
  'midnight',
  'botanical',
  'deco',
  'editorial',
  'celestial',
  'ribbon',
  'kraft',
] as const;

export type TemplateId = (typeof TEMPLATE_IDS)[number];

export function isTemplateId(value: string | undefined | null): value is TemplateId {
  return TEMPLATE_IDS.includes(value as TemplateId);
}

/** The bands of the page after the hero, in reading order. */
export const SECTION_IDS = [
  'blessing',
  'countdown',
  'schedule',
  'location',
  'details',
  'rsvp',
  'closing',
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

/**
 * What a band sits on. `inverse` is the template's dark (or deep) panel: it
 * redefines ink, accent and line for everything inside it, so the shared
 * sections never need to know which band they are in.
 */
export type Surface = 'base' | 'alt' | 'inverse';

/** The edge each band draws over the one above it. */
export type SeamKind = 'torn' | 'wave' | 'scallop' | 'arch' | 'steps' | 'cloud' | 'rule' | 'none';

/** How blocks arrive as they are scrolled to. */
export type RevealKind = 'rise' | 'mask' | 'blur' | 'scale';

/** How the venue painting and the couple's portrait are framed. */
export type PhotoFrame = 'plain' | 'arch' | 'oval' | 'polaroid' | 'deco' | 'circle';

/** Hex colours; converted to CSS variables by `templateStyle`. */
export type Palette = {
  /** Outside the card on wide screens. */
  page: string;
  bg: string;
  bgAlt: string;
  ink: string;
  inkSoft: string;
  accent: string;
  accentSoft: string;
  line: string;
  /** Primary button. */
  cta: string;
  onCta: string;
  /** The `inverse` surface and what is drawn on it. */
  inverse: string;
  inverseInk: string;
  inverseInkSoft: string;
  inverseAccent: string;
  inverseLine: string;
};

export type OpeningProps = {
  /** Called the moment the page should start surfacing under the opening. */
  onOpen: () => void;
};

export type TemplateDef = {
  id: TemplateId;
  palette: Palette;
  /** Full font-family stacks, each ending in a Georgian-capable face. */
  fonts: { display: string; heading: string; body: string };
  /** Section headings: wide-tracked light, italic serif, capitals, or set plain and large (handwriting). */
  headingStyle: 'spaced' | 'italic' | 'caps' | 'plain';
  surfaces: Record<SectionId, Surface>;
  seam: SeamKind;
  /** Grain laid over every band. */
  texture: 'paper' | 'linen' | 'kraft' | 'none';
  reveal: RevealKind;
  countdown: 'digits' | 'tiles';
  schedule: 'spine' | 'cards';
  photoFrame: PhotoFrame;

  /** Covers the page until the guest opens it, then hands over to the hero. */
  Opening: ComponentType<OpeningProps>;
  /** First screen. `start` turns true once the opening hands over. */
  Hero: ComponentType<{ start: boolean }>;
  /** Rule under each section heading. */
  Divider: ComponentType<{ className?: string }>;
  /** Monogram badge: the RSVP ornament and the gallery card. */
  Emblem: ComponentType<{ size?: number }>;
  /** Corner ornament for the dress-code band; mirrored for the opposite corner. */
  Corner?: ComponentType<{ className?: string }>;
  /** Marker that travels down the schedule spine. */
  Marker?: ComponentType<{ className?: string }>;
  /** Full-page ambient layer (petals, stars, fireflies). */
  Ambient?: ComponentType;
  /** Frames a band's content, for the sections listed in `framed`. */
  Frame?: ComponentType<{ children: ReactNode }>;
  framed?: SectionId[];
};
