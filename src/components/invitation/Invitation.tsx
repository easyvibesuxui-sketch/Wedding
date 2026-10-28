'use client';

import { useState } from 'react';

import { LanguageProvider } from '@/components/LanguageProvider';
import { TemplateProvider } from '@/components/TemplateProvider';
import { Blessing } from '@/components/invitation/Blessing';
import { Closing } from '@/components/invitation/Closing';
import { Countdown } from '@/components/invitation/Countdown';
import { Details } from '@/components/invitation/Details';
import { LanguageSwitcher } from '@/components/invitation/LanguageSwitcher';
import { Location } from '@/components/invitation/Location';
import { MusicToggle } from '@/components/invitation/MusicToggle';
import { RsvpSection } from '@/components/invitation/RsvpSection';
import { Schedule } from '@/components/invitation/Schedule';
import { TemplateBar } from '@/components/invitation/TemplateBar';
import type { Lang } from '@/lib/i18n';
import { getTemplate } from '@/templates/registry';
import type { TemplateId } from '@/templates/types';

export function Invitation({
  initialLang,
  templateId,
  previewing,
}: {
  initialLang: Lang;
  templateId: TemplateId;
  /** Opened from the design gallery: offers the way back to it. */
  previewing: boolean;
}) {
  const template = getTemplate(templateId);
  const { Opening, Hero, Ambient } = template;
  // The opening gates everything: the hero only animates once it is opened,
  // and that same gesture is what lets the music start.
  const [opened, setOpened] = useState(false);

  return (
    <LanguageProvider initialLang={initialLang}>
      <TemplateProvider template={template} className="min-h-screen bg-t-page">
        <Opening onOpen={() => setOpened(true)} />

        <main className="mx-auto max-w-2xl overflow-x-clip bg-t-bg shadow-[0_0_60px_rgba(0,0,0,0.12)]">
          <Hero start={opened} />
          <Blessing />
          <Countdown />
          <Schedule />
          <Location />
          <Details />
          <RsvpSection />
          <Closing />
        </main>

        {Ambient ? <Ambient /> : null}
        <LanguageSwitcher visible={opened} />
        <MusicToggle autoStart={opened} />
        {previewing ? <TemplateBar current={templateId} visible={opened} /> : null}
      </TemplateProvider>
    </LanguageProvider>
  );
}
