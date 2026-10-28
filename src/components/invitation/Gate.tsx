'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { useT } from '@/components/LanguageProvider';

/**
 * The shell every opening is drawn in. It keeps the page underneath from
 * scrolling until the guest taps, makes the whole screen the tap target, and
 * leaves once the opening has played.
 *
 * The page is already rendered underneath and the opening's own pieces move
 * out of the way to uncover it — nothing fades to a blank colour in between,
 * so the last frame of the opening is the first frame of the page.
 */
export function Gate({
  onOpen,
  duration,
  promptClassName = 'text-t-accent',
  scrim = false,
  children,
}: {
  onOpen: () => void;
  /** How long the opening plays after the tap, in ms. */
  duration: number;
  promptClassName?: string;
  /** Darkens the bottom edge so the prompt stays readable over artwork. */
  scrim?: boolean;
  children: (opening: boolean) => React.ReactNode;
}) {
  const t = useT();
  const reduced = useReducedMotion();
  const [opening, setOpening] = useState(false);
  const [gone, setGone] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    document.body.dataset.sealed = 'true';
    return () => {
      delete document.body.dataset.sealed;
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, []);

  function open() {
    if (opening) return;
    setOpening(true);
    delete document.body.dataset.sealed;
    onOpen();
    timer.current = window.setTimeout(() => setGone(true), reduced ? 300 : duration);
  }

  if (gone) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" style={{ pointerEvents: opening ? 'none' : 'auto' }}>
      {/* Its own stacking context, so no layer of the drawing can rise above the tap target. */}
      <div className="absolute inset-0 isolate">{children(opening)}</div>

      <button
        type="button"
        onClick={open}
        aria-label={t.openInvitation}
        className="absolute inset-0 z-20 flex items-end justify-center pb-[12vh] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-t-accent"
      >
        {scrim ? (
          <span
            className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/55 via-black/25 to-transparent"
            aria-hidden="true"
          />
        ) : null}
        <motion.span
          className={`relative text-sm tracking-[0.32em] ${promptClassName}`}
          animate={opening ? { opacity: 0 } : { opacity: [0.55, 1, 0.55] }}
          transition={opening ? { duration: 0.3 } : { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          {t.rsvpOpen}
        </motion.span>
      </button>
    </div>
  );
}
