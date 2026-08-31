import { Link } from 'react-router-dom'
import { CountUp } from './CountUp'
import { Seal } from './Seal'
import { PlatformMark } from './Platforms'
import { useContent } from '../content/store'

/** CSS entrance helper: `reveal` class + a staggered delay. */
function reveal(delay: number) {
  return { className: 'reveal', style: { animationDelay: `${delay}s` } }
}

const LINE_PATH = 'M0 480 C 240 470 320 440 470 360 S 760 190 940 150 S 1120 60 1200 24'

export function Hero() {
  const { hero: HERO, metrics: METRICS, sealText, platforms } = useContent()
  let idx = 0

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-paper">
      <svg
        aria-hidden
        viewBox="0 0 1200 520"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[58vh] w-full select-none"
      >
        <defs>
          <linearGradient id="heroLineFill" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        <path d={`${LINE_PATH} L 1200 520 L 0 520 Z`} fill="url(#heroLineFill)" />
        <path
          className="hero-line-draw"
          d={LINE_PATH}
          pathLength={1}
          fill="none"
          stroke="var(--accent)"
          strokeOpacity="0.45"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      <div
        {...reveal(0.6)}
        className="pointer-events-none absolute top-24 right-6 z-20 text-ink/35 sm:top-28 sm:right-10 lg:right-14"
      >
        <Seal text={sealText} className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 pt-32 pb-28 text-center sm:pt-36 sm:pb-32">
        <p
          {...reveal(0.05)}
          className="text-xs font-medium tracking-[0.26em] text-ink-faint uppercase"
        >
          {HERO.kicker}
        </p>

        <h1 className="mt-7 text-display">
          {HERO.headline.map((line, li) => (
            <span
              key={li}
              className={`block overflow-hidden pb-[0.06em] ${li > 0 ? 'text-accent' : ''}`}
            >
              {line.split(' ').map((w) => {
                const d = 0.14 + idx++ * 0.07
                return (
                  <span
                    key={w + d}
                    className="reveal mr-[0.18em] inline-block"
                    style={{ animationDelay: `${d}s` }}
                  >
                    {w}
                  </span>
                )
              })}
            </span>
          ))}
        </h1>

        <p {...reveal(0.36)} className="mt-7 text-lead text-ink-soft text-balance">
          {HERO.sub}
        </p>

        <p
          {...reveal(0.42)}
          className="mt-4 text-xs font-medium tracking-[0.16em] text-ink-faint uppercase"
        >
          {HERO.emphasis}
        </p>

        <div
          {...reveal(0.44)}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-accent-ink transition-transform hover:scale-[1.03] active:scale-95"
          >
            Записаться на консультацию <span aria-hidden>→</span>
          </Link>
          <Link
            to="/cases"
            className="inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3.5 text-base font-medium transition-colors hover:bg-ink hover:text-paper"
          >
            Смотреть кейсы
          </Link>
        </div>

        {platforms.length > 0 && (
          <div
            {...reveal(0.5)}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
          >
            <span className="text-xs tracking-[0.2em] text-ink-faint uppercase">Площадки</span>
            {platforms.map((p) => (
              <PlatformMark key={p} name={p} />
            ))}
          </div>
        )}
      </div>

      <dl
        className="reveal relative z-10 border-t border-line bg-paper/70 backdrop-blur-sm"
        style={{ animationDelay: '0.9s' }}
      >
        <div className="mx-auto grid max-w-[80rem] grid-cols-1 gap-x-10 gap-y-3 px-6 py-4 text-center sm:grid-cols-3 sm:px-10 sm:text-left">
          {METRICS.map((metric) => (
            <div key={metric.label} className="flex items-baseline justify-center gap-2.5 sm:justify-start">
              <dd className="font-display text-lg font-extrabold tracking-[-0.02em] sm:text-xl">
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
