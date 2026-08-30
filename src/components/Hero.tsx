import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { CountUp } from './CountUp'
import { Seal } from './Seal'
import { PlatformMark } from './Platforms'
import { useContent } from '../content/store'
import { cn } from '../lib/cn'

const HERO_IMAGE = '/asya/portrait.jpg'

/** CSS entrance helper: `reveal` class + a staggered delay. */
function reveal(delay: number) {
  return { className: 'reveal', style: { animationDelay: `${delay}s` } }
}

export function Hero() {
  const { hero: HERO, metrics: METRICS, contact: CONTACT, sealText, platforms } = useContent()
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '-16%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])

  const words = HERO.headline.flatMap((line, li) =>
    line.split(' ').map((w, wi) => ({ w, key: `${li}-${wi}`, line: li })),
  )
  let idx = 0

  return (
    <section ref={ref} id="top" className="relative min-h-[100svh] overflow-hidden bg-paper">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-[6vw] -bottom-[12vh] font-display text-[42vw] leading-none font-extrabold text-ink/[0.05] select-none"
      >
        ×3
      </span>

      <div
        {...reveal(0.6)}
        className="pointer-events-none absolute top-24 right-6 z-20 text-ink/45 sm:top-28 sm:right-10 lg:right-14"
      >
        <Seal text={sealText} className="h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32" />
      </div>

      <div className="mx-auto grid min-h-[100svh] w-full max-w-[88rem] grid-cols-1 items-center gap-10 px-6 pt-32 pb-24 sm:px-10 sm:pt-36 lg:grid-cols-[1.35fr_0.65fr] lg:gap-12 lg:pb-28">
        <div>
          <div {...reveal(0.05)} className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="text-xs font-medium tracking-[0.28em] text-ink-soft uppercase">
              {HERO.kicker}
            </span>
            {platforms.map((p) => (
              <PlatformMark key={p} name={p} />
            ))}
          </div>

          <h1 className="mt-8 text-display">
            {HERO.headline.map((line, li) => (
              <span key={li} className="block overflow-hidden pb-[0.06em]">
                {line.split(' ').map((w) => {
                  const d = 0.12 + idx++ * 0.09
                  return (
                    <span
                      key={w + d}
                      className="reveal mr-[0.16em] inline-block"
                      style={{ animationDelay: `${d}s` }}
                    >
                      {w}
                    </span>
                  )
                })}
              </span>
            ))}
          </h1>

          <p {...reveal(0.12 + words.length * 0.09)} className="mt-6 text-work font-extrabold text-accent">
            {HERO.emphasis}
          </p>

          <p {...reveal(0.3)} className="mt-8 max-w-xl text-lead text-ink-soft text-balance">
            {HERO.sub}
          </p>

          <div {...reveal(0.4)} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={CONTACT.telegramUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-base font-semibold text-accent-ink transition-transform hover:scale-[1.03] active:scale-95"
            >
              Обсудить проект
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
            <span className="text-sm text-ink-faint">{CONTACT.telegramHandle}</span>
          </div>
        </div>

        {/* Portrait panel */}
        <div
          {...reveal(0.35)}
          className="relative hidden aspect-[3/4] w-full overflow-hidden rounded-2xl border border-line lg:block"
        >
          <motion.img
            src={HERO_IMAGE}
            alt={CONTACT.name}
            style={reduceMotion ? undefined : { y: imgY, scale: imgScale }}
            className="absolute inset-0 h-[118%] w-full object-cover object-[center_20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-paper/70 via-transparent to-transparent" />
        </div>
      </div>

      <dl
        className={cn(
          'absolute inset-x-0 bottom-0 z-10 border-t border-line bg-paper/70 backdrop-blur-sm',
          'reveal',
        )}
        style={{ animationDelay: '0.9s' }}
      >
        <div className="mx-auto grid max-w-[88rem] grid-cols-1 gap-x-10 gap-y-3 px-6 py-5 sm:grid-cols-3 sm:px-10">
          {METRICS.map((metric) => (
            <div key={metric.label} className="flex items-baseline gap-3">
              <dd className="font-display text-xl font-extrabold tracking-[-0.03em] sm:text-2xl">
                <CountUp value={metric.to} decimals={metric.decimals} suffix={metric.unit} />
              </dd>
              <dt className="text-xs text-ink-faint">{metric.label}</dt>
            </div>
          ))}
        </div>
      </dl>
    </section>
  )
}
