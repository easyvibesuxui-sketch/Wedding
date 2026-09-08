/**
 * The two public Supabase settings. They are read in a few places (server
 * action, middleware, clients), and the app has to stay usable when they are
 * missing — e.g. on a preview deployment made before the project is wired up.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}
