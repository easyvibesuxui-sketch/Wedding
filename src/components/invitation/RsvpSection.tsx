import { Flourish } from '@/components/art/Flourish';
import { Reveal } from '@/components/Reveal';
import { Seal } from '@/components/art/Seal';
import { TornEdge } from '@/components/art/TornEdge';
import { RsvpForm } from '@/components/invitation/RsvpForm';
import { siteConfig } from '@/lib/site-config';

export function RsvpSection() {
  return (
    <section id="rsvp" className="paper-light grain relative overflow-hidden px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-md text-center">
        <Reveal>
          <h2 className="section-title">{siteConfig.copy.rsvpTitle}</h2>
          <Flourish className="mx-auto mt-3" />
          <p className="mt-6 text-lg leading-relaxed text-ink-500">{siteConfig.copy.rsvpIntro}</p>
        </Reveal>

        {siteConfig.rsvpEnabled ? (
          <RsvpForm />
        ) : (
          /* Replies are collected elsewhere for now, so the seal is pressed
             into the page as an ornament: nothing to tap, nothing to fill in. */
          <Reveal delay={0.1}>
            <div className="mt-12 flex justify-center">
              <Seal label={siteConfig.couple.monogram} size={124} />
            </div>
          </Reveal>
        )}
      </div>

      <TornEdge position="bottom" color="#f8ece0" />
    </section>
  );
}
