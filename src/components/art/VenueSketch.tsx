/** Hand-drawn line sketch of the venue, in gold on paper. */
export function VenueSketch({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 200"
      className={className}
      fill="none"
      stroke="#c19a45"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <g fill="#faf3e8">
        {/* Main hall. */}
        <path d="M110 186V96l100-52 100 52v90z" />
        <path d="M96 100L210 38l114 62" strokeWidth="2" />
        {/* Cupola. */}
        <path d="M186 66a24 24 0 0 1 48 0z" />
        <path d="M210 42v-12" />
        <circle cx="210" cy="27" r="4" />
        {/* Side wings. */}
        <path d="M42 186v-58h68v58z" />
        <path d="M310 186v-58h68v58z" />
      </g>
      {/* Colonnade. */}
      {[132, 156, 180, 204, 228, 252, 276].map((x) => (
        <path key={x} d={`M${x} 186v-52`} />
      ))}
      <path d="M124 134h172" />
      <path d="M124 186h172" />
      {/* Wing windows. */}
      {[56, 76, 96].map((x) => (
        <path key={`l${x}`} d={`M${x} 146v22`} />
      ))}
      {[324, 344, 364].map((x) => (
        <path key={`r${x}`} d={`M${x} 146v22`} />
      ))}
      {/* Steps and ground line. */}
      <path d="M118 186h184M110 192h200M100 198h220" />
      <path d="M14 198h392" strokeOpacity="0.45" />
    </svg>
  );
}
