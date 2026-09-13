// Supabase Edge Function — sends Asya an email whenever a new lead lands in
// the `leads` table. Wired up via a Database Webhook (Database → Webhooks in
// the Supabase dashboard) that fires on INSERT into public.leads and POSTs
// the row here. See supabase/schema.sql for the webhook trigger and
// README.md for the full setup steps.
//
// Requires two project secrets (Edge Functions → Secrets):
//   RESEND_API_KEY  — API key from resend.com
//   NOTIFY_EMAIL    — the address that should receive new leads

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const NOTIFY_EMAIL = Deno.env.get('NOTIFY_EMAIL')

type LeadRecord = {
  name?: string
  contact?: string
  email?: string | null
  platform?: string | null
  shop?: string | null
  turnover?: string | null
  message?: string | null
  created_at?: string
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function row(label: string, value?: string | null): string {
  if (!value) return ''
  return `<tr><td style="padding:4px 12px 4px 0;color:#888;white-space:nowrap;">${escapeHtml(label)}</td><td style="padding:4px 0;">${escapeHtml(value)}</td></tr>`
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }
  if (!RESEND_API_KEY || !NOTIFY_EMAIL) {
    console.error('Missing RESEND_API_KEY or NOTIFY_EMAIL secret')
    return new Response('Not configured', { status: 500 })
  }

  const payload = await req.json().catch(() => null)
  const lead: LeadRecord | undefined = payload?.record

  if (!lead) {
    return new Response('No record in payload', { status: 400 })
  }

  const subject = `Новая заявка с сайта — ${lead.name ?? 'без имени'}`
  const html = `
    <div style="font-family:sans-serif;font-size:14px;color:#111;">
      <h2 style="margin:0 0 16px;">Новая заявка с сайта</h2>
      <table cellspacing="0" cellpadding="0">
        ${row('Имя', lead.name)}
        ${row('Контакт', lead.contact)}
        ${row('Email', lead.email)}
        ${row('Площадка', lead.platform)}
        ${row('Магазин', lead.shop)}
        ${row('Оборот/мес', lead.turnover)}
        ${row('Задача', lead.message)}
      </table>
    </div>
  `

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Заявки с сайта <onboarding@resend.dev>',
      to: [NOTIFY_EMAIL],
      reply_to: lead.email || undefined,
      subject,
      html,
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    console.error('Resend error', res.status, text)
    return new Response(`Resend error: ${text}`, { status: 502 })
  }

  return new Response('ok', { status: 200 })
})
