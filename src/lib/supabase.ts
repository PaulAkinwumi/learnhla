import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anonKey as string)
  : null;

export const SETUP_MESSAGE =
  'Supabase is not configured. Copy .env.example to .env, add your project URL and anon key, then run supabase/schema.sql in the Supabase SQL editor.';

export function errorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return String(err);
}
