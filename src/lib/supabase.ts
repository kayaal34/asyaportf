import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

/**
 * Supabase client, or `null` when the project has no credentials configured.
 * The public site must render fine without it — everything falls back to the
 * bundled defaults in `content/site.ts`.
 */
export const supabase: SupabaseClient | null =
  url && anonKey
    ? createClient(url, anonKey, {
        auth: { persistSession: true, autoRefreshToken: true },
      })
    : null

export const isSupabaseConfigured = supabase !== null

/** Name of the storage bucket that holds uploaded Work images. */
export const WORK_BUCKET = 'work-images'

/** The single content row's primary key. */
export const CONTENT_ROW_ID = 1
