import { useEffect, useState } from 'react'
import { fetchStats, type Stats } from '../lib/contentIo'

export function StatsPanel() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
      .then(setStats)
      .catch((e) => setError(e instanceof Error ? e.message : 'Ошибка'))
      .finally(() => setLoading(false))
  }, [])

  const conv =
    stats && stats.total > 0 ? ((stats.leadsTotal / stats.total) * 100).toFixed(1) : '—'

  return (
    <details open className="rounded-xl border border-line bg-paper-raised px-4 py-3 open:pb-5">
      <summary className="cursor-pointer list-none py-1 font-display text-sm font-bold tracking-[-0.01em]">
        Статистика
      </summary>
      <div className="mt-4">
        {loading && <p className="text-sm text-ink-faint">Загрузка…</p>}
        {error && (
          <p className="text-sm text-accent">
            {error.includes('page_views') || error.includes('does not exist')
              ? 'Таблица page_views ещё не создана — выполните обновлённый supabase/schema.sql.'
              : error}
          </p>
        )}
        {stats && (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat label="Визитов всего" value={stats.total} />
              <Stat label="За 7 дней" value={stats.last7} />
              <Stat label="За 30 дней" value={stats.last30} />
              <Stat label="Заявок всего" value={stats.leadsTotal} />
            </div>
            <p className="mt-4 text-sm text-ink-soft">
              Конверсия в заявку: <span className="font-semibold text-ink">{conv}%</span> · заявок за
              7 дней: <span className="font-semibold text-ink">{stats.leads7}</span>
            </p>
            {stats.byPath.length > 0 && (
              <div className="mt-5">
                <p className="mb-2 text-xs tracking-[0.14em] text-ink-faint uppercase">По страницам</p>
                <ul className="space-y-1.5">
                  {stats.byPath.slice(0, 8).map((r) => {
                    const pct = stats.total ? (r.count / stats.total) * 100 : 0
                    return (
                      <li key={r.path} className="text-sm">
                        <div className="flex justify-between">
                          <span className="text-ink">{r.path}</span>
                          <span className="text-ink-faint tabular-nums">{r.count}</span>
                        </div>
                        <div className="mt-1 h-1 rounded-full bg-line">
                          <div className="h-1 rounded-full bg-accent" style={{ width: `${pct}%` }} />
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </details>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="font-display text-2xl font-extrabold tracking-[-0.03em] tabular-nums">{value}</p>
      <p className="text-xs text-ink-faint">{label}</p>
    </div>
  )
}
