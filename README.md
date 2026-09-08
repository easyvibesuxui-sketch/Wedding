# Wedding Invitation — MVP

A digital wedding invitation with a public single-page invitation and a private
RSVP dashboard.

- **Public** `/` — hero, event details, timeline and an RSVP form that writes to Supabase.
- **Admin** `/admin/login` → `/admin/dashboard` — Supabase email/password auth, RSVP
  stats and a filterable guest table.

Built with Next.js (App Router), Tailwind CSS, Framer Motion and Supabase.

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

Everything couple-specific — names, date, venue, timeline, hero photo — lives in
[`src/lib/site-config.ts`](src/lib/site-config.ts). The hero image is a
placeholder from Unsplash; replace `heroImage` with your own photo (drop it in
`public/` and use `/your-photo.jpg`), and remove the credit in the footer when
you do.

## Project structure

```
src/
├─ app/
│  ├─ page.tsx                 Invitation page (hero, details, timeline, RSVP)
│  ├─ layout.tsx  globals.css  Shell, fonts, palette
│  ├─ actions.ts               `submitRsvp` server action (validate + insert)
│  ├─ icon.svg                 Favicon
│  ├─ admin/
│  │  ├─ actions.ts            `signIn` / `signOut` server actions
│  │  ├─ login/page.tsx        Login page
│  │  └─ dashboard/page.tsx    Stats + guest table (server-rendered)
├─ components/
│  ├─ Reveal.tsx               Framer Motion scroll-reveal wrapper
│  ├─ invitation/              Hero, EventDetails, Timeline, RsvpForm, Section, Footer
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
