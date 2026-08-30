import { useEffect, useState } from 'react'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import { CountUp } from './CountUp'
import { INTRO_DONE_EVENT } from './Intro'
import { Seal } from './Seal'
import { PlatformMark } from './Platforms'
import { useContent } from '../content/store'
import { springSoft, springSnappy } from '../lib/motion'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const word: Variants = {
  hidden: { opacity: 0, y: '0.5em', filter: 'blur(10px)' },
  show: { opacity: 1, y: '0em', filter: 'blur(0px)', transition: springSoft },
}

const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: springSoft },
}

export function Hero() {
  const { hero: HERO, metrics: METRICS, contact: CONTACT, sealText, platforms } = useContent()
  const reduceMotion = useReducedMotion()
  const [ready, setReady] = useState(false)

  // Hold the entrance until the intro curtain starts lifting, so the hero
  // animates into view rather than sitting finished behind it.
  useEffect(() => {
    if (reduceMotion) {
      setReady(true)
      return
    }
    let seen = false
    try {
      seen = sessionStorage.getItem('asy-intro-seen') === '1'
    } catch {
      seen = false
    }
    if (seen) {
      setReady(true)
      return
    }
    const reveal = () => setReady(true)
    window.addEventListener(INTRO_DONE_EVENT, reveal)
    const safety = window.setTimeout(reveal, 2200)
    return () => {
      window.removeEventListener(INTRO_DONE_EVENT, reveal)
      window.clearTimeout(safety)
    }
  }, [reduceMotion])

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center px-6 pt-32 pb-20 sm:px-10 sm:pt-40"
    >
      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, rotate: -25 }}
        animate={reduceMotion || ready ? { opacity: 1, rotate: 0 } : undefined}
        transition={{ ...springSoft, delay: 0.3 }}
        className="pointer-events-none absolute top-32 right-8 hidden text-ink/70 lg:block xl:right-16"
      >
        <Seal text={sealText} className="h-28 w-28 xl:h-32 xl:w-32" />
      </motion.div>

      <motion.div
        variants={container}
        initial={reduceMotion ? undefined : 'hidden'}
        animate={reduceMotion ? undefined : ready ? 'show' : 'hidden'}
        className="mx-auto w-full max-w-[80rem]"
      >
        <motion.p
          variants={rise}
          className="text-xs font-medium tracking-[0.24em] text-ink-faint uppercase"
        >
          {HERO.kicker}
        </motion.p>

        <h1 className="mt-8 text-display">
          {HERO.headline.map((line, lineIndex) => (
            <span key={lineIndex} className="block overflow-hidden">
              {line.split(' ').map((w, wordIndex) => (
                <motion.span
                  key={`${lineIndex}-${wordIndex}`}
                  variants={word}
                  className="mr-[0.22em] inline-block"
                >
                  {w}
                </motion.span>
              ))}
            </span>
          ))}
          <motion.span variants={rise} className="mt-3 block text-accent">
            {HERO.emphasis}
          </motion.span>
        </h1>

        <motion.p variants={rise} className="mt-10 max-w-2xl text-lead text-ink-soft text-balance">
          {HERO.sub}
        </motion.p>

        <motion.div variants={rise} className="mt-12">
          <motion.a
            href={CONTACT.telegramUrl}
            target="_blank"
            rel="noreferrer noopener"
            whileHover={reduceMotion ? undefined : { scale: 1.03 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            transition={springSnappy}
            className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-base font-medium text-paper"
          >
            Обсудить проект
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </motion.a>
        </motion.div>

        {platforms.length > 0 && (
          <motion.div
            variants={rise}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2"
          >
            <span className="text-xs font-medium tracking-[0.2em] text-ink-faint uppercase">
              Площадки
            </span>
            {platforms.map((p) => (
              <PlatformMark key={p} name={p} />
            ))}
          </motion.div>
        )}

        {/* Headline metrics */}
        <motion.dl
          variants={rise}
          className="mt-20 grid grid-cols-1 gap-x-10 gap-y-12 border-t border-line pt-12 sm:grid-cols-3"
        >
          {METRICS.map((metric) => (
            <div key={metric.label} className="flex flex-col">
              <dt className="text-xs font-medium tracking-[0.18em] text-ink-faint uppercase">
                {metric.label}
              </dt>
              <dd className="mt-5 font-display text-figure font-extrabold tracking-[-0.04em]">
                <CountUp value={metric.to} decimals={metric.decimals} suffix={metric.unit} />
              </dd>
              <p className="mt-4 flex items-center gap-3 text-sm text-ink-soft">
                {metric.single ? (
                  <span>ключевой драйвер роста</span>
                ) : (
                  <>
                    <span className="tabular-nums">
                      было{' '}
                      {metric.from.toLocaleString('ru-RU', {
                        minimumFractionDigits: metric.decimals,
                        maximumFractionDigits: metric.decimals,
                      })}
                      {metric.unit ? ` ${metric.unit}` : ''}
                    </span>
                    {metric.delta && (
                      <span className="rounded-full border border-accent px-2 py-0.5 text-xs font-medium text-accent">
                        {metric.delta}
                      </span>
                    )}
                  </>
                )}
              </p>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0 }}
        animate={reduceMotion || ready ? { opacity: 1 } : undefined}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <span className="motion-safe:animate-nudge block text-xs tracking-[0.2em] text-ink-faint uppercase">
          Листать
        </span>
      </motion.div>
    </section>
  )
}
