import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../../content/store'
import { Logo } from '../Logo'

/** Shared with page wrappers so content can offset past the fixed rail. */
export const SIDEBAR_WIDTH = 'lg:pl-64'

/**
 * Navigation lives off to the side, not in a classic top bar — a thin fixed
 * rail on desktop (logo, numbered links, CTA), collapsing to a small top bar
 * + fullscreen overlay on narrower screens.
 */
export function Header() {
  const { nav: NAV, contact: CONTACT, hero: HERO } = useContent()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      {/* Desktop rail */}
      <header className="reveal fixed inset-y-0 left-0 z-50 hidden w-64 flex-col gap-14 overflow-y-auto border-r border-line bg-paper px-8 py-10 lg:flex">
        <div>
          <Link to="/" aria-label="На главную" className="group inline-block">
            <Logo className="text-2xl text-ink transition-opacity group-hover:opacity-60" />
          </Link>

          <nav className="mt-16 flex flex-col gap-1">
            {NAV.map((item, i) => (
              <Link
                key={item.href}
                to={item.href}
                className="group flex items-baseline gap-3 rounded-lg py-2 text-sm text-ink-soft transition-colors hover:text-ink"
              >
                <span className="text-xs text-ink-faint tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="relative">
                  {item.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-ink transition-all duration-300 group-hover:w-full" />
                </span>
              </Link>
            ))}
          </nav>

          <div className="mt-14 max-w-[11rem] border-t border-line pt-6">
            <p className="text-xs leading-relaxed text-ink-faint">{HERO.kicker}</p>
            <p className="mt-2 text-sm font-medium text-ink">{HERO.emphasis}</p>
          </div>
        </div>

        <div>
          <Link
            to="/contact"
            className="group flex items-center justify-between gap-2 rounded-full border border-ink px-4 py-2.5 text-sm font-medium transition-colors hover:bg-ink hover:text-paper"
          >
            Оставить заявку
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
          <a
            href={CONTACT.telegramUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-4 block text-xs tracking-wide text-ink-faint transition-colors hover:text-ink"
          >
            {CONTACT.telegramHandle}
          </a>
        </div>
      </header>

      {/* Mobile / tablet top bar */}
      <header className="reveal fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-line bg-paper/90 px-6 py-4 backdrop-blur lg:hidden">
        <Link to="/" aria-label="На главную" className="block" onClick={() => setOpen(false)}>
          <Logo className="text-xl text-ink" />
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-sm font-medium text-ink"
          aria-expanded={open}
          aria-label="Меню"
        >
          {open ? 'Закрыть' : 'Меню'}
        </button>
      </header>

      {/* Fullscreen overlay nav */}
      <nav
        className={`fixed inset-0 z-40 flex flex-col justify-center gap-2 bg-paper px-8 transition-opacity duration-300 lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        {NAV.map((item, i) => (
          <Link
            key={item.href}
            to={item.href}
            onClick={() => setOpen(false)}
            className="flex items-baseline gap-4 border-b border-line py-4 text-3xl font-extrabold tracking-[-0.02em]"
          >
            <span className="text-sm font-normal text-ink-faint tabular-nums">
              {String(i + 1).padStart(2, '0')}
            </span>
            {item.label}
          </Link>
        ))}
        <a
          href={CONTACT.telegramUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-8 text-sm text-ink-faint"
        >
          {CONTACT.telegramHandle}
        </a>
      </nav>
    </>
  )
}
