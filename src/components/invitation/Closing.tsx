'use client';

import { Reveal } from '@/components/Reveal';
import { FramedImage } from '@/components/invitation/FramedImage';
import { Section } from '@/components/invitation/Section';
import { useT } from '@/components/LanguageProvider';
import { useTemplate } from '@/components/TemplateProvider';
import { coupleNames, siteConfig } from '@/lib/site-config';

export function Closing() {
  const t = useT();
  const { Divider } = useTemplate();

  return (
    <Section section="closing" as="footer" className="!pb-16 text-center">
      <Reveal>
        <p className="section-title !text-3xl sm:!text-4xl">{t.closingLine}</p>
        <p className="mt-4 font-display text-4xl text-t-ink">{coupleNames}</p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mx-auto mt-12 max-w-sm">
          {siteConfig.couplePhoto ? (
            <FramedImage src={siteConfig.couplePhoto} alt={coupleNames} width={1000} height={1328} />
          ) : (
            <div className="flex aspect-[4/5] w-full items-center justify-center border border-t-line/60 bg-t-bg-alt">
              <p className="max-w-[14rem] text-base leading-relaxed text-t-ink-soft">{t.photoPlaceholder}</p>
            </div>
          )}
        </div>
      </Reveal>

      <Divider className="mx-auto mt-16" />
      <p className="mt-4 text-xs uppercase tracking-widest text-t-accent/80">{siteConfig.dateLabel}</p>
    </Section>
  );
}
