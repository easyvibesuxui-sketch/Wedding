# Wedding Invitation — MVP

A digital wedding invitation — a mobile-first card you send over WhatsApp or
Instagram — with a private RSVP dashboard behind it.

- **Public** `/` — a sealed envelope the guest taps to open, then a single scroll:
  hero, blessing, live countdown, schedule, location with map, dress code, an
  RSVP form that writes to Supabase, and a closing photo.
- **Admin** `/admin/login` → `/admin/dashboard` — Supabase email/password auth,
  RSVP stats and a filterable guest table.

Built with Next.js (App Router), Tailwind CSS, Framer Motion and Supabase.

### The invitation, section by section

| Section | What it does |
| --- | --- |
| Envelope gate | A sealed envelope the guest taps to open — either the intro film, or the drawn embossed envelope whose flap lifts and floods the screen with warm light. The page cannot scroll until it is opened, and that tap is also the gesture browsers require before music may start. |
| Hero | Garden arch, swans on a still lake and corner florals — all inline SVG, so it stays sharp on any phone and costs no image request. |
| Blessing | Three script lines and the invitation paragraph. |
| Countdown | Live days / hours / minutes / seconds to `date` in site-config. |
| Schedule | Vertical spine with diamond nodes and a rose that travels down it as you scroll. |
| Location | Venue, a hand-drawn sketch, a live Google map in a gold frame, and an "Open in Maps" link. |
| Dress code & gifts | Two blocks framed by florals that spill over the torn paper seam. |
| RSVP | A wax seal reading RSVP; tapping it opens the form. |
| Closing | "Hope to see you there", the couple, and their photo. |

Every band is separated by a torn-paper edge, petals drift over the whole page,
and a floating button plays background music when you provide a file.

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

## Customising the wedding

Everything couple-specific — names, monogram, date, venue, schedule, dress code,
wording — lives in [`src/lib/site-config.ts`](src/lib/site-config.ts).

Three optional files you drop into `public/` and point at from that same file:

| Setting | What it replaces |
| --- | --- |
| `heroArt` | Swaps the hand-drawn SVG hero for your own illustration or photo (e.g. `/art/hero.png`). |
| `couplePhoto` | Fills the framed placeholder in the closing section. |
| `music` | Background music. The floating play button only appears once the file loads, so leaving it absent simply hides the control. |
| `introVideo` / `introVideoPoster` | Opening film for the envelope gate. The guest taps to play it and the invitation is revealed as it ends. If the file is missing or the browser cannot play it, the gate falls back to the drawn envelope — the page is never blocked by it. |

The artwork itself lives in [`src/components/art/`](src/components/art) — the
arch scene, floral sprays, wax seal, gold flourish, torn edges and venue sketch
are all plain SVG components you can recolour or redraw.

## Project structure

```
src/
├─ app/
│  ├─ page.tsx                 Invitation page (envelope gate + all sections)
│  ├─ layout.tsx  globals.css  Shell, fonts, palette, paper textures
│  ├─ actions.ts               `submitRsvp` server action (validate + insert)
│  ├─ icon.svg                 Favicon
│  ├─ admin/
│  │  ├─ actions.ts            `signIn` / `signOut` server actions
│  │  ├─ login/page.tsx        Login page
│  │  └─ dashboard/page.tsx    Stats + guest table (server-rendered)
├─ components/
│  ├─ Reveal.tsx               Framer Motion scroll-reveal wrapper
│  ├─ art/                     ArchScene, FloralSpray, WaxSeal, Flourish,
│  │                           TornEdge, VenueSketch — all inline SVG
│  ├─ invitation/              EnvelopeGate, Hero, Blessing, Countdown, Timeline,
│  │                           Location, Details, RsvpSection, Closing,
│  │                           MusicToggle, Petals
│  └─ admin/                   LoginForm, StatCard, GuestTable (filtering)
├─ lib/
│  ├─ site-config.ts           Couple, date, venue, timeline, hero image
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

Type is Helvetica Neue LT Georgian for everything the guest reads — Georgian,
Latin and digits all come from that one family, so a line never switches face
mid-sentence — with Great Vibes for the couple's names. Both are loaded through
`next/font` so there is no layout shift, and the licensed `.woff2` files live in
`src/fonts/` rather than `public/`, so they are only served through Next's
hashed font pipeline. The font is commercially licensed: see the note in
[`src/lib/fonts.ts`](src/lib/fonts.ts) before reusing this project elsewhere. The palette is warm
cream (`#f8ece0`) with gold (`#c19a45`) for headings and deep wine (`#7a1f2b`)
for the seals and primary buttons — defined once in
[`tailwind.config.ts`](tailwind.config.ts).

Motion respects `prefers-reduced-motion`: petals are hidden and animations are
reduced to a single frame for anyone who asks for less movement.
