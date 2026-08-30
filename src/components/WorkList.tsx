import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'
import { Section } from './Section'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'
import { useContent } from '../content/store'
import { springSnappy, springSoft } from '../lib/motion'

export function WorkList() {
  const { work: WORK, workIntro: WORK_INTRO, contact: CONTACT } = useContent()
  const reduceMotion = useReducedMotion()
  const [hovered, setHovered] = useState<number | null>(null)
  const [finePointer, setFinePointer] = useState(false)
  const listRef = useRef<HTMLUListElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const px = useSpring(x, springSnappy)
  const py = useSpring(y, springSnappy)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    const update = () => setFinePointer(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  function handleMove(event: PointerEvent<HTMLUListElement>) {
    const rect = listRef.current?.getBoundingClientRect()
    if (!rect) return
    x.set(event.clientX - rect.left)
    y.set(event.clientY - rect.top)
  }

  const showPreview = finePointer && !reduceMotion && hovered !== null

  return (
    <Section id="work">
      <SectionHeading kicker={WORK_INTRO.kicker} title={WORK_INTRO.title} />
      <Reveal className="mt-6 max-w-2xl" delay={0.05}>
        <p className="text-lead text-ink-soft">{WORK_INTRO.body}</p>
      </Reveal>

      <div className="relative mt-14 lg:mt-20">
        <ul
          ref={listRef}
          onPointerMove={handleMove}
          onPointerLeave={() => setHovered(null)}
          className="border-t border-line"
        >
          {WORK.map((item, index) => (
            <li key={item.title} className="border-b border-line">
              <a
                href={CONTACT.portfolioUrl}
                target="_blank"
                rel="noreferrer noopener"
                onPointerEnter={() => setHovered(index)}
                onFocus={() => setHovered(index)}
                onBlur={() => setHovered(null)}
                className="group flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:gap-8 lg:py-9"
              >
                {/* Inline thumbnail — the preview for touch / coarse pointers */}
                <img
                  src={item.image}
                  alt=""
                  loading="lazy"
                  className="h-40 w-32 shrink-0 rounded-xl border border-line object-cover sm:hidden"
                />

                <span className="flex flex-1 items-baseline gap-4">
                  <span
                    className="font-display text-work font-extrabold text-ink transition-transform duration-300 ease-out group-hover:translate-x-2 motion-reduce:transform-none"
                  >
                    {item.title}
                  </span>
                </span>

                <span className="flex flex-col gap-1 sm:items-end sm:text-right">
                  <span className="text-xs font-medium tracking-[0.18em] text-ink-faint uppercase">
                    {item.discipline}
                  </span>
                  <span className="max-w-xs text-sm text-ink-soft sm:max-w-[16rem]">{item.note}</span>
                </span>

                <span
                  aria-hidden
                  className="hidden text-xl text-ink-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-ink sm:block"
                >
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* Cursor-following preview (fine pointers only) */}
        <AnimatePresence>
          {showPreview && (
            <motion.div
              key="work-preview"
              className="pointer-events-none absolute left-0 top-0 z-20 hidden sm:block"
              style={{ x: px, y: py }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={springSoft}
            >
              <div className="-translate-x-1/2 -translate-y-1/2">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={WORK[hovered!].image}
                    src={WORK[hovered!].image}
                    alt={`${WORK[hovered!].title} — ${WORK[hovered!].discipline}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="h-[22rem] w-[17.6rem] rounded-2xl border border-line bg-paper-raised object-cover shadow-[0_30px_60px_-20px_rgba(11,11,11,0.28)]"
                  />
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
