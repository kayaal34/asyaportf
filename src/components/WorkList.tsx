import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Section } from './Section'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'
import { BeforeAfter } from './BeforeAfter'
import { useContent } from '../content/store'
import { useIsDesktop } from '../lib/inview'
import { cn } from '../lib/cn'
import type { SiteContent } from '../content/site'

type WorkItem = SiteContent['work'][number]

/**
 * Work as a film strip. Desktop: the section pins and vertical scrolling drives
 * the strip sideways. Touch: a native swipe row with snap points.
 */
export function WorkList() {
  const { work: WORK, workIntro: WORK_INTRO, contact: CONTACT } = useContent()
  const desktop = useIsDesktop()
  const reduce = useReducedMotion()

  return (
    <div id="work" className="scroll-mt-24">
      <Section className="pb-0 sm:pb-0 lg:pb-0">
        <SectionHeading kicker={WORK_INTRO.kicker} title={WORK_INTRO.title} />
        <Reveal className="mt-6 max-w-xl lg:ml-[25%]" delay={0.05}>
          <p className="text-lead text-ink-soft">{WORK_INTRO.body}</p>
        </Reveal>
        <BeforeAfter />
      </Section>

      {desktop && !reduce ? (
        <PinnedStrip items={WORK} url={CONTACT.portfolioUrl} />
      ) : (
        <SwipeStrip items={WORK} url={CONTACT.portfolioUrl} />
      )}
    </div>
  )
}

function PinnedStrip({ items, url }: { items: WorkItem[]; url: string }) {
  const outer = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const dist = useRef(0)
  const [height, setHeight] = useState<string>('100svh')

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return
      dist.current = Math.max(0, track.current.scrollWidth - window.innerWidth)
      setHeight(`calc(100svh + ${dist.current}px)`)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (track.current) ro.observe(track.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [items.length])

  const { scrollYProgress } = useScroll({ target: outer, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, (p) => -p * dist.current)
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div ref={outer} className="relative mt-20" style={{ height }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center gap-8 overflow-hidden pt-16">
        <div className="mx-auto flex w-full max-w-[100rem] items-center gap-6 px-12 font-mono text-[0.7rem] tracking-[0.08em] text-ink-faint uppercase">
          <span>Листайте вниз →</span>
          <span className="relative h-px flex-1 bg-line">
            <motion.span className="absolute inset-0 origin-left bg-ink" style={{ scaleX: bar }} />
          </span>
          <span>{String(items.length).padStart(2, '0')} работ</span>
        </div>
        <motion.div ref={track} style={{ x }} className="flex w-max items-start gap-6 px-12">
          {items.map((item, i) => (
            <WorkCard
              key={`${item.title}-${i}`}
              item={item}
              i={i}
              url={url}
              className="w-[min(28vw,calc((100svh-15rem)*0.8))]"
            />
          ))}
          <EndCard url={url} className="w-[min(28vw,calc((100svh-15rem)*0.8))]" />
        </motion.div>
      </div>
    </div>
  )
}

function SwipeStrip({ items, url }: { items: WorkItem[]; url: string }) {
  return (
    <div className="mt-14 pb-24">
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:px-8 [&::-webkit-scrollbar]:hidden">
        {items.map((item, i) => (
          <WorkCard
            key={`${item.title}-${i}`}
            item={item}
            i={i}
            url={url}
            className="w-[76vw] shrink-0 snap-start sm:w-[44vw]"
          />
        ))}
        <EndCard url={url} className="w-[76vw] shrink-0 snap-start sm:w-[44vw]" />
      </div>
      <p className="mt-4 px-5 font-mono text-[0.68rem] tracking-[0.08em] text-ink-faint uppercase sm:px-8">
        ← Листайте →
      </p>
    </div>
  )
}

function WorkCard({ item, i, url, className }: { item: WorkItem; i: number; url: string; className?: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      data-cursor="Смотреть"
      className={cn('group block shrink-0', className)}
    >
      <div className="overflow-hidden rounded-sm bg-paper-raised">
        <img
          src={item.image}
          alt={`${item.title} — ${item.discipline}`}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-line pt-3">
        <h3 className="text-lg font-bold tracking-[-0.03em] sm:text-xl">{item.title}</h3>
        <span className="font-mono text-[0.68rem] text-ink-faint">{String(i + 1).padStart(2, '0')}</span>
      </div>
      <p className="mt-1 font-mono text-[0.66rem] tracking-[0.08em] text-accent uppercase">{item.discipline}</p>
      <p className="mt-2 text-sm text-ink-soft">{item.note}</p>
    </a>
  )
}

function EndCard({ url, className }: { url: string; className?: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      data-cursor="Telegram"
      className={cn(
        'group flex aspect-[4/5] shrink-0 flex-col justify-between rounded-sm bg-accent p-6 text-accent-ink',
        className,
      )}
    >
      <span className="font-mono text-[0.7rem] tracking-[0.08em] uppercase">Ещё работы</span>
      <span className="text-[clamp(2rem,3.4vw,3.4rem)] leading-[0.92] font-extrabold tracking-[-0.05em]">
        Больше карточек и разборов —{' '}
        <span className="font-serif font-medium italic">в Telegram</span>
        <span className="ml-2 inline-block transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2">
          ↗
        </span>
      </span>
    </a>
  )
}
