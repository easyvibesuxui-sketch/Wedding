'use client';

import { startTransition, useActionState, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { submitRsvp, type RsvpState } from '@/app/actions';
import { useT } from '@/components/LanguageProvider';
import { useTemplate } from '@/components/TemplateProvider';
import { siteConfig } from '@/lib/site-config';

const initialState: RsvpState = { status: 'idle', message: null };

const fieldClass =
  'w-full border-b border-t-line/70 bg-transparent px-1 py-3 text-lg text-t-ink placeholder:text-t-ink-soft/60 focus:border-t-accent focus:outline-none';

function SubmitButton({ pending }: { pending: boolean }) {
  const t = useT();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-t-cta px-10 py-4 text-xs uppercase tracking-widest text-t-on-cta transition-colors hover:bg-t-cta/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-t-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? t.submitting : t.submit}
    </button>
  );
}

/** The seal opens the form, the form collects the reply, the reply is thanked. */
export function RsvpForm() {
  const t = useT();
  const { Divider, Emblem } = useTemplate();
  const [state, formAction, pending] = useActionState(submitRsvp, initialState);
  const [open, setOpen] = useState(false);
  const [attending, setAttending] = useState<'yes' | 'no' | ''>('');

  // Submitted by hand rather than through `action`: React resets a form once
  // its action has run, which would wipe what the guest typed — and uncheck
  // the reply radio behind its highlighted label — whenever an error comes back.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => formAction(formData));
  }

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
              <p className="section-title text-3xl sm:text-4xl">{t.thankYou}</p>
              <Divider className="mx-auto mt-4" />
              {state.message ? (
                <p className="mt-6 text-lg text-t-ink-soft">{t.rsvpMessages[state.message]}</p>
              ) : null}
            </motion.div>
          ) : open ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="mt-12 space-y-9 text-left"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div>
                <label htmlFor="fullName" className="eyebrow">
                  {t.fieldName}
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  maxLength={120}
                  autoComplete="name"
                  placeholder={t.fieldNamePlaceholder}
                  aria-invalid={Boolean(state.fieldErrors?.fullName)}
                  className={`mt-2 ${fieldClass}`}
                />
                {state.fieldErrors?.fullName ? (
                  <p className="mt-2 text-sm text-t-cta">{t.rsvpMessages[state.fieldErrors.fullName]}</p>
                ) : null}
              </div>

              <fieldset>
                <legend className="eyebrow">{t.fieldAttending}</legend>
                <div className="mt-4 grid gap-3">
                  {[
                    { value: 'yes', label: t.attendingYes },
                    { value: 'no', label: t.attendingNo },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`flex cursor-pointer items-center gap-3 border px-5 py-4 text-lg transition-colors ${
                        attending === option.value
                          ? 'border-t-accent bg-t-accent/10 text-t-ink'
                          : 'border-t-line/60 text-t-ink-soft hover:border-t-accent'
                      }`}
                    >
                      <input
                        type="radio"
                        name="attending"
                        value={option.value}
                        required
                        checked={attending === option.value}
                        onChange={() => setAttending(option.value as 'yes' | 'no')}
                        className="h-4 w-4 accent-[rgb(var(--t-cta))]"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
                {state.fieldErrors?.attending ? (
                  <p className="mt-2 text-sm text-t-cta">{t.rsvpMessages[state.fieldErrors.attending]}</p>
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
                      {t.fieldGuests}
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
                      <p className="mt-2 text-sm text-t-cta">{t.rsvpMessages[state.fieldErrors.guestCount]}</p>
                    ) : null}
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <div>
                <label htmlFor="dietaryRestrictions" className="eyebrow">
                  {t.fieldDietary}{' '}
                  <span className="normal-case">{t.fieldOptional}</span>
                </label>
                <input
                  id="dietaryRestrictions"
                  name="dietaryRestrictions"
                  type="text"
                  maxLength={500}
                  placeholder={t.fieldDietaryPlaceholder}
                  className={`mt-2 ${fieldClass}`}
                />
              </div>

              {state.status === 'error' && !state.fieldErrors && state.message ? (
                <p className="text-sm text-t-cta" role="alert">
                  {t.rsvpMessages[state.message]}
                </p>
              ) : null}

              <div className="space-y-4 pt-2 text-center">
                <SubmitButton pending={pending} />
                <p className="text-sm text-t-ink-soft">{t.rsvpDeadline}</p>
              </div>
            </motion.form>
          ) : (
            <motion.button
              key="seal"
              type="button"
              onClick={() => setOpen(true)}
              className="mx-auto mt-12 flex flex-col items-center gap-3 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-t-accent focus-visible:ring-offset-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Emblem size={124} />
              <svg width="22" height="12" viewBox="0 0 22 12" fill="none" stroke="#c19a45" strokeWidth="1.5" aria-hidden="true">
                <path d="M2 10L11 2l9 8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xs tracking-[0.28em] text-t-accent">{t.rsvpOpen}</span>
            </motion.button>
          )}
        </AnimatePresence>
  );
}
