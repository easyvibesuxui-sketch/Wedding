'use client';

import { useEffect, useState } from 'react';

import { Reveal } from '@/components/Reveal';
import { TornEdge } from '@/components/art/TornEdge';
import { siteConfig } from '@/lib/site-config';

const UNITS = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
] as const;

function remaining(target: number) {
  const diff = Math.max(0, target - Date.now());
  const seconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
}

export function Countdown() {
  const target = new Date(siteConfig.date).getTime();
  // Rendered empty on the server so the markup cannot mismatch the first tick.
  const [left, setLeft] = useState<ReturnType<typeof remaining> | null>(null);

  useEffect(() => {
    setLeft(remaining(target));
    const id = window.setInterval(() => setLeft(remaining(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const done = left !== null && left.days + left.hours + left.minutes + left.seconds === 0;

  return (
    <section className="paper-light grain relative overflow-hidden px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-lg text-center">
        <Reveal>
          <h2 className="script-title">
            {done ? 'Today Is The Day' : 'The Celebration Begins In'}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="mt-10 flex items-start justify-center gap-3 sm:gap-6">
            {UNITS.map(({ key, label }, i) => (
              <div key={key} className="flex items-start gap-3 sm:gap-6">
                {i > 0 ? (
                  <span aria-hidden="true" className="pt-1 text-4xl text-gold-300 sm:text-5xl">
                    :
                  </span>
                ) : null}
                <div className="min-w-[3.4rem] sm:min-w-[4.5rem]">
                  <dd className="font-serif text-4xl tabular-nums text-gold-500 sm:text-5xl">
                    {left ? String(left[key]).padStart(2, '0') : '––'}
                  </dd>
                  <dt className="mt-1 text-xs uppercase tracking-wider text-gold-600/75 sm:text-sm">
                    {label}
                  </dt>
                </div>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <TornEdge position="bottom" color="#f8ece0" />
    </section>
  );
}
