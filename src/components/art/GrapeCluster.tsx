/** Small grape cluster — the marker that rides down the schedule spine. */
export function GrapeCluster({ className = '' }: { className?: string }) {
  // Rows of berries, narrowing to a point like a real bunch.
  const rows = [
    { y: 46, xs: [-19, -6.5, 6.5, 19] },
    { y: 59, xs: [-13, 0, 13] },
    { y: 72, xs: [-13, 0, 13] },
    { y: 85, xs: [-6.5, 6.5] },
    { y: 97, xs: [0] },
  ];

  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="grape-berry" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#8e5a72" />
          <stop offset="55%" stopColor="#6b3350" />
          <stop offset="100%" stopColor="#48203a" />
        </radialGradient>
      </defs>

      {/* Stem and a curling tendril. */}
      <path d="M60 40V22" stroke="#7a6a58" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path
        d="M60 26c8-6 16-2 15 5s-9 6-9 1"
        stroke="#94a385"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />
      {/* Vine leaf. */}
      <path
        d="M58 28c-9-13-24-15-32-8 3 11 15 19 26 16 3-1 5-4 6-8Z"
        fill="#7f9070"
      />
      <path d="M56 29c-8-6-16-9-24-8" stroke="#5c6b50" strokeWidth="1.6" fill="none" opacity="0.6" />

      <g transform="translate(60 0)">
        {rows.map((row) =>
          row.xs.map((x) => (
            <g key={`${row.y}-${x}`}>
              <circle cx={x} cy={row.y} r="7.6" fill="url(#grape-berry)" />
              <ellipse cx={x - 2.4} cy={row.y - 2.8} rx="2.4" ry="1.6" fill="#c79ab0" opacity="0.5" />
            </g>
          )),
        )}
      </g>
    </svg>
  );
}
