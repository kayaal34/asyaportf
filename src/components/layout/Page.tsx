import { useEffect, type ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { ScrollProgress } from '../ScrollProgress'

/** Standard chrome for every non-landing route. Scrolls to top on mount. */
export function Page({ children }: { children: ReactNode }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="relative min-h-screen bg-paper text-ink">
      <ScrollProgress />
      <Header />
      <div className="lg:pl-64">
        <main className="pt-28 sm:pt-32 lg:pt-24">{children}</main>
        <Footer />
      </div>
    </div>
  )
}

/** Page-opening band: kicker + big title + optional lead. */
export function PageHead({
  kicker,
  title,
  lead,
}: {
  kicker: string
  title: string
  lead?: string
}) {
  return (
    <header className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 text-center sm:px-10">
      <p className="reveal text-xs font-medium tracking-[0.24em] text-ink-faint uppercase">
        {kicker}
      </p>
      <h1 className="reveal mt-6 text-display text-balance" style={{ animationDelay: '0.05s' }}>
        {title}
      </h1>
      {lead && (
        <p
          className="reveal mt-7 text-lead text-ink-soft text-balance"
          style={{ animationDelay: '0.1s' }}
        >
          {lead}
        </p>
      )}
    </header>
  )
}
