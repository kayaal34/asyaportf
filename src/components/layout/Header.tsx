import { useEffect, useState } from 'react'
import { useContent } from '../../content/store'
import { cn } from '../../lib/cn'
import { Logo } from '../Logo'

export function Header() {
  const { nav: NAV } = useContent()
  const [condensed, setCondensed] = useState(false)

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="reveal fixed inset-x-0 top-0 z-50" style={{ animationDelay: '0.15s' }}>
      <div
        className={cn(
          'mx-auto flex max-w-[80rem] items-center gap-6 px-6 transition-[margin,padding,background-color,border-color,border-radius,box-shadow] duration-300 ease-out sm:px-10',
          condensed
            ? 'my-2 rounded-full border border-line bg-paper-raised/95 py-2.5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.4)] backdrop-blur'
            : 'my-0 border border-transparent py-5',
        )}
      >
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-ink transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4 sm:gap-6">
          <a
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full border border-ink px-4 py-2 text-sm font-medium transition-colors hover:bg-ink hover:text-paper"
          >
            Оставить заявку
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              →
            </span>
          </a>

          <a href="/" aria-label="На главную" className="group block shrink-0">
            <Logo className="h-4 w-auto text-ink transition-opacity group-hover:opacity-60 sm:h-[1.1rem]" />
          </a>
        </div>
      </div>
    </header>
  )
}
