import { useId } from 'react';

/** Painted wood of the old balconies and the carving picked out on it. */
export const WOOD = { teal: '#2f5d5a', deep: '#234845', carve: '#cfe0dc', brass: '#c9a25a' };

/** Carved lattice, as on the wooden balconies of Sololaki. */
export function Fretwork({ className = '', color = WOOD.carve }: { className?: string; color?: string }) {
  const id = useId();

  return (
    <svg className={className} width="100%" height="100%" aria-hidden="true">
      <defs>
        <pattern id={id} width="36" height="36" patternUnits="userSpaceOnUse">
          <g fill="none" stroke={color} strokeWidth="1.4">
            <path d="M18 0 36 18 18 36 0 18Z" />
            <circle cx="18" cy="18" r="5" />
            <path d="M18 13c2-3 2-6 0-8-2 2-2 5 0 8Zm0 10c2 3 2 6 0 8-2-2-2-5 0-8Zm-5-5c-3-2-6-2-8 0 2 2 5 2 8 0Zm10 0c3-2 6-2 8 0-2 2-5 2-8 0Z" />
          </g>
          <circle cx="0" cy="0" r="2.4" fill={color} />
          <circle cx="36" cy="36" r="2.4" fill={color} />
          <circle cx="36" cy="0" r="2.4" fill={color} />
          <circle cx="0" cy="36" r="2.4" fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/** One leaf of the double doors: painted panels, a carved fanlight and a brass ring. */
export function Door({ side }: { side: 'left' | 'right' }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: WOOD.teal }}>
      {/* Vertical boards. */}
      <div
        className="absolute inset-0 opacity-40"
        style={{ backgroundImage: `repeating-linear-gradient(90deg, ${WOOD.deep} 0 1px, transparent 1px 22px)` }}
      />
      {/* Carved fanlight under an arch. */}
      <div
        className="absolute inset-x-[12%] top-[6%] h-[26%] overflow-hidden border-2"
        style={{
          borderColor: WOOD.carve,
          borderRadius: side === 'left' ? '999px 0 0 0' : '0 999px 0 0',
          background: WOOD.deep,
        }}
      >
        <Fretwork className="absolute inset-0 opacity-80" />
      </div>
      {/* Two raised panels. */}
      {['top-[37%] h-[24%]', 'top-[66%] h-[26%]'].map((pos) => (
        <div key={pos} className={`absolute inset-x-[12%] ${pos} border-2`} style={{ borderColor: `${WOOD.carve}aa` }}>
          <div className="absolute inset-2 border" style={{ borderColor: `${WOOD.carve}55` }} />
        </div>
      ))}
      {/* Brass ring by the meeting edge. */}
      <div
        className={`absolute top-[60%] h-7 w-7 rounded-full border-[3px] ${side === 'left' ? 'right-[6%]' : 'left-[6%]'}`}
        style={{ borderColor: WOOD.brass, boxShadow: '0 2px 4px rgba(0,0,0,0.35)' }}
      />
      {/* Shadow where the leaves meet. */}
      <div
        className={`absolute inset-y-0 w-3 ${side === 'left' ? 'right-0' : 'left-0'}`}
        style={{ background: `linear-gradient(${side === 'left' ? 'to left' : 'to right'}, rgba(0,0,0,0.35), transparent)` }}
      />
    </div>
  );
}

/** A carved balcony railing: balusters under a scalloped valance. */
export function Balcony({ className = '', color = 'currentColor' }: { className?: string; color?: string }) {
  const id = useId();

  return (
    <svg className={className} width="100%" height="64" aria-hidden="true">
      <defs>
        <pattern id={id} width="40" height="64" patternUnits="userSpaceOnUse">
          <g fill="none" stroke={color} strokeWidth="1.3">
            <path d="M0 6h40M0 10h40M0 58h40" />
            <path d="M0 10c10 14 30 14 40 0" />
            <path d="M20 22v34M14 26c0 10 12 10 12 0M14 48c0-8 12-8 12 0" />
            <circle cx="20" cy="38" r="4" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="64" fill={`url(#${id})`} />
    </svg>
  );
}

/** Quarter of carved lattice for a band's corner. */
export function FretCorner({ className = '' }: { className?: string }) {
  return (
    <div className={`${className} aspect-square text-t-accent`} aria-hidden="true">
      <div className="h-full w-full opacity-40 [mask-image:radial-gradient(circle_at_100%_0%,#000_45%,transparent_72%)]">
        <Fretwork color="currentColor" />
      </div>
    </div>
  );
}
