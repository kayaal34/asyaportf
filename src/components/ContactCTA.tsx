import { motion, useReducedMotion } from 'motion/react'
import { Magnetic } from './Magnetic'
import { Reveal } from './Reveal'
import { CONTACT, CONTACT_SECTION } from '../content/site'
import { viewportOnce } from '../lib/motion'

export function ContactCTA() {
  const reduceMotion = useReducedMotion()
  const year = new Date().getFullYear()

  return (
    <footer id="contact" className="relative overflow-hidden px-6 pt-28 pb-12 sm:px-10 sm:pt-36">
      <div className="mx-auto w-full max-w-[80rem]">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.24em] text-ink-faint uppercase">
            {CONTACT_SECTION.kicker}
          </p>
        </Reveal>

        <div className="mt-10 flex flex-col gap-6 border-t border-line pt-10 md:flex-row md:items-start md:justify-between">
          <Reveal>
            <p className="flex items-center gap-3 text-xl font-extrabold tracking-[-0.02em] sm:text-2xl">
              <span className="relative flex size-2.5">
                {!reduceMotion && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-40" />
                )}
                <span className="relative inline-flex size-2.5 rounded-full bg-ink" />
              </span>
              {CONTACT_SECTION.status}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="max-w-md text-[0.975rem] leading-relaxed text-ink-soft">
              {CONTACT_SECTION.statusNote}
            </p>
          </Reveal>
        </div>

        {/* Screen-wide magnetic call to action */}
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 30 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ type: 'spring', stiffness: 80, damping: 22 }}
          className="mt-16 mb-14 flex flex-col items-center sm:mt-24"
        >
          <span className="mb-5 text-xs tracking-[0.24em] text-ink-faint uppercase">
            {CONTACT_SECTION.cta}
          </span>
          <Magnetic
            href={CONTACT.telegramUrl}
            strength={0.28}
            innerStrength={0.12}
            ariaLabel={`Написать ${CONTACT.telegramHandle} в Telegram`}
          >
            <span className="group inline-flex items-center gap-3 font-display text-mega font-extrabold lowercase sm:gap-5">
              {CONTACT.telegramHandle}
              <span aria-hidden className="text-ink-faint">
                ↗
              </span>
            </span>
          </Magnetic>
        </motion.div>

        <Reveal>
          <p className="mx-auto max-w-lg text-center text-[0.95rem] text-ink-soft text-balance">
            {CONTACT_SECTION.closing}
          </p>
        </Reveal>

        <div className="mt-24 flex flex-col gap-6 border-t border-line pt-8 text-sm text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {CONTACT.name} · менеджер маркетплейсов WB / OZON
          </span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a
              href={CONTACT.portfolioUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="transition-colors hover:text-ink"
            >
              Портфолио
            </a>
            <a
              href={CONTACT.resumeUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="transition-colors hover:text-ink"
            >
              Сайт-резюме
            </a>
            <a
              href={CONTACT.telegramUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="transition-colors hover:text-ink"
            >
              {CONTACT.telegramHandle}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
