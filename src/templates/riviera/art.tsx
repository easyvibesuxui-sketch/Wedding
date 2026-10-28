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
