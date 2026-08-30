# asya-portfolio

Премиальный одностраничный сайт-портфолио для Аси — менеджера маркетплейсов WB / OZON.
Ультра-минимализм, монохром, крупная типографика, пружинные анимации.

## Стек

- **Vite 8** + **React 19** + **TypeScript**
- **Tailwind CSS v4** (через `@tailwindcss/vite`, токены в `src/index.css`)
- **motion** (`motion/react`) — актуальный пакет Framer Motion
- Шрифты: **Manrope** (дисплейный) + **Inter** (текст) через `@fontsource`

## Запуск

```bash
npm install
npm run dev      # http://localhost:5176
npm run build    # tsc -b + vite build → dist/
npm run preview  # предпросмотр собранной версии
```

## Структура

```
src/
├── App.tsx                     сборка секций
├── index.css                   дизайн-токены, типографическая шкала, keyframes
├── content/site.ts             ВЕСЬ текст и данные (единственный источник правды)
├── lib/
│   ├── motion.ts               пружинные пресеты, варианты появления
│   └── cn.ts                   clsx + tailwind-merge
├── components/
│   ├── Reveal.tsx              появление по скроллу (spring, один раз)
│   ├── Section.tsx             отступы/сетка секции
│   ├── SectionHeading.tsx      кикер + крупный заголовок
│   ├── CountUp.tsx             числа, «набегающие» при попадании в вид
│   ├── Magnetic.tsx            магнитная ссылка (тянется к курсору)
│   ├── Hero.tsx                1. Минималистичный герой + метрики
│   ├── MinimalGrid.tsx         2. Асимметричная плавающая сетка экспертизы
│   ├── Edge.tsx                3. Дифференциатор (тёмная секция)
│   ├── CaseStudies.tsx         4. Раскрывающиеся кейсы + ссылка на Telegram
│   ├── ContactCTA.tsx          5. Финальный CTA: огромный магнитный @taaeyes
│   └── layout/Header.tsx       фиксированный хедер, схлопывается при скролле
```

## Правки контента

Почти всё живёт в [`src/content/site.ts`](src/content/site.ts): метрики, услуги,
пункты дифференциатора, кейсы, ссылки. Компоненты — чисто презентационные.

## Доступность и анимации

Все анимации уважают `prefers-reduced-motion`: появления, счётчики,
магнитный эффект и «пружины» отключаются, контент рендерится статично.
