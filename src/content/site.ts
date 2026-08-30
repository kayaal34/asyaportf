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
  { label: 'Экспертиза', href: '#expertise' },
  { label: 'Работа', href: '#work' },
  { label: 'Подход', href: '#edge' },
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
  kicker: '01 — Экспертиза',
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
  kicker: '02 — Работа',
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
  kicker: '03 — Почему со мной эффективнее',
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
  kicker: '04 — Кейсы и метод',
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
  kicker: '05 — Контакт',
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
