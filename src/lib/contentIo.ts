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
  email?: string
  platform?: string
  shop?: string
  turnover?: string
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
    email: input.email?.trim() || null,
    platform: input.platform || null,
    shop: input.shop?.trim() || null,
    turnover: input.turnover?.trim() || null,
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

/* ---- Lightweight analytics ---- */

/** Public: record one page view. Fails silently — analytics must never break the site. */
export async function trackPageView(path: string): Promise<void> {
  if (!supabase) return
  try {
    await supabase.from('page_views').insert({
      path,
      referrer: typeof document !== 'undefined' ? document.referrer || null : null,
    })
  } catch {
    /* ignore */
  }
}

export type Stats = {
  total: number
  last7: number
  last30: number
  byPath: { path: string; count: number }[]
  leadsTotal: number
  leads7: number
}

/** Admin: aggregate view + lead stats. */
export async function fetchStats(): Promise<Stats> {
  if (!supabase) throw new Error('Supabase не настроен')
  const now = Date.now()
  const d7 = new Date(now - 7 * 864e5).toISOString()
  const d30 = new Date(now - 30 * 864e5).toISOString()

  const { data: views, error } = await supabase
    .from('page_views')
    .select('path, created_at')
    .order('created_at', { ascending: false })
    .limit(5000)
  if (error) throw error

  const rows = views ?? []
  const byPathMap = new Map<string, number>()
  for (const r of rows) byPathMap.set(r.path, (byPathMap.get(r.path) ?? 0) + 1)

  const { count: leadsTotal } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
  const { count: leads7 } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', d7)

  return {
    total: rows.length,
    last7: rows.filter((r) => r.created_at >= d7).length,
    last30: rows.filter((r) => r.created_at >= d30).length,
    byPath: [...byPathMap.entries()]
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count),
    leadsTotal: leadsTotal ?? 0,
    leads7: leads7 ?? 0,
  }
}
