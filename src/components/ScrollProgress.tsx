import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react'

/**
 * A 2px reading-progress line pinned to the very top. Deliberately understated —
 * it only reads as a faint accent thread that fills as you move down the page.
 */
export function ScrollProgress() {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  })

  if (reduceMotion) return null

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-accent/80"
      style={{ scaleX }}
    />
  )
}
