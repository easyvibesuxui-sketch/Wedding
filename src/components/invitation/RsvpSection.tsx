'use client';

import { Reveal } from '@/components/Reveal';
import { RsvpForm } from '@/components/invitation/RsvpForm';
import { Section } from '@/components/invitation/Section';
import { useT } from '@/components/LanguageProvider';
import { useTemplate } from '@/components/TemplateProvider';
import { siteConfig } from '@/lib/site-config';

export function RsvpSection() {
  const t = useT();
  const { Divider, Emblem } = useTemplate();

  return (
    <Section section="rsvp" id="rsvp">
      <div className="mx-auto max-w-md text-center">
        <Reveal>
          <h2 className="section-title">{t.rsvpTitle}</h2>
          <Divider className="mx-auto mt-3" />
          <p className="mt-6 text-lg leading-relaxed text-t-ink-soft">{t.rsvpIntro}</p>
        </Reveal>

        {siteConfig.rsvpEnabled ? (
          <RsvpForm />
        ) : (
          /* Replies are collected elsewhere for now, so the emblem is pressed
             into the page as an ornament: nothing to tap, nothing to fill in. */
          <Reveal delay={0.1}>
            <div className="mt-12 flex justify-center">
              <Emblem size={124} />
            </div>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
