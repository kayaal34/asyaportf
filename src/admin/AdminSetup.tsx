import { useState, type FormEvent } from 'react'
import { isSupabaseConfigured } from '../lib/supabase'
import { signUp } from './useAuth'
import { AuthShell, authInput } from './AuthShell'

/**
 * One-time account creation. Works only while "Allow new users to sign up" is
 * enabled in the Supabase dashboard — turn it off again right after.
 */
export function AdminSetup() {
  const [email, setEmail] = useState('')
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
      <AuthShell title="Аккаунт создан">
        <p className="text-sm leading-relaxed text-ink-soft">
          Если в Supabase включено подтверждение почты — проверьте письмо. Затем{' '}
          <strong className="text-ink">отключите</strong> регистрацию новых пользователей
          в настройках Supabase (Authentication → Sign In / Providers) и войдите в панель.
        </p>
        <a
          href="/admin"
          className="mt-6 inline-block w-full rounded-full bg-ink px-5 py-3 text-center text-sm font-medium text-paper"
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
      await signUp(email.trim(), password)
      setDone(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось создать аккаунт')
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthShell title="Создание аккаунта">
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
          {busy ? 'Создание…' : 'Создать аккаунт'}
        </button>
        <p className="text-center text-xs text-ink-faint">
          Уже есть аккаунт?{' '}
          <a href="/admin" className="underline underline-offset-2 hover:text-ink">
            Войти
          </a>
        </p>
      </form>
    </AuthShell>
  )
}
