'use client';

import { useState } from 'react';

import { LanguageProvider } from '@/components/LanguageProvider';
import { Blessing } from '@/components/invitation/Blessing';
import { Closing } from '@/components/invitation/Closing';
import { Countdown } from '@/components/invitation/Countdown';
import { Details } from '@/components/invitation/Details';
import { EnvelopeGate } from '@/components/invitation/EnvelopeGate';
import { Hero } from '@/components/invitation/Hero';
import { LanguageSwitcher } from '@/components/invitation/LanguageSwitcher';
import { Location } from '@/components/invitation/Location';
import { MusicToggle } from '@/components/invitation/MusicToggle';
import { Petals } from '@/components/invitation/Petals';
import { RsvpSection } from '@/components/invitation/RsvpSection';
import { Schedule } from '@/components/invitation/Schedule';
import type { Lang } from '@/lib/i18n';

export function Invitation({ initialLang }: { initialLang: Lang }) {
  // The envelope gates everything: the hero only animates once it is opened,
  // and that same gesture is what lets the music start.
  const [opened, setOpened] = useState(false);

  return (
    <LanguageProvider initialLang={initialLang}>
      <EnvelopeGate onOpen={() => setOpened(true)} />

      <main className="mx-auto max-w-2xl overflow-hidden bg-cream-200 shadow-[0_0_60px_rgba(120,95,60,0.12)]">
        <Hero start={opened} />
        <Blessing />
        <Countdown />
        <Schedule />
        <Location />
        <Details />
        <RsvpSection />
        <Closing />
      </main>

      <Petals />
      <LanguageSwitcher visible={opened} />
      <MusicToggle autoStart={opened} />
    </LanguageProvider>
  );
}
