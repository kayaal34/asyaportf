import { useRef, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { CountUp } from './CountUp'
import { PlatformMark } from './Platforms'
import { MaskWords, SERIF_ACCENT } from './fx'
import { useIntroDone } from './Intro'
import { useContent } from '../content/store'
import { cn } from '../lib/cn'

const d = (s: number) => ({ '--d': `${s}s` }) as CSSProperties

/**
 * Poster-style opener. The headline is set as big as the viewport allows —
 * first line in heavy grotesk, the rest in italic serif, knocked one grid
 * column to the right. Scrolling pulls the two lines apart sideways.
 */
export function Hero() {
  const { hero: HERO, metrics: METRICS, platforms } = useContent()
  const ready = useIntroDone()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const xLeft = useTransform(scrollYProgress, [0, 1], ['0%', '-22%'])
  const xRight = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const fade = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const spin = useTransform(scrollYProgress, [0, 1], [0, 220])

  const [first, ...rest] = HERO.headline
  const firstWords = (first ?? '').split(/\s+/).filter(Boolean).length
  const year = new Date().getFullYear()

  return (
    <section
      ref={ref}
      id="top"
      data-shown={ready ? '' : undefined}
      className="relative flex min-h-[100svh] flex-col overflow-hidden px-5 pt-28 sm:px-8 lg:px-12 lg:pt-28"
    >
      <div className="mx-auto flex w-full max-w-[100rem] flex-1 flex-col">
        {/* meta row */}
        <div className="grid grid-cols-2 gap-4 font-mono text-[0.68rem] tracking-[0.08em] text-ink-faint uppercase sm:grid-cols-4 lg:gap-8">
          <p className="sr-c" data-sr="fade" style={d(0.05)}>
            {HERO.kicker}
          </p>
          <div className="sr-c hidden items-center gap-4 sm:flex" data-sr="fade" style={d(0.12)}>
            {platforms.map((p) => (
              <PlatformMark key={p} name={p} />
            ))}
          </div>
          <p className="sr-c hidden sm:block" data-sr="fade" style={d(0.18)}>
            <span className="mr-2 inline-block size-1.5 animate-blink rounded-full bg-accent align-middle" />
            {HERO.emphasis}
          </p>
          <p className="sr-c text-right" data-sr="fade" style={d(0.24)}>
            Портфолио · {year}
          </p>
        </div>

        {/* headline */}
        <h1 className="flex flex-1 flex-col justify-center py-10 text-giant font-extrabold">
          <motion.span className="block whitespace-nowrap" style={reduce ? undefined : { x: xLeft }}>
            <MaskWords text={first ?? ''} baseDelay={0.2} step={0.08} />
          </motion.span>
          {rest.map((line, li) => (
            <motion.span
              key={li}
              className="block sm:pl-[12%] lg:pl-[25%]"
              style={reduce ? undefined : { x: xRight }}
            >
              {line.split(/\s+/).filter(Boolean).map((w, wi, arr) => (
                <span key={wi}>
                  <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-top">
                    <span
                      className={cn('sr-c inline-block', SERIF_ACCENT, 'text-[0.96em]')}
                      data-sr="mask"
                      style={d(0.2 + (firstWords + wi) * 0.08)}
                    >
                      {w}
                    </span>
                  </span>
                  {wi < arr.length - 1 ? ' ' : null}
                </span>
              ))}
            </motion.span>
          ))}
        </h1>

        {/* lower band */}
        <motion.div
          style={reduce ? undefined : { opacity: fade }}
          className="grid grid-cols-1 items-end gap-8 pb-8 sm:grid-cols-4 lg:gap-8"
        >
          <p
            className="sr-c max-w-md text-lead text-ink-soft sm:col-span-2"
            data-sr="blur"
            style={d(0.7)}
          >
            {HERO.sub}
          </p>
          <div className="flex flex-col items-start gap-3">
            <Link
              to="/contact"
              className="sr-c group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-transform hover:scale-[1.03] active:scale-95"
              data-sr="up"
              style={d(0.8)}
            >
              Записаться на консультацию
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              to="/cases"
              className="sr-c group inline-flex items-center gap-2 font-mono text-[0.72rem] tracking-[0.08em] uppercase"
              data-sr="up"
              style={d(0.88)}
            >
              <span className="border-b border-ink pb-0.5">Смотреть кейсы</span>
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                ↗
              </span>
            </Link>
          </div>
          <div className="hidden justify-end sm:flex">
            <motion.div style={reduce ? undefined : { rotate: spin }}>
              <Link
                to="/contact"
                aria-label="Записаться на консультацию"
                className="sr-c relative grid size-32 place-items-center rounded-full bg-accent text-accent-ink transition-transform duration-500 hover:scale-110 lg:size-40"
                data-sr="pop"
                style={d(1)}
              >
                <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-badge" aria-hidden>
                  <defs>
                    <path id="badge-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
                  </defs>
                  <text fill="currentColor" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="1">
                    <textPath href="#badge-circle" textLength="230" lengthAdjust="spacing">
                      ЗАПИСАТЬСЯ НА КОНСУЛЬТАЦИЮ · WB · OZON ·
                    </textPath>
                  </text>
                </svg>
                <span aria-hidden className="text-3xl lg:text-4xl">
                  ↗
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* metrics strip */}
      <dl className="sr-c relative -mx-5 border-t border-line sm:-mx-8 lg:-mx-12" data-sr="fade" style={d(1.1)}>
        <div className="mx-auto grid max-w-[100rem] grid-cols-3 px-5 sm:px-8 lg:px-12">
          {METRICS.map((metric, i) => (
            <div
              key={metric.label}
              className={cn('flex flex-col gap-1 py-5 sm:py-6', i > 0 && 'border-l border-line pl-4 sm:pl-8')}
            >
              <dd className="font-display text-xl font-bold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                <CountUp value={metric.to} decimals={metric.decimals} suffix={metric.unit} />
              </dd>
              <dt className="font-mono text-[0.62rem] tracking-[0.06em] text-ink-faint uppercase sm:text-[0.68rem]">
                {metric.label}
              </dt>
            </div>
          ))}
        </div>
      </dl>
    </section>
  )
}
