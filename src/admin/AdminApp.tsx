import { useState, type FormEvent } from 'react'
import { isSupabaseConfigured } from '../lib/supabase'
import { useAuth, signIn } from './useAuth'
import { Dashboard } from './Dashboard'
import { AuthShell, authInput } from './AuthShell'

export function AdminApp() {
  const { session, loading } = useAuth()

  if (!isSupabaseConfigured) {
    return (
      <AuthShell title="Панель не подключена">
        <p className="text-sm leading-relaxed text-ink-soft">
          Чтобы включить редактирование сайта, задайте переменные{' '}
          <code className="rounded bg-paper-raised px-1">VITE_SUPABASE_URL</code> и{' '}
          <code className="rounded bg-paper-raised px-1">VITE_SUPABASE_ANON_KEY</code> в файле{' '}
          <code className="rounded bg-paper-raised px-1">.env</code> и пересоберите проект. Инструкция —
          в <code className="rounded bg-paper-raised px-1">README.md</code>.
        </p>
      </AuthShell>
    )
  }

  if (loading) {
    return (
      <AuthShell title="Панель · Ася">
        <p className="text-sm text-ink-faint">Загрузка…</p>
      </AuthShell>
    )
  }

  if (!session) return <LoginForm />

  return <Dashboard />
}

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      await signIn(email.trim(), password)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось войти')
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthShell title="Вход в панель">
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium tracking-[0.12em] text-ink-faint uppercase">
            Эл. почта
          </span>
          <input
            type="email"
            autoComplete="username"
            required
            className={authInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium tracking-[0.12em] text-ink-faint uppercase">
            Пароль
          </span>
          <input
            type="password"
            autoComplete="current-password"
            required
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
          {busy ? 'Вход…' : 'Войти'}
        </button>
        <p className="text-center text-xs text-ink-faint">
          Первый вход?{' '}
          <a href="/admin/setup" className="underline underline-offset-2 hover:text-ink">
            Создать аккаунт
          </a>
        </p>
      </form>
    </AuthShell>
  )
}
