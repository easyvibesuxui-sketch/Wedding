import { useId } from 'react';

/** Cobalt on the glaze white — the two colours of the majolica tiles. */
const COBALT = '#1d4f91';
const GLAZE = '#fbf8f1';

/** A strip of hand-painted majolica tiles. */
export function TileBand({ className = '' }: { className?: string }) {
  const id = useId();

  return (
    <svg className={className} width="100%" height="100%" aria-hidden="true">
      <defs>
        <pattern id={id} width="44" height="44" patternUnits="userSpaceOnUse">
          <rect width="44" height="44" fill={GLAZE} />
          <path d="M0 0h44v44H0z" fill="none" stroke={COBALT} strokeOpacity="0.35" />
          {/* Quarter arcs in each corner meet into circles across tiles. */}
          <path d="M0 12A12 12 0 0 0 12 0M32 0a12 12 0 0 0 12 12M44 32a12 12 0 0 0-12 12M12 44A12 12 0 0 0 0 32" fill="none" stroke={COBALT} strokeWidth="2.2" />
          <g transform="translate(22 22)" fill={COBALT}>
            {[0, 90, 180, 270].map((a) => (
              <path key={a} transform={`rotate(${a})`} d="M0-3C3-6 3-11 0-13-3-11-3-6 0-3Z" />
            ))}
            <circle r="2.6" fill="#f2cf4a" />
          </g>
          <circle cx="0" cy="0" r="3" fill={COBALT} />
          <circle cx="44" cy="0" r="3" fill={COBALT} />
          <circle cx="0" cy="44" r="3" fill={COBALT} />
          <circle cx="44" cy="44" r="3" fill={COBALT} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/** A lemon branch: two lemons, a blossom and glossy leaves. */
export function LemonSprig({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" className={className} aria-hidden="true">
      <path d="M196 6C150 20 118 46 92 82S48 140 10 152" fill="none" stroke="#6b5a3a" strokeWidth="3" strokeLinecap="round" />
      {[
        { x: 150, y: 24, r: -28 },
        { x: 118, y: 50, r: 34 },
        { x: 78, y: 96, r: -40 },
        { x: 52, y: 124, r: 30 },
        { x: 170, y: 14, r: 50 },
        { x: 98, y: 70, r: -70 },
      ].map((leaf, i) => (
        <g key={i} transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.r})`}>
          <path d="M0 0C10-14 32-16 44-6 32 8 12 10 0 0Z" fill={i % 2 ? '#4f7b45' : '#3f6b3a'} />
          <path d="M2 0C14-4 28-6 42-6" fill="none" stroke="#9cc08a" strokeWidth="1" />
        </g>
      ))}
      <g transform="translate(112 92)">
        <ellipse rx="22" ry="17" fill="#f2cf4a" transform="rotate(-20)" />
        <ellipse rx="22" ry="17" fill="#e0b52e" opacity="0.55" transform="rotate(-20) translate(5 5) scale(0.8)" />
        <ellipse cx="-8" cy="-7" rx="6" ry="3.5" fill="#fff6c8" opacity="0.8" transform="rotate(-30)" />
        <path d="M18-12l7-5" stroke="#b4932a" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g transform="translate(70 128)">
        <ellipse rx="18" ry="14" fill="#f2cf4a" transform="rotate(25)" />
        <ellipse rx="18" ry="14" fill="#e0b52e" opacity="0.55" transform="rotate(25) translate(4 4) scale(0.8)" />
        <ellipse cx="-6" cy="-6" rx="5" ry="3" fill="#fff6c8" opacity="0.8" />
      </g>
      <g transform="translate(160 40)" fill="#fffdf6" stroke="#e8dcc0" strokeWidth="0.6">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} rx="4.5" ry="7" transform={`rotate(${a}) translate(0 -6)`} />
        ))}
        <circle r="2.4" fill="#f2cf4a" stroke="none" />
      </g>
    </svg>
  );
}
