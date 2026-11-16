'use client';

import { useEffect, useState } from 'react';

/**
 * True while the page is being scrolled down past the first screen. Floating
 * controls use it to step aside while the guest reads, and come back when they
 * scroll up or return to the top.
 */
export function useTuckedOnScroll(): boolean {
  const [tucked, setTucked] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 6) return;
      setTucked(y > last && y > window.innerHeight * 0.6);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return tucked;
}
