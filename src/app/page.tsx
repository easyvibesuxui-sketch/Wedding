'use client';

import { useState } from 'react';

import { Blessing } from '@/components/invitation/Blessing';
import { Closing } from '@/components/invitation/Closing';
import { Countdown } from '@/components/invitation/Countdown';
import { Details } from '@/components/invitation/Details';
import { EnvelopeGate } from '@/components/invitation/EnvelopeGate';
import { Hero } from '@/components/invitation/Hero';
import { Location } from '@/components/invitation/Location';
import { MusicToggle } from '@/components/invitation/MusicToggle';
import { Petals } from '@/components/invitation/Petals';
import { RsvpSection } from '@/components/invitation/RsvpSection';
import { Timeline } from '@/components/invitation/Timeline';

export default function InvitationPage() {
  // The envelope gates everything: the hero only animates once it is opened,
  // and that same gesture is what lets the music start.
  const [opened, setOpened] = useState(false);

  return (
    <>
      <EnvelopeGate onOpen={() => setOpened(true)} />

      <main className="mx-auto max-w-2xl overflow-hidden bg-cream-200 shadow-[0_0_60px_rgba(120,95,60,0.12)]">
        <Hero start={opened} />
        <Blessing />
        <Countdown />
        <Timeline />
        <Location />
        <Details />
        <RsvpSection />
        <Closing />
      </main>

      <Petals />
      <MusicToggle autoStart={opened} />
    </>
  );
}
