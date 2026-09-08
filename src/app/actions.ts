'use server';

import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/env';

export type RsvpState = {
  status: 'idle' | 'success' | 'error';
  message: string;
  fieldErrors?: Partial<Record<'fullName' | 'attending' | 'guestCount', string>>;
};

const MAX_GUESTS = 10;

/**
 * Validates an RSVP and stores it in the `guests` table.
 * Runs with the anon key, so the "Public can submit an RSVP" policy applies.
 */
export async function submitRsvp(_prevState: RsvpState, formData: FormData): Promise<RsvpState> {
  const fullName = String(formData.get('fullName') ?? '').trim();
  const attending = String(formData.get('attending') ?? '');
  const guestCountRaw = String(formData.get('guestCount') ?? '').trim();
  const dietary = String(formData.get('dietaryRestrictions') ?? '').trim();

  const fieldErrors: RsvpState['fieldErrors'] = {};

  if (!fullName) {
    fieldErrors.fullName = 'Please tell us your name.';
  } else if (fullName.length > 120) {
    fieldErrors.fullName = 'That name is a little too long.';
  }

  if (attending !== 'yes' && attending !== 'no') {
    fieldErrors.attending = 'Please let us know if you can make it.';
  }

  const isAttending = attending === 'yes';
  let guestCount = 0;

  if (isAttending) {
    const parsed = Number(guestCountRaw);
    if (!guestCountRaw || !Number.isInteger(parsed) || parsed < 1 || parsed > MAX_GUESTS) {
      fieldErrors.guestCount = `Enter a number between 1 and ${MAX_GUESTS}.`;
    } else {
      guestCount = parsed;
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { status: 'error', message: 'Please check the highlighted fields.', fieldErrors };
  }

  if (!isSupabaseConfigured()) {
    return {
      status: 'error',
      message:
        'This invitation is not connected to a database yet, so the RSVP was not saved.',
    };
  }

  const supabase = createClient();
  const { error } = await supabase.from('guests').insert({
    full_name: fullName,
    is_attending: isAttending,
    guest_count: guestCount,
    dietary_restrictions: dietary ? dietary.slice(0, 500) : null,
  });

  if (error) {
    console.error('RSVP insert failed:', error.message);
    return {
      status: 'error',
      message: 'Something went wrong saving your RSVP. Please try again in a moment.',
    };
  }

  return {
    status: 'success',
    message: isAttending
      ? 'Thank you — we cannot wait to celebrate with you.'
      : 'Thank you for letting us know. You will be missed.',
  };
}
