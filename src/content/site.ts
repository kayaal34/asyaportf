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
  { label: 'Динамика', href: '/#growth' },
  { label: 'Экспертиза', href: '/#expertise' },
  { label: 'Работа', href: '/#work' },
  { label: 'Кейсы', href: '/#cases' },
  { label: 'Заявка', href: '/contact' },
] as const

export const HERO = {
  kicker: 'Менеджер маркетплейсов',
  headline: ['Масштабирую', 'e-commerce.'],
  emphasis: 'Рост ×3 за 38 дней.',
  sub: 'Веду магазины на Wildberries и OZON как бизнес-проект: SEO и дизайн карточек, юнит-экономика, реклама и собственные AI-инструменты. Не задачи ради задач, а результат в цифрах.',
} as const

/** Text that circles inside the rotating badge. Empty string hides the badge. */
export const SEAL_TEXT = 'АСЯ · МЕНЕДЖЕР МАРКЕТПЛЕЙСОВ · '

/** Personal introduction block — "hi, I'm Asya". */
export const ABOUT = {
  kicker: 'Знакомство',
  greeting: 'Привет! Меня зовут Ася',
  realName: 'Анастасия Тюшева',
  pitch:
    'Помогаю магазинам на Wildberries и OZON выйти в кратный рост — через SEO, дизайн карточек и трезвую юнит-экономику. Давайте выведем ваш товар в топ и сделаем так, чтобы кабинет работал на результат, а не отнимал время.',
  facts: [
    'УрФУ — международный и корпоративный менеджмент, плюс бизнес-школа УрФУ',
    'Школа менеджеров маркетплейсов MpSkill — практика на реальных кабинетах, оценка «Отлично»',
    'Больше года делаю инфографику и визуальную упаковку карточек на заказ',
    'Запустила собственный магазин с нуля — прошла весь путь селлера на свои деньги',
  ],
  photo: '/asya/portrait-studio.jpg',
}
export type About = {
  kicker: string
  greeting: string
  realName: string
  pitch: string
  facts: string[]
  photo: string
}

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
    title: 'Инфографика карточки',
    discipline: 'Визуальная упаковка · WB',
    note: 'Выноски по характеристикам, УТП и снятие возражений на первом слайде',
    image: '/asya/case-infographic.png',
  },
  {
    title: 'Аудит визуальной воронки',
    discipline: 'Анализ карточек',
    note: 'Разбор фото и инфографики по слайдам: что бьёт по CTR и как исправить',
    image: '/asya/case-audit.jpg',
  },
  {
    title: 'Товарная фотография',
    discipline: 'Контент для карточки',
    note: 'Чистый предметный кадр и AI-фотосессии под маркетплейс',
    image: '/asya/case-product-photo.jpg',
  },
  {
    title: 'Детская одежда',
    discipline: 'SEO + инфографика · WB',
    note: '977 → 2 862 заказа за 38 дней',
    image: '/work/1.svg',
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
    id: 'sandli',
    label: 'Sandli · Детская одежда · Wildberries',
    period: '23 июня — 4 августа 2026 · 38 дней',
    summary:
      'Магазин детско-подростковой одежды с хорошей базой, но без оптимизации. Задача — поднять видимость и продажи через SEO карточек и рекламу, без изменения цен и загрузки новых товаров.',
    stats: [
      { label: 'Заказы / мес', value: '977 → 2 862' },
      { label: 'Выручка / мес', value: '2,5 → 7,1 млн ₽' },
      { label: 'Заказов из органики', value: '94%' },
      { label: 'ROAS рекламы', value: '5,2×' },
    ],
    table: [
      { metric: 'Заказы, шт', before: '977', after: '2 862', delta: '+193%' },
      { metric: 'Выручка, ₽', before: '2 499 956', after: '7 112 986', delta: '+184%' },
      { metric: 'Выкупы, шт', before: '496', after: '1 189', delta: '+140%' },
      { metric: 'Заказов в день', before: '~31', after: '~75', delta: '+140%' },
      { metric: 'Средний чек', before: '~2 560 ₽', after: '~2 480 ₽', delta: 'стабилен' },
    ],
    steps: [
      'Анализ конкурентов по категориям: школьные юбки-шорты, брюки, джоггеры',
      'Переработка ключевых слов в названиях и описаниях под поиск Wildberries',
      'Инфографика карточек: размеры, состав, уход; первое фото под CTR в выдаче',
      'Реклама: CPM для теста → CPC как основной инструмент, ручные ставки по каждому товару',
      'Акцент бюджета на школьные юбки-шорты — лидера органических продаж',
    ],
    insight:
      'Из 2 862 заказов 2 702 пришли органически — 94% без рекламы. Переработка SEO карточек стала главным драйвером; реклама (ROAS 5,2×, 34 000 ₽ бюджета → 1,1 млн ₽) лишь ускорила рост. Лучший товар — юбка: CTR 5,66%, ROAS 8,7×.',
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
  /** Optional before/after comparison table. */
  table?: { metric: string; before: string; after: string; delta: string }[]
  /** Optional closing insight paragraph. */
  insight?: string
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

/** Copy for the standalone /contact page with the application form. */
export const CONTACT_PAGE = {
  kicker: 'Заявка',
  title: 'Оставьте заявку на разбор магазина',
  intro:
    'Коротко опишите магазин и задачу. Отвечу в течение дня в Telegram или на почту с первичной оценкой точек роста — бесплатно и без обязательств.',
  successTitle: 'Заявка отправлена',
  successText: 'Спасибо! Я свяжусь с вами в ближайшее время. Если удобнее — можно сразу написать в Telegram.',
  submitLabel: 'Отправить заявку',
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
  'MPStats',
  'SalesFinder',
  'Market Guru',
  'Evirma',
  'Google Таблицы / Excel',
  'Figma',
  'Canva',
  'Честный Знак',
  'Unit-экономика',
  'ABC-анализ',
  'SEO-ядро',
  'Gemini',
  'Claude',
  'Nano Banana',
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
  sealText: string
  about: About
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
  sealText: SEAL_TEXT,
  about: { ...ABOUT, facts: [...ABOUT.facts] },
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
    table: c.table?.map((t) => ({ ...t })),
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
