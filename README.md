# asya-portfolio

Премиальный сайт-портфолио для Аси — менеджера маркетплейсов WB / OZON.
Ультра-минимализм, монохром, крупная типографика, пружинные анимации.
Одна страница + скрытая админ-панель для самостоятельного редактирования.

## Стек

- **Vite 8** + **React 19** + **TypeScript** + **react-router-dom 7**
- **Tailwind CSS v4** (через `@tailwindcss/vite`, токены в `src/index.css`)
- **motion** (`motion/react`) — актуальный пакет Framer Motion
- **@supabase/supabase-js** — контент и вход в панель (опционально)
- Шрифты: **Manrope** + **Inter** через `@fontsource`

## Запуск

```bash
npm install
npm run dev      # http://localhost:5176
npm run build    # tsc -b + vite build → dist/
npm run preview  # предпросмотр собранной версии
```

Без `.env` сайт работает полностью — показывает встроенный текст из
`src/content/site.ts`, а `/admin` выводит подсказку про подключение.

## Структура

```
src/
├── App.tsx                  роутинг: / (сайт) и /admin (панель)
├── pages/SitePage.tsx       сборка секций сайта
├── index.css                дизайн-токены, типографика, keyframes, акцент
├── content/
│   ├── site.ts              ДЕФОЛТНЫЙ контент + типы + DEFAULT_CONTENT
│   └── store.tsx            ContentProvider / useContent() — контент в рантайме
├── lib/
│   ├── supabase.ts          клиент (null, если нет ключей)
│   ├── contentIo.ts         saveContent(), uploadWorkImage()
│   ├── motion.ts            пружинные пресеты
│   └── cn.ts                clsx + tailwind-merge
├── components/
│   ├── Logo.tsx             монограмма ASY
│   ├── Intro.tsx            тёмная заставка (1 раз за сессию, ~1.25 с)
│   ├── ScrollProgress.tsx   тонкая полоса прогресса
│   ├── Hero.tsx             1. Первый экран + метрики (count-up)
│   ├── Marquee.tsx          бегущая строка
│   ├── MinimalGrid.tsx      2. Асимметричная сетка экспертизы
│   ├── WorkList.tsx         3. Работы (превью за курсором)
│   ├── Edge.tsx             4. Отличия (тёмная секция)
│   ├── CaseStudies.tsx      5. Кейсы (раскрываются)
│   ├── ContactCTA.tsx       6. Контакт + подпись в подвале
│   └── layout/Header.tsx    фиксированный хедер
└── admin/                   панель: вход, dashboard, поля, загрузка картинок
```

## Контент

- **Быстрая правка в коде** — `src/content/site.ts`.
- **Через панель** — при подключённом Supabase контент грузится из БД в рантайме,
  а `site.ts` остаётся резервом и «сидом». Правки в панели видны на сайте сразу
  после сохранения.

## Подключение Supabase (для панели `/admin`)

1. Создайте бесплатный проект на [supabase.com](https://supabase.com).
2. **SQL Editor → New query** → вставьте и выполните `supabase/schema.sql`
   (создаёт таблицу `site_content`, политики RLS и bucket `work-images`).
3. Скопируйте `.env.example` в `.env` и заполните:
   ```
   VITE_SUPABASE_URL=https://<ref>.supabase.co
   VITE_SUPABASE_ANON_KEY=<anon public key>
   ```
   (Project Settings → API)
4. Пересоберите / перезапустите dev-сервер.
5. **Создание аккаунта Аси:**
   - Authentication → Sign In / Providers → включите **Allow new users to sign up**
   - откройте `/admin/setup`, введите e-mail + пароль
   - выключите **Allow new users to sign up** обратно
6. Вход — `/admin`.

Панель редактирует все тексты, метрики, экспертизу, работы (с загрузкой
изображений), кейсы, каналы связи и подпись в подвале.

## Доступность и анимации

Все анимации уважают `prefers-reduced-motion`: заставка, появления, счётчики,
магнитный эффект и «пружины» отключаются, контент рендерится статично.
