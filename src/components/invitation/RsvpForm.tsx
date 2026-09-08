'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { submitRsvp, type RsvpState } from '@/app/actions';
import { siteConfig } from '@/lib/site-config';

const initialState: RsvpState = { status: 'idle', message: '' };

const fieldClass =
  'w-full border-b border-sage-200 bg-transparent px-1 py-3 text-sage-800 placeholder:text-sage-300 focus:border-gold-400 focus:outline-none';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-sage-600 px-8 py-4 text-xs uppercase tracking-widest text-ivory-50 transition-colors hover:bg-sage-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
    >
      {pending ? 'Sending…' : 'Send RSVP'}
    </button>
  );
}

export function RsvpForm() {
  const [state, formAction] = useFormState(submitRsvp, initialState);
  const [attending, setAttending] = useState<'yes' | 'no' | ''>('');

  if (state.status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border border-gold-200 bg-ivory-50 px-8 py-14 text-center"
        role="status"
      >
        <p className="font-serif text-3xl text-sage-800">Thank you</p>
        <div className="divider my-6" aria-hidden="true">
          <span className="text-[0.6rem]">&#9670;</span>
        </div>
        <p className="mx-auto max-w-sm text-sage-600">{state.message}</p>
      </motion.div>
    );
  }

  return (
    <form action={formAction} className="space-y-10">
      <div>
        <label htmlFor="fullName" className="text-xs uppercase tracking-wider text-sage-500">
          Full name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          required
          maxLength={120}
          autoComplete="name"
          placeholder="Your full name"
          aria-invalid={Boolean(state.fieldErrors?.fullName)}
          className={`mt-2 ${fieldClass}`}
        />
        {state.fieldErrors?.fullName ? (
          <p className="mt-2 text-xs text-red-600">{state.fieldErrors.fullName}</p>
        ) : null}
      </div>

      <fieldset>
        <legend className="text-xs uppercase tracking-wider text-sage-500">
          Will you be attending?
        </legend>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            { value: 'yes', label: 'Joyfully accepts' },
            { value: 'no', label: 'Regretfully declines' },
          ].map((option) => (
            <label
              key={option.value}
              className={`flex cursor-pointer items-center gap-3 border px-5 py-4 text-sm transition-colors ${
                attending === option.value
                  ? 'border-gold-400 bg-gold-100/50 text-sage-800'
                  : 'border-sage-200 text-sage-600 hover:border-sage-300'
              }`}
            >
              <input
                type="radio"
                name="attending"
                value={option.value}
                required
                checked={attending === option.value}
                onChange={() => setAttending(option.value as 'yes' | 'no')}
                className="h-4 w-4 accent-sage-600"
              />
              {option.label}
            </label>
          ))}
        </div>
        {state.fieldErrors?.attending ? (
          <p className="mt-2 text-xs text-red-600">{state.fieldErrors.attending}</p>
        ) : null}
      </fieldset>

      <AnimatePresence initial={false}>
        {attending === 'yes' ? (
          <motion.div
            key="guest-count"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <label htmlFor="guestCount" className="text-xs uppercase tracking-wider text-sage-500">
              Number of guests (including you)
            </label>
            <input
              id="guestCount"
              name="guestCount"
              type="number"
              min={1}
              max={10}
              step={1}
              defaultValue={1}
              aria-invalid={Boolean(state.fieldErrors?.guestCount)}
              className={`mt-2 ${fieldClass}`}
            />
            {state.fieldErrors?.guestCount ? (
              <p className="mt-2 text-xs text-red-600">{state.fieldErrors.guestCount}</p>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div>
        <label
          htmlFor="dietaryRestrictions"
          className="text-xs uppercase tracking-wider text-sage-500"
        >
          Dietary restrictions <span className="normal-case text-sage-400">(optional)</span>
        </label>
        <input
          id="dietaryRestrictions"
          name="dietaryRestrictions"
          type="text"
          maxLength={500}
          placeholder="Vegetarian, allergies, anything else…"
          className={`mt-2 ${fieldClass}`}
        />
      </div>

      {state.status === 'error' && !state.fieldErrors ? (
        <p className="text-sm text-red-600" role="alert">
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row sm:justify-between">
        <p className="order-2 text-xs text-sage-400 sm:order-1">{siteConfig.rsvpDeadlineLabel}</p>
        <div className="order-1 w-full sm:order-2 sm:w-auto">
          <SubmitButton />
        </div>
      </div>
    </form>
  );
}
