import { useRef, type ReactNode, type PointerEvent } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'
import { springSnappy } from '../lib/motion'
import { cn } from '../lib/cn'

type MagneticProps = {
  children: ReactNode
  href: string
  className?: string
  /** 0–1: how strongly the element chases the cursor. */
  strength?: number
  /** Also nudge the inner content further for a parallax feel. */
  innerStrength?: number
  ariaLabel?: string
}

/**
 * A link that springs toward the pointer while hovered and snaps back on leave.
 * The signature micro-interaction of high-end Framer templates. Falls back to a
 * plain anchor when the visitor prefers reduced motion.
 */
export function Magnetic({
  children,
  href,
  className,
  strength = 0.35,
  innerStrength = 0,
  ariaLabel,
}: MagneticProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduceMotion = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const ix = useMotionValue(0)
  const iy = useMotionValue(0)

  const sx = useSpring(x, springSnappy)
  const sy = useSpring(y, springSnappy)
  const six = useSpring(ix, springSnappy)
  const siy = useSpring(iy, springSnappy)

  const isExternal = href.startsWith('http')

  function handleMove(event: PointerEvent<HTMLAnchorElement>) {
    const el = ref.current
    if (!el || reduceMotion) return
    const rect = el.getBoundingClientRect()
    const relX = event.clientX - (rect.left + rect.width / 2)
    const relY = event.clientY - (rect.top + rect.height / 2)
    x.set(relX * strength)
    y.set(relY * strength)
    if (innerStrength) {
      ix.set(relX * innerStrength)
      iy.set(relY * innerStrength)
    }
  }

  function reset() {
    x.set(0)
    y.set(0)
    ix.set(0)
    iy.set(0)
  }

  if (reduceMotion) {
    return (
      <a
        href={href}
        className={className}
        aria-label={ariaLabel}
        {...(isExternal ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      aria-label={ariaLabel}
      className={cn('inline-block will-change-transform', className)}
      style={{ x: sx, y: sy }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={springSnappy}
      {...(isExternal ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
    >
      <motion.span className="block" style={{ x: six, y: siy }}>
        {children}
      </motion.span>
    </motion.a>
  )
}
