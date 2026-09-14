/**
 * Single source of truth for every piece of copy and data on the site.
 * Keeps the components purely presentational and the wording easy to tune.
 */

export const CONTACT = {
  name: 'Ася',
  fullName: 'Анастасия Тюшева',
  role: 'Менеджер маркетплейсов · WB / OZON',
  telegramHandle: '@taaeyes',
  telegramUrl: 'https://t.me/taaeyes',
  email: 'taaeyes@mail.ru',
  whatsapp: '+7 922 177 63 82',
  whatsappUrl: 'https://wa.me/79221776382',
  portfolioUrl: 'https://t.me/+ZoYKTy7BpccwZDdi',
  resumeUrl: 'https://taaeyes-wb-ozon.tilda.ws',
} as const

export const NAV = [
  { label: 'Обо мне', href: '/about' },
  { label: 'Услуги', href: '/services' },
  { label: 'Кейсы', href: '/cases' },
  { label: 'AI-портфолио', href: '/ai' },
  { label: 'Заявка', href: '/contact' },
] as const

export const HERO = {
  kicker: 'Менеджер маркетплейсов · Wildberries / OZON',
  headline: ['Ваш магазин', 'взлетит со мной'],
  emphasis: 'Рост ×3 за 2–3 месяца',
  sub: 'Привет, я Ася. Смотрю на магазин как на данные, дизайн и AI — и вывожу его в кратный рост, без гонки за ценой и без новых товаров.',
} as const

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
  /** Optional photo — replaces the default line-art badge when set. */
  image?: string
}

export const WORK_INTRO = {
  kicker: '03 — Работа',
  title: 'Что я делаю руками',
  body: 'Дизайн и вёрстка карточек, инфографика, аналитические модели и рекламные связки — для магазинов на Wildberries и OZON.',
}

export const WORK: WorkItem[] = [
  {
    title: 'Школьные брюки',
    discipline: 'Инфографика · WB',
    note: 'Выноски по характеристикам и размерам на первом слайде',
    image: '/asya/ig/pants-girl.png',
  },
  {
    title: 'Бандаж для запястья',
    discipline: 'Инфографика · товарка',
    note: 'Контекстный кадр и снятие возражений под спортивную нишу',
    image: '/asya/ig/bandage.png',
  },
  {
    title: 'Комплект линейки',
    discipline: 'Единый визуальный стиль',
    note: 'Один язык карточек на весь ассортимент магазина',
    image: '/asya/ig/set-1.png',
  },
  {
    title: 'Карточка одежды',
    discipline: 'Инфографика · WB',
    note: 'Композиция под CTR в выдаче, читаемая иерархия',
    image: '/asya/ig/clothes-3.png',
  },
  {
    title: 'AI-аватар',
    discipline: 'AI-контент',
    note: 'Персональные аватары для обложек и соцсетей',
    image: '/asya/ai-avatar-1.png',
  },
  {
    title: 'Слайды карточки',
    discipline: 'Инфографика · комплект',
    note: 'Размеры, состав, уход, применение — слайды 2–5',
    image: '/asya/ig/set-3.png',
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
    proofImage: '/asya/case-funnel-after.png',
    proofCaption:
      'WB Партнёры · воронка продаж, 15.06 → 30.07: переходы 117 059 (+85%), заказы 2 862 шт / 7 112 986 ₽, выкуп 52%.',
  },
  {
    id: 'ozon-finmodel',
    label: 'OZON · Аудит и финмоделирование',
    period: 'Разовый проект',
    summary:
      'Спасение от кассовых разрывов. Провела аудит по мебели, сувенирам и одежде, собрала автоматизированные таблицы юнит-экономики. Результат — клиент перестал бояться закупать партии.',
    stats: [
      { label: 'Категории', value: 'Мебель · сувениры · одежда' },
      { label: 'Модель', value: 'Unit-экономика + ABC' },
      { label: 'Результат', value: 'Прибыль видна до закупки' },
    ],
    steps: [
      'Аудит кабинета: состояние, проблемные SKU, замороженные деньги',
      'Расчёт юнит-экономики: закуп, логистика, комиссии, хранение, налоги',
      'ABC-анализ ассортимента — что гнать, что выводить',
      'Автоматизированная таблица: прибыль пересчитывается при вводе закупочной цены',
      'Прогноз продаж и точка безубыточности на квартал',
    ],
    insight:
      'До проекта закупки делались «на глаз» — отсюда кассовые разрывы. После — каждая партия просчитывается заранее, видно чистую прибыль и точку окупаемости ещё до оплаты поставщику.',
  },
  {
    id: 'own-shop',
    label: 'Собственный магазин на OZON — запуск с нуля',
    period: 'С ноября 2025',
    summary:
      'Прошла весь путь селлера своими ногами: выбор ниши, закуп на свои деньги, тесты гипотез, первые заказы. Поэтому понимаю клиента изнутри — где болит и сколько стоит ошибка.',
    stats: [
      { label: 'Вложения', value: 'Собственные' },
      { label: 'Этапы', value: 'Ниша → закуп → продажи' },
      { label: 'Опыт', value: 'Селлер, не только менеджер' },
    ],
    steps: [
      'Анализ ниш и выбор товара под спрос и маржу',
      'Расчёт юнит-экономики до закупки',
      'Первая партия на собственные средства',
      'Карточки, инфографика, вывод в продажи',
      'Тесты гипотез по цене, контенту и рекламе',
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
  /** Optional screenshot / proof image. */
  proofImage?: string
  proofCaption?: string
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
    title: 'SEO-оптимизация карточек',
    forWhom: 'Товар хороший, но карточки не в топе и почти не приносят органику',
    includes: [
      'Аудит ниши — 10–20 конкурентов',
      'SEO-ядро: ключи и кластеры',
      'Переписанные названия и описания',
      'Продающая инфографика',
    ],
    result: '+50–200% видимости в первые 2 недели',
    price: '15–25 000 ₽ · разово',
  },
  {
    title: 'Управление рекламой',
    forWhom: 'Реклама сливает бюджет или не запущена вовсе',
    includes: [
      'Стратегия: CPM для теста → CPC как основной инструмент',
      'Настройка кампаний по товарам и нишам',
      'Ежедневная оптимизация ставок и ключей',
      'Еженедельные отчёты по метрикам',
    ],
    result: 'Гарантия ROAS 3× — или возврат денег за первый месяц',
    price: '2–5 000 ₽ / мес',
  },
  {
    title: 'Аналитика и финмоделирование',
    forWhom: 'Закупаете партии «на глаз» и боитесь кассового разрыва',
    includes: [
      'Полный аудит магазина: состояние и проблемы',
      'Unit-экономика: закуп, логистика, комиссии, налоги',
      'ABC-анализ ассортимента',
      'Прогноз продаж на квартал + таблица с автоматизацией',
    ],
    result: 'Видите чистую прибыль ещё до закупки',
    price: '10–15 000 ₽ · разово',
  },
  {
    title: 'AI-визуальное оформление',
    forWhom: 'Нужен уникальный визуал быстро и без студийных бюджетов',
    includes: [
      'AI-фотосессии — генеративные, реалистичные',
      'AI-инфографика и выноски под возражения',
      'AI-аватары и короткое видео товара',
      'Единый стиль на всю линейку',
    ],
    result: 'Визуал, который не скопируют, в 3× быстрее и в 5× дешевле',
    price: 'Пакетом или за карточку',
  },
]

export type ServiceItem = {
  title: string
  forWhom: string
  includes: string[]
  result: string
  price: string
}

/* ---- FAQ ---- */
export const FAQ: FaqItem[] = [
  {
    q: 'За сколько времени будут результаты?',
    a: 'SEO-оптимизация — заметный эффект за 7–10 дней. Реклама — с первого дня. Устойчивый рост — 2–3 месяца.',
  },
  {
    q: 'Вы гарантируете рост как в кейсах?',
    a: 'Нет — каждый магазин уникален, рост зависит от ниши, конкуренции и текущего состояния. Но я гарантирую ROAS 3× на рекламе или возврат денег за первый месяц.',
  },
  {
    q: 'Какой минимальный бюджет на рекламу?',
    a: 'От 20 000 ₽ / мес. При меньшем сложнее выйти на ROAS 3×. Есть вариант без рекламы — только SEO-оптимизация карточек.',
  },
  {
    q: 'С какими категориями работаете?',
    a: 'Одежда (школьная, спортивная, бельё), мебель, сувениры, текстиль, аксессуары, спорттовары. Системный подход позволяет заходить в любую нишу.',
  },
  {
    q: 'Как строится работа?',
    a: '100% удалённо: Telegram, почта, созвоны в Google Meet. Еженедельные отчёты и звонки по необходимости.',
  },
  {
    q: 'Что входит в «ведение под ключ»?',
    a: 'SEO → реклама → аналитика → финмоделирование → дизайн контента. Управляю магазином как собственным бизнесом.',
  },
  {
    q: 'Сколько проектов берёте одновременно?',
    a: 'Максимум 4–5 магазинов, обычно 3–4 — чтобы уделять каждому должное внимание.',
  },
  {
    q: 'Сколько стоит?',
    a: 'SEO-оптимизация — 15–25 000 ₽ разово. Реклама — 2–5 000 ₽ / мес. Аналитика — 10–15 000 ₽ разово. Полное ведение обсуждаем на консультации: зависит от категории, выручки и числа SKU.',
  },
]
export type FaqItem = { q: string; a: string }

/* ---- Отзывы ---- */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Сергей К.',
    role: 'Селлер детской одежды',
    text: 'За месяц выросли на 193%. Ася разобралась в нише быстрее, чем предыдущий менеджер за полгода.',
    result: '+193% заказов',
  },
  {
    name: 'Алексей М.',
    role: 'Селлер мебели',
    text: 'Не думал, что таблица финмодели спасёт бизнес от разорения. Теперь закупаю партии без страха.',
    result: 'Спасение от кассового разрыва',
  },
  {
    name: 'Ольга И.',
    role: 'Селлер одежды',
    text: 'Её инфографика подняла CTR на 43%. Совсем не похоже на карточки конкурентов.',
    result: '+43% CTR',
  },
]
export type Testimonial = { name: string; role: string; text: string; result: string }

/* ---- AI-портфолио ---- */
export const AI_INTRO = {
  kicker: 'AI-портфолио',
  title: 'Мой мир AI — когда нейросети работают на результат',
  sub: 'Я не просто использую AI. Я генерирую уникальный контент, который продаёт, экономит бюджет и выполняет за вас 10 часов работы за 30 минут.',
}
export const AI_WORKS: AiWork[] = [
  {
    title: 'Школьные брюки для девочки',
    category: 'Инфографика · одежда',
    note: 'Выноски по характеристикам, два цвета, размерный ряд — всё на первом слайде',
    tool: 'Gemini + Figma',
    image: '/asya/ig/pants-girl.png',
  },
  {
    title: 'Бандаж для запястья',
    category: 'Инфографика · товарка',
    note: 'Контекстный кадр, снятие возражений, подарок-гайд — под спортивную нишу',
    tool: 'Midjourney + Figma',
    image: '/asya/ig/bandage.png',
  },
  {
    title: 'Комплект инфографики линейки',
    category: 'Инфографика · комплект',
    note: 'Единый визуальный язык на весь ассортимент магазина',
    tool: 'Figma + AI',
    image: '/asya/ig/set-1.png',
  },
  {
    title: 'Карточка одежды',
    category: 'Инфографика · одежда',
    note: 'Композиция под CTR в выдаче, читаемая иерархия',
    tool: 'Gemini + Figma',
    image: '/asya/ig/clothes-2.png',
  },
  {
    title: 'Карточка одежды',
    category: 'Инфографика · одежда',
    note: 'Первое фото и выноски под возражения покупателя',
    tool: 'Gemini + Figma',
    image: '/asya/ig/clothes-3.png',
  },
  {
    title: 'Комплект инфографики',
    category: 'Инфографика · комплект',
    note: 'Слайды 2–5 карточки: размеры, состав, уход, применение',
    tool: 'Figma + AI',
    image: '/asya/ig/set-3.png',
  },
  {
    title: 'AI-аватар',
    category: 'AI-аватар',
    note: 'Персональный аватар для соцсетей и обложек — генеративный, реалистичный',
    tool: 'Midjourney / RunwayML',
    image: '/asya/ai-avatar-1.png',
  },
  {
    title: 'AI-аватар',
    category: 'AI-аватар',
    note: 'Стилизованный портрет для контента бренда',
    tool: 'Midjourney',
    image: '/asya/ai-avatar-2.png',
  },
  {
    title: 'Товарная фотография',
    category: 'AI-фотосессия',
    note: 'Чистый предметный кадр без студии — 5 минут вместо 2 часов',
    tool: 'NanoBanana',
    image: '/asya/ig/goods-2.png',
  },
]
export type AiWork = {
  title: string
  category: string
  note: string
  tool: string
  image: string
}
export const AI_PROCESS = ['Идея', 'Prompting', 'Генерация', 'Редактирование', 'Финальный продукт']
export const AI_TOOLS = ['Claude', 'Gemini', 'Midjourney', 'NanoBanana', 'RunwayML', 'Figma', 'Canva']

/* ---- Сертификаты и образование ---- */
export const CERTS: Cert[] = [
  {
    title: 'Менеджер маркетплейсов — MpSkill',
    org: 'Школа MpSkill',
    year: '2026',
    note: 'Курс «Менеджер маркетплейсов с 0 до первого клиента»: ведение кабинета, аналитика, реклама. Практика на реальных кабинетах.',
    image: '/asya/cert-mpskill.jpg',
  },
  {
    title: 'Международный и корпоративный менеджмент',
    org: 'УрФУ — бакалавр',
    year: '2025',
    note: 'Фундаментальная база в управлении процессами и экономике.',
    image: '/asya/diplomas.jpg',
  },
  {
    title: 'Международный бизнес',
    org: 'Бизнес-школа УрФУ',
    year: '2025',
    note: 'Повышение квалификации.',
  },
]
export type Cert = { title: string; org: string; year: string; note: string; image?: string }

/* ---- О мне (расширенная страница) ---- */
export const ABOUT_PAGE = {
  kicker: 'Обо мне',
  title: 'Данные + AI + дизайн в одном лице',
  lead: 'Я пришла в e-commerce с фундаментальной базой УрФУ. Для меня маркетплейсы — не лотерея, а математическая модель. Я Весы: взвешиваю все риски и решения, поэтому одержима таблицами, юнит-экономикой и точными данными. Но маркетплейсы — ещё и визуальная война, и я дополняю цифры креативом: инфографика, AI-фотосессии, аватары.',
  closes: [
    'Экономика бизнеса сходится до копейки',
    'Карточка продаёт с первого взгляда',
  ],
  numbers: [
    { value: '1+ год', label: 'создаю инфографику · 50+ работ' },
    { value: '5+', label: 'клиентов на ведении кабинетов' },
    { value: '10+', label: 'ниш: мебель, одежда, сувениры…' },
    { value: '100+ ч', label: 'в AI-инструментах' },
  ],
  philosophy: [
    'Вкладывала свои деньги в e-commerce — знаю цену каждой ошибки',
    'Не беру проект, если не верю в успех',
    'Работаю на результат, а не на отчётность ради отчётности',
  ],
  photo: '/asya/portrait.jpg',
}
export type AboutPage = {
  kicker: string
  title: string
  lead: string
  closes: string[]
  numbers: { value: string; label: string }[]
  philosophy: string[]
  photo: string
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
  fullName: string
  role: string
  telegramHandle: string
  telegramUrl: string
  email: string
  whatsapp: string
  whatsappUrl: string
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
export type AiIntro = SectionIntro & { sub: string }

export type HomeSectionKey =
  | 'about'
  | 'marquee'
  | 'growthChart'
  | 'minimalGrid'
  | 'services'
  | 'workList'
  | 'testimonials'
  | 'edge'
  | 'toolbox'
  | 'caseStudies'
  | 'faq'

export const HOME_SECTION_LABELS: Record<HomeSectionKey, string> = {
  about: 'Знакомство',
  marquee: 'Бегущая строка',
  growthChart: 'Графики роста',
  minimalGrid: 'Мини-сетка фактов',
  services: 'Услуги',
  workList: 'Мои работы',
  testimonials: 'Отзывы',
  edge: 'Почему со мной',
  toolbox: 'Инструменты',
  caseStudies: 'Кейсы',
  faq: 'FAQ',
}

const DEFAULT_HOME_SECTIONS: HomeSectionKey[] = [
  'about',
  'marquee',
  'growthChart',
  'minimalGrid',
  'services',
  'workList',
  'testimonials',
  'edge',
  'toolbox',
  'caseStudies',
  'faq',
]

export type SiteContent = {
  contact: ContactInfo
  nav: NavItem[]
  hero: Hero
  about: About
  aboutPage: AboutPage
  platforms: string[]
  marquee: string[]
  metrics: MetricItem[]
  growth: Growth
  expertiseIntro: SectionIntro
  expertise: ExpertiseItem[]
  workIntro: WorkIntro
  work: WorkItem[]
  services: Services
  aiIntro: AiIntro
  aiWorks: AiWork[]
  aiProcess: string[]
  aiTools: string[]
  certs: Cert[]
  faq: FaqItem[]
  testimonials: Testimonial[]
  edgeIntro: SectionIntro
  edge: EdgeItem[]
  casesIntro: SectionIntro
  cases: CaseItem[]
  toolbox: Toolbox
  contactSection: ContactSection
  channels: Channel[]
  credit: Credit
  homeSections: HomeSectionKey[]
}

export const DEFAULT_CONTENT: SiteContent = {
  contact: { ...CONTACT },
  nav: NAV.map((item) => ({ ...item })),
  hero: { ...HERO, headline: [...HERO.headline] },
  about: { ...ABOUT, facts: [...ABOUT.facts] },
  aboutPage: {
    ...ABOUT_PAGE,
    closes: [...ABOUT_PAGE.closes],
    numbers: ABOUT_PAGE.numbers.map((n) => ({ ...n })),
    philosophy: [...ABOUT_PAGE.philosophy],
  },
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
  aiIntro: { ...AI_INTRO },
  aiWorks: AI_WORKS.map((w) => ({ ...w })),
  aiProcess: [...AI_PROCESS],
  aiTools: [...AI_TOOLS],
  certs: CERTS.map((c) => ({ ...c })),
  faq: FAQ.map((f) => ({ ...f })),
  testimonials: TESTIMONIALS.map((t) => ({ ...t })),
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
  homeSections: [...DEFAULT_HOME_SECTIONS],
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
