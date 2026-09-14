import { useState } from 'react'
import { Section } from './Section'
import { SectionHeading } from './SectionHeading'
import { useContent } from '../content/store'
import { cn } from '../lib/cn'

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
            <div key={item.q} className="border-b border-line">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="group flex w-full items-start gap-6 py-6 text-left"
              >
                <span className="flex-1 text-lg font-semibold tracking-[-0.01em] sm:text-xl">
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
                  <p className="max-w-2xl pb-6 text-[0.975rem] leading-relaxed text-ink-soft">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
