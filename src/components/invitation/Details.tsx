'use client';

import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/invitation/Section';
import { useT } from '@/components/LanguageProvider';
import { useTemplate } from '@/components/TemplateProvider';

export function Details() {
  const t = useT();
  const { Divider, Corner } = useTemplate();

  return (
    <Section section="details">
      {/*
        The ornament spills over the band's edges, as in the printed
        references. It is held inside the card's width so nothing is cut off
        at the screen edge, and sits behind the text.
      */}
      {Corner ? (
        <>
          <Corner className="pointer-events-none absolute -right-6 -top-16 -z-10 w-32 sm:w-52" />
          <Corner className="pointer-events-none absolute -bottom-24 -left-6 -z-10 w-24 rotate-180 sm:w-44" />
        </>
      ) : null}

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
