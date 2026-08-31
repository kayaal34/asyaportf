import { Link } from 'react-router-dom'
import { Page, PageHead } from '../components/layout/Page'
import { Section } from '../components/Section'
import { Reveal } from '../components/Reveal'
import { Faq } from '../components/Faq'
import { useContent } from '../content/store'

export function ServicesPage() {
  const { services } = useContent()

  return (
    <Page>
      <PageHead
        kicker="Услуги"
        title="Что я делаю для магазина"
        lead="Четыре направления. Можно взять по отдельности или всё вместе — «ведение под ключ»."
      />

      <Section>
        <div className="grid gap-5 lg:grid-cols-2">
          {services.items.map((item, i) => (
            <Reveal as="div" key={item.title} delay={(i % 2) * 0.08}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-paper-raised p-8 sm:p-10">
                <span className="font-display text-sm font-bold text-ink-faint tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-6 text-2xl font-extrabold tracking-[-0.02em] sm:text-3xl">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm text-ink-soft">{item.forWhom}</p>

                <ul className="mt-6 flex flex-1 flex-col gap-3 border-t border-line pt-6">
                  {item.includes.map((line) => (
                    <li key={line} className="flex gap-3 text-[0.95rem] text-ink">
                      <span aria-hidden className="mt-1 text-accent">
                        —
                      </span>
                      {line}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-line pt-5">
                  <p className="text-sm font-semibold text-ink">{item.result}</p>
                  <p className="mt-1 text-xs tracking-wide text-ink-faint">{item.price}</p>
                </div>

                <Link
                  to="/contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent"
                >
                  Обсудить <span aria-hidden>→</span>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-ink text-paper">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <h2 className="text-headline text-balance text-paper">
            Полное ведение — как собственный бизнес
          </h2>
          <p className="text-lead text-paper/70">
            SEO → реклама → аналитика → финмоделирование → дизайн контента. Один ответственный за
            результат, еженедельная отчётность, стоимость обсуждается на консультации: зависит от
            категории, выручки и числа SKU.
          </p>
        </div>
        <Link
          to="/contact"
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-base font-semibold text-accent-ink"
        >
          Заказать консультацию <span aria-hidden>→</span>
        </Link>
      </Section>

      <Faq />
    </Page>
  )
}
