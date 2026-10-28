import { siteConfig } from '@/lib/site-config';

/*
 * Ornaments shared by several templates. All are drawn in `currentColor` or
 * the template tokens, so one drawing serves every palette.
 */

/** Hairline with a small diamond — the quietest divider. */
export function LineDivider({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 12" className={`h-3 w-44 text-t-accent/70 ${className}`} fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M4 6h82M114 6h82" strokeWidth="1" />
      <path d="M100 1.5 104.5 6 100 10.5 95.5 6Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** A leafy sprig either side of a dot. */
export function SprigDivider({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 24" className={`h-5 w-48 text-t-accent/80 ${className}`} fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <path d="M8 12h78M134 12h78" />
      <path d="M86 12c-6-6-14-6-18-2 5 1 10 2 18 2Zm0 0c-6 6-14 6-18 2 5-1 10-2 18-2Z" fill="currentColor" fillOpacity="0.35" />
      <path d="M134 12c6-6 14-6 18-2-5 1-10 2-18 2Zm0 0c6 6 14 6 18 2-5-1-10-2-18-2Z" fill="currentColor" fillOpacity="0.35" />
      <circle cx="110" cy="12" r="3" fill="currentColor" stroke="none" />
      <circle cx="98" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="122" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Three stars on a fine line. */
export function StarDivider({ className = '' }: { className?: string }) {
  const star = (x: number, r: number) =>
    `M${x} ${12 - r}l${r * 0.28} ${r * 0.72} ${r * 0.72} ${r * 0.28}-${r * 0.72} ${r * 0.28}-${r * 0.28} ${r * 0.72}-${r * 0.28}-${r * 0.72}-${r * 0.72}-${r * 0.28} ${r * 0.72}-${r * 0.28}Z`;
  return (
    <svg viewBox="0 0 220 24" className={`h-5 w-48 text-t-accent/80 ${className}`} fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M8 12h76M136 12h76" strokeWidth="0.8" />
      <path d={star(110, 8)} fill="currentColor" stroke="none" />
      <path d={star(94, 4)} fill="currentColor" stroke="none" />
      <path d={star(126, 4)} fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Stepped Art Deco rule with a fan in the middle. */
export function DecoDivider({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 28" className={`h-6 w-52 text-t-accent ${className}`} fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <path d="M4 20h70l8-6h14M236 20h-70l-8-6h-14" />
      <path d="M4 23h76M236 23h-76" strokeOpacity="0.5" />
      <path d="M120 24 104 8M120 24l-8-18M120 24V4M120 24l8-18M120 24l16-16" />
      <path d="M104 8a22 22 0 0 1 32 0" />
      <path d="M116 24h8" strokeWidth="2" />
    </svg>
  );
}

/** A Georgian eight-point rosette between two rules. */
export function RosetteDivider({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 28" className={`h-6 w-48 text-t-accent ${className}`} fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <path d="M6 14h80M134 14h80" />
      <path d="M6 17h70M144 17h70" strokeOpacity="0.45" />
      <g transform="translate(110 14)">
        {[0, 45, 90, 135].map((a) => (
          <path key={a} transform={`rotate(${a})`} d="M0-11c3 4 3 7 0 11-3-4-3-7 0-11Zm0 22c3-4 3-7 0-11-3 4-3 7 0 11Z" fill="currentColor" fillOpacity="0.25" />
        ))}
        <circle r="3.2" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * The couple's monogram on a badge, for templates without a painted seal.
 * `shape` picks the outline; the initials are set in the display face.
 */
export function MonogramBadge({
  size = 124,
  shape = 'circle',
}: {
  size?: number;
  shape?: 'circle' | 'diamond' | 'arch' | 'scallop' | 'octagon';
}) {
  const outline = {
    circle: <><circle cx="60" cy="60" r="56" /><circle cx="60" cy="60" r="50" strokeOpacity="0.5" /></>,
    diamond: <><path d="M60 4 116 60 60 116 4 60Z" /><path d="M60 13 107 60 60 107 13 60Z" strokeOpacity="0.5" /></>,
    arch: <><path d="M14 116V52a46 46 0 0 1 92 0v64Z" /><path d="M21 110V53a39 39 0 0 1 78 0v57Z" strokeOpacity="0.5" /></>,
    scallop: (
      <>
        <path
          d={Array.from({ length: 16 }, (_, i) => {
            const a = (i / 16) * Math.PI * 2;
            const b = ((i + 1) / 16) * Math.PI * 2;
            const [x1, y1] = [60 + 54 * Math.cos(a), 60 + 54 * Math.sin(a)];
            const [x2, y2] = [60 + 54 * Math.cos(b), 60 + 54 * Math.sin(b)];
            return `${i === 0 ? `M${x1.toFixed(1)} ${y1.toFixed(1)}` : ''}A10.6 10.6 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`;
          }).join('') + 'Z'}
        />
        <circle cx="60" cy="60" r="44" strokeOpacity="0.5" />
      </>
    ),
    octagon: <><path d="M38 4h44l34 34v44l-34 34H38L4 82V38Z" /><path d="M41 11h38l30 30v38l-30 30H41L11 79V41Z" strokeOpacity="0.5" /></>,
  }[shape];

  return (
    <svg viewBox="0 0 120 120" width={size} height={size} className="text-t-accent" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      {outline}
      <text
        x="60"
        y="64"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="currentColor"
        stroke="none"
        className="font-display"
        style={{ fontSize: 34 }}
      >
        {siteConfig.couple.monogram}
      </text>
    </svg>
  );
}
