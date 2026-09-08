'use client';

import { useMemo, useState } from 'react';

import type { Guest } from '@/lib/supabase/types';

type Filter = 'all' | 'attending' | 'not-attending';

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Show all' },
  { value: 'attending', label: 'Attending' },
  { value: 'not-attending', label: 'Not attending' },
];

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

export function GuestTable({ guests }: { guests: Guest[] }) {
  const [filter, setFilter] = useState<Filter>('all');

  const visible = useMemo(() => {
    if (filter === 'attending') return guests.filter((g) => g.is_attending);
    if (filter === 'not-attending') return guests.filter((g) => !g.is_attending);
    return guests;
  }, [guests, filter]);

  return (
    <section className="rounded-xl border border-cream-400 bg-white shadow-sm">
      <header className="flex flex-col gap-4 border-b border-cream-300 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-xl text-ink-700">Guest list</h2>
          <p className="mt-1 text-xs text-ink-400">
            Showing {visible.length} of {guests.length} {guests.length === 1 ? 'RSVP' : 'RSVPs'}
          </p>
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter RSVPs">
          {FILTERS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFilter(option.value)}
              aria-pressed={filter === option.value}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                filter === option.value
                  ? 'border-wine-500 bg-wine-500 text-cream-100'
                  : 'border-cream-500 text-ink-500 hover:border-gold-400'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-cream-100 text-xs uppercase tracking-wider text-ink-400">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">Name</th>
              <th scope="col" className="px-6 py-3 font-medium">Attending</th>
              <th scope="col" className="px-6 py-3 font-medium">Guests</th>
              <th scope="col" className="px-6 py-3 font-medium">Dietary restrictions</th>
              <th scope="col" className="px-6 py-3 font-medium">Received</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-300">
            {visible.map((guest) => (
              <tr key={guest.id} className="transition-colors hover:bg-cream-100">
                <td className="px-6 py-4 font-medium text-ink-700">{guest.full_name}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                      guest.is_attending
                        ? 'bg-gold-100 text-ink-600'
                        : 'bg-cream-300 text-ink-500'
                    }`}
                  >
                    {guest.is_attending ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-6 py-4 text-ink-500">{guest.guest_count}</td>
                <td className="px-6 py-4 text-ink-500">
                  {guest.dietary_restrictions?.trim() || <span className="text-ink-300">—</span>}
                </td>
                <td className="px-6 py-4 text-ink-500">
                  {dateFormatter.format(new Date(guest.created_at))}
                </td>
              </tr>
            ))}

            {visible.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-14 text-center text-ink-400">
                  {guests.length === 0
                    ? 'No RSVPs yet — they will appear here as guests respond.'
                    : 'No RSVPs match this filter.'}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}
