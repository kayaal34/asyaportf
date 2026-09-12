import { useMemo, useState } from 'react'
import { useContent, useContentMeta } from '../content/store'
import type {
  AiWork,
  CaseItem,
  Cert,
  Channel,
  ExpertiseItem,
  FaqItem,
  GrowthMilestone,
  GrowthPoint,
  MetricItem,
  ServiceItem,
  SiteContent,
  Testimonial,
} from '../content/site'
import { saveContent } from '../lib/contentIo'
import { signOut } from './useAuth'
import { LeadsPanel } from './LeadsPanel'
import { StatsPanel } from './StatsPanel'
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
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-5 py-3">
          <div className="flex items-center gap-2.5">
            <span className="font-display text-sm font-extrabold tracking-[-0.02em]">
              Панель · Ася
            </span>
            {dirty ? (
              <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                есть изменения
              </span>
            ) : (
              <span className="text-xs text-ink-faint">всё сохранено</span>
            )}
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
              className="rounded-full bg-ink px-5 py-1.5 text-xs font-medium text-paper transition-opacity disabled:opacity-40"
            >
              {saving ? 'Сохранение…' : 'Сохранить'}
            </button>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line px-3 py-1.5 text-xs transition-colors hover:border-ink"
            >
              Открыть сайт ↗
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
        <div className="rounded-xl border border-line bg-paper-raised p-5 text-sm leading-relaxed text-ink-soft">
          <p className="mb-1 font-display font-bold text-ink">Как это работает</p>
          Каждый блок ниже — это раздел сайта. Раскройте нужный, поменяйте текст или числа,
          нажмите <span className="font-medium text-ink">«Сохранить»</span> вверху — и всё сразу
          появится на сайте. Кнопка <span className="font-medium text-ink">«Отменить»</span> вернёт
          последнюю сохранённую версию.
        </div>

        <GroupLabel>Заявки и статистика</GroupLabel>
        <StatsPanel />
        <LeadsPanel />

        <GroupLabel>Верх сайта</GroupLabel>

        <Panel
          title="Контакты и ссылки"
          desc="Имя, роль и все ссылки: Telegram, портфолио, сайт-резюме."
          defaultOpen
        >
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

        <Panel title="Навигация" desc="Пункты меню в шапке сайта.">

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

        <Panel title="Первый экран" desc="Крупный заголовок, подзаголовок и площадки.">
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
          <Field label="Площадки" hint="Wildberries, OZON, Яндекс Маркет — показываются в первом экране.">
            <StringList
              values={draft.platforms}
              onChange={(v) => patch('platforms', v)}
              addLabel="площадку"
            />
          </Field>
        </Panel>

        <Panel title="Бегущая строка" desc="Слова, которые едут лентой под первым экраном.">
          <StringList values={draft.marquee} onChange={(v) => patch('marquee', v)} addLabel="слово" />
        </Panel>

        <Panel title="Метрики (первый экран)" desc="Три числа под первым экраном: было → стало.">

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

        <GroupLabel>Разделы</GroupLabel>

        <Panel title="Знакомство" desc="Фото, приветствие и факты о себе.">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Надпись сверху">
              <TextInput
                value={draft.about.kicker}
                onChange={(v) => patch('about', { ...draft.about, kicker: v })}
              />
            </Field>
            <Field label="Настоящее имя">
              <TextInput
                value={draft.about.realName}
                onChange={(v) => patch('about', { ...draft.about, realName: v })}
              />
            </Field>
          </div>
          <Field label="Приветствие (заголовок)">
            <TextInput
              value={draft.about.greeting}
              onChange={(v) => patch('about', { ...draft.about, greeting: v })}
            />
          </Field>
          <Field label="О себе / оффер">
            <TextArea
              value={draft.about.pitch}
              onChange={(v) => patch('about', { ...draft.about, pitch: v })}
              rows={4}
            />
          </Field>
          <Field label="Факты списком">
            <StringList
              values={draft.about.facts}
              onChange={(v) => patch('about', { ...draft.about, facts: v })}
              addLabel="факт"
            />
          </Field>
          <ImageField
            value={draft.about.photo}
            onChange={(url) => patch('about', { ...draft.about, photo: url })}
          />
        </Panel>

        <Panel title="Динамика (графики)" desc="Два графика роста за 38 дней и отметки на них.">

          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Надпись сверху">
              <TextInput
                value={draft.growth.intro.kicker}
                onChange={(v) =>
                  patch('growth', { ...draft.growth, intro: { ...draft.growth.intro, kicker: v } })
                }
              />
            </Field>
            <Field label="Заголовок">
              <TextInput
                value={draft.growth.intro.title}
                onChange={(v) =>
                  patch('growth', { ...draft.growth, intro: { ...draft.growth.intro, title: v } })
                }
              />
            </Field>
          </div>
          <Field label="Подпись под заголовком">
            <TextArea
              value={draft.growth.intro.caption}
              onChange={(v) =>
                patch('growth', { ...draft.growth, intro: { ...draft.growth.intro, caption: v } })
              }
              rows={2}
            />
          </Field>
          <Field label="Точки графика" hint="Первая и последняя — фактический результат; между — недельные срезы.">
            <Repeater
              items={draft.growth.points}
              onChange={(v) => patch('growth', { ...draft.growth, points: v })}
              create={(): GrowthPoint => ({ label: 'Нед. N', orders: 0, revenue: 0 })}
              title={(p) => p.label || 'точка'}
              addLabel="точку"
              render={(p, update) => (
                <div className="grid gap-3 sm:grid-cols-3">
                  <Field label="Подпись">
                    <TextInput value={p.label} onChange={(v) => update({ label: v })} />
                  </Field>
                  <Field label="Заказы / мес">
                    <NumberInput value={p.orders} onChange={(v) => update({ orders: v })} step="1" />
                  </Field>
                  <Field label="Выручка, млн ₽">
                    <NumberInput value={p.revenue} onChange={(v) => update({ revenue: v })} />
                  </Field>
                </div>
              )}
            />
          </Field>
          <Field label="Отметки на графике" hint="«Точка» — номер точки выше, начиная с 0.">
            <Repeater
              items={draft.growth.milestones}
              onChange={(v) => patch('growth', { ...draft.growth, milestones: v })}
              create={(): GrowthMilestone => ({ at: 1, label: '' })}
              title={(m) => m.label || 'отметка'}
              addLabel="отметку"
              render={(m, update) => (
                <div className="grid gap-3 sm:grid-cols-[6rem_1fr]">
                  <Field label="Точка №">
                    <NumberInput
                      value={m.at}
                      onChange={(v) => update({ at: Math.max(0, Math.round(v)) })}
                      step="1"
                    />
                  </Field>
                  <Field label="Текст">
                    <TextInput value={m.label} onChange={(v) => update({ label: v })} />
                  </Field>
                </div>
              )}
            />
          </Field>
        </Panel>

        <Panel title="Экспертиза" desc="Плитки с направлениями работы.">
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

        <Panel title="Работа" desc="Сетка проектов с картинками карточек.">
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

        <Panel title="Почему со мной" desc="Тёмный блок с отличиями.">
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

        <Panel title="Кейсы" desc="Раскрывающиеся строки с разбором метода.">
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

        <Panel title="Инструменты (плашки)" desc="Плашки с методами и AI-инструментами.">

          <SectionIntroFields
            value={draft.toolbox.intro}
            onChange={(v) => patch('toolbox', { ...draft.toolbox, intro: v })}
          />
          <Field label="Плашки">
            <StringList
              values={draft.toolbox.tags}
              onChange={(v) => patch('toolbox', { ...draft.toolbox, tags: v })}
              addLabel="плашку"
            />
          </Field>
        </Panel>

        <GroupLabel>Отдельные страницы</GroupLabel>

        <Panel title="Страница «Обо мне»" desc="Расширенный текст, цифры, философия, фото.">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Надпись сверху">
              <TextInput value={draft.aboutPage.kicker} onChange={(v) => patch('aboutPage', { ...draft.aboutPage, kicker: v })} />
            </Field>
            <Field label="Заголовок">
              <TextInput value={draft.aboutPage.title} onChange={(v) => patch('aboutPage', { ...draft.aboutPage, title: v })} />
            </Field>
          </div>
          <Field label="Основной текст">
            <TextArea value={draft.aboutPage.lead} onChange={(v) => patch('aboutPage', { ...draft.aboutPage, lead: v })} rows={5} />
          </Field>
          <Field label="Что закрываю (список)">
            <StringList values={draft.aboutPage.closes} onChange={(v) => patch('aboutPage', { ...draft.aboutPage, closes: v })} addLabel="пункт" />
          </Field>
          <Field label="Цифры о себе">
            <Repeater
              items={draft.aboutPage.numbers}
              onChange={(v) => patch('aboutPage', { ...draft.aboutPage, numbers: v })}
              create={() => ({ value: '', label: '' })}
              title={(n) => n.value || 'цифра'}
              addLabel="цифру"
              render={(n, upd) => (
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Значение"><TextInput value={n.value} onChange={(v) => upd({ value: v })} /></Field>
                  <Field label="Подпись"><TextInput value={n.label} onChange={(v) => upd({ label: v })} /></Field>
                </div>
              )}
            />
          </Field>
          <Field label="Философия (список)">
            <StringList values={draft.aboutPage.philosophy} onChange={(v) => patch('aboutPage', { ...draft.aboutPage, philosophy: v })} addLabel="пункт" />
          </Field>
          <ImageField value={draft.aboutPage.photo} onChange={(url) => patch('aboutPage', { ...draft.aboutPage, photo: url })} />
        </Panel>

        <Panel title="Страница «Услуги»" desc="4 карточки: что входит, результат, цена.">
          <SectionIntroFields
            value={draft.services.intro}
            onChange={(v) => patch('services', { ...draft.services, intro: v })}
          />
          <div className="mt-4">
            <Repeater
              items={draft.services.items}
              onChange={(v) => patch('services', { ...draft.services, items: v })}
              create={(): ServiceItem => ({ title: 'Услуга', forWhom: '', includes: [], result: '', price: '' })}
              title={(it) => it.title || 'услуга'}
              addLabel="услугу"
              render={(it, update) => (
                <>
                  <Field label="Название"><TextInput value={it.title} onChange={(v) => update({ title: v })} /></Field>
                  <Field label="Кому подходит"><TextArea value={it.forWhom} onChange={(v) => update({ forWhom: v })} rows={2} /></Field>
                  <Field label="Что входит"><StringList values={it.includes} onChange={(v) => update({ includes: v })} addLabel="пункт" /></Field>
                  <Field label="Результат"><TextInput value={it.result} onChange={(v) => update({ result: v })} /></Field>
                  <Field label="Цена / формат"><TextInput value={it.price} onChange={(v) => update({ price: v })} /></Field>
                </>
              )}
            />
          </div>
        </Panel>

        <Panel title="Страница «AI-портфолио»" desc="Работы, процесс, инструменты.">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Надпись сверху"><TextInput value={draft.aiIntro.kicker} onChange={(v) => patch('aiIntro', { ...draft.aiIntro, kicker: v })} /></Field>
            <Field label="Заголовок"><TextInput value={draft.aiIntro.title} onChange={(v) => patch('aiIntro', { ...draft.aiIntro, title: v })} /></Field>
          </div>
          <Field label="Подзаголовок"><TextArea value={draft.aiIntro.sub} onChange={(v) => patch('aiIntro', { ...draft.aiIntro, sub: v })} rows={3} /></Field>
          <Field label="Работы">
            <Repeater
              items={draft.aiWorks}
              onChange={(v) => patch('aiWorks', v)}
              create={(): AiWork => ({ title: 'Работа', category: '', note: '', tool: '', image: '' })}
              title={(w) => w.title || 'работа'}
              addLabel="работу"
              render={(w, upd) => (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Название"><TextInput value={w.title} onChange={(v) => upd({ title: v })} /></Field>
                    <Field label="Категория"><TextInput value={w.category} onChange={(v) => upd({ category: v })} /></Field>
                  </div>
                  <Field label="Описание"><TextInput value={w.note} onChange={(v) => upd({ note: v })} /></Field>
                  <Field label="Инструменты"><TextInput value={w.tool} onChange={(v) => upd({ tool: v })} /></Field>
                  <ImageField value={w.image} onChange={(url) => upd({ image: url })} />
                </>
              )}
            />
          </Field>
          <Field label="Процесс (шаги)"><StringList values={draft.aiProcess} onChange={(v) => patch('aiProcess', v)} addLabel="шаг" /></Field>
          <Field label="Инструменты (плашки)"><StringList values={draft.aiTools} onChange={(v) => patch('aiTools', v)} addLabel="инструмент" /></Field>
        </Panel>

        <Panel title="Сертификаты и образование" desc="Показываются на странице «Обо мне».">
          <Repeater
            items={draft.certs}
            onChange={(v) => patch('certs', v)}
            create={(): Cert => ({ title: '', org: '', year: '', note: '' })}
            title={(c) => c.org || 'сертификат'}
            addLabel="сертификат"
            render={(c, upd) => (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Организация"><TextInput value={c.org} onChange={(v) => upd({ org: v })} /></Field>
                  <Field label="Год"><TextInput value={c.year} onChange={(v) => upd({ year: v })} /></Field>
                </div>
                <Field label="Название / направление"><TextInput value={c.title} onChange={(v) => upd({ title: v })} /></Field>
                <Field label="Комментарий"><TextArea value={c.note} onChange={(v) => upd({ note: v })} rows={2} /></Field>
              </>
            )}
          />
        </Panel>

        <Panel title="Отзывы" desc="Карусель на главной и странице услуг.">
          <Repeater
            items={draft.testimonials}
            onChange={(v) => patch('testimonials', v)}
            create={(): Testimonial => ({ name: '', role: '', text: '', result: '' })}
            title={(t) => t.name || 'отзыв'}
            addLabel="отзыв"
            render={(t, upd) => (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Имя"><TextInput value={t.name} onChange={(v) => upd({ name: v })} /></Field>
                  <Field label="Кто / роль"><TextInput value={t.role} onChange={(v) => upd({ role: v })} /></Field>
                </div>
                <Field label="Текст отзыва"><TextArea value={t.text} onChange={(v) => upd({ text: v })} rows={3} /></Field>
                <Field label="Результат (плашка)"><TextInput value={t.result} onChange={(v) => upd({ result: v })} /></Field>
              </>
            )}
          />
        </Panel>

        <Panel title="FAQ" desc="Вопросы и ответы на главной и странице услуг.">
          <Repeater
            items={draft.faq}
            onChange={(v) => patch('faq', v)}
            create={(): FaqItem => ({ q: '', a: '' })}
            title={(f) => f.q || 'вопрос'}
            addLabel="вопрос"
            render={(f, upd) => (
              <>
                <Field label="Вопрос"><TextInput value={f.q} onChange={(v) => upd({ q: v })} /></Field>
                <Field label="Ответ"><TextArea value={f.a} onChange={(v) => upd({ a: v })} rows={3} /></Field>
              </>
            )}
          />
        </Panel>

        <GroupLabel>Низ сайта</GroupLabel>

        <Panel title="Секция «Контакт»" desc="Статус, заголовок и подписи в блоке контактов.">
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

        <Panel title="Каналы связи" desc="Список: Telegram, портфолио, сайт-резюме.">

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

        <Panel title="Подпись в подвале" desc="Кто сделал сайт — маленькая строка внизу.">

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

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-1 pt-6 pb-1 text-xs font-medium tracking-[0.18em] text-ink-faint uppercase first:pt-2">
      {children}
    </p>
  )
}

function Panel({
  title,
  desc,
  children,
  defaultOpen = false,
}: {
  title: string
  desc?: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  return (
    <details
      open={defaultOpen}
      className="group rounded-xl border border-line bg-paper-raised px-4 py-3 open:pb-5"
    >
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-1">
        <span>
          <span className="font-display text-sm font-bold tracking-[-0.01em]">{title}</span>
          {desc && <span className="mt-0.5 block text-xs font-normal text-ink-faint">{desc}</span>}
        </span>
        <span className="mt-0.5 shrink-0 text-ink-faint transition-transform group-open:rotate-45">
          +
        </span>
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
