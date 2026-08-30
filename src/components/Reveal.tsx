import type { ReactNode } from 'react'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import { springSoft, viewportOnce } from '../lib/motion'
import { cn } from '../lib/cn'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Extra delay before the entrance spring fires. */
  delay?: number
  /** Add a soft blur settle — reserve for hero-level moments. */
  blur?: boolean
}

const plain: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
}

const withBlur: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

/**
 * Wraps content in a spring-eased fade + slide-up that plays once when it
 * scrolls into view. Honours prefers-reduced-motion by rendering statically.
 */
export function Reveal({ children, className, delay = 0, blur = false }: RevealProps) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={cn(className)}
      variants={blur ? withBlur : plain}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ ...springSoft, delay }}
    >
      {children}
    </motion.div>
  )
}
