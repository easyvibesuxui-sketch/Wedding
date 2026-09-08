import type { Metadata } from 'next';

import { LoginForm } from '@/components/admin/LoginForm';
import { coupleNames } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Admin sign in',
  robots: { index: false, follow: false },
};

export default function LoginPage({
  searchParams,
}: {
  searchParams: { redirectTo?: string };
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-cream-200 px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="font-serif text-2xl tracking-wide text-ink-700">{coupleNames}</p>
          <h1 className="mt-2 text-xs uppercase tracking-widest text-gold-500">Admin dashboard</h1>
        </div>

        <div className="rounded-xl border border-cream-400 bg-white p-8 shadow-sm">
          <LoginForm redirectTo={searchParams.redirectTo} />
        </div>

        <p className="mt-6 text-center text-xs text-ink-400">
          Accounts are created in Supabase — public sign-up is disabled.
        </p>
      </div>
    </main>
  );
}
