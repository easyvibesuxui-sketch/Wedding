# Wedding Invitation — MVP

A digital wedding invitation — a mobile-first card you send over WhatsApp or
Instagram — in Georgian, English and Russian, with a private RSVP dashboard
behind it.

- **Public** `/` — an opening the guest taps (an envelope, doors, a ribbon…),
  then a single scroll: hero, blessing, live countdown, schedule, location with
  map, dress code, an RSVP form that writes to Supabase, and a closing photo.
- **Designs** `/templates` — the same invitation in ten designs; `/?t=<id>`
  previews one without changing what guests see.
- **Admin** `/admin/login` → `/admin/dashboard` — Supabase email/password auth,
  RSVP stats and a filterable guest table.

Built with Next.js (App Router), Tailwind CSS, Framer Motion and Supabase.

### The invitation, section by section

| Section | What it does |
| --- | --- |
| Opening | Each design's own: a film, an envelope, doors, a gatefold, a curtain… The page cannot scroll until it is opened, and that tap is also the gesture browsers require before music may start. The page is already drawn underneath, so the opening uncovers it rather than fading through a blank screen. |
| Hero | Each design's own first screen. |
| Blessing | Three script lines and the invitation paragraph. |
| Countdown | Live days / hours / minutes / seconds to `date` in site-config; on the day and after it, a line and the date instead of a clock stuck at zero. |
| Schedule | A vertical spine with a marker that travels down it as you scroll, or framed cards — per design. |
| Location | Venue, a hand-drawn sketch, a live Google map in a gold frame, and an "Open in Maps" link. |
| Dress code & gifts | Two blocks, with the design's corner ornament spilling over the band's edge. |
| RSVP | The design's emblem; tapping it opens the form. |
| Closing | "Hope to see you there", the couple, and their photo. |

Each band draws its design's edge over the one above (torn paper, scallops,
waves, clouds, deco steps…), and a floating button plays background music when
you provide a file.

## Designs

All ten share the same words and details — only the design changes. Pick the
one guests see with `template` in [`src/lib/site-config.ts`](src/lib/site-config.ts).

| id | Design | Opening |
| --- | --- | --- |
| `vineyard` | Watercolour vineyard, gold and wine | The envelope film dissolves into the painted hero |
| `riviera` | Majolica blue, lemons | The flap lifts, the card rises and grows into the page |
| `tbilisi` | Old Tbilisi balconies, terracotta and teal | Carved wooden doors swing open |
| `midnight` | Deep green, fine gold frames, fireflies | The seal gives and the gatefold parts |
| `botanical` | Sage and blush watercolour, eucalyptus | A vellum sheet lifts and the page comes into focus |
| `deco` | Black and gold geometry | The medallion turns, the sunburst gates slide away |
| `editorial` | Magazine type, black and white | A curtain rises |
| `celestial` | Night sky, moon and constellations | The page opens out of the moon |
| `ribbon` | Blush and satin | The bow unties, the ribbons slide off, the lid lifts |
| `kraft` | Kraft paper, twine, polaroid | The twine slips off and the envelope drops away |

Every design but Editorial opens on a painted hero — a watercolour or
gouache in `public/art/<id>-hero.webp`, generated with Kling, with empty sky
left for the names — and most carry a painted corner ornament
(`<id>-corner.webp`), cut out of its paper so it keeps its watercolour edge.
Tbilisi's opening doors are painted too. Editorial stays typographic, with an
ink drawing for its corner; the openings and the frames are drawn in SVG.

A design is one file in [`src/templates/`](src/templates): a palette, three
faces, which surface each band sits on, the seam, the reveal, and its own
opening, hero and ornaments ([`types.ts`](src/templates/types.ts) lists every
field). The sections themselves are shared and read the palette through the
`t-*` colours, so a new design never touches them.

## 1. Install

```bash
npm install
```

## 2. Create the database

In the Supabase dashboard open **SQL Editor → New query**, paste the contents of
[`supabase/schema.sql`](supabase/schema.sql) and run it. It creates the `guests`
table and the row level security policies:

| Role                    | `guests` permissions |
| ----------------------- | -------------------- |
| `anon` (site visitors)  | `INSERT` only        |
| `authenticated` (admin) | `INSERT` + `SELECT`  |

Nobody can `UPDATE` or `DELETE` through the public API.

## 3. Create the admin user

RSVPs are only readable by a signed-in Supabase user, so create the admin account
by hand and keep public sign-ups off:

1. **Authentication → Users → Add user** — email + password, tick *Auto Confirm User*.
2. **Authentication → Sign In / Providers → Email** — turn **off**
   *Allow new users to sign up*.

`supabase/schema.sql` ends with an optional `admins` allowlist table if you want
several Supabase users but only some of them to reach the dashboard.

## 4. Configure the environment

```bash
cp .env.local.example .env.local
```

Fill in both values from **Project Settings → API**:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

Only the anon key is used — the service role key is never needed, and must never
be added to a `NEXT_PUBLIC_*` variable.

## 5. Run

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Languages

The page reads the guest's `Accept-Language` header on the server, so the very
first paint is already in their language: Georgian or Russian if their phone is
set to it, English for everyone else. A switcher in the top corner changes it
instantly and stores the choice in a cookie, which then wins over the header on
later visits.

Every word lives in [`src/lib/translations.ts`](src/lib/translations.ts), one
dictionary per language behind a shared `Dictionary` type — so a missing string
is a build error, not a blank space on the page. Language-independent things —
the names, the date, the running order's clock times, the map query, the
artwork — stay in [`src/lib/site-config.ts`](src/lib/site-config.ts).

Adding a fourth language is a new entry in `LANGS` and a new dictionary.

## Customising the wedding

Everything couple-specific — names, monogram, date, venue, schedule, dress code,
wording — lives in [`src/lib/site-config.ts`](src/lib/site-config.ts).

Three optional files you drop into `public/` and point at from that same file:

| Setting | What it replaces |
| --- | --- |
| `heroArt` | Swaps the hand-drawn SVG hero for your own illustration or photo (e.g. `/art/hero.png`). |
| `couplePhoto` | Fills the framed placeholder in the closing section. |
| `music` | Background music, e.g. `/music.mp3`. Off (`null`) by default. The floating play button only appears once the file loads, so a missing file simply hides the control. |
| `introVideo` / `introVideoPoster` | Opening film for the envelope gate. The guest taps to play it and the invitation is revealed as it ends. If the file is missing or the browser cannot play it, the gate falls back to the drawn envelope — the page is never blocked by it. |

The artwork itself lives in [`src/components/art/`](src/components/art) — the
arch scene, floral sprays, wax seal, gold flourish, torn edges and venue sketch
are all plain SVG components you can recolour or redraw.

## Project structure

```
src/
├─ app/
│  ├─ page.tsx                 Invitation page (`?t=` previews a design)
│  ├─ templates/page.tsx       Gallery of all ten designs
│  ├─ layout.tsx  globals.css  Shell, fonts, surfaces, textures, heading styles
│  ├─ actions.ts               `submitRsvp` server action (validate + insert)
│  ├─ icon.svg                 Favicon
│  ├─ admin/
│  │  ├─ actions.ts            `signIn` / `signOut` server actions
│  │  ├─ login/page.tsx        Login page
│  │  └─ dashboard/page.tsx    Stats + guest table (server-rendered)
├─ components/
│  ├─ Reveal.tsx               Scroll reveal, in the design's style
│  ├─ TemplateProvider.tsx     The active design, as CSS variables
│  ├─ art/                     Shared ornaments and the vineyard's drawn pieces
│  ├─ gallery/                 The design gallery
│  ├─ invitation/              Section, Seam, Gate, the shared sections,
│  │                           LanguageSwitcher, MusicToggle, TemplateBar
│  └─ admin/                   LoginForm, StatCard, GuestTable (filtering)
├─ templates/                 One folder per design + registry, types, style
├─ lib/
│  ├─ site-config.ts           Couple, date, venue, timeline, art, design
│  └─ supabase/                Browser / server / middleware clients + types
└─ middleware.ts               Refreshes the session, guards `/admin/*`
```

## How access control works

1. `src/middleware.ts` runs on every `/admin/*` request: it refreshes the Supabase
   session cookie, sends signed-out visitors to `/admin/login?redirectTo=…`, and
   sends signed-in ones straight to the dashboard.
2. The dashboard re-checks `auth.getUser()` server-side before rendering.
3. RLS is the real boundary: even a leaked anon key cannot read the guest list.

## Deploying

Works as-is on Vercel: import the repo and set `NEXT_PUBLIC_SUPABASE_URL` and
`NEXT_PUBLIC_SUPABASE_ANON_KEY` in the project's environment variables. Add your
deployed URL to **Supabase → Authentication → URL Configuration**.

## Design notes

Each design sets its own faces in [`src/templates/style.ts`](src/templates/style.ts):
every stack ends in a Georgian-capable face — Helvetica Neue LT Georgian for
sans designs, Noto Serif Georgian for serif and script ones — so Georgian never
falls to the device. Only the active design's faces are downloaded.

In the vineyard design, type is Helvetica Neue LT Georgian for everything the guest reads — Georgian,
Latin and digits all come from that one family, so a line never switches face
mid-sentence — with Great Vibes for the couple's names. The family carries no
Cyrillic, so Inter's Cyrillic subset sits behind it for the Russian version and
the browser picks a face per glyph. Both are loaded through
`next/font` so there is no layout shift, and the licensed `.woff2` files live in
`src/fonts/` rather than `public/`, so they are only served through Next's
hashed font pipeline. The font is commercially licensed: see the note in
[`src/lib/fonts.ts`](src/lib/fonts.ts) before reusing this project elsewhere. Its palette is warm
cream (`#f8ece0`) with gold (`#a8842f`) for headings and deep wine (`#7a1f2b`)
for the seals and primary buttons — set, like every design's, in its template
file.

Motion respects `prefers-reduced-motion`: drifting petals and fireflies are
hidden, and for anyone who asks for less movement blocks fade in without moving.
