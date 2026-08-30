import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Section } from './Section'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'
import { useContent } from '../content/store'
import { springSoft } from '../lib/motion'
import { cn } from '../lib/cn'

export function CaseStudies() {
  const { cases: CASES, casesIntro: CASES_INTRO, contact: CONTACT } = useContent()
  const reduceMotion = useReducedMotion()
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
                className="group flex w-full items-center gap-6 py-8 text-left lg:py-10"
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

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="body"
                    initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                    transition={springSoft}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 gap-10 pb-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pb-16">
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
                  </motion.div>
                )}
              </AnimatePresence>
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
