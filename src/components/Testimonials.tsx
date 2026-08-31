import { Section } from './Section'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'
import { useContent } from '../content/store'

export function Testimonials() {
  const { testimonials } = useContent()
  if (testimonials.length === 0) return null

  return (
    <Section id="reviews">
      <SectionHeading kicker="Отзывы" title="Что говорят клиенты" />
      <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal as="div" key={`${t.name}-${i}`} delay={i * 0.08}>
            <figure className="flex h-full flex-col rounded-2xl border border-line bg-paper-raised p-7 sm:p-8">
              <div className="text-accent" aria-hidden>
                ★★★★★
              </div>
              <blockquote className="mt-4 flex-1 text-[1.02rem] leading-relaxed text-ink">
                «{t.text}»
              </blockquote>
              <figcaption className="mt-6 border-t border-line pt-4">
                <span className="block text-sm font-semibold text-ink">{t.name}</span>
                <span className="block text-xs text-ink-faint">{t.role}</span>
                <span className="mt-2 inline-flex rounded-full bg-accent-wash px-2.5 py-1 text-xs font-medium text-accent">
                  {t.result}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
