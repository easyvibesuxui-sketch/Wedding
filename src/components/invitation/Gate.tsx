'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { STAGE } from '@/components/invitation/stage';
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
  children,
}: {
  onOpen: () => void;
  /** How long the opening plays after the tap, in ms. */
  duration: number;
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
    <div className={`${STAGE} z-50 overflow-hidden`} style={{ pointerEvents: opening ? 'none' : 'auto' }}>
      {/* Its own stacking context, so no layer of the drawing can rise above the tap target. */}
      <div className="absolute inset-0 isolate">{children(opening)}</div>

      <button
        type="button"
        onClick={open}
        aria-label={t.openInvitation}
        className="group absolute inset-0 z-20 flex items-end justify-center pb-[12vh] focus:outline-none"
      >
        {/*
          The prompt sits on a chip in the template's own paper and ink, like
          the other floating controls, so it reads over any artwork.
        */}
        <motion.span
          className="relative rounded-full border border-t-line/60 bg-t-bg/90 px-6 py-2.5 text-sm tracking-[0.28em] text-t-ink shadow-sm backdrop-blur-sm group-focus-visible:ring-2 group-focus-visible:ring-t-accent"
          animate={opening ? { opacity: 0 } : { opacity: [0.75, 1, 0.75] }}
          transition={opening ? { duration: 0.3 } : { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          {t.rsvpOpen}
        </motion.span>
      </button>
    </div>
  );
}
