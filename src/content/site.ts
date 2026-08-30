/**
 * Single source of truth for every piece of copy and data on the site.
 * Keeps the components purely presentational and the wording easy to tune.
 */

export const CONTACT = {
  name: 'Ася',
  role: 'Менеджер маркетплейсов · WB / OZON',
  telegramHandle: '@taaeyes',
  telegramUrl: 'https://t.me/taaeyes',
  portfolioUrl: 'https://t.me/+ZoYKTy7BpccwZDdi',
  resumeUrl: 'https://taaeyes-wb-ozon.tilda.ws',
} as const

export const NAV = [
  { label: 'Динамика', href: '#growth' },
  { label: 'Экспертиза', href: '#expertise' },
  { label: 'Работа', href: '#work' },
  { label: 'Кейсы', href: '#cases' },
  { label: 'Контакт', href: '#contact' },
] as const

export const HERO = {
  kicker: 'Менеджер маркетплейсов WB / OZON',
  headline: ['Масштабирую', 'e-commerce.'],
  emphasis: 'Рост ×3 за 38 дней.',
  sub: 'Веду магазины на Wildberries и OZON как бизнес-проект: SEO и дизайн карточек, юнит-экономика, реклама и собственные AI-инструменты. Не задачи ради задач, а результат в цифрах.',
} as const

/** Words for the running strip under the hero — pure editorial texture. */
export const MARQUEE = [
  'Wildberries',
  'OZON',
  'SEO-ядро',
  'Дизайн карточек',
  'Инфографика',
  'Юнит-экономика',
  'ABC-анализ',
  'ROAS 3–5×',
  'AI-автоматизация',
]

/** Headline metrics — counted up on load / on scroll into view. */
export const METRICS: MetricItem[] = [
  {
    label: 'Заказов в месяц',
    from: 977,
    to: 2862,
    decimals: 0,
    delta: '+193%',
  },
  {
    label: 'Выручка в месяц',
    from: 2.5,
    to: 7.1,
    unit: 'М ₽',
    decimals: 1,
    delta: '+184%',
  },
  {
    label: 'Прироста дало SEO карточек',
    from: 0,
    to: 94,
    unit: '%',
    decimals: 0,
    single: true,
  },
]

export type MetricItem = {
  label: string
  from: number
  to: number
  unit?: string
  decimals: number
  delta?: string
  /** Render a single value rather than a "from → to" transition. */
  single?: boolean
}

export const EXPERTISE_INTRO = {
  kicker: '02 — Экспертиза',
  title: 'Полный цикл работы с магазином',
}

export const EXPERTISE: ExpertiseItem[] = [
  {
    index: '01',
    title: 'Карточки под ключ и SEO',
    body: 'Анализ конкурентов, семантическое ядро, структура под поисковые запросы маркетплейса. Карточка попадает в выдачу и удерживает позиции.',
    scale: 'wide',
  },
  {
    index: '02',
    title: 'Дизайн карточек и инфографика',
    body: 'Собираю визуал под возражения покупателя: инфографика, выноски, композиция, единый стиль линейки. Товар выглядит дороже и понятнее, чем у конкурентов.',
    scale: 'tall',
  },
  {
    index: '03',
    title: 'Глубокая аналитика',
    body: 'Unit-экономика, ABC-анализ, SWOT / PEST. Нахожу точки роста в данных, а не на глаз.',
    scale: 'normal',
  },
  {
    index: '04',
    title: 'Управление рекламой',
    body: 'Запускаю рентабельные кампании и держу ROAS 3–5×. Каждый рубль бюджета отбивается.',
    scale: 'normal',
  },
  {
    index: '05',
    title: 'Операционка и остатки',
    body: 'Контроль остатков, подбор товара, мониторинг конкурентов — магазин работает без простоев и кассовых разрывов.',
    scale: 'wide',
  },
]

export type ExpertiseItem = {
  index: string
  title: string
  body: string
  scale: 'wide' | 'tall' | 'normal'
}

export const WORK_INTRO = {
  kicker: '03 — Работа',
  title: 'Что я делаю руками',
  body: 'Дизайн и вёрстка карточек, инфографика, аналитические модели и рекламные связки — для магазинов на Wildberries и OZON.',
}

export const WORK: WorkItem[] = [
  {
    title: 'Детская одежда',
    discipline: 'SEO + инфографика · WB',
    note: '977 → 2 862 заказа за 38 дней',
    image: '/work/1.svg',
  },
  {
    title: 'Карточка товара',
    discipline: 'Дизайн и вёрстка',
    note: 'Инфографика под возражения, выноски, композиция',
    image: '/work/2.svg',
  },
  {
    title: 'Линейка бренда',
    discipline: 'Единый визуальный стиль',
    note: 'Один язык карточек на весь ассортимент',
    image: '/work/3.svg',
  },
  {
    title: 'Юнит-экономика',
    discipline: 'Аналитика и модель',
    note: 'P&L по каждому SKU, точки роста, ABC',
    image: '/work/4.svg',
  },
  {
    title: 'Рекламные связки',
    discipline: 'Управление РК · WB / OZON',
    note: 'ROAS 3–5×, ручная оптимизация ставок',
    image: '/work/5.svg',
  },
]

export type WorkItem = {
  title: string
  discipline: string
  note: string
  image: string
}

export const EDGE_INTRO = {
  kicker: '05 — Почему со мной эффективнее',
  title: 'Бизнес-мышление, а не ведение карточек',
}

export const EDGE: EdgeItem[] = [
  {
    figure: '2',
    figureLabel: 'диплома УрФУ',
    title: 'Профильный менеджмент',
    body: 'Два диплома Уральского федерального университета по менеджменту. Смотрю на магазин как на бизнес-проект с P&L, а не как на набор карточек.',
  },
  {
    figure: '100%',
    figureLabel: 'решений — из данных',
    title: 'Аналитический бэкграунд',
    body: 'Работаю числами. Каждая гипотеза проходит через тест: что двигаем, на сколько, за счёт чего. Без «кажется» и «обычно так делают».',
  },
  {
    figure: 'AI',
    figureLabel: 'в ежедневной работе',
    title: 'Собственные AI-инструменты',
    body: 'Автоматизирую рутину — сбор семантики, анализ ниш, генерацию и проверку контента. Больше времени остаётся на стратегию и дизайн.',
  },
]

export type EdgeItem = {
  figure: string
  figureLabel: string
  title: string
  body: string
}

export const CASES_INTRO = {
  kicker: '07 — Кейсы и метод',
  title: 'Как выглядит кратный рост вблизи',
}

export const CASES: CaseItem[] = [
  {
    id: 'kids-wear',
    label: 'Детская одежда · Wildberries',
    period: '38 дней',
    summary:
      'Заказы выросли в 3 раза. 94% прироста дала переработка SEO карточек: новое семантическое ядро, реструктуризация под запросы, инфографика под возражения покупателя.',
    stats: [
      { label: 'Заказы / мес', value: '977 → 2 862' },
      { label: 'Выручка / мес', value: '2.5М → 7.1М ₽' },
      { label: 'Срок', value: '38 дней' },
    ],
    steps: [
      'Аудит ниши, ассортимента и карточек конкурентов из топа выдачи',
      'Сборка семантического ядра и кластеризация запросов по типам спроса',
      'Переписанные карточки: заголовки, характеристики, инфографика под возражения',
      'Рекламный разгон обновлённых карточек с контролем ROAS',
      'Еженедельный контроль unit-экономики и корректировка ставок',
    ],
  },
  {
    id: 'method',
    label: 'Мой подход к любому магазину',
    period: 'Первые 2 недели',
    summary:
      'Фреймворк, по которому я захожу в проект: сначала диагностика экономики, потом гипотезы роста, потом исполнение. Порядок не меняется.',
    stats: [
      { label: 'Диагностика', value: 'Unit + ABC' },
      { label: 'Приоритизация', value: 'ICE / эффект' },
      { label: 'Формат', value: 'По совмещению' },
    ],
    steps: [
      'Считаю unit-экономику каждого SKU — где зарабатываем, где кормим маркетплейс',
      'ABC-анализ ассортимента: концентрирую ресурс на товарах, которые дают выручку',
      'SWOT / PEST по нише — риски и окна возможностей на 1–2 квартала вперёд',
      'Список гипотез роста с оценкой эффекта и стоимости проверки',
      'Исполнение спринтами: карточки → реклама → операционка, с недельной отчётностью',
    ],
  },
]

export type CaseItem = {
  id: string
  label: string
  period: string
  summary: string
  stats: { label: string; value: string }[]
  steps: string[]
}

export const CONTACT_SECTION = {
  kicker: '08 — Контакт',
  title: 'Обсудим ваш магазин',
  status: 'Сейчас беру 1–2 проекта на ведение',
  statusNote:
    'Только по совмещению — один долгосрочный проект уже в работе. Рассматриваю магазины, которым нужен кратный рост, а не поддержка «как есть».',
  cta: 'Написать в Telegram',
  closing: 'Портфолио с разбором методов и примерами карточек — в закрытом Telegram-канале.',
}

/** Ways to reach Asya, in priority order. `primary` gets the oversized treatment. */
export const CHANNELS: Channel[] = [
  {
    label: 'Telegram',
    value: CONTACT.telegramHandle,
    href: CONTACT.telegramUrl,
    hint: 'Пишите сюда — отвечаю в течение дня',
    primary: true,
  },
  {
    label: 'Портфолио и кейсы',
    value: 'Закрытый канал',
    href: CONTACT.portfolioUrl,
    hint: 'Разборы карточек, до / после, методология',
  },
  {
    label: 'Сайт-резюме',
    value: 'taaeyes-wb-ozon',
    href: CONTACT.resumeUrl,
    hint: 'Опыт, стек инструментов, образование',
  },
]

export type Channel = {
  label: string
  value: string
  href: string
  hint: string
  primary?: boolean
}

/**
 * Discreet "built by" credit for the footer. Fill `url` with your studio /
 * Telegram / portfolio link; leave it empty to render as plain muted text.
 */
export const CREDIT = {
  label: 'Дизайн и разработка сайта',
  name: 'Yahya',
  url: '',
}

/**
 * The growth story as data — two small-multiple charts (orders, revenue) over
 * the 38-day sprint. Endpoints are the real result; the weekly points between
 * them are illustrative of the trajectory and are fully editable in the panel.
 */
export const GROWTH_INTRO = {
  kicker: '01 — Динамика',
  title: 'Как рос магазин за 38 дней',
  caption: 'Детская одежда · Wildberries. Точки — недельные срезы, концы — фактический результат.',
}

export const GROWTH_POINTS: GrowthPoint[] = [
  { label: 'Старт', orders: 977, revenue: 2.5 },
  { label: 'Нед. 1', orders: 1120, revenue: 2.9 },
  { label: 'Нед. 2', orders: 1490, revenue: 3.8 },
  { label: 'Нед. 3', orders: 1990, revenue: 5.0 },
  { label: 'Нед. 4', orders: 2350, revenue: 5.9 },
  { label: 'Нед. 5', orders: 2660, revenue: 6.6 },
  { label: '38 дней', orders: 2862, revenue: 7.1 },
]

export const GROWTH_MILESTONES: GrowthMilestone[] = [
  { at: 1, label: 'Переработка SEO-карточек' },
  { at: 3, label: 'Разгон рекламы, ROAS 3–5×' },
]

export type GrowthPoint = { label: string; orders: number; revenue: number }
export type GrowthMilestone = { at: number; label: string }

/** Dense pill cluster of methods and tools — adds texture, signals depth. */
export const TOOLBOX_INTRO = {
  kicker: '06 — Инструменты',
  title: 'Чем считаю и как автоматизирую',
}

export const TOOLBOX_TAGS: string[] = [
  'Unit-экономика',
  'ABC-анализ',
  'SWOT / PEST',
  'Семантическое ядро',
  'Инфографика карточек',
  'Управление РК',
  'Контроль остатков',
  'A/B-тесты карточек',
  'AI: сбор семантики',
  'AI: анализ ниш',
  'AI: генерация контента',
  'Модели в таблицах',
]

/** Marketplaces Asya works on — rendered as styled marks in the hero strip and intro. */
export const PLATFORMS: string[] = ['Wildberries', 'OZON']

/** Engagement formats — the "услуги" block every marketplace-manager site has. */
export const SERVICES_INTRO = {
  kicker: '04 — Форматы работы',
  title: 'Как можно со мной работать',
}

export const SERVICES: ServiceItem[] = [
  {
    title: 'Ведение под ключ',
    forWhom: 'Магазину нужен системный рост и один ответственный за результат',
    includes: [
      'Стратегия и план на месяц вперёд',
      'Карточки, SEO, инфографика, реклама, операционка',
      'Еженедельный отчёт по юнит-экономике',
    ],
    note: 'По совмещению · 1–2 проекта',
  },
  {
    title: 'Аудит и стратегия',
    forWhom: 'Есть продажи, но непонятно, где потолок и что двигать',
    includes: [
      'Разбор кабинета, карточек и юнит-экономики',
      'ABC-анализ ассортимента, анализ конкурентов',
      'Приоритизированный список точек роста с оценкой эффекта',
    ],
    note: 'Разово · 5–7 дней',
  },
  {
    title: 'Карточки и визуал',
    forWhom: 'Товар хороший, но карточки не продают и не выходят в топ',
    includes: [
      'Семантическое ядро и структура под запросы',
      'Продающая инфографика и выноски под возражения',
      'Единый стиль на всю линейку',
    ],
    note: 'Пакетом или за карточку',
  },
]

export type ServiceItem = {
  title: string
  forWhom: string
  includes: string[]
  note: string
}

/* ------------------------------------------------------------------ *
 * Aggregated content document
 *
 * Every editable string on the site, in one shape. The admin panel reads and
 * writes this object; the public site loads it from Supabase at runtime and
 * falls back to DEFAULT_CONTENT below whenever Supabase is absent or slow.
 * ------------------------------------------------------------------ */

export type NavItem = { label: string; href: string }
export type ContactInfo = {
  name: string
  role: string
  telegramHandle: string
  telegramUrl: string
  portfolioUrl: string
  resumeUrl: string
}
export type Hero = {
  kicker: string
  headline: string[]
  emphasis: string
  sub: string
}
export type SectionIntro = { kicker: string; title: string }
export type WorkIntro = SectionIntro & { body: string }
export type ContactSection = {
  kicker: string
  title: string
  status: string
  statusNote: string
  cta: string
  closing: string
}
export type Credit = { label: string; name: string; url: string }
export type GrowthIntro = SectionIntro & { caption: string }
export type Growth = {
  intro: GrowthIntro
  points: GrowthPoint[]
  milestones: GrowthMilestone[]
}
export type Toolbox = { intro: SectionIntro; tags: string[] }
export type Services = { intro: SectionIntro; items: ServiceItem[] }

export type SiteContent = {
  contact: ContactInfo
  nav: NavItem[]
  hero: Hero
  platforms: string[]
  marquee: string[]
  metrics: MetricItem[]
  growth: Growth
  expertiseIntro: SectionIntro
  expertise: ExpertiseItem[]
  workIntro: WorkIntro
  work: WorkItem[]
  services: Services
  edgeIntro: SectionIntro
  edge: EdgeItem[]
  casesIntro: SectionIntro
  cases: CaseItem[]
  toolbox: Toolbox
  contactSection: ContactSection
  channels: Channel[]
  credit: Credit
}

export const DEFAULT_CONTENT: SiteContent = {
  contact: { ...CONTACT },
  nav: NAV.map((item) => ({ ...item })),
  hero: { ...HERO, headline: [...HERO.headline] },
  platforms: [...PLATFORMS],
  marquee: [...MARQUEE],
  metrics: METRICS.map((m) => ({ ...m })),
  growth: {
    intro: { ...GROWTH_INTRO },
    points: GROWTH_POINTS.map((p) => ({ ...p })),
    milestones: GROWTH_MILESTONES.map((m) => ({ ...m })),
  },
  expertiseIntro: { ...EXPERTISE_INTRO },
  expertise: EXPERTISE.map((e) => ({ ...e })),
  workIntro: { ...WORK_INTRO },
  work: WORK.map((w) => ({ ...w })),
  services: {
    intro: { ...SERVICES_INTRO },
    items: SERVICES.map((s) => ({ ...s, includes: [...s.includes] })),
  },
  edgeIntro: { ...EDGE_INTRO },
  edge: EDGE.map((e) => ({ ...e })),
  casesIntro: { ...CASES_INTRO },
  cases: CASES.map((c) => ({
    ...c,
    stats: c.stats.map((s) => ({ ...s })),
    steps: [...c.steps],
  })),
  toolbox: { intro: { ...TOOLBOX_INTRO }, tags: [...TOOLBOX_TAGS] },
  contactSection: { ...CONTACT_SECTION },
  channels: CHANNELS.map((c) => ({ ...c })),
  credit: { ...CREDIT },
}

/** Merge a (possibly partial / older) stored document over the current defaults. */
export function mergeContent(base: SiteContent, override: Partial<SiteContent> | null | undefined): SiteContent {
  if (!override) return base
  const out = { ...base } as Record<string, unknown>
  for (const key of Object.keys(base) as (keyof SiteContent)[]) {
    const value = override[key]
    if (value !== undefined && value !== null) out[key] = value
  }
  return out as SiteContent
}
