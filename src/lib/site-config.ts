/**
 * Everything couple-specific lives here — edit this file to reuse the
 * invitation for a different wedding.
 */
export const siteConfig = {
  couple: {
    partnerOne: 'Elena',
    partnerTwo: 'Nikoloz',
    /** Shown on the wax seal of the closed envelope. */
    monogram: 'E&N',
  },

  /** Drives the countdown. Keep the timezone offset of the venue. */
  date: '2026-09-19T17:00:00+04:00',
  dateLabel: '19.09.26',
  dateLong: 'Saturday, 19 September 2026',
  timeLabel: '17:00 — until late',

  /** Three lines of the opening blessing, set in script. */
  blessing: ['Two Souls', 'One Promise', 'One Lifetime Together'],
  invitationLine: 'Dear Friends and Family',
  invitationBody:
    'Join us for an evening of love, laughter and unforgettable memories as we begin our forever.',

  timeline: [
    { time: '17:00', title: 'Guest Arrival' },
    { time: '18:00', title: 'Ceremony' },
    { time: '19:00', title: 'Reception' },
    { time: '20:00', title: 'Dinner' },
    { time: '21:00', title: 'Dancing' },
  ],

  venue: {
    name: 'The Sacred Garden',
    address: '14 Chavchavadze Avenue, Tbilisi, Georgia',
    /** Used for both the embedded map and the "Open in Maps" link. */
    mapQuery: 'Chavchavadze Avenue, Tbilisi, Georgia',
  },

  dressCode:
    'We kindly ask our guests to wear soft neutral, ivory or sage tones for the celebration.',
  giftPreference: 'Your presence is the only gift we ask for.',

  rsvpIntro: 'To help us prepare for a joyful celebration, kindly confirm your attendance.',
  rsvpDeadlineLabel: 'Kindly respond by 1 August 2026',
  closingLine: 'Hope to see you there!',

  /**
   * Optional drop-in artwork. Leave `null` to use the hand-drawn SVG scene in
   * `src/components/art/`. Set to a path under `public/` (e.g. '/art/hero.png')
   * and that image is used instead — same for the closing photo.
   */
  heroArt: null as string | null,
  couplePhoto: null as string | null,

  /**
   * Optional background music. Drop an .mp3 in `public/` and name it here; the
   * floating play button only appears when the file actually loads.
   */
  music: '/music.mp3',
} as const;

export const coupleNames = `${siteConfig.couple.partnerOne} & ${siteConfig.couple.partnerTwo}`;

export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  siteConfig.venue.mapQuery,
)}&output=embed`;

export const mapLinkUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  siteConfig.venue.mapQuery,
)}`;
