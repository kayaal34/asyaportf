import type { CSSProperties } from 'react'
import { Section } from './Section'
import { Reveal } from './Reveal'
import { MaskWords, ParallaxImage, ScrollWords } from './fx'
import { useContent } from '../content/store'

export function About() {
  const { about } = useContent()

  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-4 lg:gap-8">
        {/* first column: label + portrait card */}
        <div className="flex flex-col gap-6">
          <Reveal group>
            <p className="flex items-start gap-3 font-mono text-[0.7rem] tracking-[0.1em] text-ink-faint uppercase">
              <span aria-hidden className="sr-c mt-[0.55em] h-px w-6 shrink-0 bg-accent" data-sr="line" />
              <span className="sr-c" data-sr="fade" style={{ '--d': '0.15s' } as CSSProperties}>
                {about.kicker}
              </span>
            </p>
          </Reveal>
          <figure className="max-w-sm lg:max-w-none">
            <ParallaxImage
              src={about.photo}
              alt={about.realName}
              className="rounded-sm bg-paper-raised"
              imgClassName="aspect-[3/4] grayscale-[0.15]"
              radius="2px"
            />
            {about.realName && (
              <figcaption className="mt-3 flex justify-between font-mono text-[0.66rem] tracking-[0.08em] text-ink-faint uppercase">
                <span>{about.realName}</span>
                <span>Фото · 01</span>
              </figcaption>
            )}
          </figure>
        </div>

        {/* the rest: statement */}
        <div className="lg:col-span-3">
          <Reveal group>
            <h2 className="text-display font-extrabold text-balance">
              <MaskWords text={about.greeting} baseDelay={0.15} accentLast />
            </h2>
          </Reveal>

          <ScrollWords
            text={about.pitch}
            className="mt-10 max-w-4xl text-[clamp(1.4rem,2.6vw,2.5rem)] leading-[1.18] font-semibold tracking-[-0.03em] text-ink lg:mt-14"
          />

          {about.facts.length > 0 && (
            <ul className="mt-14 border-t border-line lg:mt-20">
              {about.facts.map((fact, i) => (
                <Reveal
                  as="li"
                  key={fact}
                  delay={i * 0.07}
                  variant="left"
                  className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-5 text-base text-ink sm:grid-cols-[5rem_1fr] sm:text-lg"
                >
                  <span className="pt-1 font-mono text-[0.7rem] text-accent tabular-nums">
                    ({String(i + 1).padStart(2, '0')})
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
