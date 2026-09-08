'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/env';

export type LoginState = { error: string | null };

export async function signIn(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  const redirectTo = String(formData.get('redirectTo') ?? '') || '/admin/dashboard';

  if (!email || !password) {
    return { error: 'Enter your email and password.' };
  }

  if (!isSupabaseConfigured()) {
    return { error: 'Supabase is not configured for this deployment yet.' };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: 'Invalid email or password.' };
  }

  revalidatePath('/admin/dashboard');
  // Only ever redirect inside this app.
  redirect(redirectTo.startsWith('/admin') ? redirectTo : '/admin/dashboard');
}

export async function signOut() {
  if (!isSupabaseConfigured()) redirect('/admin/login');

  const supabase = createClient();
  await supabase.auth.signOut();
  redirect('/admin/login');
}
