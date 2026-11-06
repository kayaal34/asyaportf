import { type CSSProperties, type ReactNode, type RefObject } from 'react'
import { cn } from '../lib/cn'
import { useReveal } from '../lib/inview'

export type RevealVariant = 'up' | 'fade' | 'blur' | 'scale' | 'left' | 'right' | 'pop'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Stagger delay in seconds. */
  delay?: number
  variant?: RevealVariant
  /** Also reveal `.sr-c` descendants (each with its own `--d` delay). */
  group?: boolean
  as?: 'div' | 'li' | 'span' | 'figure' | 'article' | 'ul'
  style?: CSSProperties
}

/**
 * Scroll-triggered entrance. A shared IntersectionObserver flags the element
 * with `data-shown` when it enters the viewport and CSS transitions animate it
 * in. Content is only hidden when `html.motion` is set (observer available) and
 * the user hasn't asked for reduced motion, so it can never get stuck invisible.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  variant = 'up',
  group = false,
  as = 'div',
  style,
}: RevealProps) {
  const ref = useReveal<HTMLElement>()
  const Tag = as as 'div'
  return (
    <Tag
      ref={ref as RefObject<HTMLDivElement>}
      data-sr={variant}
      className={cn(group ? 'sr-group' : 'sr', className)}
      style={{ ...style, ['--d' as string]: `${delay}s` }}
    >
      {children}
    </Tag>
  )
}
