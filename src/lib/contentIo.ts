import { supabase, CONTENT_ROW_ID, WORK_BUCKET } from './supabase'
import type { SiteContent } from '../content/site'

/** Persist the whole content document. Requires an authenticated session. */
export async function saveContent(content: SiteContent): Promise<void> {
  if (!supabase) throw new Error('Supabase не настроен')
  const { error } = await supabase
    .from('site_content')
    .upsert({ id: CONTENT_ROW_ID, data: content, updated_at: new Date().toISOString() })
  if (error) throw error
}

/** Upload one image to the Work bucket and return its public URL. */
export async function uploadWorkImage(file: File): Promise<string> {
  if (!supabase) throw new Error('Supabase не настроен')

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-').toLowerCase()
  const path = `${Date.now()}-${safeName}`

  const { error } = await supabase.storage.from(WORK_BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type || undefined,
  })
  if (error) throw error

  const { data } = supabase.storage.from(WORK_BUCKET).getPublicUrl(path)
  return data.publicUrl
}
