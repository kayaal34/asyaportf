import { useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { Magnetic } from './Magnetic'
import { Reveal } from './Reveal'
import { useContent } from '../content/store'

export function ContactCTA() {
  const {
    channels: CHANNELS,
    contact: CONTACT,
    contactSection: CONTACT_SECTION,
    credit: CREDIT,
  } = useContent()
  const reduceMotion = useReducedMotion()
  const year = new Date().getFullYear()
  const [copied, setCopied] = useState(false)

  const primary = CHANNELS.find((c) => c.primary)
  const secondary = CHANNELS.filter((c) => !c.primary)

  async function copyHandle() {
    try {
      await navigator.clipboard.writeText(CONTACT.telegramHandle)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked — the link still works */
    }
  }

  return (
    <footer id="contact" className="relative overflow-hidden px-6 pt-28 pb-12 sm:px-10 sm:pt-36">
      <div className="mx-auto w-full max-w-[80rem]">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.24em] text-ink-faint uppercase">
            {CONTACT_SECTION.kicker}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 text-headline text-balance">{CONTACT_SECTION.title}</h2>
        </Reveal>

        <div className="mt-12 flex flex-col gap-6 border-t border-line pt-10 md:flex-row md:items-start md:justify-between">
          <Reveal>
            <p className="flex items-center gap-3 text-lg font-extrabold tracking-[-0.02em] sm:text-xl">
              <span className="relative flex size-2.5">
                {!reduceMotion && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
                )}
                <span className="relative inline-flex size-2.5 rounded-full bg-accent" />
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

        {/* Primary channel — oversized magnetic handle */}
        {primary && (
          <Reveal className="mt-16 mb-12 flex flex-col items-center sm:mt-24">

            <span className="mb-5 text-xs tracking-[0.24em] text-ink-faint uppercase">
              {CONTACT_SECTION.cta}
            </span>
            <Magnetic
              href={primary.href}
              strength={0.28}
              innerStrength={0.12}
              ariaLabel={`Написать ${primary.value} в Telegram`}
            >
              <span className="group inline-flex items-center gap-3 font-display text-mega font-extrabold lowercase sm:gap-5">
                {primary.value}
                <span aria-hidden className="text-accent">
                  ↗
                </span>
              </span>
            </Magnetic>
            <button
              type="button"
              onClick={copyHandle}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-xs tracking-wide text-ink-soft transition-colors hover:border-line-strong hover:text-ink"
            >
              {copied ? 'скопировано' : 'копировать'}
              <span aria-hidden>{copied ? '✓' : '⧉'}</span>
            </button>
          </Reveal>
        )}

        {/* Secondary channels */}
        <div className="border-t border-line">
          {secondary.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex flex-col gap-1 border-b border-line py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
            >
              <span className="text-xs font-medium tracking-[0.18em] text-ink-faint uppercase sm:w-56 sm:shrink-0">
                {channel.label}
              </span>
              <span className="flex flex-1 items-baseline gap-3">
                <span className="border-b-2 border-transparent text-lg font-extrabold tracking-[-0.02em] transition-colors duration-300 group-hover:border-accent">
                  {channel.value}
                </span>
                <span className="hidden text-sm text-ink-faint sm:inline">{channel.hint}</span>
              </span>
              <span
                aria-hidden
                className="text-lg text-ink-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
              >
                ↗
              </span>
            </a>
          ))}
        </div>

        <Reveal className="mt-14">
          <p className="mx-auto max-w-lg text-center text-[0.95rem] text-ink-soft text-balance">
            {CONTACT_SECTION.closing}
          </p>
        </Reveal>

        <div className="mt-24 flex flex-col gap-4 border-t border-line pt-8 text-sm text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {CONTACT.name} · менеджер маркетплейсов WB / OZON
          </span>
          <span>
            {CREDIT.label} —{' '}
            {CREDIT.url ? (
              <a
                href={CREDIT.url}
                target="_blank"
                rel="noreferrer noopener"
                className="text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-accent"
              >
                {CREDIT.name}
              </a>
            ) : (
              <span className="text-ink-soft">{CREDIT.name}</span>
            )}
          </span>
        </div>
      </div>
    </footer>
  )
}
