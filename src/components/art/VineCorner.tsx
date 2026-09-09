import Image from 'next/image';

const CORNERS = {
  'bottom-right': '',
  'bottom-left': 'scale-x-[-1]',
  'top-right': 'scale-y-[-1]',
  'top-left': 'scale-[-1]',
} as const;

/**
 * Painted grapevine corner ornament.
 *
 * The asset carries real transparency — its white studio background was flood
 * filled away from the borders, so enclosed light details (the blossoms, the
 * cut fig) survived. It deliberately does not rely on `mix-blend-mode`:
 * the animated wrappers around these sections create their own stacking
 * contexts, which would leave a blended element sitting on a pale box.
 */
export function VineCorner({
  corner = 'bottom-right',
  className = '',
}: {
  corner?: keyof typeof CORNERS;
  className?: string;
}) {
  return (
    <Image
      src="/art/vine-corner.webp"
      alt=""
      width={1000}
      height={1000}
      aria-hidden="true"
      className={`pointer-events-none select-none ${CORNERS[corner]} ${className}`}
    />
  );
}
