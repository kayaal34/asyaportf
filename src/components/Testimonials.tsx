import { Section } from './Section'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'
import { useContent } from '../content/store'

/** Quotes set like pull-quotes in a magazine: big italic serif, mono byline. */
export function Testimonials() {
  const { testimonials } = useContent()
  if (testimonials.length === 0) return null

  return (
    <Section id="reviews">
      <SectionHeading kicker="Отзывы" title="Что говорят клиенты" />
      <div className="mt-16 border-t border-line lg:mt-24">
        {testimonials.map((t, i) => (
          <Reveal
            as="figure"
            key={`${t.name}-${i}`}
            variant="up"
            className="grid gap-6 border-b border-line py-10 lg:grid-cols-4 lg:gap-8 lg:py-14"
          >
            <figcaption className="flex flex-row flex-wrap items-baseline gap-x-4 gap-y-2 font-mono text-[0.7rem] tracking-[0.06em] uppercase lg:flex-col lg:gap-2">
              <span className="text-accent">({String(i + 1).padStart(2, '0')})</span>
              <span className="text-ink">{t.name}</span>
              <span className="text-ink-faint">{t.role}</span>
              <span className="mt-1 inline-flex rounded-full bg-accent px-2.5 py-1 text-accent-ink normal-case">
                {t.result}
              </span>
            </figcaption>
            <blockquote className="relative font-serif text-[clamp(1.8rem,3.6vw,3.4rem)] leading-[1.02] font-medium tracking-[-0.025em] text-ink italic lg:col-span-3">
              <span aria-hidden className="absolute -top-[0.35em] -left-[0.05em] font-serif text-[2.2em] leading-none text-accent not-italic opacity-90 lg:-left-[0.5em]">
                “
              </span>
              <span className="relative">{t.text}</span>
            </blockquote>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
