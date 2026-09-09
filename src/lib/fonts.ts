import { Great_Vibes, Noto_Sans_Georgian } from 'next/font/google';

/**
 * Body / UI face. Noto Sans Georgian is a clean grotesque that covers Georgian,
 * Latin and digits from one family, so the page has a single consistent text
 * colour instead of two faces fighting mid-sentence.
 *
 * ── Swapping in Helvetica Neue LT Georgian ────────────────────────────────
 * The purchased .otf files carry a Monotype *Desktop* EULA, which excludes
 * installing the font on a server — so they cannot be served from this site.
 * With a Monotype **Webfont** licence for the same family, replace this export:
 *
 *   import localFont from 'next/font/local';
 *
 *   export const bodyFont = localFont({
 *     variable: '--font-body',
 *     display: 'swap',
 *     src: [
 *       { path: '../../public/fonts/HelveticaNeueLTGEO-45Light.woff2',  weight: '300', style: 'normal' },
 *       { path: '../../public/fonts/HelveticaNeueLTGEO-55Roman.woff2',  weight: '400', style: 'normal' },
 *       { path: '../../public/fonts/HelveticaNeueLTGEO-75Bold.woff2',   weight: '700', style: 'normal' },
 *     ],
 *   });
 *
 * Nothing else in the codebase needs to change: every component styles text
 * through the `--font-body` variable.
 */
export const bodyFont = Noto_Sans_Georgian({
  subsets: ['georgian', 'latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

/** Display face for the couple's names, which are set in Latin script. */
export const scriptFont = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script',
  display: 'swap',
});
