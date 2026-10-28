'use client';

import { startTransition, useActionState, type FormEvent } from 'react';

import { signIn, type LoginState } from '@/app/admin/actions';

const initialState: LoginState = { error: null };

const fieldClass =
  'w-full rounded-md border border-cream-500 bg-white px-4 py-2.5 text-sm text-ink-700 shadow-sm focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400';

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-wine-500 px-4 py-2.5 text-sm font-medium text-cream-100 transition-colors hover:bg-wine-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 disabled:opacity-60"
    >
      {pending ? 'Signing in…' : 'Sign in'}
    </button>
  );
}

export function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const [state, formAction, pending] = useActionState(signIn, initialState);

  // Submitted by hand rather than through `action`, so a failed sign-in does
  // not trigger React's post-action form reset and clear the email.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => formAction(formData));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input type="hidden" name="redirectTo" value={redirectTo ?? ''} />

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-600">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink-600">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={fieldClass}
        />
      </div>

      {state.error ? (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
          {state.error}
        </p>
      ) : null}

      <SubmitButton pending={pending} />
    </form>
  );
}
