import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { signOut } from '@/app/admin/actions';
import { GuestTable } from '@/components/admin/GuestTable';
import { StatCard } from '@/components/admin/StatCard';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/env';
import type { Guest } from '@/lib/supabase/types';
import { coupleNames } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'RSVP dashboard',
  robots: { index: false, follow: false },
};

// RSVPs arrive continuously, so never serve a cached guest list.
export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  if (!isSupabaseConfigured()) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cream-200 px-6">
        <div className="max-w-md rounded-xl border border-cream-400 bg-white p-8 text-center shadow-sm">
          <h1 className="font-serif text-2xl text-ink-700">Dashboard not connected</h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-500">
            Set <code className="text-gold-600">NEXT_PUBLIC_SUPABASE_URL</code> and{' '}
            <code className="text-gold-600">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, then run the SQL in{' '}
            <code className="text-gold-600">supabase/schema.sql</code>, to see RSVPs here.
          </p>
        </div>
      </main>
    );
  }

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // The middleware already guards /admin/*; this is the defence in depth.
  if (!user) {
    redirect('/admin/login');
  }

  const { data, error } = await supabase
    .from('guests')
    .select('*')
    .order('created_at', { ascending: false });

  const guests: Guest[] = data ?? [];
  const attendingGuests = guests.filter((guest) => guest.is_attending);
  const totalAttending = attendingGuests.reduce((sum, guest) => sum + guest.guest_count, 0);

  return (
    <main className="min-h-screen bg-cream-200 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-gold-500">{coupleNames}</p>
            <h1 className="mt-2 font-serif text-3xl text-ink-700">RSVP dashboard</h1>
            <p className="mt-1 text-sm text-ink-400">Signed in as {user.email}</p>
          </div>

          <form action={signOut}>
            <button
              type="submit"
              className="rounded-md border border-cream-500 bg-white px-4 py-2 text-sm text-ink-500 transition-colors hover:border-gold-400 hover:text-ink-700"
            >
              Sign out
            </button>
          </form>
        </header>

        {error ? (
          <p className="mt-8 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
            Could not load the guest list: {error.message}
          </p>
        ) : null}

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <StatCard label="Total RSVPs" value={guests.length} hint="Responses received" />
          <StatCard
            label="Total attending"
            value={totalAttending}
            hint={`Across ${attendingGuests.length} accepted ${
              attendingGuests.length === 1 ? 'RSVP' : 'RSVPs'
            }`}
          />
          <StatCard
            label="Not attending"
            value={guests.length - attendingGuests.length}
            hint="Sent regrets"
          />
        </div>

        <div className="mt-8">
          <GuestTable guests={guests} />
        </div>
      </div>
    </main>
  );
}
