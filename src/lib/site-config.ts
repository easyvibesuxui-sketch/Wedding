/**
 * Everything couple-specific lives here — edit this file to reuse the
 * invitation for a different wedding.
 */
export const siteConfig = {
  couple: {
    partnerOne: 'Elena',
    partnerTwo: 'Nikoloz',
  },
  invitationLine: 'Join us to celebrate',
  date: new Date('2026-09-19T17:00:00+04:00'),
  dateLabel: 'Saturday, 19 September 2026',
  timeLabel: '17:00 — until late',
  venue: {
    name: 'The Sacred Garden',
    address: '14 Chavchavadze Avenue, Tbilisi, Georgia',
    mapUrl: 'https://maps.google.com/?q=Chavchavadze+Avenue+Tbilisi',
  },
  timeline: [
    { time: '17:00', title: 'Guest Arrival', description: 'Welcome drinks in the olive courtyard.' },
    { time: '18:00', title: 'Ceremony', description: 'Our vows beneath the old fig tree.' },
    { time: '20:00', title: 'Dinner & Party', description: 'A long table, live music, and dancing.' },
  ],
  rsvpDeadlineLabel: 'Kindly respond by 1 August 2026',
  heroImage:
    'https://images.unsplash.com/photo-1722805740177-04256b6517f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000',
  /** Photo credit — required by the Unsplash licence, swap with your own photo. */
  heroImageCredit: {
    photographer: 'Ben Atkins',
    url: 'https://unsplash.com/photos/a-bride-and-groom-standing-in-a-garden-JYR7DNdUqo4',
  },
} as const;

export const coupleNames = `${siteConfig.couple.partnerOne} & ${siteConfig.couple.partnerTwo}`;
