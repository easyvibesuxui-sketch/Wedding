'use client';

import { useEffect, useRef, useState } from 'react';

import { siteConfig } from '@/lib/site-config';

/**
 * Floating play/pause for the background music. It only appears once the audio
 * file actually loads, so the button never shows when `public/music.mp3` is
 * missing. Playback starts on the first real user gesture (opening the
 * envelope), which is what browser autoplay policies require.
 */
export function MusicToggle({ autoStart }: { autoStart: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [available, setAvailable] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(siteConfig.music);
    audio.loop = true;
    audio.volume = 0.45;
    audio.preload = 'auto';

    const onReady = () => setAvailable(true);
    audio.addEventListener('canplaythrough', onReady);
    audioRef.current = audio;

    return () => {
      audio.removeEventListener('canplaythrough', onReady);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!autoStart || !available || !audio) return;

    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [autoStart, available]);

  if (!available) return null;

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? 'Pause music' : 'Play music'}
      className="fixed bottom-6 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-wine-500 text-cream-100 shadow-lg transition-colors hover:bg-wine-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2"
    >
      {playing ? (
        <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
          <rect x="1" width="4" height="16" rx="1" />
          <rect x="9" width="4" height="16" rx="1" />
        </svg>
      ) : (
        <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
          <path d="M1 1.4v13.2a1 1 0 0 0 1.53.85l10.4-6.6a1 1 0 0 0 0-1.7L2.53.55A1 1 0 0 0 1 1.4Z" />
        </svg>
      )}
    </button>
  );
}
