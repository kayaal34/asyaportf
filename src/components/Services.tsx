import { Section } from './Section'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'
import { useContent } from '../content/store'

export function Services() {
  const { services } = useContent()
  if (services.items.length === 0) return null

  return (
    <Section id="services">
      <SectionHeading kicker={services.intro.kicker} title={services.intro.title} />

      <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-3">
        {services.items.map((item, i) => (
          <Reveal as="div" key={item.title} delay={i * 0.08}>
            <article className="flex h-full flex-col rounded-2xl border border-line bg-paper-raised p-7 sm:p-8">
              <h3 className="text-2xl font-extrabold tracking-[-0.02em]">{item.title}</h3>
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

              <p className="mt-6 text-sm font-medium text-ink">{item.result}</p>
              <p className="mt-1 text-xs tracking-wide text-ink-faint">{item.price}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
