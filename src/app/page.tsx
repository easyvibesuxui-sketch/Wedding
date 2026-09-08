import { EventDetails } from '@/components/invitation/EventDetails';
import { Footer } from '@/components/invitation/Footer';
import { Hero } from '@/components/invitation/Hero';
import { RsvpForm } from '@/components/invitation/RsvpForm';
import { Section } from '@/components/invitation/Section';
import { Timeline } from '@/components/invitation/Timeline';

export default function InvitationPage() {
  return (
    <main>
      <Hero />
      <EventDetails />
      <Timeline />
      <Section id="rsvp" eyebrow="Répondez s'il vous plaît" title="Will you join us?">
        <RsvpForm />
      </Section>
      <Footer />
    </main>
  );
}
