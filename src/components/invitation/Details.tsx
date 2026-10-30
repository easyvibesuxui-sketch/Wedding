'use client';

import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/invitation/Section';
import { useT } from '@/components/LanguageProvider';
import { useTemplate } from '@/components/TemplateProvider';

export function Details() {
  const t = useT();
  const { Divider, Corner } = useTemplate();

  return (
    // Not a stacking context of its own: the ornaments then sit over the
    // next band — its seam included — instead of being cut off by it, while
    // the band itself stays under that seam.
    <Section
      section="details"
      contained={false}
      decor={
        /*
          The ornament spills over the band's edges, as in the printed
          references. It is placed against the band, so it stays clear of
          the heading below it. The lower one is mirrored, not turned over,
          so a bouquet or a glass stays upright.
        */
        Corner ? (
          <>
            <Corner className="pointer-events-none absolute -right-6 -top-14 z-20 w-32 sm:w-52" />
            <Corner className="pointer-events-none absolute -bottom-14 -left-6 z-20 w-28 -scale-x-100 sm:w-44" />
          </>
        ) : null
      }
    >
      <div className="relative mx-auto max-w-md space-y-14 px-4 text-center">
        <Reveal>
          <h2 className="section-title">{t.dressCodeTitle}</h2>
          <Divider className="mx-auto mt-3" />
          <p className="mt-6 text-lg leading-relaxed text-t-ink-soft">{t.dressCode}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="section-title">{t.giftTitle}</h2>
          <Divider className="mx-auto mt-3" />
          <p className="mt-6 text-lg leading-relaxed text-t-ink-soft">{t.giftPreference}</p>
        </Reveal>
      </div>
    </Section>
  );
}
