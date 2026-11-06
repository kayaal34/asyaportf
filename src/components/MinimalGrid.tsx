import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'motion/react'
import { Section } from './Section'
import { SectionHeading } from './SectionHeading'
import { useContent } from '../content/store'
import { cn } from '../lib/cn'
import { EXPERTISE_ICONS } from './ExpertiseIcons'
import type { ExpertiseItem } from '../content/site'
import { ExpertiseArt } from './ExpertiseArt'
import { Reveal } from './Reveal'

/**
 * Split-screen story. On desktop the first column pins a giant counter and a
 * table of contents; as each discipline on the right crosses the middle of the
 * screen it lights up and the counter rolls over to its number.
 */
export function MinimalGrid() {
  const { expertise: EXPERTISE, expertiseIntro: EXPERTISE_INTRO } = useContent()
  const [active, setActive] = useState(0)
  const n = EXPERTISE.length
  if (n === 0) return null
  const current = EXPERTISE[Math.min(active, n - 1)]

  return (
    <Section id="expertise">
      <SectionHeading kicker={EXPERTISE_INTRO.kicker} title={EXPERTISE_INTRO.title} />

      <div className="mt-16 grid lg:mt-24 lg:grid-cols-4 lg:gap-8">
        {/* pinned counter */}
        <div className="hidden lg:block">
          <div className="sticky top-28 flex h-[calc(100svh-9rem)] flex-col justify-between pb-6">
            <div>
              <div className="flex items-start gap-2">
                <div className="relative h-[0.82em] overflow-hidden font-display text-[clamp(7rem,11vw,12rem)] leading-[0.82] font-bold tracking-[-0.07em]">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={current.index}
                      className="block"
                      initial={{ y: '100%' }}
                      animate={{ y: '0%' }}
                      exit={{ y: '-100%' }}
                      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                    >
                      {current.index}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="mt-2 font-mono text-xs text-ink-faint">/{String(n).padStart(2, '0')}</span>
              </div>
              <div className="mt-6 h-px w-full bg-line">
                <motion.div
                  className="h-px origin-left bg-accent"
                  animate={{ scaleX: (active + 1) / n }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>

            <ol className="flex flex-col gap-2 font-mono text-[0.7rem] tracking-[0.06em] uppercase">
              {EXPERTISE.map((item, i) => (
                <li
                  key={item.index}
                  className={cn(
                    'flex gap-3 transition-colors duration-500',
                    i === active ? 'text-ink' : 'text-ink-faint',
                  )}
                >
                  <span className={cn('transition-colors', i === active && 'text-accent')}>{item.index}</span>
                  {item.title}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* disciplines */}
        <div className="lg:col-span-3">
          {EXPERTISE.map((item, i) => (
            <Discipline key={item.index} item={item} active={i === active} onActive={() => setActive(i)} />
          ))}
          <div className="border-t border-line" />
        </div>
      </div>
    </Section>
  )
}

function Discipline({
  item,
  active,
  onActive,
}: {
  item: ExpertiseItem
  active: boolean
  onActive: () => void
}) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' })
  useEffect(() => {
    if (inView) onActive()
  }, [inView, onActive])
  const Icon = EXPERTISE_ICONS[item.index]

  return (
    <article
      ref={ref}
      className={cn(
        'grid gap-6 border-t border-line py-12 transition-opacity duration-700 sm:grid-cols-[4.5rem_minmax(0,1fr)] lg:min-h-[66vh] lg:grid-cols-[4rem_minmax(0,1fr)_minmax(0,0.95fr)] lg:content-center lg:items-center lg:gap-10 lg:py-16',
        active ? 'lg:opacity-100' : 'lg:opacity-25',
      )}
    >
      <div className="flex items-center gap-4 sm:flex-col sm:items-start">
        <span className="font-mono text-xs text-accent">({item.index})</span>
        {item.image ? (
          <span className="size-14 overflow-hidden rounded-full border border-line">
            <img src={item.image} alt="" className="size-full object-cover" />
          </span>
        ) : Icon ? (
          <span className="grid size-14 place-items-center rounded-full border border-line text-ink">
            <Icon />
          </span>
        ) : null}
      </div>
      <div>
        <h3 className="text-[clamp(2rem,3.6vw,3.75rem)] leading-[0.95] font-extrabold tracking-[-0.045em] text-balance">
          {item.title}
        </h3>
        <p className="mt-6 max-w-xl text-lead text-ink-soft">{item.body}</p>
      </div>
      <Reveal group className="max-w-md sm:col-start-2 lg:col-start-auto lg:max-w-none">
        <div className="rounded-sm border border-line bg-paper-raised/70 p-5 sm:p-6">
          <ExpertiseArt index={item.index} />
        </div>
      </Reveal>
    </article>
  )
}
