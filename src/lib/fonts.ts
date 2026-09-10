import localFont from 'next/font/local';
import { Great_Vibes, Inter } from 'next/font/google';

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
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script',
  display: 'swap',
});
