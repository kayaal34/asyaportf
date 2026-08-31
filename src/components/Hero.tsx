import { CountUp } from './CountUp'
import { Seal } from './Seal'
import { PlatformMark } from './Platforms'
import { useContent } from '../content/store'
import { cn } from '../lib/cn'

/** CSS entrance helper: `reveal` class + a staggered delay. */
function reveal(delay: number) {
  return { className: 'reveal', style: { animationDelay: `${delay}s` } }
}

const LINE_PATH = 'M0 480 C 240 470 320 440 470 360 S 760 190 940 150 S 1120 60 1200 24'

export function Hero() {
  const { hero: HERO, metrics: METRICS, sealText, platforms } = useContent()

  let idx = 0
  const wordCount = HERO.headline.reduce((n, l) => n + l.split(' ').length, 0)

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-paper">
      {/* Rising line — the "scaling" motif. Draws itself as the page scrolls
          (CSS scroll timeline); statically drawn where that isn't supported. */}
      <svg
        aria-hidden
        viewBox="0 0 1200 520"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[62vh] w-full select-none"
      >
        <defs>
          <linearGradient id="heroLineFill" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0.14" />
          </linearGradient>
        </defs>
        <path d={`${LINE_PATH} L 1200 520 L 0 520 Z`} fill="url(#heroLineFill)" opacity="0.9" />
        <path
          className="hero-line-draw"
          d={LINE_PATH}
          pathLength={1}
          fill="none"
          stroke="var(--accent)"
          strokeOpacity="0.5"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>

      <div
        {...reveal(0.6)}
        className="pointer-events-none absolute top-24 right-6 z-20 text-ink/40 sm:top-28 sm:right-10 lg:right-14"
      >
        <Seal text={sealText} className="h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[80rem] flex-1 flex-col justify-center px-6 pt-32 pb-32 sm:px-10 sm:pt-36 sm:pb-40">
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
                const d = 0.14 + idx++ * 0.09
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

        <p
          {...reveal(0.16 + wordCount * 0.09)}
          className="mt-6 text-work font-extrabold text-accent"
        >
          {HERO.emphasis}
        </p>

        <p {...reveal(0.34)} className="mt-8 max-w-xl text-lead text-ink-soft text-balance">
          {HERO.sub}
        </p>

        <div {...reveal(0.44)} className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="/cases"
            className="group inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-base font-semibold text-accent-ink transition-transform hover:scale-[1.03] active:scale-95"
          >
            Кейс Sandli
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-ink px-6 py-4 text-base font-medium transition-colors hover:bg-ink hover:text-paper"
          >
            Записаться на консультацию
          </a>
        </div>
      </div>

      <dl
        className={cn(
          'relative z-10 border-t border-line bg-paper/70 backdrop-blur-sm',
          'reveal',
        )}
        style={{ animationDelay: '0.9s' }}
      >
        <div className="mx-auto grid max-w-[80rem] grid-cols-1 gap-x-10 gap-y-3 px-6 py-5 sm:grid-cols-3 sm:px-10">
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
