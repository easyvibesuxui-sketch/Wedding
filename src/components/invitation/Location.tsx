'use client';

import { Reveal } from '@/components/Reveal';
import { FramedImage } from '@/components/invitation/FramedImage';
import { Section } from '@/components/invitation/Section';
import { VenueSketch } from '@/components/art/VenueSketch';
import { useT } from '@/components/LanguageProvider';
import { useTemplate } from '@/components/TemplateProvider';
import { mapEmbedUrl, mapLinkUrl, siteConfig } from '@/lib/site-config';

export function Location() {
  const t = useT();
  const { Divider } = useTemplate();

  return (
    <Section section="location" id="location">
      <div className="mx-auto max-w-lg text-center">
        <Reveal>
          <h2 className="section-title">{t.locationTitle}</h2>
          <Divider className="mx-auto mt-3" />
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-8 font-heading text-2xl text-t-ink">{t.venueName}</p>
          <p className="mt-2 text-base text-t-ink-soft">{t.venueAddress}</p>
          <p className="mt-4 text-base text-t-ink-soft">
            {t.dateLong} · {t.timeLabel}
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mx-auto mt-10 max-w-sm">
            {siteConfig.venueArt ? (
              <FramedImage src={siteConfig.venueArt} alt={t.venueName} width={1300} height={866} fit="contain" />
            ) : (
              <VenueSketch className="w-full" />
            )}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="relative mt-10 border border-t-line/70 p-2">
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-t-surface px-2 text-t-accent" aria-hidden="true">
              &#9670;
            </span>
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-t-surface px-2 text-t-accent" aria-hidden="true">
              &#9670;
            </span>
            {/*
              What shows until the map draws — and instead of it, where Google
              Maps is blocked or slow — so the frame is never an empty box.
            */}
            <div className="relative h-64 w-full sm:h-72">
              <a
                href={mapLinkUrl}
                target="_blank"
                rel="noreferrer"
                className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-t-ink/5 text-t-ink-soft"
                tabIndex={-1}
              >
                <svg width="28" height="36" viewBox="0 0 28 36" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                  <path d="M14 34s11-11.5 11-20a11 11 0 1 0-22 0c0 8.5 11 20 11 20Z" />
                  <circle cx="14" cy="14" r="4" />
                </svg>
                <span className="text-sm">{t.venueName}</span>
              </a>
              <iframe
                title={t.venueName}
                src={mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="relative h-full w-full border-0 grayscale-[0.25]"
              />
            </div>
          </div>

          <a
            href={mapLinkUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block border border-t-line px-7 py-3 text-xs uppercase tracking-widest text-t-accent transition-colors hover:bg-t-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-t-accent focus-visible:ring-offset-2"
          >
            {t.openInMaps}
          </a>
        </Reveal>
      </div>
    </Section>
  );
}
