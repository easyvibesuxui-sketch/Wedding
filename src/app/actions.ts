'use server';

import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/env';
import type { RsvpMessage } from '@/lib/translations';

/**
 * Messages are keys into `rsvpMessages`, not text: the guest may be reading in
 * any of the three languages, and may switch after the reply comes back.
 */
export type RsvpState = {
  status: 'idle' | 'success' | 'error';
  message: RsvpMessage | null;
  fieldErrors?: Partial<Record<'fullName' | 'attending' | 'guestCount', RsvpMessage>>;
};

/** Keep in step with the form's `max` and the `guestCountRange` wording. */
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
    fieldErrors.fullName = 'nameRequired';
  } else if (fullName.length > 120) {
    fieldErrors.fullName = 'nameTooLong';
  }

  if (attending !== 'yes' && attending !== 'no') {
    fieldErrors.attending = 'attendingRequired';
  }

  const isAttending = attending === 'yes';
  let guestCount = 0;

  if (isAttending) {
    const parsed = Number(guestCountRaw);
    if (!guestCountRaw || !Number.isInteger(parsed) || parsed < 1 || parsed > MAX_GUESTS) {
      fieldErrors.guestCount = 'guestCountRange';
    } else {
      guestCount = parsed;
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { status: 'error', message: 'checkFields', fieldErrors };
  }

  if (!isSupabaseConfigured()) {
    return { status: 'error', message: 'notConnected' };
  }

  const supabase = await createClient();
  const { error } = await supabase.from('guests').insert({
    full_name: fullName,
    is_attending: isAttending,
    guest_count: guestCount,
    dietary_restrictions: dietary ? dietary.slice(0, 500) : null,
  });

  if (error) {
    console.error('RSVP insert failed:', error.message);
    return { status: 'error', message: 'saveFailed' };
  }

  return { status: 'success', message: isAttending ? 'thanksAttending' : 'thanksDeclining' };
}
