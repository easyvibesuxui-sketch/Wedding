/**
 * Everything couple-specific lives here — names, dates, venue and every line
 * of copy on the invitation. Edit this file to reuse the page for another
 * wedding; no component hard-codes wording.
 *
 * The page is written in Georgian; the couple's names stay in Latin script so
 * they can be set in the calligraphic display face.
 */
export const siteConfig = {
  couple: {
    partnerOne: 'Tamari',
    partnerTwo: 'Datuna',
    /** Stamped on the wax seal of the closed envelope. */
    monogram: 'T&D',
  },

  /** Drives the countdown. Keep the venue's timezone offset. */
  date: '2026-10-24T17:00:00+04:00',
  dateLabel: '24.10.26',
  dateLong: 'შაბათი, 24 ოქტომბერი, 2026',
  timeLabel: '17:00 — გვიან ღამემდე',

  venue: {
    name: 'შატო მეფის ქალაქი',
    address: 'დავით აღმაშენებლის ქ. 10, ზემო ჭოჭეთი, კასპი',
    /** Used for the embedded map and the "open in maps" link. */
    mapQuery: 'Chateau Mephis Kalaki, Upper Chocheti, Kaspi, Georgia',
  },

  timeline: [
    { time: '17:00', title: 'სტუმრების მიღება' },
    { time: '18:00', title: 'ცერემონია' },
    { time: '19:00', title: 'მისალმება' },
    { time: '20:00', title: 'ვახშამი' },
    { time: '21:00', title: 'ცეკვები' },
  ],

  copy: {
    heroEyebrow: 'ჩვენი ქორწილი',
    scrollDown: 'ჩამოსქროლეთ',

    blessing: ['ორი გული', 'ერთი ბედი', 'ერთი სიცოცხლე'],
    invitationLine: 'ძვირფასო ოჯახო და მეგობრებო',
    invitationBody:
      'გელოდებით ჩვენს ქორწილში — საღამოს, რომელსაც სიყვარულით, სიცილითა და დაუვიწყარი წუთებით გავივსებთ თქვენთან ერთად.',

    countdownTitle: 'ზეიმამდე დარჩა',
    countdownTitleToday: 'დღეს არის ის დღე',
    countdownUnits: { days: 'დღე', hours: 'საათი', minutes: 'წუთი', seconds: 'წამი' },

    timelineTitle: 'დღის განრიგი',

    locationTitle: 'ლოკაცია',
    openInMaps: 'რუკაზე ნახვა',

    dressCodeTitle: 'დრეს-კოდი',
    dressCode:
      'გთხოვთ, აირჩიოთ რბილი, მიწისფერი ან ღვინისფერი ტონები — სპილოსძვლისფერი, ზეთისხილისფერი, ღრმა მწვანე ან ქლიავისფერი.',
    giftTitle: 'საჩუქრის შესახებ',
    giftPreference: 'თქვენი დასწრება ჩვენთვის საუკეთესო საჩუქარია.',

    rsvpTitle: 'დაადასტურეთ დასწრება',
    rsvpIntro: 'რომ ყველაფერი დროულად მოვამზადოთ, გთხოვთ გვაცნობოთ, დაესწრებით თუ არა.',
    rsvpOpen: 'დააჭირეთ',
    skipIntro: 'გამოტოვება',
    rsvpDeadline: 'გთხოვთ, გვაცნობოთ 1 ოქტომბრამდე',

    fieldName: 'სახელი და გვარი',
    fieldNamePlaceholder: 'თქვენი სახელი და გვარი',
    fieldAttending: 'დაესწრებით?',
    attendingYes: 'სიამოვნებით დავესწრები',
    attendingNo: 'სამწუხაროდ, ვერ დავესწრები',
    fieldGuests: 'სტუმრების რაოდენობა (თქვენთან ერთად)',
    fieldDietary: 'კვების შეზღუდვები',
    fieldOptional: '(სურვილისამებრ)',
    submit: 'გაგზავნა',
    submitting: 'იგზავნება…',
    thankYou: 'გმადლობთ',

    closingLine: 'გელოდებით!',
    photoPlaceholder: 'აქ თქვენი ფოტო იქნება',
  },

  /**
   * Drop-in artwork. `heroArt` points at the painted illustration in
   * `public/art/`; set it to `null` to fall back to the hand-drawn SVG scene in
   * `src/components/art/ArchScene.tsx`. `couplePhoto` fills the closing frame.
   */
  heroArt: '/art/hero.webp' as string | null,
  couplePhoto: null as string | null,

  /**
   * Opening film for the envelope gate — drop the clip in `public/art/` and
   * name it here. The guest taps to play it, and the invitation is revealed
   * when it ends. If the file is missing or cannot play, the gate falls back
   * to the drawn envelope, so the page is never blocked by it.
   */
  introVideo: '/art/envelope.mp4' as string | null,
  introVideoPoster: '/art/envelope-poster.jpg' as string | null,

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
