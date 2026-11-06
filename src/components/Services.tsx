import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { Section } from './Section'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'
import { useContent } from '../content/store'
import { useIsDesktop } from '../lib/inview'
import type { SiteContent } from '../content/site'
import { cn } from '../lib/cn'

type ServiceItem = SiteContent['services']['items'][number]

/**
 * Desktop: the service cards pin and stack — each new card slides up over the
 * previous one, which shrinks back and dims like a deck being dealt.
 * Smaller screens: a plain staggered list (tall cards can't pin there).
 */
export function Services() {
  const { services } = useContent()
  const ref = useRef<HTMLDivElement>(null)
  const desktop = useIsDesktop()
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  if (services.items.length === 0) return null

  const stack = desktop && !reduce
  const n = services.items.length

  return (
    <Section id="services">
      <SectionHeading kicker={services.intro.kicker} title={services.intro.title} />

      <div ref={ref} className="mt-12 flex flex-col gap-6 lg:mt-16">
        {services.items.map((item, i) =>
          stack ? (
            <StackCard key={`${item.title}-${i}`} item={item} i={i} n={n} progress={scrollYProgress} />
          ) : (
            <Reveal key={`${item.title}-${i}`} variant="scale" delay={0.05}>
              <Card item={item} i={i} />
            </Reveal>
          ),
        )}
      </div>
    </Section>
  )
}

function StackCard({
  item,
  i,
  n,
  progress,
}: {
  item: ServiceItem
  i: number
  n: number
  progress: MotionValue<number>
}) {
  const depth = n - 1 - i
  const scale = useTransform(progress, [i / n, 1], [1, 1 - depth * 0.045])
  const dim = useTransform(progress, [i / n, 1], [0, depth * 0.07])

  return (
    <div className="sticky" style={{ top: `calc(5.5rem + ${i * 2}rem)` }}>
      <motion.div style={{ scale }} className="origin-top">
        <Card item={item} i={i} dim={dim} />
      </motion.div>
    </div>
  )
}

/** Colour-blocked deck: paper, ink, signal orange, paper… */
const TONES = [
  { card: 'bg-paper-raised text-ink border-line', soft: 'text-ink-soft', faint: 'text-ink-faint', rule: 'border-line', mark: 'text-accent' },
  { card: 'bg-ink text-paper border-ink', soft: 'text-paper/65', faint: 'text-paper/45', rule: 'border-paper/15', mark: 'text-accent' },
  { card: 'bg-accent text-accent-ink border-accent', soft: 'text-accent-ink/75', faint: 'text-accent-ink/55', rule: 'border-accent-ink/20', mark: 'text-accent-ink' },
]

function Card({ item, i, dim }: { item: ServiceItem; i: number; dim?: MotionValue<number> }) {
  const t = TONES[i % TONES.length]
  return (
    <article
      className={cn(
        'relative grid overflow-hidden rounded-sm border p-7 shadow-[0_-24px_60px_-40px_rgba(0,0,0,0.45)] sm:p-10 lg:min-h-[26rem] lg:grid-cols-4 lg:gap-8 lg:p-12',
        t.card,
      )}
    >
      <div className="flex flex-col lg:col-span-2">
        <span className={cn('font-mono text-xs tracking-[0.08em]', t.mark)}>
          ({String(i + 1).padStart(2, '0')}) — услуга
        </span>
        <h3 className="mt-5 text-[clamp(2rem,4.2vw,4rem)] leading-[0.92] font-extrabold tracking-[-0.045em]">
          {item.title}
        </h3>
        <p className={cn('mt-4 max-w-md text-base', t.soft)}>{item.forWhom}</p>
        <div className="mt-8 lg:mt-auto lg:pt-10">
          <p className="text-base font-semibold">{item.result}</p>
          <p className={cn('mt-1 font-mono text-xs tracking-[0.04em] uppercase', t.faint)}>{item.price}</p>
        </div>
      </div>

      <ul className={cn('mt-8 flex flex-col border-t lg:col-span-2 lg:mt-0', t.rule)}>
        {item.includes.map((line, li) => (
          <li key={line} className={cn('flex gap-4 border-b py-3.5 text-[0.98rem]', t.rule)}>
            <span aria-hidden className={cn('pt-0.5 font-mono text-[0.68rem]', t.faint)}>
              {String(li + 1).padStart(2, '0')}
            </span>
            {line}
          </li>
        ))}
      </ul>

      {dim && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-black"
          style={{ opacity: dim }}
        />
      )}
    </article>
  )
}
