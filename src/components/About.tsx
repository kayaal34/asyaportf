import { Section } from './Section'
import { Reveal } from './Reveal'
import { useContent } from '../content/store'

export function About() {
  const { about } = useContent()

  return (
    <Section id="about">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-line bg-paper-raised">
            <img
              src={about.photo}
              alt={about.realName}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="text-xs font-medium tracking-[0.22em] text-ink-faint uppercase">
              {about.kicker}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 text-headline text-balance">{about.greeting}</h2>
          </Reveal>
          {about.realName && (
            <Reveal delay={0.08}>
              <p className="mt-3 text-sm tracking-wide text-ink-faint">{about.realName}</p>
            </Reveal>
          )}
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lead text-ink-soft text-balance">{about.pitch}</p>
          </Reveal>

          {about.facts.length > 0 && (
            <ul className="mt-8 flex flex-col gap-3 border-t border-line pt-8">
              {about.facts.map((fact, i) => (
                <Reveal
                  as="li"
                  key={fact}
                  delay={i * 0.06}
                  className="flex gap-3 text-[0.95rem] text-ink"
                >
                  <span aria-hidden className="mt-1 text-accent">
                    —
                  </span>
                  {fact}
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Section>
  )
}
