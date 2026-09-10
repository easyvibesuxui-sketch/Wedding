'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { Flourish } from '@/components/art/Flourish';
import { Seal } from '@/components/art/Seal';
import { submitRsvp, type RsvpState } from '@/app/actions';
import { siteConfig } from '@/lib/site-config';

const initialState: RsvpState = { status: 'idle', message: '' };

const fieldClass =
  'w-full border-b border-gold-300/70 bg-transparent px-1 py-3 text-lg text-ink-600 placeholder:text-ink-300 focus:border-gold-400 focus:outline-none';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-wine-500 px-10 py-4 text-xs uppercase tracking-widest text-cream-100 transition-colors hover:bg-wine-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? siteConfig.copy.submitting : siteConfig.copy.submit}
    </button>
  );
}

/** The seal opens the form, the form collects the reply, the reply is thanked. */
export function RsvpForm() {
  const [state, formAction] = useFormState(submitRsvp, initialState);
  const [open, setOpen] = useState(false);
  const [attending, setAttending] = useState<'yes' | 'no' | ''>('');

  const sent = state.status === 'success';

  return (
        <AnimatePresence mode="wait" initial={false}>
          {sent ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12"
              role="status"
            >
              <p className="section-title text-3xl sm:text-4xl">{siteConfig.copy.thankYou}</p>
              <Flourish className="mx-auto mt-4" />
              <p className="mt-6 text-lg text-ink-500">{state.message}</p>
            </motion.div>
          ) : open ? (
            <motion.form
              key="form"
              action={formAction}
              className="mt-12 space-y-9 text-left"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div>
                <label htmlFor="fullName" className="eyebrow">
                  {siteConfig.copy.fieldName}
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  maxLength={120}
                  autoComplete="name"
                  placeholder={siteConfig.copy.fieldNamePlaceholder}
                  aria-invalid={Boolean(state.fieldErrors?.fullName)}
                  className={`mt-2 ${fieldClass}`}
                />
                {state.fieldErrors?.fullName ? (
                  <p className="mt-2 text-sm text-wine-500">{state.fieldErrors.fullName}</p>
                ) : null}
              </div>

              <fieldset>
                <legend className="eyebrow">{siteConfig.copy.fieldAttending}</legend>
                <div className="mt-4 grid gap-3">
                  {[
                    { value: 'yes', label: siteConfig.copy.attendingYes },
                    { value: 'no', label: siteConfig.copy.attendingNo },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`flex cursor-pointer items-center gap-3 border px-5 py-4 text-lg transition-colors ${
                        attending === option.value
                          ? 'border-gold-400 bg-gold-100/45 text-ink-600'
                          : 'border-gold-300/60 text-ink-500 hover:border-gold-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="attending"
                        value={option.value}
                        required
                        checked={attending === option.value}
                        onChange={() => setAttending(option.value as 'yes' | 'no')}
                        className="h-4 w-4 accent-wine-500"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
                {state.fieldErrors?.attending ? (
                  <p className="mt-2 text-sm text-wine-500">{state.fieldErrors.attending}</p>
                ) : null}
              </fieldset>

              <AnimatePresence initial={false}>
                {attending === 'yes' ? (
                  <motion.div
                    key="guests"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <label htmlFor="guestCount" className="eyebrow">
                      {siteConfig.copy.fieldGuests}
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
                      <p className="mt-2 text-sm text-wine-500">{state.fieldErrors.guestCount}</p>
                    ) : null}
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <div>
                <label htmlFor="dietaryRestrictions" className="eyebrow">
                  {siteConfig.copy.fieldDietary}{' '}
                  <span className="normal-case">{siteConfig.copy.fieldOptional}</span>
                </label>
                <input
                  id="dietaryRestrictions"
                  name="dietaryRestrictions"
                  type="text"
                  maxLength={500}
                  placeholder="ვეგეტარიანული, ალერგია, სხვა…"
                  className={`mt-2 ${fieldClass}`}
                />
              </div>

              {state.status === 'error' && !state.fieldErrors ? (
                <p className="text-sm text-wine-500" role="alert">
                  {state.message}
                </p>
              ) : null}

              <div className="space-y-4 pt-2 text-center">
                <SubmitButton />
                <p className="text-sm text-ink-400">{siteConfig.copy.rsvpDeadline}</p>
              </div>
            </motion.form>
          ) : (
            <motion.button
              key="seal"
              type="button"
              onClick={() => setOpen(true)}
              className="mx-auto mt-12 flex flex-col items-center gap-3 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Seal label="RSVP" size={124} script={false} />
              <svg width="22" height="12" viewBox="0 0 22 12" fill="none" stroke="#c19a45" strokeWidth="1.5" aria-hidden="true">
                <path d="M2 10L11 2l9 8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xs tracking-[0.28em] text-gold-600">{siteConfig.copy.rsvpOpen}</span>
            </motion.button>
          )}
        </AnimatePresence>
  );
}
