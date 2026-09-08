import { createBrowserClient } from '@supabase/ssr';

import { SUPABASE_ANON_KEY, SUPABASE_URL } from './env';
import type { Database } from './types';

/** Supabase client for use inside Client Components (browser only). */
export function createClient() {
  return createBrowserClient<Database>(
    SUPABASE_URL!,
    SUPABASE_ANON_KEY!,
  );
}
