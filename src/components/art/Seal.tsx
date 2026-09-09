import Image from 'next/image';

import { WaxSeal } from '@/components/art/WaxSeal';
import { siteConfig } from '@/lib/site-config';

/**
 * The wax seal, used on the closed envelope and as the RSVP button.
 * Uses the painted stamp when one is provided, and the drawn seal otherwise —
 * `label` only applies to the drawn fallback, since the painted stamp carries
 * the couple's monogram in the wax itself.
 */
export function Seal({
  label,
  size = 148,
  script = true,
  className = '',
}: {
  label: string;
  size?: number;
  script?: boolean;
  className?: string;
}) {
  if (!siteConfig.sealArt) {
    return <WaxSeal label={label} size={size} script={script} className={className} />;
  }

  return (
    <Image
      src={siteConfig.sealArt}
      alt=""
      width={size}
      height={size}
      priority
      className={`select-none ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
