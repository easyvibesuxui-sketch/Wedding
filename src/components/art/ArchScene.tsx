import { BloomFilter, SprayGroup } from './FloralSpray';

/** Swan drawn facing right in a 120 x 80 box; mirrored for its partner. */
function Swan({ x, y, scale = 1, flip = false }: { x: number; y: number; scale?: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
      <path
        d="M8 56C2 40 12 28 38 25c26-3 52 4 70 17 9 7 6 15-6 18-24 6-52 7-74 3-12-2-18-4-20-7Z"
        fill="#fffdf8"
      />
      <path
        d="M40 30c22-2 44 4 60 15-18 5-42 7-62 5-14-2-18-8-16-13 3-4 10-6 18-7Z"
        fill="#f1e8db"
        opacity="0.75"
      />
      <path
        d="M76 30C86 14 80 3 66 3"
        stroke="#fffdf8"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="64" cy="4" r="5.5" fill="#fffdf8" />
      <path d="M59 3l-9 2 9 3z" fill="#c19a45" />
      <circle cx="66" cy="2.5" r="0.9" fill="#5c4f42" />
    </g>
  );
}

/**
 * The hero artwork: a stone garden arch opening onto a still lake with two
 * swans, framed by climbing greenery and corner florals. Pure SVG so it stays
 * sharp on any phone and needs no image request.
 */
export function ArchScene({ className = '' }: { className?: string }) {
  // Greenery placed along the arch curve (a semicircle of radius 292 about
  // 400,300) and down the outer edge of each column.
  const vines = Array.from({ length: 26 }, (_, i) => {
    const t = Math.PI + (Math.PI * i) / 25;
    return {
      x: 400 + 292 * Math.cos(t),
      y: 300 + 292 * Math.sin(t),
      a: (t * 180) / Math.PI + 90,
      r: 26 + ((i * 7) % 13),
    };
  });

  return (
    <svg viewBox="0 0 800 1400" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fdf8ee" />
          <stop offset="45%" stopColor="#f8edda" />
          <stop offset="100%" stopColor="#f1e2c8" />
        </linearGradient>
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dfe0cd" />
          <stop offset="30%" stopColor="#ddd6c0" />
          <stop offset="100%" stopColor="#d2c7ae" />
        </linearGradient>
        <linearGradient id="stone" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#e6dac6" />
          <stop offset="30%" stopColor="#f6efe2" />
          <stop offset="70%" stopColor="#ece0cd" />
          <stop offset="100%" stopColor="#d8c9b1" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="34%" r="52%">
          <stop offset="0%" stopColor="#fff9ea" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#fff9ea" stopOpacity="0" />
        </radialGradient>
        {/* Everything outside the arch opening is masked away. */}
        <clipPath id="arch-opening">
          <path d="M140 1260V300a260 260 0 0 1 520 0v960Z" />
        </clipPath>
      </defs>

      <BloomFilter />
      <rect width="800" height="1400" fill="#f8ece0" />

      <g clipPath="url(#arch-opening)">
        <rect width="800" height="1400" fill="url(#sky)" />
        <circle cx="400" cy="480" r="330" fill="url(#glow)" />

        {/* Distant hills, kept low so the lettering sits on clear sky. */}
        <path d="M60 940c90-40 150-12 236-28s150-48 246-34 138 54 202 46v122H60Z" fill="#cdd6c0" opacity="0.45" />
        <path d="M60 986c110-26 160 6 250-8s160-36 244-22 132 40 186 34v66H60Z" fill="#b3bfa3" opacity="0.42" />

        {/* Lake. */}
        <rect x="60" y="1046" width="680" height="220" fill="url(#water)" />
        {/* Feathered shoreline. */}
        <path d="M60 1046h680v16c-120 8-190-6-300-2s-160 12-260 8-92-8-120-6Z" fill="#b3bfa3" opacity="0.3" />
        {/* Reflections first, then the birds themselves. */}
        <g transform="translate(0 2208) scale(1 -1)" opacity="0.15">
          <Swan x={332} y={1048} scale={0.86} flip />
          <Swan x={468} y={1048} scale={0.86} />
        </g>
        <Swan x={332} y={1048} scale={0.86} flip />
        <Swan x={468} y={1048} scale={0.86} />
        {[1136, 1170, 1206].map((y, i) => (
          <path
            key={y}
            d={`M${160 + i * 30} ${y}h${480 - i * 60}`}
            stroke="#fffdf6"
            strokeOpacity={0.2 - i * 0.05}
            strokeWidth="1.6"
          />
        ))}
      </g>

      {/* Arch band and columns. */}
      <path
        d="M400 -20a320 320 0 0 1 320 320h-60a260 260 0 0 0-520 0H80A320 320 0 0 1 400-20Z"
        fill="url(#stone)"
      />
      <path
        d="M400 40a260 260 0 0 1 260 260h-14a246 246 0 0 0-492 0h-14A260 260 0 0 1 400 40Z"
        fill="#fffaf0"
        opacity="0.5"
      />
      {[
        { x: 60 },
        { x: 660 },
      ].map(({ x }) => (
        <g key={x}>
          <rect x={x + 4} y="292" width="72" height="24" rx="4" fill="#e2d4bd" />
          <rect x={x + 12} y="316" width="56" height="910" fill="url(#stone)" />
          {[0, 1, 2, 3].map((i) => (
            <path
              key={i}
              d={`M${x + 22 + i * 12} 330v882`}
              stroke="#d3c3a9"
              strokeOpacity="0.55"
              strokeWidth="2"
            />
          ))}
          <rect x={x} y="1226" width="80" height="34" rx="4" fill="#e2d4bd" />
        </g>
      ))}

      {/* Climbing greenery on the arch. */}
      {vines.map((v, i) => (
        <g key={i} transform={`translate(${v.x} ${v.y}) rotate(${v.a})`}>
          <path
            d={`M0 0C${v.r * 0.4} ${-v.r * 0.34} ${v.r} ${-v.r * 0.3} ${v.r * 1.28} 0 ${v.r} ${v.r * 0.3} ${v.r * 0.4} ${v.r * 0.34} 0 0Z`}
            fill={i % 3 === 0 ? '#94a385' : '#b3bfa3'}
            opacity="0.9"
          />
          {i % 4 === 1 ? <circle cx={v.r * 0.7} cy={-v.r * 0.5} r="7" fill="#fffaf0" /> : null}
          {i % 5 === 2 ? <circle cx={v.r * 0.5} cy={v.r * 0.55} r="6" fill="#f3d9c2" /> : null}
        </g>
      ))}

      {/* Corner sprays. */}
      <g transform="translate(-40 1032) scale(1.3)">
        <SprayGroup side="left" />
      </g>
      <g transform="translate(502 1032) scale(1.3)">
        <SprayGroup side="right" />
      </g>
    </svg>
  );
}
