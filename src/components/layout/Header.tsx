import { useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useContent } from '../../content/store'
import { cn } from '../../lib/cn'
import { springSoft } from '../../lib/motion'
import { Logo } from '../Logo'

export function Header() {
  const { contact: CONTACT, nav: NAV } = useContent()
  const { scrollY } = useScroll()
  const [condensed, setCondensed] = useState(false)

  useMotionValueEvent(scrollY, 'change', (value) => {
    setCondensed(value > 24)
  })

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ...springSoft, delay: 0.15 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={cn(
          'mx-auto flex max-w-[80rem] items-center justify-between px-6 transition-[margin,padding,background-color,border-color,border-radius,box-shadow] duration-300 ease-out sm:px-10',
          condensed
            ? 'my-2 rounded-full border border-line bg-paper-raised/95 py-2.5 shadow-[0_8px_30px_-12px_rgba(11,11,11,0.15)]'
            : 'my-0 border border-transparent py-5',
        )}
      >
        <a href="#top" aria-label="В начало страницы" className="group block">
          <Logo className="h-[1.15rem] w-auto text-ink transition-opacity group-hover:opacity-60 sm:h-5" />
        </a>

        <nav className="hidden items-center gap-9 md:flex">
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

        <a
          href={CONTACT.telegramUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="group inline-flex items-center gap-2 rounded-full border border-ink px-4 py-2 text-sm font-medium transition-colors hover:bg-ink hover:text-paper"
        >
          <span className="hidden sm:inline">{CONTACT.telegramHandle}</span>
          <span className="sm:hidden">Telegram</span>
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
            ↗
          </span>
        </a>
      </div>
    </motion.header>
  )
}
