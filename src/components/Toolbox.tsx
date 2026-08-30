import { Section } from './Section'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'
import { useContent } from '../content/store'

export function Toolbox() {
  const { toolbox } = useContent()
  if (toolbox.tags.length === 0) return null

  return (
    <Section id="toolbox">
      <SectionHeading kicker={toolbox.intro.kicker} title={toolbox.intro.title} />
      <ul className="mt-12 flex flex-wrap gap-2.5">
        {toolbox.tags.map((tag, i) => (
          <Reveal
            as="li"
            key={`${tag}-${i}`}
            delay={Math.min(i * 0.03, 0.4)}
            className="rounded-full border border-line bg-paper-raised px-4 py-2 text-sm text-ink transition-colors hover:border-ink-soft"
          >
            {tag}
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
