import { type ReactNode } from 'react'
import { cn } from '../lib/cn'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Stagger delay in seconds. */
  delay?: number
  blur?: boolean
  as?: 'div' | 'li' | 'span'
}

/**
 * Soft fade + rise entrance. Pure CSS keyframe (`reveal` utility, fill-mode
 * both) so the content is guaranteed to end fully visible in every rendering
 * context — no IntersectionObserver, no animation-library frame loop to stall.
 * Respects prefers-reduced-motion via the utility's media query.
 */
export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const Tag = as
  return (
    <Tag className={cn('reveal', className)} style={{ animationDelay: `${delay}s` }}>
      {children}
    </Tag>
  )
}
