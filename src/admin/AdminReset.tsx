import { useState, type FormEvent } from 'react'
import { isSupabaseConfigured } from '../lib/supabase'
import { updatePassword } from './useAuth'
import { AuthShell, authInput } from './AuthShell'

/** Landing page for the "set new password" link sent by the reset email. */
export function AdminReset() {
  const [password, setPassword] = useState('')
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  if (!isSupabaseConfigured) {
    return (
      <AuthShell title="Панель не подключена">
        <p className="text-sm text-ink-soft">
          Сначала задайте ключи Supabase в <code className="rounded bg-paper-raised px-1">.env</code>.
        </p>
      </AuthShell>
    )
  }

  if (done) {
    return (
      <AuthShell title="Пароль обновлён">
        <a
          href="/admin"
          className="mt-2 inline-block w-full rounded-full bg-ink px-5 py-3 text-center text-sm font-medium text-paper"
        >
          Перейти ко входу
        </a>
      </AuthShell>
    )
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      await updatePassword(password)
      setDone(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось обновить пароль')
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthShell title="Новый пароль">
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium tracking-[0.12em] text-ink-faint uppercase">
            Новый пароль
          </span>
          <input
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            className={authInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error && <p className="text-sm text-accent">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-opacity disabled:opacity-50"
        >
          {busy ? 'Сохранение…' : 'Сохранить пароль'}
        </button>
      </form>
    </AuthShell>
  )
}
