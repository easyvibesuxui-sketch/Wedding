'use client';

import { useFormState, useFormStatus } from 'react-dom';

import { signIn, type LoginState } from '@/app/admin/actions';

const initialState: LoginState = { error: null };

const fieldClass =
  'w-full rounded-md border border-cream-500 bg-white px-4 py-2.5 text-sm text-ink-700 shadow-sm focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400';

function SubmitButton() {
  const { pending } = useFormStatus();

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
  const [state, formAction] = useFormState(signIn, initialState);

  return (
    <form action={formAction} className="space-y-5">
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

      <SubmitButton />
    </form>
  );
}
