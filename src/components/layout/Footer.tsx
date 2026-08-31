import { Link } from 'react-router-dom'
import { useContent } from '../../content/store'
import { Reveal } from '../Reveal'
import { Magnetic } from '../Magnetic'

export function Footer() {
  const { contact, contactSection, credit } = useContent()
  const year = new Date().getFullYear()

  return (
    <footer id="contact" className="border-t border-line px-6 pt-24 pb-12 sm:px-10 sm:pt-32">
      <div className="mx-auto w-full max-w-[80rem]">
        <Reveal>
          <p className="max-w-3xl text-headline text-balance">
            Готовы вырасти в 3 раза за 2–3 месяца?
          </p>
        </Reveal>

        <Reveal delay={0.06} className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-base font-semibold text-accent-ink transition-transform hover:scale-[1.03]"
          >
            Заказать консультацию <span aria-hidden>→</span>
          </Link>
          <span className="text-sm text-ink-faint">{contactSection.status}</span>
        </Reveal>

        <div className="mt-16 grid gap-8 border-t border-line pt-10 sm:grid-cols-3">
          <FooterCol title="Связь">
            <FooterLink href={contact.telegramUrl}>Telegram {contact.telegramHandle}</FooterLink>
            <FooterLink href={`mailto:${contact.email}`}>{contact.email}</FooterLink>
            <FooterLink href={contact.whatsappUrl}>WhatsApp {contact.whatsapp}</FooterLink>
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

        <div className="mt-14 flex justify-center">
          <Magnetic
            href={contact.telegramUrl}
            strength={0.26}
            ariaLabel={`Написать ${contact.telegramHandle}`}
          >
            <span className="font-display text-mega font-extrabold lowercase">
              {contact.telegramHandle}
            </span>
          </Magnetic>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 text-sm text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {contact.fullName} · {contact.role}
          </span>
          <span>
            {credit.label} —{' '}
            {credit.url ? (
              <a
                href={credit.url}
                target="_blank"
                rel="noreferrer noopener"
                className="text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-accent"
              >
                {credit.name}
              </a>
            ) : (
              <span className="text-ink-soft">{credit.name}</span>
            )}
          </span>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-xs font-medium tracking-[0.18em] text-ink-faint uppercase">{title}</span>
      {children}
    </div>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const cls = 'text-sm text-ink-soft transition-colors hover:text-ink'
  if (href.startsWith('/')) {
    return (
      <Link to={href} className={cls}>
        {children}
      </Link>
    )
  }
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      className={cls}
    >
      {children}
    </a>
  )
}
