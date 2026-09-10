/**
 * Everything couple-specific that does not depend on language: the names, the
 * date, the running order's clock times, the map query and the artwork.
 * Every word the guest reads lives in `translations` below.
 */
export const siteConfig = {
  couple: {
    partnerOne: 'Tamari',
    partnerTwo: 'Datuna',
    /** Stamped on the wax seal of the closed envelope. */
    monogram: 'T&D',
  },

  /** Drives the countdown. Keep the venue's timezone offset. */
  date: '2026-10-24T15:00:00+04:00',
  dateLabel: '24.10.26',

  /** The map query is the venue's English name, whatever the page language. */
  mapQuery: 'Chateau Mephis Kalaki, Upper Chocheti, Kaspi, Georgia',

  /** Clock times for the running order; the labels come from `translations`. */
  scheduleTimes: ['15:00', '16:00', '17:00'],

  /**
   * Whether guests can reply through the page. While this is off the RSVP
   * section keeps its heading and wording, and the wax seal sits there as an
   * ornament — no prompt, nothing to tap, no form. Turning it back on restores
   * the whole flow; the form and the Supabase insert behind it are untouched.
   */
  rsvpEnabled: false,

  /**
   * Drop-in artwork. `heroArt` points at the painted illustration in
   * `public/art/`; set it to `null` to fall back to the hand-drawn SVG scene in
   * `src/components/art/ArchScene.tsx`. `couplePhoto` fills the closing frame.
   */
  heroArt: '/art/hero-vineyard.webp' as string | null,
  couplePhoto: '/art/couple.webp' as string | null,

  /**
   * Opening film for the envelope gate — drop the clip in `public/art/` and
   * name it here. The guest taps to play it, and the invitation is revealed
   * when it ends. If the file is missing or cannot play, the gate falls back
   * to the drawn envelope, so the page is never blocked by it.
   */
  introVideo: '/art/envelope.mp4' as string | null,
  /**
   * WebM alongside the MP4: Chromium and Firefox builds without the
   * proprietary H.264 decoder cannot play the MP4 at all, and would drop to
   * the drawn envelope. The browser picks whichever it can decode.
   */
  introVideoWebm: '/art/envelope.webm' as string | null,
  introVideoPoster: '/art/envelope-poster.jpg' as string | null,

  /**
   * Painted stand-ins for the two drawn pieces. Each falls back to its SVG
   * component when set to `null`, so the page never depends on the file.
   */
  sealArt: '/art/seal.webp' as string | null,
  venueArt: '/art/venue.webp' as string | null,

  /**
   * Optional background music. Drop an .mp3 in `public/` and name it here; the
   * floating play button only appears when the file actually loads.
   */
  music: '/music.mp3',
} as const;

export const coupleNames = `${siteConfig.couple.partnerOne} & ${siteConfig.couple.partnerTwo}`;

export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  siteConfig.mapQuery,
)}&output=embed`;

export const mapLinkUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  siteConfig.mapQuery,
)}`;
