import { motion, useReducedMotion, type Variants } from 'motion/react'
import { Section } from './Section'
import { SectionHeading } from './SectionHeading'
import { EXPERTISE, EXPERTISE_INTRO } from '../content/site'
import { springSoft, viewportOnce } from '../lib/motion'
import { cn } from '../lib/cn'

/** Asymmetrical placement on lg+, honest flow on smaller screens. */
const PLACEMENT: Record<string, string> = {
  '01': 'sm:col-span-2 lg:col-span-7 lg:col-start-1',
  '02': 'lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:-translate-y-2',
  '03': 'lg:col-span-4 lg:col-start-1 lg:translate-y-6',
  '04': 'lg:col-span-3 lg:col-start-6 lg:translate-y-20',
  '05': 'sm:col-span-2 lg:col-span-8 lg:col-start-1 lg:translate-y-10',
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const card: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: springSoft },
}

export function MinimalGrid() {
  const reduceMotion = useReducedMotion()

  return (
    <Section id="expertise">
      <SectionHeading kicker={EXPERTISE_INTRO.kicker} title={EXPERTISE_INTRO.title} />

      <motion.div
        variants={container}
        initial={reduceMotion ? undefined : 'hidden'}
        whileInView={reduceMotion ? undefined : 'show'}
        viewport={viewportOnce}
        className="mt-20 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-28 lg:grid-cols-12 lg:items-start lg:gap-6"
      >
        {EXPERTISE.map((item) => (
          <motion.article
            key={item.index}
            variants={card}
            whileHover={reduceMotion ? undefined : { y: -6 }}
            transition={springSoft}
            className={cn(
              'group flex flex-col justify-between rounded-3xl border border-line bg-paper-raised p-8 transition-colors hover:border-line-strong sm:p-10',
              item.scale === 'tall' && 'lg:min-h-[32rem]',
              item.scale === 'wide' && 'lg:min-h-[15rem]',
              PLACEMENT[item.index],
            )}
          >
            <span className="font-display text-sm font-bold tracking-[0.1em] text-ink-faint">
              {item.index}
            </span>
            <div className="mt-16 sm:mt-24">
              <h3 className="text-2xl font-extrabold tracking-[-0.02em] sm:text-3xl">
                {item.title}
              </h3>
              <p className="mt-4 max-w-md text-[0.975rem] leading-relaxed text-ink-soft">
                {item.body}
              </p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  )
}
