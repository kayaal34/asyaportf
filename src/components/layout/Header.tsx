import { useEffect, useState, type CSSProperties } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useContent } from '../../content/store'
import { Logo } from '../Logo'
import { ThemeToggle } from '../ThemeToggle'
import { cn } from '../../lib/cn'

/** Kept for older imports; the layout no longer has a side rail. */
export const SIDEBAR_WIDTH = ''

/**
 * A thin full-width bar that inverts whatever it floats over
 * (mix-blend-difference) — black on paper, white on ink, electric on orange.
 * Inline mono nav on desktop; a fullscreen typographic menu everywhere else.
 */
export function Header() {
  const { nav: NAV, contact: CONTACT } = useContent()
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      {/* progressive blur so whatever scrolls under the bar stays out of its way */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[55] h-20 backdrop-blur-md [mask-image:linear-gradient(to_bottom,black_45%,transparent)] lg:h-24"
      />
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[60] text-white mix-blend-difference">
        <div className="flex items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-12 lg:py-5">
          <div className="pointer-events-auto flex items-center gap-8">
            <Link to="/" aria-label="На главную" onClick={() => setOpen(false)}>
              <Logo className="text-2xl text-white [&>span]:text-white" />
            </Link>
          </div>

          <nav className="pointer-events-auto hidden items-center font-mono text-[0.72rem] tracking-[0.06em] uppercase lg:flex">
            {NAV.map((item, i) => {
              const active = pathname === item.href
              return (
                <Link key={item.href} to={item.href} className="group relative px-3 py-2">
                  <span className="mr-1.5 opacity-40">{String(i + 1).padStart(2, '0')}</span>
                  <span className={cn('transition-opacity', active ? 'opacity-100' : 'opacity-75 group-hover:opacity-100')}>
                    {item.label}
                  </span>
                  <span
                    className={cn(
                      'absolute right-3 bottom-1 left-3 h-px origin-left bg-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                    )}
                  />
                </Link>
              )
            })}
          </nav>

          <div className="pointer-events-auto flex items-center gap-3">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="font-mono text-[0.72rem] tracking-[0.08em] uppercase lg:hidden"
              aria-expanded={open}
              aria-label="Меню"
            >
              {open ? '[ Закрыть ]' : '[ Меню ]'}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen menu */}
      <nav
        className={cn(
          'fixed inset-0 z-50 flex flex-col justify-between bg-accent px-5 pt-24 pb-8 text-accent-ink transition-[clip-path] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] sm:px-8 lg:hidden',
          open ? '[clip-path:inset(0_0_0_0)]' : 'pointer-events-none [clip-path:inset(0_0_100%_0)]',
        )}
        aria-hidden={!open}
      >
        <div className="flex flex-col">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className="group flex items-baseline gap-4 border-b border-accent-ink/20 py-3"
              style={{ '--i': i } as CSSProperties}
            >
              <span className="font-mono text-xs opacity-60">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-display text-[clamp(2.4rem,11vw,4.5rem)] leading-none font-extrabold tracking-[-0.05em] transition-[font-style] group-hover:font-serif group-hover:italic">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
        <div className="flex items-end justify-between gap-4 font-mono text-xs uppercase">
          <a href={CONTACT.telegramUrl} target="_blank" rel="noreferrer noopener" tabIndex={open ? 0 : -1}>
            Telegram ↗<br />
            <span className="opacity-60">{CONTACT.telegramHandle}</span>
          </a>
          <Link to="/contact" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1} className="text-right">
            Оставить
            <br />
            заявку →
          </Link>
        </div>
      </nav>
    </>
  )
}
