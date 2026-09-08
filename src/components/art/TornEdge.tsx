/**
 * Deckled paper edge used between sections. `position` decides whether the
 * shape hangs off the top or the bottom of the band it belongs to.
 */
export function TornEdge({
  color = '#f8ece0',
  position = 'bottom',
  className = '',
}: {
  color?: string;
  position?: 'top' | 'bottom';
  className?: string;
}) {
  const d =
    position === 'bottom'
      ? 'M0 0h1440v26c-96 10-152-6-248-2s-140 18-236 15-152-19-248-15-140 20-236 16-152-18-248-14-152 12-224 6z'
      : 'M1440 44H0V18c96-10 152 6 248 2s140-18 236-15 152 19 248 15 140-20 236-16 152 18 248 14 152-12 224-6z';

  return (
    <svg
      viewBox="0 0 1440 44"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute left-0 h-6 w-full sm:h-9 ${
        position === 'bottom' ? '-bottom-px' : '-top-px'
      } ${className}`}
      aria-hidden="true"
    >
      <path d={d} fill={color} />
    </svg>
  );
}
