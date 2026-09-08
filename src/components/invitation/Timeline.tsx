import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/invitation/Section';
import { siteConfig } from '@/lib/site-config';

export function Timeline() {
  return (
    <Section id="timeline" eyebrow="The Day" title="Order of Events" className="bg-ivory-50">
      <ol className="relative mx-auto max-w-xl border-l border-gold-200 pl-8 sm:pl-12">
        {siteConfig.timeline.map((item, index) => (
          <li key={item.time} className="relative pb-12 last:pb-0">
            <Reveal delay={index * 0.1}>
              <span
                className="absolute -left-[2.3rem] top-2 h-2 w-2 rotate-45 bg-gold-300 sm:-left-[3.3rem]"
                aria-hidden="true"
              />
              <p className="font-serif text-2xl text-gold-500">{item.time}</p>
              <h3 className="mt-1 text-sm uppercase tracking-wider text-sage-800">{item.title}</h3>
              <p className="mt-2 text-sm text-sage-500">{item.description}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
