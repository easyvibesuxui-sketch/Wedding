'use client';

import { useFormState, useFormStatus } from 'react-dom';

import { signIn, type LoginState } from '@/app/admin/actions';

const initialState: LoginState = { error: null };

const fieldClass =
  'w-full rounded-md border border-sage-200 bg-white px-4 py-2.5 text-sm text-sage-800 shadow-sm focus:border-sage-400 focus:outline-none focus:ring-1 focus:ring-sage-400';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-sage-700 px-4 py-2.5 text-sm font-medium text-ivory-50 transition-colors hover:bg-sage-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2 disabled:opacity-60"
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
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-sage-700">
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
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-sage-700">
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
