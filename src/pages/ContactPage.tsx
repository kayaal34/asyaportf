import { useEffect, useState, type FormEvent } from 'react'
import { Header } from '../components/layout/Header'
import { Reveal } from '../components/Reveal'
import { useContent } from '../content/store'
import { CONTACT_PAGE } from '../content/site'
import { isSupabaseConfigured } from '../lib/supabase'
import { submitLead } from '../lib/contentIo'
import { cn } from '../lib/cn'

const field =
  'w-full rounded-xl border border-line bg-paper-raised px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-ink'

const label = 'mb-1.5 block text-xs tracking-[0.14em] text-ink-faint uppercase'

export function ContactPage() {
  const { contact } = useContent()
  useEffect(() => window.scrollTo(0, 0), [])

  const [form, setForm] = useState({
    name: '',
    contact: '',
    email: '',
    platform: 'WB + OZON',
    shop: '',
    turnover: '',
    message: '',
  })
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }))

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isSupabaseConfigured || !consent) return
    setStatus('sending')
    setError(null)
    try {
      await submitLead(form)
      setStatus('done')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Не удалось отправить')
    }
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <main className="mx-auto grid max-w-[80rem] gap-14 px-6 pt-36 pb-28 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:pt-44">
        <div>
          <Reveal>
            <p className="text-xs font-medium tracking-[0.24em] text-ink-faint uppercase">
              {CONTACT_PAGE.kicker}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 text-headline text-balance">{CONTACT_PAGE.title}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-lead text-ink-soft text-balance">{CONTACT_PAGE.intro}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col gap-3 border-t border-line pt-8 text-sm">
              <a href={contact.telegramUrl} target="_blank" rel="noreferrer noopener" className="group inline-flex items-center gap-3 hover:text-accent">
                <span className="w-24 shrink-0 text-xs tracking-[0.16em] text-ink-faint uppercase">Telegram</span>
                {contact.telegramHandle} <span aria-hidden>↗</span>
              </a>
              <a href={`mailto:${contact.email}`} className="group inline-flex items-center gap-3 hover:text-accent">
                <span className="w-24 shrink-0 text-xs tracking-[0.16em] text-ink-faint uppercase">Email</span>
                {contact.email}
              </a>
              <a href={contact.whatsappUrl} target="_blank" rel="noreferrer noopener" className="group inline-flex items-center gap-3 hover:text-accent">
                <span className="w-24 shrink-0 text-xs tracking-[0.16em] text-ink-faint uppercase">WhatsApp</span>
                {contact.whatsapp} <span aria-hidden>↗</span>
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          {status === 'done' ? (
            <div className="rounded-2xl border border-line bg-paper-raised p-8 sm:p-10">
              <h2 className="text-2xl font-extrabold tracking-[-0.02em]">{CONTACT_PAGE.successTitle}</h2>
              <p className="mt-3 text-ink-soft">{CONTACT_PAGE.successText}</p>
              <a
                href={contact.telegramUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-ink"
              >
                Написать в Telegram <span aria-hidden>→</span>
              </a>
            </div>
          ) : !isSupabaseConfigured ? (
            <div className="rounded-2xl border border-line bg-paper-raised p-8 text-sm text-ink-soft sm:p-10">
              Форма заявок пока не подключена. Напишите напрямую в{' '}
              <a href={contact.telegramUrl} target="_blank" rel="noreferrer noopener" className="text-ink underline decoration-line underline-offset-4 hover:decoration-accent">
                Telegram {contact.telegramHandle}
              </a>
              .
            </div>
          ) : (
            <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-paper-raised p-7 sm:p-9">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className={label}>Имя *</span>
                  <input required className={field} value={form.name} onChange={(e) => set('name')(e.target.value)} placeholder="Как к вам обращаться" />
                </label>
                <label className="block">
                  <span className={label}>Email *</span>
                  <input required type="email" className={field} value={form.email} onChange={(e) => set('email')(e.target.value)} placeholder="you@mail.ru" />
                </label>
                <label className="block">
                  <span className={label}>Telegram / WhatsApp *</span>
                  <input required className={field} value={form.contact} onChange={(e) => set('contact')(e.target.value)} placeholder="@ник или номер" />
                </label>
                <label className="block">
                  <span className={label}>Площадка</span>
                  <select className={cn(field, 'appearance-none')} value={form.platform} onChange={(e) => set('platform')(e.target.value)}>
                    <option>WB + OZON</option>
                    <option>Wildberries</option>
                    <option>OZON</option>
                    <option>Пока выбираю</option>
                  </select>
                </label>
                <label className="block">
                  <span className={label}>Магазин / ссылка</span>
                  <input className={field} value={form.shop} onChange={(e) => set('shop')(e.target.value)} placeholder="Название или ссылка на кабинет" />
                </label>
                <label className="block">
                  <span className={label}>Оборот / мес</span>
                  <input className={field} value={form.turnover} onChange={(e) => set('turnover')(e.target.value)} placeholder="Например, 1–2 млн ₽" />
                </label>
              </div>
              <label className="mt-4 block">
                <span className={label}>Задача</span>
                <textarea rows={4} className={cn(field, 'resize-y leading-relaxed')} value={form.message} onChange={(e) => set('message')(e.target.value)} placeholder="Что хотите улучшить, какие цифры сейчас, сроки" />
              </label>

              <label className="mt-5 flex items-start gap-3 text-xs text-ink-soft">
                <input
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 size-4 shrink-0 accent-[var(--accent)]"
                />
                Согласен(на) на обработку персональных данных для ответа на заявку.
              </label>

              {error && <p className="mt-4 text-sm text-accent">{error}</p>}

              <button
                type="submit"
                disabled={status === 'sending' || !consent}
                className="mt-6 inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-base font-semibold text-accent-ink transition-opacity disabled:opacity-50"
              >
                {status === 'sending' ? 'Отправляю…' : CONTACT_PAGE.submitLabel}
                <span aria-hidden>→</span>
              </button>
              <p className="mt-4 text-xs text-ink-faint">Отвечу в течение 2 часов в рабочее время.</p>
            </form>
          )}
        </Reveal>
      </main>
    </div>
  )
}
