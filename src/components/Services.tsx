import { motion, useReducedMotion, type Variants } from 'motion/react'
import { Section } from './Section'
import { SectionHeading } from './SectionHeading'
import { useContent } from '../content/store'
import { springSoft, viewportOnce } from '../lib/motion'

const container: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.1 } },
}
const card: Variants = {
  hidden: { opacity: 0, y: 32 },
  shown: { opacity: 1, y: 0, transition: springSoft },
}

export function Services() {
  const { services } = useContent()
  const reduceMotion = useReducedMotion()
  if (services.items.length === 0) return null

  return (
    <Section id="services">
      <SectionHeading kicker={services.intro.kicker} title={services.intro.title} />

      <motion.div
        variants={container}
        initial={reduceMotion ? undefined : 'hidden'}
        whileInView={reduceMotion ? undefined : 'shown'}
        viewport={viewportOnce}
        className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-3"
      >
        {services.items.map((item) => (
          <motion.article
            key={item.title}
            variants={card}
            className="flex flex-col rounded-2xl border border-line bg-paper-raised p-7 sm:p-8"
          >
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

            <p className="mt-6 inline-flex self-start rounded-full border border-line px-3 py-1 text-xs tracking-wide text-ink-soft">
              {item.note}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  )
}
