import { useState } from 'react'
import { Section } from './Section'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'
import { useContent } from '../content/store'
import { cn } from '../lib/cn'

export function CaseStudies() {
  const { cases: CASES, casesIntro: CASES_INTRO, contact: CONTACT } = useContent()
  const [openId, setOpenId] = useState<string>(CASES[0]?.id ?? '')

  return (
    <Section id="cases">
      <SectionHeading kicker={CASES_INTRO.kicker} title={CASES_INTRO.title} />

      <div className="mt-16 border-t border-line lg:mt-24">
        {CASES.map((item) => {
          const isOpen = openId === item.id
          return (
            <div key={item.id} className="border-b border-line">
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? '' : item.id)}
                aria-expanded={isOpen}
                className="group flex w-full items-start gap-6 py-8 text-left lg:items-center lg:py-10"
              >
                <span className="hidden w-24 shrink-0 text-sm text-ink-faint tabular-nums sm:block">
                  {item.period}
                </span>
                <span className="flex-1 text-xl font-extrabold tracking-[-0.02em] sm:text-2xl lg:text-3xl">
                  {item.label}
                </span>
                <span
                  className={cn(
                    'grid size-10 shrink-0 place-items-center rounded-full border border-ink text-lg transition-transform duration-300',
                    isOpen ? 'rotate-45 bg-ink text-paper' : 'group-hover:rotate-90',
                  )}
                  aria-hidden
                >
                  +
                </span>
              </button>

              <div
                className={cn(
                  'grid grid-cols-1 overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                )}
              >
                <div className="min-h-0">
                  <div className="pb-12 lg:pb-16">
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
                      <div>
                        <p className="max-w-xl text-lead text-ink-soft">{item.summary}</p>
                        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
                          {item.stats.map((stat) => (
                            <div key={stat.label}>
                              <dt className="text-xs tracking-[0.14em] text-ink-faint uppercase">
                                {stat.label}
                              </dt>
                              <dd className="mt-1 font-display text-lg font-bold tracking-[-0.02em]">
                                {stat.value}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>

                      <ol className="flex flex-col gap-4">
                        {item.steps.map((step, index) => (
                          <li key={step} className="flex gap-4 border-t border-line pt-4">
                            <span className="font-display text-sm font-bold text-ink-faint tabular-nums">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <span className="text-[0.95rem] leading-relaxed text-ink-soft">
                              {step}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {item.table && item.table.length > 0 && (
                      <div className="mt-10 overflow-x-auto">
                        <table className="w-full min-w-[34rem] border-collapse text-sm">
                          <thead>
                            <tr className="border-b border-line text-left text-xs tracking-[0.12em] text-ink-faint uppercase">
                              <th className="py-3 pr-4 font-medium">Метрика</th>
                              <th className="py-3 pr-4 font-medium">До</th>
                              <th className="py-3 pr-4 font-medium">После</th>
                              <th className="py-3 font-medium">Прирост</th>
                            </tr>
                          </thead>
                          <tbody>
                            {item.table.map((row) => (
                              <tr key={row.metric} className="border-b border-line/60">
                                <td className="py-3 pr-4 font-medium text-ink">{row.metric}</td>
                                <td className="py-3 pr-4 text-ink-soft tabular-nums">{row.before}</td>
                                <td className="py-3 pr-4 font-semibold text-ink tabular-nums">
                                  {row.after}
                                </td>
                                <td className="py-3 font-semibold text-accent tabular-nums">
                                  {row.delta}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {item.insight && (
                      <p className="mt-8 max-w-3xl border-l-2 border-accent pl-5 text-[0.95rem] leading-relaxed text-ink-soft">
                        {item.insight}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <Reveal className="mt-14">
        <a
          href={CONTACT.portfolioUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="group inline-flex items-center gap-3 text-lg font-medium"
        >
          <span className="border-b border-ink pb-1 transition-colors group-hover:border-ink-faint">
            Смотреть разбор методов в Telegram-канале
          </span>
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </a>
      </Reveal>
    </Section>
  )
}
