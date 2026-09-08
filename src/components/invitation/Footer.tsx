import { coupleNames, siteConfig } from '@/lib/site-config';

export function Footer() {
  return (
    <footer className="border-t border-ivory-300 bg-ivory-50 px-6 py-12 text-center">
      <p className="font-serif text-2xl tracking-wide text-sage-800">{coupleNames}</p>
      <p className="mt-3 text-xs uppercase tracking-widest text-gold-500">
        {siteConfig.dateLabel}
      </p>
      <p className="mt-6 text-[0.7rem] text-sage-400">
        Photo by{' '}
        <a
          className="underline underline-offset-2"
          href={siteConfig.heroImageCredit.url}
          target="_blank"
          rel="noreferrer"
        >
          {siteConfig.heroImageCredit.photographer}
        </a>{' '}
        on Unsplash
      </p>
    </footer>
  );
}
