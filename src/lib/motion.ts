import type { Transition, Variants } from 'motion/react'

/**
 * Shared spring-physics presets. Everything on the site eases with a spring so
 * motion feels authored in Framer, never linear or "webby".
 */
export const spring: Transition = {
  type: 'spring',
  stiffness: 130,
  damping: 20,
  mass: 1,
}

/** Softer, slower spring for large elements (headlines, section reveals). */
export const springSoft: Transition = {
  type: 'spring',
  stiffness: 82,
  damping: 22,
  mass: 1.1,
}

/** Snappy spring for micro-interactions (magnetic pull, hovers). */
export const springSnappy: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 16,
  mass: 0.3,
}

/** Fade + gentle slide-up. The default entrance for anything revealed on scroll. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: springSoft },
}

/** Fade + slide-up with a subtle blur settle — for hero-level moments. */
export const fadeUpBlur: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: springSoft },
}

/** Container that staggers its children's entrance. */
export const stagger = (staggerChildren = 0.09, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

/** Standard in-view viewport config — play once, trigger a bit before fully visible. */
export const viewportOnce = { once: true, margin: '0px 0px -12% 0px' } as const
