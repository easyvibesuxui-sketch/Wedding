'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

import { Flourish } from '@/components/art/Flourish';
import { SingleBloom } from '@/components/art/FloralSpray';
import { Reveal } from '@/components/Reveal';
import { TornEdge } from '@/components/art/TornEdge';
import { siteConfig } from '@/lib/site-config';

export function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 60%'],
  });
  const eased = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 });
  // Travels between the first and last node rather than the full column.
  const top = useTransform(eased, [0, 1], ['10%', '90%']);

  return (
    <section id="timeline" className="paper grain relative overflow-hidden px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-md">
        <Reveal className="text-center">
          <h2 className="script-title">Schedule of Events</h2>
          <Flourish className="mx-auto mt-3" />
        </Reveal>

        <ol ref={ref} className="relative mt-12">
          {/* The spine, its nodes, and the rose that travels along it. */}
          <div className="pointer-events-none absolute inset-y-2 left-1/2 w-px -translate-x-1/2 bg-gold-300/60" />
          <motion.div
            className="pointer-events-none absolute left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ top }}
            aria-hidden="true"
          >
            <SingleBloom className="h-11 w-11 drop-shadow-sm" />
          </motion.div>

          {siteConfig.timeline.map((item, index) => (
            <li key={item.time} className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-5">
              <Reveal delay={index * 0.08} className="text-right">
                <span className="text-2xl text-ink-600 sm:text-3xl">{item.time}</span>
              </Reveal>

              <span
                className="h-2.5 w-2.5 rotate-45 bg-gold-400/90 ring-4 ring-cream-200"
                aria-hidden="true"
              />

              <Reveal delay={index * 0.08 + 0.05} className="text-left">
                <span className="text-lg leading-snug text-ink-500 sm:text-xl">{item.title}</span>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      <TornEdge position="bottom" color="#faf3e8" />
    </section>
  );
}
