import { Flourish } from '@/components/art/Flourish';
import { FloralSpray } from '@/components/art/FloralSpray';
import { Reveal } from '@/components/Reveal';
import { TornEdge } from '@/components/art/TornEdge';
import { siteConfig } from '@/lib/site-config';

export function Details() {
  return (
    <section className="paper grain relative overflow-hidden px-6 py-20 sm:py-24">
      {/* Florals spill over the torn edge, as in the reference. */}
      <FloralSpray
        side="right"
        className="pointer-events-none absolute -right-6 -top-10 w-40 opacity-90 sm:w-52"
      />
      <FloralSpray
        side="left"
        className="pointer-events-none absolute -bottom-8 -left-8 w-36 opacity-85 sm:w-48"
      />

      <div className="relative mx-auto max-w-md space-y-14 text-center">
        <Reveal>
          <h2 className="section-title">{siteConfig.copy.dressCodeTitle}</h2>
          <Flourish className="mx-auto mt-3" />
          <p className="mt-6 text-lg leading-relaxed text-ink-500">{siteConfig.copy.dressCode}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="section-title">{siteConfig.copy.giftTitle}</h2>
          <Flourish className="mx-auto mt-3" />
          <p className="mt-6 text-lg leading-relaxed text-ink-500">{siteConfig.copy.giftPreference}</p>
        </Reveal>
      </div>

      <TornEdge position="bottom" color="#faf3e8" />
    </section>
  );
}
