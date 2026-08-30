import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

type SectionProps = {
  id?: string
  children: ReactNode
  className?: string
  /** Remove the default max-width container (for full-bleed sections). */
  bleed?: boolean
}

/**
 * Vertical rhythm + horizontal gutter primitive. Generous whitespace is the
 * whole point of the layout, so the padding here is deliberately large.
 */
export function Section({ id, children, className, bleed = false }: SectionProps) {
  return (
    <section id={id} className={cn('scroll-mt-24 px-6 py-20 sm:px-10 sm:py-24 lg:py-32', className)}>
      <div className={cn(!bleed && 'mx-auto w-full max-w-[80rem]')}>{children}</div>
    </section>
  )
}
