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
      <main className="pt-32 sm:pt-40">{children}</main>
      <Footer />
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
    <header className="mx-auto w-full max-w-[80rem] px-6 sm:px-10">
      <p className="reveal text-xs font-medium tracking-[0.24em] text-ink-faint uppercase">
        {kicker}
      </p>
      <h1 className="reveal mt-6 max-w-4xl text-display text-balance" style={{ animationDelay: '0.05s' }}>
        {title}
      </h1>
      {lead && (
        <p
          className="reveal mt-8 max-w-2xl text-lead text-ink-soft text-balance"
          style={{ animationDelay: '0.1s' }}
        >
          {lead}
        </p>
      )}
    </header>
  )
}
