'use client';

import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/invitation/Section';
import { useT } from '@/components/LanguageProvider';
import { useTemplate } from '@/components/TemplateProvider';

export function Blessing() {
  const t = useT();
  const { Divider } = useTemplate();

  return (
    <Section section="blessing" id="blessing">
      <div className="mx-auto max-w-md text-center">
        <Reveal>
          <Divider className="mx-auto" />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 space-y-1">
            {t.blessing.map((line) => (
              <p key={line} className="section-title">
                {line}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-10 text-lg text-t-ink">{t.invitationLine}</p>
          {t.invitationBody.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-lg leading-relaxed text-t-ink-soft">
              {paragraph}
            </p>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
