import { motion, useReducedMotion, type Variants } from 'motion/react'
import { Section } from './Section'
import { SectionHeading } from './SectionHeading'
import { useContent } from '../content/store'
import { springSoft, viewportOnce } from '../lib/motion'

const container: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.035 } },
}
const pill: Variants = {
  hidden: { opacity: 0, y: 12 },
  shown: { opacity: 1, y: 0, transition: springSoft },
}

export function Toolbox() {
  const { toolbox } = useContent()
  const reduceMotion = useReducedMotion()
  if (toolbox.tags.length === 0) return null

  return (
    <Section id="toolbox">
      <SectionHeading kicker={toolbox.intro.kicker} title={toolbox.intro.title} />
      <motion.ul
        variants={container}
        initial={reduceMotion ? undefined : 'hidden'}
        whileInView={reduceMotion ? undefined : 'shown'}
        viewport={viewportOnce}
        className="mt-12 flex flex-wrap gap-2.5"
      >
        {toolbox.tags.map((tag, i) => (
          <motion.li
            key={`${tag}-${i}`}
            variants={pill}
            className="rounded-full border border-line bg-paper-raised px-4 py-2 text-sm text-ink transition-colors hover:border-ink-soft"
          >
            {tag}
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  )
}
