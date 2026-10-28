'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { LanguageProvider, useT } from '@/components/LanguageProvider';
import { TemplateProvider } from '@/components/TemplateProvider';
import { LanguageSwitcher } from '@/components/invitation/LanguageSwitcher';
import type { Lang } from '@/lib/i18n';
import { siteConfig } from '@/lib/site-config';
import { ALL_TEMPLATES, getTemplate } from '@/templates/registry';
import type { TemplateDef } from '@/templates/types';

/** The miniature is drawn at phone size and scaled down to the card. */
const PHONE = { width: 390, height: 720 };

export function Gallery({ initialLang }: { initialLang: Lang }) {
  return (
    <LanguageProvider initialLang={initialLang}>
      {/* The gallery's own chrome wears the configured design's colours. */}
      <TemplateProvider template={getTemplate(siteConfig.template)} className="min-h-screen bg-t-page">
        <GalleryBody />
        <LanguageSwitcher visible />
      </TemplateProvider>
    </LanguageProvider>
  );
}

function GalleryBody() {
  const t = useT();

  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 pt-20 sm:px-8">
      <header className="mx-auto max-w-xl text-center">
        <h1 className="section-title !text-3xl sm:!text-4xl">{t.galleryTitle}</h1>
        <p className="mt-4 text-base leading-relaxed text-t-ink-soft">{t.galleryIntro}</p>
      </header>

      <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
        {ALL_TEMPLATES.map((template) => (
          <li key={template.id}>
            <Card template={template} />
          </li>
        ))}
      </ul>
    </main>
  );
}

function Card({ template }: { template: TemplateDef }) {
  const t = useT();
  const words = t.templates[template.id];
  const { palette } = template;
  const isCurrent = template.id === siteConfig.template;

  // An article, not one big link: the miniature holds the hero's own links,
  // and links may not nest. The name's link is stretched over the card.
  return (
    <article className="group relative">
      <Miniature template={template} />

      <div className="mt-3 flex items-center gap-1.5" aria-hidden="true">
        {[palette.bg, palette.accent, palette.inverse, palette.cta].map((color, i) => (
          <span key={i} className="h-3.5 w-3.5 rounded-full border border-black/10" style={{ background: color }} />
        ))}
        {isCurrent ? (
          <span className="ml-auto rounded-full bg-t-cta px-2 py-0.5 text-[0.65rem] tracking-wider text-t-on-cta">
            {t.galleryCurrent}
          </span>
        ) : null}
      </div>
      <h2 className="mt-2 font-heading text-lg text-t-ink">
        <Link
          href={`/?t=${template.id}`}
          className="rounded-sm after:absolute after:inset-0 after:rounded-2xl focus:outline-none focus-visible:after:ring-2 focus-visible:after:ring-t-accent focus-visible:after:ring-offset-4"
        >
          {words.name}
        </Link>
      </h2>
      <p className="mt-1 text-sm leading-snug text-t-ink-soft">{words.mood}</p>
      <span className="mt-2 inline-block text-xs uppercase tracking-widest text-t-accent group-hover:underline" aria-hidden="true">
        {t.galleryOpen}
      </span>
    </article>
  );
}

/**
 * The template's own first screen, drawn at phone size and scaled to fit the
 * card. It is a picture of the design, not part of the page: hidden from
 * assistive technology and inert, so its heading and links do not count.
 */
function Miniature({ template }: { template: TemplateDef }) {
  const { Hero } = template;
  const frame = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.4);

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / PHONE.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={frame}
      className="relative overflow-hidden rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-transform duration-300 group-hover:-translate-y-1"
      style={{ aspectRatio: `${PHONE.width} / ${PHONE.height}` }}
      aria-hidden="true"
      inert
    >
      <TemplateProvider
        template={template}
        className="pointer-events-none absolute left-0 top-0 origin-top-left"
        style={{ width: PHONE.width, transform: `scale(${scale})`, ['--hero-h' as string]: `${PHONE.height}px` }}
      >
        <Hero start />
      </TemplateProvider>
    </div>
  );
}
