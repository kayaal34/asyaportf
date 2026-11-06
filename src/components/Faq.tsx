import { useState } from 'react'
import { Section } from './Section'
import { SectionHeading } from './SectionHeading'
import { useContent } from '../content/store'
import { cn } from '../lib/cn'
import { Reveal } from './Reveal'

export function Faq() {
  const { faq } = useContent()
  const [open, setOpen] = useState<number | null>(0)
  if (faq.length === 0) return null

  return (
    <Section id="faq">
      <SectionHeading kicker="Частые вопросы" title="Что обычно спрашивают" />
      <div className="mt-12 border-t border-line lg:mt-16">
        {faq.map((item, i) => {
          const isOpen = open === i
          return (
            <Reveal key={item.q} delay={Math.min(i * 0.06, 0.4)} className="border-b border-line">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="group flex w-full items-start gap-6 py-6 text-left"
              >
                <span className="w-12 shrink-0 pt-1.5 font-mono text-[0.68rem] text-accent sm:w-20">
                  Q.{String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 text-xl font-bold tracking-[-0.03em] sm:text-2xl lg:text-3xl">
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    'mt-1 shrink-0 text-xl text-ink-faint transition-transform duration-300',
                    isOpen ? 'rotate-45 text-accent' : 'group-hover:text-ink',
                  )}
                >
                  +
                </span>
              </button>
              <div
                className={cn(
                  'grid grid-cols-1 overflow-hidden transition-[grid-template-rows,opacity] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]',
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                )}
              >
                <div className="min-h-0">
                  <p className="max-w-2xl pb-8 pl-12 text-base leading-relaxed text-ink-soft sm:pl-20 sm:text-lg">
                    {item.a}
                  </p>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
