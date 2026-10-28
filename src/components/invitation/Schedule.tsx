'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/invitation/Section';
import { useT } from '@/components/LanguageProvider';
import { useTemplate } from '@/components/TemplateProvider';
import { siteConfig } from '@/lib/site-config';

export function Schedule() {
  const t = useT();
  const { schedule, Divider } = useTemplate();

  return (
    <Section section="schedule" id="schedule">
      <div className="mx-auto max-w-md">
        <Reveal className="text-center">
          <h2 className="section-title">{t.scheduleTitle}</h2>
          <Divider className="mx-auto mt-3" />
        </Reveal>

        {schedule === 'cards' ? <Cards /> : <Spine />}
      </div>
    </Section>
  );
}

/** A vertical spine with a node per entry and the template's marker travelling down it. */
function Spine() {
  const t = useT();
  const { Marker } = useTemplate();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] });
  const eased = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 });
  // Travels between the first and last node rather than the full column.
  const top = useTransform(eased, [0, 1], ['10%', '90%']);

  return (
    <ol
      ref={ref}
      // The spine and the marker sit on the node column, which starts where
      // the time column ends.
      className="relative mt-12 [--spine:6.25rem]"
    >
      <div className="pointer-events-none absolute inset-y-2 left-[var(--spine)] w-px -translate-x-1/2 bg-t-line/60" />
      {Marker ? (
        <motion.div
          className="pointer-events-none absolute left-[var(--spine)] z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ top }}
          aria-hidden="true"
        >
          <Marker className="h-9 w-9 drop-shadow-sm" />
        </motion.div>
      ) : null}

      {siteConfig.scheduleTimes.map((time, index) => (
        <li key={time} className="relative grid grid-cols-[5.5rem_1.5rem_1fr] items-start py-6">
          <Reveal delay={index * 0.08} className="pr-3 text-right">
            <span className="font-heading text-2xl text-t-ink sm:text-3xl">{time}</span>
          </Reveal>

          <span
            className="mt-3 h-2.5 w-2.5 rotate-45 justify-self-center bg-t-accent/90 ring-4 ring-t-surface"
            aria-hidden="true"
          />

          <Reveal delay={index * 0.08 + 0.05} className="pl-4 text-left">
            <span className="text-lg leading-snug text-t-ink-soft sm:text-xl">{t.schedule[index]}</span>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

/** One framed card per entry, the time set large above its label. */
function Cards() {
  const t = useT();

  return (
    <ol className="mt-12 space-y-4">
      {siteConfig.scheduleTimes.map((time, index) => (
        <li key={time}>
          <Reveal delay={index * 0.1}>
            <div className="flex items-center gap-5 border border-t-line/60 px-5 py-5">
              <span className="font-heading text-3xl tabular-nums text-t-accent">{time}</span>
              <span className="h-10 w-px bg-t-line/60" aria-hidden="true" />
              <span className="text-lg leading-snug text-t-ink-soft">{t.schedule[index]}</span>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
