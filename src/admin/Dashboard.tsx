import { useMemo, useState } from 'react'
import { useContent, useContentMeta } from '../content/store'
import type {
  CaseItem,
  Channel,
  ExpertiseItem,
  MetricItem,
  SiteContent,
} from '../content/site'
import { saveContent } from '../lib/contentIo'
import { signOut } from './useAuth'
import { Field, NumberInput, Repeater, StringList, TextArea, TextInput, Toggle } from './fields'
import { ImageField } from './ImageField'

const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v)) as T

export function Dashboard() {
  const content = useContent()
  const { refetch } = useContentMeta()

  const [draft, setDraft] = useState<SiteContent>(() => clone(content))
  const [savedSnapshot, setSavedSnapshot] = useState<string>(() => JSON.stringify(content))
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const dirty = useMemo(() => JSON.stringify(draft) !== savedSnapshot, [draft, savedSnapshot])

  function patch<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    setDraft((d) => ({ ...d, [key]: value }))
  }

  async function handleSave() {
    setSaving(true)
    setMessage(null)
    try {
      await saveContent(draft)
      setSavedSnapshot(JSON.stringify(draft))
      await refetch()
      setMessage('Сохранено')
      window.setTimeout(() => setMessage(null), 2500)
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Ошибка сохранения')
    } finally {
      setSaving(false)
    }
  }

  function handleReset() {
    setDraft(clone(content))
    setMessage(null)
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Toolbar */}
      <header className="sticky top-0 z-20 border-b border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-3">
          <div className="flex items-center gap-3">
            <span className="font-display text-sm font-extrabold tracking-[-0.02em]">
              Панель · Ася
            </span>
            {dirty && <span className="size-2 rounded-full bg-accent" title="Есть несохранённые изменения" />}
          </div>
          <div className="flex items-center gap-2 text-sm">
            {message && <span className="text-ink-soft">{message}</span>}
            <button
              type="button"
              onClick={handleReset}
              disabled={!dirty || saving}
              className="rounded-full border border-line px-3 py-1.5 text-xs transition-colors enabled:hover:border-ink disabled:opacity-40"
            >
              Отменить
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!dirty || saving}
              className="rounded-full bg-ink px-4 py-1.5 text-xs font-medium text-paper transition-opacity disabled:opacity-40"
            >
              {saving ? 'Сохранение…' : 'Сохранить'}
            </button>
            <a
              href="/"
              className="rounded-full border border-line px-3 py-1.5 text-xs transition-colors hover:border-ink"
            >
              Сайт ↗
            </a>
            <button
              type="button"
              onClick={() => void signOut()}
              className="rounded-full border border-line px-3 py-1.5 text-xs transition-colors hover:border-accent hover:text-accent"
            >
              Выйти
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-3 px-5 py-8">
        <Panel title="Контакты и ссылки" defaultOpen>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Имя">
              <TextInput value={draft.contact.name} onChange={(v) => patch('contact', { ...draft.contact, name: v })} />
            </Field>
            <Field label="Роль">
              <TextInput value={draft.contact.role} onChange={(v) => patch('contact', { ...draft.contact, role: v })} />
            </Field>
            <Field label="Telegram — ник">
              <TextInput value={draft.contact.telegramHandle} onChange={(v) => patch('contact', { ...draft.contact, telegramHandle: v })} />
            </Field>
            <Field label="Telegram — ссылка">
              <TextInput value={draft.contact.telegramUrl} onChange={(v) => patch('contact', { ...draft.contact, telegramUrl: v })} />
            </Field>
            <Field label="Портфолио — ссылка">
              <TextInput value={draft.contact.portfolioUrl} onChange={(v) => patch('contact', { ...draft.contact, portfolioUrl: v })} />
            </Field>
            <Field label="Сайт-резюме — ссылка">
              <TextInput value={draft.contact.resumeUrl} onChange={(v) => patch('contact', { ...draft.contact, resumeUrl: v })} />
            </Field>
          </div>
        </Panel>

        <Panel title="Навигация">
          <Repeater
            items={draft.nav}
            onChange={(v) => patch('nav', v)}
            create={() => ({ label: 'Пункт', href: '#' })}
            title={(it) => it.label || 'пункт'}
            render={(it, update) => (
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Текст">
                  <TextInput value={it.label} onChange={(v) => update({ label: v })} />
                </Field>
                <Field label="Якорь / ссылка">
                  <TextInput value={it.href} onChange={(v) => update({ href: v })} />
                </Field>
              </div>
            )}
          />
        </Panel>

        <Panel title="Первый экран">
          <Field label="Надпись сверху">
            <TextInput value={draft.hero.kicker} onChange={(v) => patch('hero', { ...draft.hero, kicker: v })} />
          </Field>
          <Field label="Заголовок (по строкам)" hint="Каждая строка — отдельный пункт.">
            <StringList
              values={draft.hero.headline}
              onChange={(v) => patch('hero', { ...draft.hero, headline: v })}
              addLabel="строку"
            />
          </Field>
          <Field label="Акцентная строка">
            <TextInput value={draft.hero.emphasis} onChange={(v) => patch('hero', { ...draft.hero, emphasis: v })} />
          </Field>
          <Field label="Подзаголовок">
            <TextArea value={draft.hero.sub} onChange={(v) => patch('hero', { ...draft.hero, sub: v })} rows={3} />
          </Field>
        </Panel>

        <Panel title="Бегущая строка">
          <StringList values={draft.marquee} onChange={(v) => patch('marquee', v)} addLabel="слово" />
        </Panel>

        <Panel title="Метрики (первый экран)">
          <Repeater
            items={draft.metrics}
            onChange={(v) => patch('metrics', v)}
            create={(): MetricItem => ({ label: 'Метрика', from: 0, to: 100, decimals: 0 })}
            title={(it) => it.label || 'метрика'}
            render={(it, update) => (
              <>
                <Field label="Подпись">
                  <TextInput value={it.label} onChange={(v) => update({ label: v })} />
                </Field>
                <div className="grid gap-3 sm:grid-cols-3">
                  <Field label="Было">
                    <NumberInput value={it.from} onChange={(v) => update({ from: v })} />
                  </Field>
                  <Field label="Стало">
                    <NumberInput value={it.to} onChange={(v) => update({ to: v })} />
                  </Field>
                  <Field label="Знаков после запятой">
                    <NumberInput value={it.decimals} onChange={(v) => update({ decimals: Math.max(0, Math.round(v)) })} step="1" />
                  </Field>
                  <Field label="Единица (₽, % …)">
                    <TextInput value={it.unit ?? ''} onChange={(v) => update({ unit: v || undefined })} />
                  </Field>
                  <Field label="Прирост (+193%)">
                    <TextInput value={it.delta ?? ''} onChange={(v) => update({ delta: v || undefined })} />
                  </Field>
                </div>
                <Toggle
                  value={Boolean(it.single)}
                  onChange={(v) => update({ single: v || undefined })}
                  label="Одно число (без «было → стало»)"
                />
              </>
            )}
          />
        </Panel>

        <Panel title="Экспертиза">
          <SectionIntroFields
            value={draft.expertiseIntro}
            onChange={(v) => patch('expertiseIntro', v)}
          />
          <div className="mt-4">
            <Repeater
              items={draft.expertise}
              onChange={(v) => patch('expertise', v)}
              create={(): ExpertiseItem => ({
                index: '06',
                title: 'Новый пункт',
                body: '',
                scale: 'normal',
              })}
              title={(it) => `${it.index} · ${it.title}`}
              render={(it, update) => (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Номер">
                      <TextInput value={it.index} onChange={(v) => update({ index: v })} />
                    </Field>
                    <Field label="Размер плитки">
                      <Select
                        value={it.scale}
                        options={[
                          ['normal', 'обычная'],
                          ['wide', 'широкая'],
                          ['tall', 'высокая'],
                        ]}
                        onChange={(v) => update({ scale: v as 'normal' | 'wide' | 'tall' })}
                      />
                    </Field>
                  </div>
                  <Field label="Заголовок">
                    <TextInput value={it.title} onChange={(v) => update({ title: v })} />
                  </Field>
                  <Field label="Текст">
                    <TextArea value={it.body} onChange={(v) => update({ body: v })} />
                  </Field>
                </>
              )}
            />
          </div>
        </Panel>

        <Panel title="Работа">
          <Field label="Надпись сверху">
            <TextInput value={draft.workIntro.kicker} onChange={(v) => patch('workIntro', { ...draft.workIntro, kicker: v })} />
          </Field>
          <Field label="Заголовок">
            <TextInput value={draft.workIntro.title} onChange={(v) => patch('workIntro', { ...draft.workIntro, title: v })} />
          </Field>
          <Field label="Описание">
            <TextArea value={draft.workIntro.body} onChange={(v) => patch('workIntro', { ...draft.workIntro, body: v })} />
          </Field>
          <div className="mt-4">
            <Repeater
              items={draft.work}
              onChange={(v) => patch('work', v)}
              create={() => ({ title: 'Проект', discipline: '', note: '', image: '' })}
              title={(it) => it.title || 'проект'}
              render={(it, update) => (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Название">
                      <TextInput value={it.title} onChange={(v) => update({ title: v })} />
                    </Field>
                    <Field label="Дисциплина / подпись">
                      <TextInput value={it.discipline} onChange={(v) => update({ discipline: v })} />
                    </Field>
                  </div>
                  <Field label="Короткая заметка">
                    <TextInput value={it.note} onChange={(v) => update({ note: v })} />
                  </Field>
                  <ImageField value={it.image} onChange={(url) => update({ image: url })} />
                </>
              )}
            />
          </div>
        </Panel>

        <Panel title="Почему со мной">
          <SectionIntroFields value={draft.edgeIntro} onChange={(v) => patch('edgeIntro', v)} />
          <div className="mt-4">
            <Repeater
              items={draft.edge}
              onChange={(v) => patch('edge', v)}
              create={() => ({ figure: '00', figureLabel: '', title: '', body: '' })}
              title={(it) => it.title || 'пункт'}
              render={(it, update) => (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Число / знак">
                      <TextInput value={it.figure} onChange={(v) => update({ figure: v })} />
                    </Field>
                    <Field label="Подпись к числу">
                      <TextInput value={it.figureLabel} onChange={(v) => update({ figureLabel: v })} />
                    </Field>
                  </div>
                  <Field label="Заголовок">
                    <TextInput value={it.title} onChange={(v) => update({ title: v })} />
                  </Field>
                  <Field label="Текст">
                    <TextArea value={it.body} onChange={(v) => update({ body: v })} />
                  </Field>
                </>
              )}
            />
          </div>
        </Panel>

        <Panel title="Кейсы">
          <SectionIntroFields value={draft.casesIntro} onChange={(v) => patch('casesIntro', v)} />
          <div className="mt-4">
            <Repeater
              items={draft.cases}
              onChange={(v) => patch('cases', v)}
              create={(): CaseItem => ({
                id: `case-${Date.now()}`,
                label: 'Новый кейс',
                period: '',
                summary: '',
                stats: [],
                steps: [],
              })}
              title={(it) => it.label || 'кейс'}
              render={(it, update) => (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Название">
                      <TextInput value={it.label} onChange={(v) => update({ label: v })} />
                    </Field>
                    <Field label="Срок / период">
                      <TextInput value={it.period} onChange={(v) => update({ period: v })} />
                    </Field>
                  </div>
                  <Field label="Описание">
                    <TextArea value={it.summary} onChange={(v) => update({ summary: v })} />
                  </Field>
                  <Field label="Показатели">
                    <Repeater
                      items={it.stats}
                      onChange={(v) => update({ stats: v })}
                      create={() => ({ label: '', value: '' })}
                      title={(s) => s.label || 'показатель'}
                      addLabel="показатель"
                      render={(s, upd) => (
                        <div className="grid gap-3 sm:grid-cols-2">
                          <Field label="Подпись">
                            <TextInput value={s.label} onChange={(v) => upd({ label: v })} />
                          </Field>
                          <Field label="Значение">
                            <TextInput value={s.value} onChange={(v) => upd({ value: v })} />
                          </Field>
                        </div>
                      )}
                    />
                  </Field>
                  <Field label="Шаги метода">
                    <StringList values={it.steps} onChange={(v) => update({ steps: v })} addLabel="шаг" />
                  </Field>
                </>
              )}
            />
          </div>
        </Panel>

        <Panel title="Секция «Контакт»">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Надпись сверху">
              <TextInput value={draft.contactSection.kicker} onChange={(v) => patch('contactSection', { ...draft.contactSection, kicker: v })} />
            </Field>
            <Field label="Заголовок">
              <TextInput value={draft.contactSection.title} onChange={(v) => patch('contactSection', { ...draft.contactSection, title: v })} />
            </Field>
            <Field label="Статус">
              <TextInput value={draft.contactSection.status} onChange={(v) => patch('contactSection', { ...draft.contactSection, status: v })} />
            </Field>
            <Field label="Кнопка (подпись над ником)">
              <TextInput value={draft.contactSection.cta} onChange={(v) => patch('contactSection', { ...draft.contactSection, cta: v })} />
            </Field>
          </div>
          <Field label="Пояснение к статусу">
            <TextArea value={draft.contactSection.statusNote} onChange={(v) => patch('contactSection', { ...draft.contactSection, statusNote: v })} />
          </Field>
          <Field label="Заключительная строка">
            <TextArea value={draft.contactSection.closing} onChange={(v) => patch('contactSection', { ...draft.contactSection, closing: v })} rows={2} />
          </Field>
        </Panel>

        <Panel title="Каналы связи">
          <Repeater
            items={draft.channels}
            onChange={(v) => patch('channels', v)}
            create={(): Channel => ({ label: 'Канал', value: '', href: '', hint: '' })}
            title={(it) => it.label || 'канал'}
            render={(it, update) => (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Название">
                    <TextInput value={it.label} onChange={(v) => update({ label: v })} />
                  </Field>
                  <Field label="Значение (что показать)">
                    <TextInput value={it.value} onChange={(v) => update({ value: v })} />
                  </Field>
                  <Field label="Ссылка">
                    <TextInput value={it.href} onChange={(v) => update({ href: v })} />
                  </Field>
                  <Field label="Подсказка">
                    <TextInput value={it.hint} onChange={(v) => update({ hint: v })} />
                  </Field>
                </div>
                <Toggle
                  value={Boolean(it.primary)}
                  onChange={(v) => update({ primary: v || undefined })}
                  label="Главный канал (крупный)"
                />
              </>
            )}
          />
        </Panel>

        <Panel title="Подпись в подвале">
          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="Текст">
              <TextInput value={draft.credit.label} onChange={(v) => patch('credit', { ...draft.credit, label: v })} />
            </Field>
            <Field label="Имя / студия">
              <TextInput value={draft.credit.name} onChange={(v) => patch('credit', { ...draft.credit, name: v })} />
            </Field>
            <Field label="Ссылка (необязательно)">
              <TextInput value={draft.credit.url} onChange={(v) => patch('credit', { ...draft.credit, url: v })} />
            </Field>
          </div>
        </Panel>

        <p className="pt-4 text-center text-xs text-ink-faint">
          Изменения появляются на сайте сразу после сохранения.
        </p>
      </main>
    </div>
  )
}

function Panel({
  title,
  children,
  defaultOpen = false,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  return (
    <details
      open={defaultOpen}
      className="group rounded-xl border border-line bg-paper-raised px-4 py-3 open:pb-5"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between py-1 font-display text-sm font-bold tracking-[-0.01em]">
        {title}
        <span className="text-ink-faint transition-transform group-open:rotate-45">+</span>
      </summary>
      <div className="mt-4 space-y-3">{children}</div>
    </details>
  )
}

function SectionIntroFields({
  value,
  onChange,
}: {
  value: { kicker: string; title: string }
  onChange: (v: { kicker: string; title: string }) => void
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Field label="Надпись сверху">
        <TextInput value={value.kicker} onChange={(v) => onChange({ ...value, kicker: v })} />
      </Field>
      <Field label="Заголовок секции">
        <TextInput value={value.title} onChange={(v) => onChange({ ...value, title: v })} />
      </Field>
    </div>
  )
}

function Select({
  value,
  options,
  onChange,
}: {
  value: string
  options: [string, string][]
  onChange: (v: string) => void
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-ink"
    >
      {options.map(([v, label]) => (
        <option key={v} value={v}>
          {label}
        </option>
      ))}
    </select>
  )
}
