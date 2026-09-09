import { Flourish } from '@/components/art/Flourish';
import { Reveal } from '@/components/Reveal';
import { TornEdge } from '@/components/art/TornEdge';
import { siteConfig } from '@/lib/site-config';

export function Blessing() {
  return (
    <section id="blessing" className="paper grain relative overflow-hidden px-6 py-20 sm:py-24">
      <TornEdge position="top" color="#f8ece0" />

      <div className="mx-auto max-w-md text-center">
        <Reveal>
          <Flourish className="mx-auto" />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 space-y-1">
            {siteConfig.copy.blessing.map((line: string) => (
              <p key={line} className="section-title">
                {line}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-10 text-lg text-ink-500">{siteConfig.copy.invitationLine}</p>
          <p className="mt-3 text-lg leading-relaxed text-ink-500">{siteConfig.copy.invitationBody}</p>
        </Reveal>
      </div>

      <TornEdge position="bottom" color="#faf3e8" />
    </section>
  );
}
