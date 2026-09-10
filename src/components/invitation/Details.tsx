'use client';

import { Flourish } from '@/components/art/Flourish';
import { VineCorner } from '@/components/art/VineCorner';
import { Reveal } from '@/components/Reveal';
import { TornEdge } from '@/components/art/TornEdge';
import { useT } from '@/components/LanguageProvider';

export function Details() {
  const t = useT();

  return (
    <section className="paper grain relative overflow-hidden px-6 py-20 sm:py-24">
      {/* The vine spills over the torn edges, as in the printed references. */}
      <VineCorner corner="top-right" className="absolute -right-10 -top-12 w-48 sm:w-64" />
      <VineCorner corner="bottom-left" className="absolute -bottom-10 -left-12 w-44 sm:w-60" />

      <div className="relative mx-auto max-w-md space-y-14 text-center">
        <Reveal>
          <h2 className="section-title">{t.dressCodeTitle}</h2>
          <Flourish className="mx-auto mt-3" />
          <p className="mt-6 text-lg leading-relaxed text-ink-500">{t.dressCode}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="section-title">{t.giftTitle}</h2>
          <Flourish className="mx-auto mt-3" />
          <p className="mt-6 text-lg leading-relaxed text-ink-500">{t.giftPreference}</p>
        </Reveal>
      </div>

      <TornEdge position="bottom" color="#faf3e8" />
    </section>
  );
}
