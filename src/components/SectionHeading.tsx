import { motion, useReducedMotion, type Variants } from 'motion/react'
import { Reveal } from './Reveal'
import { springSoft, viewportOnce } from '../lib/motion'
import { cn } from '../lib/cn'

type SectionHeadingProps = {
  kicker: string
  title: string
  className?: string
  /** Use on dark sections so the kicker keeps enough contrast. */
  invert?: boolean
}

const maskUp: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%' },
}

/**
 * Small tracked kicker over an oversized display title. The title slides up from
 * behind a clip edge — the classic editorial reveal — while the kicker fades.
 */
export function SectionHeading({ kicker, title, className, invert = false }: SectionHeadingProps) {
  const reduceMotion = useReducedMotion()

  return (
    <div className={cn('max-w-4xl', className)}>
      <Reveal>
        <p
          className={cn(
            'text-xs font-medium tracking-[0.22em] uppercase',
            invert ? 'text-paper/45' : 'text-ink-faint',
          )}
        >
          {kicker}
        </p>
      </Reveal>

      <h2 className="mt-6 text-headline text-balance">
        {reduceMotion ? (
          title
        ) : (
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span
              className="block"
              variants={maskUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              transition={{ ...springSoft, delay: 0.05 }}
            >
              {title}
            </motion.span>
          </span>
        )}
      </h2>
    </div>
  )
}
