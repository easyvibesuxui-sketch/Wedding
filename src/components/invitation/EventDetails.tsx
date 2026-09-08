import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/invitation/Section';
import { siteConfig } from '@/lib/site-config';

export function EventDetails() {
  const { dateLabel, timeLabel, venue } = siteConfig;

  return (
    <Section id="details" eyebrow="The Details" title="When &amp; Where">
      <div className="grid gap-10 sm:grid-cols-2">
        <Reveal className="border-t border-gold-200 pt-8 text-center sm:text-left">
          <h3 className="font-serif text-xl text-sage-800">Date &amp; Time</h3>
          <p className="mt-4 text-sage-600">{dateLabel}</p>
          <p className="mt-1 text-sage-600">{timeLabel}</p>
        </Reveal>

        <Reveal delay={0.12} className="border-t border-gold-200 pt-8 text-center sm:text-left">
          <h3 className="font-serif text-xl text-sage-800">Venue</h3>
          <p className="mt-4 text-sage-600">{venue.name}</p>
          <p className="mt-1 text-sage-600">{venue.address}</p>
          <a
            href={venue.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block border-b border-gold-300 pb-0.5 text-xs uppercase tracking-wider text-gold-500 transition-colors hover:text-sage-700"
          >
            View on map
          </a>
        </Reveal>
      </div>
    </Section>
  );
}
