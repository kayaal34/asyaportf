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

export type LeadInput = {
  name: string
  contact: string
  platform?: string
  shop?: string
  message?: string
}

export type Lead = LeadInput & {
  id: string
  created_at: string
  handled: boolean
}

/** Public: submit an application from the /contact form. */
export async function submitLead(input: LeadInput): Promise<void> {
  if (!supabase) throw new Error('Supabase не настроен')
  const { error } = await supabase.from('leads').insert({
    name: input.name.trim(),
    contact: input.contact.trim(),
    platform: input.platform || null,
    shop: input.shop?.trim() || null,
    message: input.message?.trim() || null,
  })
  if (error) throw error
}

/** Admin: list applications, newest first. */
export async function fetchLeads(): Promise<Lead[]> {
  if (!supabase) throw new Error('Supabase не настроен')
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []) as Lead[]
}

/** Admin: mark handled / unhandled. */
export async function setLeadHandled(id: string, handled: boolean): Promise<void> {
  if (!supabase) throw new Error('Supabase не настроен')
  const { error } = await supabase.from('leads').update({ handled }).eq('id', id)
  if (error) throw error
}

/** Admin: delete an application. */
export async function deleteLead(id: string): Promise<void> {
  if (!supabase) throw new Error('Supabase не настроен')
  const { error } = await supabase.from('leads').delete().eq('id', id)
  if (error) throw error
}
