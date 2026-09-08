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
    <section className="rounded-xl border border-ivory-300 bg-white shadow-sm">
      <header className="flex flex-col gap-4 border-b border-ivory-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-xl text-sage-800">Guest list</h2>
          <p className="mt-1 text-xs text-sage-400">
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
                  ? 'border-sage-600 bg-sage-600 text-ivory-50'
                  : 'border-sage-200 text-sage-600 hover:border-sage-400'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-ivory-50 text-xs uppercase tracking-wider text-sage-400">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">Name</th>
              <th scope="col" className="px-6 py-3 font-medium">Attending</th>
              <th scope="col" className="px-6 py-3 font-medium">Guests</th>
              <th scope="col" className="px-6 py-3 font-medium">Dietary restrictions</th>
              <th scope="col" className="px-6 py-3 font-medium">Received</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ivory-200">
            {visible.map((guest) => (
              <tr key={guest.id} className="transition-colors hover:bg-ivory-50">
                <td className="px-6 py-4 font-medium text-sage-800">{guest.full_name}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                      guest.is_attending
                        ? 'bg-sage-100 text-sage-700'
                        : 'bg-ivory-200 text-sage-500'
                    }`}
                  >
                    {guest.is_attending ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sage-600">{guest.guest_count}</td>
                <td className="px-6 py-4 text-sage-600">
                  {guest.dietary_restrictions?.trim() || <span className="text-sage-300">—</span>}
                </td>
                <td className="px-6 py-4 text-sage-500">
                  {dateFormatter.format(new Date(guest.created_at))}
                </td>
              </tr>
            ))}

            {visible.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-14 text-center text-sage-400">
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
