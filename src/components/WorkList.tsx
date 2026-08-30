import { motion, useReducedMotion, type Variants } from 'motion/react'
import { Section } from './Section'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'
import { BeforeAfter } from './BeforeAfter'
import { useContent } from '../content/store'
import { springSoft, viewportOnce } from '../lib/motion'

const container: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.08 } },
}
const card: Variants = {
  hidden: { opacity: 0, y: 32 },
  shown: { opacity: 1, y: 0, transition: springSoft },
}

export function WorkList() {
  const { work: WORK, workIntro: WORK_INTRO, contact: CONTACT } = useContent()
  const reduceMotion = useReducedMotion()

  return (
    <Section id="work">
      <SectionHeading kicker={WORK_INTRO.kicker} title={WORK_INTRO.title} />
      <Reveal className="mt-5 max-w-2xl" delay={0.05}>
        <p className="text-lead text-ink-soft">{WORK_INTRO.body}</p>
      </Reveal>

      <BeforeAfter />

      <motion.ul
        variants={container}
        initial={reduceMotion ? undefined : 'hidden'}
        whileInView={reduceMotion ? undefined : 'shown'}
        viewport={viewportOnce}
        className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3"
      >
        {WORK.map((item) => (
          <motion.li key={item.title} variants={card}>
            <a
              href={CONTACT.portfolioUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="group block"
            >
              <div className="overflow-hidden rounded-2xl border border-line bg-paper-raised">
                <img
                  src={item.image}
                  alt={`${item.title} — ${item.discipline}`}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
                />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="text-lg font-extrabold tracking-[-0.02em]">{item.title}</h3>
                <span
                  aria-hidden
                  className="text-ink-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-accent"
                >
                  ↗
                </span>
              </div>
              <p className="mt-1 text-xs font-medium tracking-[0.16em] text-ink-faint uppercase">
                {item.discipline}
              </p>
              <p className="mt-2 text-sm text-ink-soft">{item.note}</p>
            </a>
          </motion.li>
        ))}
      </motion.ul>

      <Reveal className="mt-14">
        <a
          href={CONTACT.portfolioUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="group inline-flex items-center gap-3 text-lg font-medium"
        >
          <span className="border-b border-ink pb-1 transition-colors group-hover:border-ink-faint">
            Больше примеров карточек и разборов — в Telegram
          </span>
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>
      </Reveal>
    </Section>
  )
}
