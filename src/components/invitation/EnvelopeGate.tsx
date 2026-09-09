'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { Seal } from '@/components/art/Seal';
import { siteConfig } from '@/lib/site-config';

/** How long the drawn-envelope animation runs before the gate clears. */
const PAPER_OPEN_MS = 1900;

/**
 * The invitation opens from a sealed envelope. When an intro film is provided
 * it plays on tap and the page is revealed as it ends; otherwise the drawn
 * envelope below does the same job. Either way the page underneath cannot be
 * scrolled until the guest opens it, and that tap is the gesture the browser
 * needs before any music may start.
 */
export function EnvelopeGate({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const [gone, setGone] = useState(false);
  // Set when the film is missing or the browser refuses it — we then draw the
  // envelope instead rather than trapping the guest behind a blank screen.
  const [filmFailed, setFilmFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const useFilm = Boolean(siteConfig.introVideo) && !filmFailed;

  useEffect(() => {
    document.body.dataset.sealed = 'true';
    return () => {
      delete document.body.dataset.sealed;
    };
  }, []);

  function reveal() {
    delete document.body.dataset.sealed;
    onOpen();
  }

  /** Opens with the drawn envelope, whatever the film did. */
  function openWithPaper() {
    setFilmFailed(true);
    reveal();
    window.setTimeout(() => setGone(true), PAPER_OPEN_MS);
  }

  function open() {
    if (opening) return;
    setOpening(true);

    const video = videoRef.current;
    if (useFilm && video) {
      // The film holds the screen until it ends, and reveals the page with it.
      // If it will not play, drop straight through to the drawn envelope
      // rather than leaving the guest on a sealed screen.
      video.play().catch(openWithPaper);
      return;
    }

    reveal();
    window.setTimeout(() => setGone(true), PAPER_OPEN_MS);
  }

  function onFilmEnded() {
    reveal();
    setGone(true);
  }

  return (
    <AnimatePresence>
      {gone ? null : (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-cream-300"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {useFilm ? (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              src={siteConfig.introVideo ?? undefined}
              poster={siteConfig.introVideoPoster ?? undefined}
              muted
              playsInline
              preload="auto"
              onEnded={onFilmEnded}
              onError={() => (opening ? openWithPaper() : setFilmFailed(true))}
            />
          ) : (
            <PaperEnvelope opening={opening} />
          )}

          {/* Seal + prompt. Hidden once the gate is running. */}
          <motion.button
            type="button"
            onClick={open}
            className="group relative z-10 flex translate-y-[1vh] flex-col items-center gap-6 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-4 focus-visible:ring-offset-cream-300"
            animate={{ opacity: opening ? 0 : 1, scale: opening ? 1.35 : 1 }}
            transition={{ duration: 0.7 }}
            style={{ pointerEvents: opening ? 'none' : 'auto' }}
            aria-label="მოწვევის გახსნა"
          >
            <span
              className="absolute -inset-10 rounded-full opacity-70 blur-2xl"
              style={{ background: 'radial-gradient(circle, rgba(255,205,120,0.75), transparent 70%)' }}
              aria-hidden="true"
            />
            <motion.span
              className="relative"
              animate={{ scale: [1, 1.035, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Seal label={siteConfig.couple.monogram} size={148} />
            </motion.span>
            <span className="relative text-xs tracking-[0.3em] text-gold-600">
              {siteConfig.copy.rsvpOpen}
            </span>
          </motion.button>

          {/* Nobody should be stuck watching an intro they have already seen. */}
          {opening && useFilm ? (
            <button
              type="button"
              onClick={onFilmEnded}
              className="absolute bottom-8 right-6 z-10 rounded-full border border-cream-100/70 px-4 py-2 text-xs tracking-[0.2em] text-cream-100 backdrop-blur-sm transition-colors hover:bg-cream-100/15"
            >
              {siteConfig.copy.skipIntro}
            </button>
          ) : null}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** The drawn envelope: embossed paper, side and bottom panels, lifting flap. */
function PaperEnvelope({ opening }: { opening: boolean }) {
  return (
    <>
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <pattern id="emboss" width="120" height="120" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="#ffffff" strokeOpacity="0.85" strokeWidth="1.6">
              <path d="M18 96c14-10 20-26 18-44" />
              <path d="M36 52c-10 2-18-4-20-14M36 62c10 0 16-8 16-18M32 74c-11 1-19-6-20-16M34 84c10 1 17-6 18-16" />
              <circle cx="86" cy="34" r="7" />
              <circle cx="86" cy="34" r="3" />
              <path d="M74 24c-6-4-6-12 0-16M98 24c6-4 6-12 0-16" />
              <path d="M96 78c8-6 12-16 10-26" />
            </g>
            <g fill="none" stroke="#c8b493" strokeOpacity="0.32" strokeWidth="1.6">
              <path d="M17 95c14-10 20-26 18-44" />
              <path d="M35 51c-10 2-18-4-20-14M35 61c10 0 16-8 16-18M31 73c-11 1-19-6-20-16M33 83c10 1 17-6 18-16" />
              <circle cx="85" cy="33" r="7" />
              <circle cx="85" cy="33" r="3" />
              <path d="M73 23c-6-4-6-12 0-16M97 23c6-4 6-12 0-16" />
              <path d="M95 77c8-6 12-16 10-26" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#emboss)" opacity="0.55" />
      </svg>

      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 45% at 50% 46%, rgba(255,226,164,0.95), rgba(255,226,164,0) 70%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: opening ? 1 : 0 }}
        transition={{ duration: 1.1, delay: opening ? 0.25 : 0 }}
      />

      <div className="absolute inset-0" style={{ perspective: '1600px' }}>
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #efe2cd 0%, #e3d3ba 55%, #d9c7ab 100%)',
            clipPath: 'polygon(0 0, 0 100%, 50% 52%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(225deg, #efe2cd 0%, #e3d3ba 55%, #d9c7ab 100%)',
            clipPath: 'polygon(100% 0, 100% 100%, 50% 52%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(0deg, #e7d8c0 0%, #dbc9ad 70%, #cfbb9c 100%)',
            clipPath: 'polygon(0 100%, 100% 100%, 50% 52%)',
          }}
        />

        <motion.div
          className="absolute inset-0 origin-top"
          style={{
            transformStyle: 'preserve-3d',
            background: 'linear-gradient(180deg, #f6ecdc 0%, #eadfc9 70%, #dfd0b6 100%)',
            clipPath: 'polygon(0 0, 100% 0, 50% 52%)',
            boxShadow: '0 12px 30px rgba(93, 70, 42, 0.18)',
          }}
          initial={{ rotateX: 0 }}
          animate={{ rotateX: opening ? -172 : 0 }}
          transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
        />
      </div>
    </>
  );
}
