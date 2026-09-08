type Hue = 'blush' | 'ivory' | 'peach';
type Bloom = { x: number; y: number; r: number; hue: Hue; a?: number };
type Leaf = { x: number; y: number; r: number; a: number };

const PALETTES: Record<Hue, [string, string, string, string]> = {
  blush: ['#eed3d0', '#e0b6b4', '#cf9997', '#bb8281'],
  ivory: ['#f7f0e5', '#ebe1d1', '#dccdb6', '#c9b79c'],
  peach: ['#f4dfcb', '#e9c9ae', '#d8b090', '#c39877'],
};

/** Five-petal bloom: two staggered rings of soft petals around a small heart. */
function Rose({ x, y, r, hue, a = 0 }: Bloom) {
  const [outer, mid, inner, core] = PALETTES[hue];
  const ring = (count: number, offset: number, rx: number, ry: number, fill: string, start: number) =>
    Array.from({ length: count }, (_, i) => (
      <ellipse
        key={`${fill}-${i}`}
        cx="0"
        cy={-offset}
        rx={rx}
        ry={ry}
        fill={fill}
        transform={`rotate(${start + (360 / count) * i})`}
      />
    ));

  return (
    <g transform={`translate(${x} ${y}) rotate(${a}) scale(${r / 100})`} filter="url(#bloom-soft)">
      <g opacity="0.95">{ring(5, 54, 40, 50, outer, 0)}</g>
      <g opacity="0.95">{ring(5, 42, 32, 40, mid, 36)}</g>
      <g opacity="0.95">{ring(4, 24, 22, 27, inner, 20)}</g>
      <circle r="15" fill={core} />
      <path d="M-8 -3a8 8 0 0 1 16 0z" fill={outer} opacity="0.5" />
    </g>
  );
}

function LeafShape({ x, y, r, a }: Leaf) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${a}) scale(${r / 100})`}>
      <path d="M0 0C40 -32 96 -28 126 0 96 28 40 32 0 0Z" fill="#9fae90" opacity="0.9" />
      <path d="M8 0h110" stroke="#5f7157" strokeWidth="3.5" opacity="0.3" />
    </g>
  );
}

const LEAVES: Leaf[] = [
  { x: 22, y: 196, r: 60, a: -26 },
  { x: 98, y: 240, r: 68, a: 14 },
  { x: 170, y: 200, r: 54, a: -48 },
  { x: 38, y: 118, r: 50, a: -68 },
  { x: 188, y: 126, r: 46, a: -16 },
  { x: 126, y: 92, r: 42, a: -86 },
  { x: 216, y: 180, r: 40, a: 36 },
];

const BLOOMS: Bloom[] = [
  { x: 74, y: 170, r: 52, hue: 'ivory', a: 8 },
  { x: 148, y: 202, r: 42, hue: 'blush', a: -22 },
  { x: 36, y: 228, r: 33, hue: 'peach', a: 40 },
  { x: 176, y: 150, r: 29, hue: 'ivory', a: -10 },
  { x: 112, y: 132, r: 25, hue: 'blush', a: 26 },
  { x: 206, y: 214, r: 23, hue: 'peach', a: -34 },
];

/** Shared watercolour softening filter — declared once per svg that draws blooms. */
export function BloomFilter() {
  return (
    <defs>
      <filter id="bloom-soft" x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur stdDeviation="1.1" />
      </filter>
    </defs>
  );
}

/**
 * The spray as a bare `<g>`, for composing inside a larger drawing.
 * Natural size is 260 x 280 user units. The parent svg must render
 * <BloomFilter /> once.
 */
export function SprayGroup({ side = 'left' }: { side?: 'left' | 'right' }) {
  return (
    <g transform={side === 'right' ? 'translate(260 0) scale(-1 1)' : undefined}>
      {LEAVES.map((leaf, i) => (
        <LeafShape key={`l${i}`} {...leaf} />
      ))}
      {BLOOMS.map((bloom, i) => (
        <Rose key={`b${i}`} {...bloom} />
      ))}
    </g>
  );
}

/**
 * Watercolour-style corner spray of roses and foliage, as a standalone svg.
 * `side` mirrors it so a pair can frame a section without looking duplicated.
 */
export function FloralSpray({
  side = 'left',
  className = '',
}: {
  side?: 'left' | 'right';
  className?: string;
}) {
  return (
    <svg viewBox="0 0 260 280" className={className} aria-hidden="true">
      <BloomFilter />
      <SprayGroup side={side} />
    </svg>
  );
}

/** A single bloom, sized in its own 120 x 120 box (used as the timeline marker). */
export function SingleBloom({ hue = 'blush', className = '' }: { hue?: Hue; className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <BloomFilter />
      <Rose x={60} y={60} r={54} hue={hue} />
    </svg>
  );
}
