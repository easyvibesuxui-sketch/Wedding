-- =============================================================================
-- Wedding invitation MVP — database schema
-- Run this in the Supabase SQL Editor (Dashboard -> SQL Editor -> New query).
-- =============================================================================

-- 1. The `guests` table ------------------------------------------------------

create table if not exists public.guests (
  id                   uuid primary key default gen_random_uuid(),
  full_name            text        not null check (char_length(trim(full_name)) between 1 and 120),
  is_attending         boolean     not null,
  guest_count          smallint    not null default 1 check (guest_count between 0 and 10),
  dietary_restrictions text        check (char_length(dietary_restrictions) <= 500),
  created_at           timestamptz not null default now()
);

comment on table  public.guests                      is 'RSVP submissions from the public invitation page.';
comment on column public.guests.is_attending         is 'true = "Joyfully accepts", false = "Regretfully declines".';
comment on column public.guests.guest_count          is 'Total number of people attending under this RSVP (0 when not attending).';

-- Dashboard lists newest first.
create index if not exists guests_created_at_idx on public.guests (created_at desc);

-- 2. Row Level Security ------------------------------------------------------

alter table public.guests enable row level security;

-- Re-running the script should not fail on existing policies.
drop policy if exists "Public can submit an RSVP"        on public.guests;
drop policy if exists "Authenticated users can read RSVPs" on public.guests;

-- Anyone holding the anon key (i.e. any visitor of the invitation page) may
-- INSERT a row. They may not read, update or delete anything.
create policy "Public can submit an RSVP"
  on public.guests
  for insert
  to anon, authenticated
  with check (
    char_length(trim(full_name)) > 0
    and guest_count between 0 and 10
    -- A "no" RSVP never reserves seats.
    and (is_attending or guest_count = 0)
  );

-- Only signed-in (admin) users may read the guest list.
create policy "Authenticated users can read RSVPs"
  on public.guests
  for select
  to authenticated
  using (true);

-- No UPDATE or DELETE policy exists, so those are denied for every client-side
-- role. Use the service_role key (server side only) if you ever need them.

-- 3. Creating the admin user -------------------------------------------------
--
-- The dashboard trusts any authenticated Supabase user, so create the admin
-- account manually and keep public sign-ups off:
--
--   a) Dashboard -> Authentication -> Users -> "Add user" (email + password),
--      and tick "Auto Confirm User".
--   b) Dashboard -> Authentication -> Sign In / Providers -> Email:
--      turn OFF "Allow new users to sign up" so nobody can self-register.
--
-- Want a stricter allowlist (multiple Supabase users, only some of them
-- admins)? Create an `admins` table and swap the SELECT policy for it:
--
--   create table public.admins (user_id uuid primary key references auth.users on delete cascade);
--   alter table public.admins enable row level security;
--   insert into public.admins (user_id) values ('<the-admin-user-uuid>');
--
--   drop policy "Authenticated users can read RSVPs" on public.guests;
--   create policy "Admins can read RSVPs"
--     on public.guests for select to authenticated
--     using (exists (select 1 from public.admins a where a.user_id = auth.uid()));
