import localFont from 'next/font/local';
import {
  Caveat,
  Cinzel,
  Cormorant_Garamond,
  Forum,
  Great_Vibes,
  Inter,
  Jost,
  Noto_Serif_Georgian,
  Parisienne,
  Playfair_Display,
} from 'next/font/google';

/**
 * Body / UI face — Helvetica Neue LT Georgian, self-hosted.
 *
 * Licensing: these are the couple's own purchased files. The order shipped a
 * Monotype *Desktop* EULA, which does not cover serving the font from a web
 * server; the licence holder has confirmed they hold web rights and accepts
 * responsibility for that use. Swap the `src` entries if the licensed webfont
 * package differs from these files.
 *
 * The family covers Georgian, Latin and digits from one set of files (verified
 * against every character the invitation uses), so a sentence never switches
 * face mid-line. The .woff2 files live outside `public/` so they are served
 * only through Next's hashed font pipeline rather than a guessable URL.
 */
export const bodyFont = localFont({
  variable: '--font-body',
  display: 'swap',
  src: [
    { path: '../fonts/HelveticaNeueLTGEO-45Light.woff2', weight: '300', style: 'normal' },
    { path: '../fonts/HelveticaNeueLTGEO-55Roman.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/HelveticaNeueLTGEO-75Bold.woff2', weight: '700', style: 'normal' },
  ],
});

/**
 * Cyrillic for the Russian version. The licensed family carries Georgian,
 * Latin and digits but no Cyrillic at all (checked: zero of 66 letters), so
 * without this the Russian text would drop to whatever the device has. Only
 * the Cyrillic subset is loaded, since everything else comes from the family
 * above and the browser picks a face per glyph.
 */
export const cyrillicFont = Inter({
  subsets: ['cyrillic'],
  weight: ['300', '400', '700'],
  variable: '--font-cyrillic',
  display: 'swap',
});

/** Display face for the couple's names, which are set in Latin script. */
export const scriptFont = Great_Vibes({
  subsets: ['latin', 'cyrillic'],
  weight: '400',
  variable: '--font-script',
  display: 'swap',
});

/*
 * Faces used by the other invitation templates. None is preloaded: the
 * declarations are cheap, and the browser only downloads a face once text on
 * screen actually asks for it — so a guest fetches the active template's
 * faces and nothing else.
 *
 * The Latin faces skip Next's metric-matched fallback: it is a local face with
 * no unicode-range, so it would sit ahead of the Georgian face in each stack
 * and could catch Georgian letters before the face meant for them.
 */

/** Georgian serif. The Latin display faces carry no Georgian, so every serif
 *  template's stack ends here and Georgian lines stay in one serif voice. */
export const georgianSerif = Noto_Serif_Georgian({
  subsets: ['georgian'],
  weight: ['300', '400', '600'],
  variable: '--font-ka-serif',
  display: 'swap',
  preload: false,
});

export const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
});

export const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
});

/** Roman capitals for the Art Deco template. Latin only; Forum covers Cyrillic. */
export const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-cinzel',
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
});

export const forum = Forum({
  subsets: ['latin', 'cyrillic'],
  weight: '400',
  variable: '--font-forum',
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
});

export const parisienne = Parisienne({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-parisienne',
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
});

export const caveat = Caveat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600'],
  variable: '--font-caveat',
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
});

export const jost = Jost({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500'],
  variable: '--font-jost',
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
});

/** Every font variable, for the root element. */
export const fontVariables = [
  bodyFont,
  cyrillicFont,
  scriptFont,
  georgianSerif,
  cormorant,
  playfair,
  cinzel,
  forum,
  parisienne,
  caveat,
  jost,
]
  .map((font) => font.variable)
  .join(' ');
