import { Page, PageHead } from '../components/layout/Page'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { useContent } from '../content/store'

export function AiPage() {
  const { aiIntro, aiWorks, aiProcess, aiTools } = useContent()

  return (
    <Page>
      <PageHead kicker={aiIntro.kicker} title={aiIntro.title} lead={aiIntro.sub} />

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {aiWorks.map((w, i) => (
            <Reveal as="figure" key={w.title} delay={(i % 3) * 0.07}>
              <div className="overflow-hidden rounded-2xl border border-line bg-paper-raised">
                <img
                  src={w.image}
                  alt={w.title}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <figcaption className="mt-4">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="text-lg font-extrabold tracking-[-0.02em]">{w.title}</h2>
                  <span className="text-xs tracking-[0.14em] text-ink-faint uppercase">
                    {w.category}
                  </span>
                </div>
                <p className="mt-2 text-sm text-ink-soft">{w.note}</p>
                <p className="mt-2 text-xs text-ink-faint">Инструменты: {w.tool}</p>
              </figcaption>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 text-sm text-ink-faint">
          Больше примеров — в закрытом Telegram-канале. Реальные фото проектов добавляются по мере
          согласования с клиентами.
        </p>
      </Section>

      <Section className="bg-ink text-paper">
        <SectionHeading kicker="Как это работает" title="От идеи до готового визуала" invert />
        <ol className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-4 lg:mt-16">
          {aiProcess.map((step, i) => (
            <li key={step} className="flex items-center gap-4">
              <span className="rounded-full border border-paper/25 px-4 py-2 text-sm font-medium text-paper">
                {step}
              </span>
              {i < aiProcess.length - 1 && (
                <span aria-hidden className="text-paper/40">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
        <div className="mt-12 flex flex-wrap gap-2.5">
          {aiTools.map((t) => (
            <span
              key={t}
              className="rounded-full border border-paper/20 px-4 py-2 text-sm text-paper/80"
            >
              {t}
            </span>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <h2 className="text-headline text-balance">AI не заменяет вас — он работает на вас</h2>
          <ul className="flex flex-col gap-3 text-[1rem] text-ink-soft">
            <li>— Экономит 70–90% времени на создание контента</li>
            <li>— Стоит в 5 раз дешевле обычного дизайнера</li>
            <li>— Генерирует уникальный визуал, который не скопируют</li>
            <li>— Работает 24/7</li>
          </ul>
        </div>
        <a
          href="/contact"
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-base font-semibold text-accent-ink"
        >
          Хочу свой AI-контент <span aria-hidden>→</span>
        </a>
      </Section>
    </Page>
  )
}
