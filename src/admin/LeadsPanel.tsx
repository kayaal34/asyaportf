import { useCallback, useEffect, useState } from 'react'
import { fetchLeads, setLeadHandled, deleteLead, type Lead } from '../lib/contentIo'

const dtf = new Intl.DateTimeFormat('ru-RU', {
  day: '2-digit',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
})

export function LeadsPanel() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setLeads(await fetchLeads())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось загрузить заявки')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const newCount = leads.filter((l) => !l.handled).length

  async function toggle(lead: Lead) {
    setLeads((ls) => ls.map((l) => (l.id === lead.id ? { ...l, handled: !l.handled } : l)))
    try {
      await setLeadHandled(lead.id, !lead.handled)
    } catch {
      void load()
    }
  }

  async function remove(lead: Lead) {
    if (!window.confirm('Удалить заявку?')) return
    setLeads((ls) => ls.filter((l) => l.id !== lead.id))
    try {
      await deleteLead(lead.id)
    } catch {
      void load()
    }
  }

  return (
    <details open className="rounded-xl border border-line bg-paper-raised px-4 py-3 open:pb-5">
      <summary className="flex cursor-pointer list-none items-center justify-between py-1">
        <span className="font-display text-sm font-bold tracking-[-0.01em]">
          Заявки{' '}
          {newCount > 0 && (
            <span className="ml-1 rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-ink">
              {newCount} новых
            </span>
          )}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            void load()
          }}
          className="text-xs text-ink-faint hover:text-ink"
        >
          обновить
        </button>
      </summary>

      <div className="mt-4 space-y-3">
        {loading && <p className="text-sm text-ink-faint">Загрузка…</p>}
        {error && <p className="text-sm text-accent">{error}</p>}
        {!loading && !error && leads.length === 0 && (
          <p className="text-sm text-ink-faint">Заявок пока нет.</p>
        )}

        {leads.map((lead) => (
          <div
            key={lead.id}
            className={`rounded-lg border p-4 text-sm ${
              lead.handled ? 'border-line opacity-60' : 'border-line-strong'
            }`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="font-semibold text-ink">{lead.name}</span>
              <span className="text-xs text-ink-faint">{dtf.format(new Date(lead.created_at))}</span>
            </div>
            <p className="mt-1 text-ink">
              {lead.contact}
              {lead.email ? ` · ${lead.email}` : ''}
            </p>
            <p className="mt-1 text-ink-soft">
              {[lead.platform, lead.shop, lead.turnover].filter(Boolean).join(' · ') || '—'}
            </p>
            {lead.message && (
              <p className="mt-2 leading-relaxed text-ink-soft">{lead.message}</p>
            )}
            <div className="mt-3 flex gap-3 text-xs">
              <button
                type="button"
                onClick={() => toggle(lead)}
                className="rounded-full border border-line px-3 py-1 text-ink-soft hover:border-ink hover:text-ink"
              >
                {lead.handled ? 'вернуть в новые' : 'отметить обработанной'}
              </button>
              <button
                type="button"
                onClick={() => remove(lead)}
                className="rounded-full border border-line px-3 py-1 text-ink-soft hover:border-accent hover:text-accent"
              >
                удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </details>
  )
}
