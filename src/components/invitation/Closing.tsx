'use client';

import Image from 'next/image';

import { VineCorner } from '@/components/art/VineCorner';
import { Reveal } from '@/components/Reveal';
import { useT } from '@/components/LanguageProvider';
import { coupleNames, siteConfig } from '@/lib/site-config';

export function Closing() {
  const t = useT();

  return (
    <footer className="paper grain relative overflow-hidden px-6 pb-16 pt-20 text-center">
      <Reveal>
        <p className="section-title text-3xl sm:text-4xl">{t.closingLine}</p>
        <p className="mt-4 text-2xl text-ink-500">{coupleNames}</p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="relative mx-auto mt-12 max-w-sm">
          {siteConfig.couplePhoto ? (
            <Image
              src={siteConfig.couplePhoto}
              alt={`${coupleNames}`}
              width={1000}
              height={1328}
              // The painting's own cream is a shade off the page, so a hairline
              // frame turns that edge into an intentional printed border.
              className="w-full border border-gold-300/50"
            />
          ) : (
            <div className="flex aspect-[4/5] w-full items-center justify-center border border-gold-300/60 bg-cream-100">
              <p className="max-w-[14rem] text-base leading-relaxed text-ink-400">
                {t.photoPlaceholder}
              </p>
            </div>
          )}

          {/* The painted portrait carries its own vine garland; the drawn
              corners only frame the empty placeholder. */}
          {siteConfig.couplePhoto ? null : (
            <>
              <VineCorner corner="bottom-left" className="absolute -bottom-12 -left-14 w-40 sm:w-48" />
              <VineCorner corner="bottom-right" className="absolute -bottom-12 -right-14 w-40 sm:w-48" />
            </>
          )}
        </div>
      </Reveal>

      <p className="mt-20 text-xs uppercase tracking-widest text-gold-600/70">
        {siteConfig.dateLabel}
      </p>
    </footer>
  );
}
