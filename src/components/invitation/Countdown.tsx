'use client';

import { useEffect, useState } from 'react';

import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/invitation/Section';
import { useT } from '@/components/LanguageProvider';
import { useTemplate } from '@/components/TemplateProvider';
import { siteConfig } from '@/lib/site-config';

const UNITS = ['days', 'hours', 'minutes', 'seconds'] as const;
const DAY_MS = 86_400_000;

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

/** Before the day, on the day, or after it — the clock only runs before. */
function phase(target: number): 'before' | 'today' | 'after' {
  const now = Date.now();
  if (now < target) return 'before';
  return now < target + DAY_MS ? 'today' : 'after';
}

export function Countdown() {
  const t = useT();
  const { countdown, Divider } = useTemplate();
  const target = new Date(siteConfig.date).getTime();
  // Rendered empty on the server so the markup cannot mismatch the first tick.
  const [left, setLeft] = useState<ReturnType<typeof remaining> | null>(null);
  const [when, setWhen] = useState<ReturnType<typeof phase>>('before');

  useEffect(() => {
    const tick = () => {
      setLeft(remaining(target));
      setWhen(phase(target));
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const title =
    when === 'before' ? t.countdownTitle : when === 'today' ? t.countdownTitleToday : t.countdownTitlePast;

  return (
    <Section section="countdown">
      <div className="mx-auto max-w-lg text-center">
        <Reveal>
          <h2 className="section-title">{title}</h2>
          <Divider className="mx-auto mt-3" />
        </Reveal>

        <Reveal delay={0.1}>
          {when === 'before' ? (
            <dl className={`mt-10 flex items-start justify-center ${countdown === 'tiles' ? 'gap-2.5 sm:gap-4' : 'gap-3 sm:gap-6'}`}>
              {UNITS.map((key, i) =>
                countdown === 'tiles' ? (
                  <div
                    key={key}
                    className="flex w-[4.4rem] flex-col items-center rounded-sm border border-t-line/60 py-3 sm:w-24 sm:py-4"
                  >
                    <dd className="font-heading text-3xl tabular-nums text-t-accent sm:text-4xl">
                      {left ? String(left[key]).padStart(2, '0') : '––'}
                    </dd>
                    <dt className="mt-1 text-[0.7rem] tracking-wider text-t-ink-soft sm:text-xs">
                      {t.countdownUnits[key]}
                    </dt>
                  </div>
                ) : (
                  <div key={key} className="flex items-start gap-3 sm:gap-6">
                    {i > 0 ? (
                      <span aria-hidden="true" className="pt-1 text-4xl text-t-accent/50 sm:text-5xl">
                        :
                      </span>
                    ) : null}
                    <div className="min-w-[3.4rem] sm:min-w-[4.5rem]">
                      <dd className="font-heading text-4xl tabular-nums text-t-accent sm:text-5xl">
                        {left ? String(left[key]).padStart(2, '0') : '––'}
                      </dd>
                      <dt className="mt-1 text-xs tracking-wider text-t-ink-soft sm:text-sm">
                        {t.countdownUnits[key]}
                      </dt>
                    </div>
                  </div>
                ),
              )}
            </dl>
          ) : (
            // Once the day has come, a clock stuck at zero reads as broken:
            // the date itself says it better.
            <p className="mt-8 font-heading text-2xl tracking-[0.12em] text-t-ink sm:text-3xl">
              {t.dateLong}
            </p>
          )}
        </Reveal>
      </div>
    </Section>
  );
}
