/**
 * Deep-red wax seal. Used closed on the envelope and as the RSVP button, so
 * the label is whatever the caller passes (a monogram or the word RSVP).
 */
export function WaxSeal({
  label,
  size = 132,
  script = true,
  className = '',
}: {
  label: string;
  size?: number;
  script?: boolean;
  className?: string;
}) {
  // Scalloped outer edge: 22 shallow bumps around the circle.
  const bumps = 22;
  const outer = 48;
  const wobble = 3.2;
  const points = Array.from({ length: bumps * 2 }, (_, i) => {
    const angle = (Math.PI * i) / bumps;
    const r = outer + (i % 2 === 0 ? wobble : -wobble * 0.7);
    return `${(50 + r * Math.cos(angle)).toFixed(2)},${(50 + r * Math.sin(angle)).toFixed(2)}`;
  }).join(' ');

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={`Wax seal reading ${label}`}
    >
      <defs>
        <radialGradient id="wax-body" cx="38%" cy="32%" r="78%">
          <stop offset="0%" stopColor="#b4434e" />
          <stop offset="45%" stopColor="#7a1f2b" />
          <stop offset="100%" stopColor="#3d0e15" />
        </radialGradient>
        <radialGradient id="wax-inner" cx="42%" cy="36%" r="70%">
          <stop offset="0%" stopColor="#8f2f38" />
          <stop offset="100%" stopColor="#5c161f" />
        </radialGradient>
        <filter id="wax-shadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="1.6" stdDeviation="2.2" floodColor="#3d0e15" floodOpacity="0.45" />
        </filter>
      </defs>

      <polygon points={points} fill="url(#wax-body)" filter="url(#wax-shadow)" />
      <circle cx="50" cy="50" r="38" fill="url(#wax-inner)" />
      <circle cx="50" cy="50" r="38" fill="none" stroke="#e5cf9a" strokeOpacity="0.5" strokeWidth="0.8" />
      <circle cx="50" cy="50" r="33" fill="none" stroke="#e5cf9a" strokeOpacity="0.28" strokeWidth="0.5" />
      {/* Wet-wax highlight. */}
      <ellipse cx="36" cy="30" rx="15" ry="9" fill="#ffffff" opacity="0.14" transform="rotate(-24 36 30)" />

      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#f2e4c4"
        className={script ? 'font-script' : 'font-serif'}
        style={{
          fontSize: script ? 30 : 17,
          letterSpacing: script ? 0 : 2,
        }}
      >
        {label}
      </text>
    </svg>
  );
}
