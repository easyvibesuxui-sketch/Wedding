import Image from 'next/image';

import { FloralSpray } from '@/components/art/FloralSpray';
import { Reveal } from '@/components/Reveal';
import { coupleNames, siteConfig } from '@/lib/site-config';

export function Closing() {
  return (
    <footer className="paper grain relative overflow-hidden px-6 pb-16 pt-20 text-center">
      <Reveal>
        <p className="section-title text-3xl sm:text-4xl">{siteConfig.copy.closingLine}</p>
        <p className="mt-4 text-2xl text-ink-500">{coupleNames}</p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="relative mx-auto mt-12 max-w-sm">
          {siteConfig.couplePhoto ? (
            <Image
              src={siteConfig.couplePhoto}
              alt={`${coupleNames} together`}
              width={640}
              height={800}
              className="w-full object-cover"
            />
          ) : (
            <div className="flex aspect-[4/5] w-full items-center justify-center border border-gold-300/60 bg-cream-100">
              <p className="max-w-[14rem] text-base leading-relaxed text-ink-400">
                {siteConfig.copy.photoPlaceholder}
              </p>
            </div>
          )}

          <FloralSpray
            side="left"
            className="pointer-events-none absolute -bottom-10 -left-10 w-32 sm:w-40"
          />
          <FloralSpray
            side="right"
            className="pointer-events-none absolute -bottom-10 -right-10 w-32 sm:w-40"
          />
        </div>
      </Reveal>

      <p className="mt-20 text-xs uppercase tracking-widest text-gold-600/70">
        {siteConfig.dateLabel}
      </p>
    </footer>
  );
}
