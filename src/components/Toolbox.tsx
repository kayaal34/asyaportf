import { Section } from './Section'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'
import { useContent } from '../content/store'

/** A wall of words. Each tool flips into the italic serif when touched. */
export function Toolbox() {
  const { toolbox } = useContent()
  if (toolbox.tags.length === 0) return null

  return (
    <Section id="toolbox">
      <SectionHeading kicker={toolbox.intro.kicker} title={toolbox.intro.title} />
      <ul className="mt-14 flex flex-wrap items-baseline gap-x-3 gap-y-1 lg:mt-20 lg:ml-[25%]">
        {toolbox.tags.map((tag, i) => (
          <Reveal
            as="li"
            key={`${tag}-${i}`}
            delay={Math.min(i * 0.035, 0.7)}
            variant="pop"
            className="group flex items-baseline gap-3"
          >
            <span className="cursor-default font-display text-[clamp(1.5rem,3.2vw,3rem)] leading-[1.1] font-bold tracking-[-0.045em] text-ink transition-colors duration-300 group-hover:font-serif group-hover:font-medium group-hover:text-accent group-hover:italic">
              {tag}
            </span>
            {i < toolbox.tags.length - 1 && (
              <span aria-hidden className="font-mono text-sm text-line-strong">
                /
              </span>
            )}
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
