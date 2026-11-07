import { useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useContent } from '../../content/store'
import { Reveal } from '../Reveal'
import { MaskWords } from '../fx'

/**
 * The last word. A poster-size call to action, the contact columns in mono,
 * and the name itself set wider than the screen — it rises out of the bottom
 * edge as you arrive.
 */
export function Footer() {
  const { contact, contactSection, credit } = useContent()
  const year = new Date().getFullYear()
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const rise = useTransform(scrollYProgress, [0, 1], ['45%', '0%'])

  return (
    <footer id="contact" className="relative overflow-hidden bg-ink text-paper">
      <div className="px-5 pt-24 sm:px-8 sm:pt-32 lg:px-12 lg:pt-40">
        <div className="mx-auto w-full max-w-[100rem]">
          <p className="font-mono text-[0.7rem] tracking-[0.1em] text-paper/50 uppercase">
            (∞) — Следующий шаг
          </p>
          <Reveal group>
            <h2 className="mt-8 text-[clamp(2.8rem,8.5vw,9.5rem)] leading-[0.88] font-extrabold tracking-[-0.055em] text-balance">
              <MaskWords text="Готовы вырасти в 3 раза за 2–3 месяца?" baseDelay={0.05} accentLast />
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-12 flex flex-wrap items-center gap-6 lg:ml-[25%]">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-4 rounded-full bg-accent px-8 py-5 text-lg font-semibold text-accent-ink transition-transform hover:scale-[1.04] active:scale-95"
            >
              Заказать консультацию
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </Link>
            <span className="flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.06em] text-paper/60 uppercase">
              <span className="size-1.5 animate-blink rounded-full bg-accent" />
              {contactSection.status}
            </span>
          </Reveal>

          <div className="mt-24 grid gap-10 border-t border-paper/15 pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <FooterCol title="Связь">
              <FooterLink href={contact.telegramUrl}>Telegram {contact.telegramHandle}</FooterLink>
              <FooterLink href={`mailto:${contact.email}`}>{contact.email}</FooterLink>
            </FooterCol>
            <FooterCol title="Ещё">
              <FooterLink href={contact.portfolioUrl}>Telegram-канал с кейсами</FooterLink>
              <FooterLink href="/cases">Все кейсы</FooterLink>
              <FooterLink href="/ai">AI-портфолио</FooterLink>
            </FooterCol>
            <FooterCol title="Навигация">
              <FooterLink href="/services">Услуги</FooterLink>
              <FooterLink href="/about">Обо мне</FooterLink>
              <FooterLink href="/contact">Оставить заявку</FooterLink>
            </FooterCol>
          </div>
        </div>
      </div>

      {/* the wordmark, wider than the page, rising out of the floor */}
      <div ref={ref} className="relative mt-16 h-[24vw] overflow-hidden select-none" aria-hidden>
        <motion.div
          style={reduce ? undefined : { y: rise }}
          className="absolute inset-x-0 top-0 text-center font-display text-[34vw] leading-[0.74] font-extrabold tracking-[-0.075em] whitespace-nowrap"
        >
          Ася<span className="text-accent">.</span>
        </motion.div>
      </div>

      {/* bottom line: copyright and the developer credit */}
      <div className="relative border-t border-paper/15 px-5 py-5 sm:px-8 lg:px-12">
        <div className="mx-auto flex w-full max-w-[100rem] flex-wrap items-center justify-between gap-x-6 gap-y-2 font-mono text-[0.66rem] tracking-[0.08em] text-paper/50 uppercase">
          <span>
            © {year} {contact.fullName}
          </span>
          {credit.url ? (
            <a
              href={credit.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-1.5 transition-colors hover:text-paper"
            >
              Designed by
              <span className="text-paper normal-case underline decoration-paper/30 underline-offset-4 transition-colors group-hover:decoration-accent">
                {credit.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
              </span>
              <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
          ) : (
            <span>
              Designed by <span className="text-paper normal-case">{credit.name}</span>
            </span>
          )}
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-mono text-[0.68rem] tracking-[0.1em] text-paper/45 uppercase">{title}</span>
      {children}
    </div>
  )
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  const cls = 'w-fit text-sm text-paper/80 transition-colors hover:text-accent'
  if (href.startsWith('/')) {
    return (
      <Link to={href} className={cls}>
        {children}
      </Link>
    )
  }
  const external = href.startsWith('http')
  return (
    <a href={href} {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})} className={cls}>
      {children}
    </a>
  )
}
