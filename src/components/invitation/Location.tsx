'use client';

import { Flourish } from '@/components/art/Flourish';
import { Reveal } from '@/components/Reveal';
import { TornEdge } from '@/components/art/TornEdge';
import Image from 'next/image';

import { VenueSketch } from '@/components/art/VenueSketch';
import { useT } from '@/components/LanguageProvider';
import { mapEmbedUrl, mapLinkUrl, siteConfig } from '@/lib/site-config';

export function Location() {
  const t = useT();

  return (
    <section id="location" className="paper-light grain relative overflow-hidden px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-lg text-center">
        <Reveal>
          <h2 className="section-title">{t.locationTitle}</h2>
          <Flourish className="mx-auto mt-3" />
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-8 text-2xl text-ink-600">{t.venueName}</p>
          <p className="mt-2 text-base text-ink-500">{t.venueAddress}</p>
          <p className="mt-4 text-base text-ink-500">
            {t.dateLong} · {t.timeLabel}
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          {siteConfig.venueArt ? (
            <Image
              src={siteConfig.venueArt}
              alt={t.venueName}
              width={900}
              height={600}
              className="mx-auto mt-10 w-full max-w-sm"
            />
          ) : (
            <VenueSketch className="mx-auto mt-10 w-full max-w-sm" />
          )}
        </Reveal>

        <Reveal delay={0.2}>
          {/* Gold ornamental frame around the live map. */}
          <div className="relative mt-10 rounded-sm border border-gold-300/70 p-2">
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-cream-100 px-2 text-gold-400" aria-hidden="true">
              &#9670;
            </span>
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-cream-100 px-2 text-gold-400" aria-hidden="true">
              &#9670;
            </span>
            <iframe
              title={t.venueName}
              src={mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-64 w-full border-0 grayscale-[0.25] sm:h-72"
            />
          </div>

          <a
            href={mapLinkUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block border border-gold-300 px-7 py-3 text-xs uppercase tracking-widest text-gold-600 transition-colors hover:bg-gold-300/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2"
          >
            {t.openInMaps}
          </a>
        </Reveal>
      </div>

      <TornEdge position="bottom" color="#f8ece0" />
    </section>
  );
}
