import { Link } from 'react-router-dom'
import { CountUp } from './CountUp'
import { PlatformMark } from './Platforms'
import { useContent } from '../content/store'

/** CSS entrance helper: `reveal` class + a staggered delay. */
function reveal(delay: number) {
  return { className: 'reveal', style: { animationDelay: `${delay}s` } }
}

export function Hero() {
  const { hero: HERO, metrics: METRICS, platforms } = useContent()
  let idx = 0

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col bg-paper">
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 pt-28 pb-28 text-center sm:pt-32 sm:pb-32 lg:pt-16">
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

        <div {...reveal(0.44)} className="mt-9 flex flex-wrap items-center justify-center gap-3">
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
          <div {...reveal(0.5)} className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <span className="text-xs tracking-[0.2em] text-ink-faint uppercase">Площадки</span>
            {platforms.map((p) => (
              <PlatformMark key={p} name={p} />
            ))}
          </div>
        )}
      </div>

      <dl
        className="reveal relative z-10 border-t border-line"
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
