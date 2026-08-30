import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Logo } from './Logo'
import { Seal } from './Seal'

const SEEN_KEY = 'asy-intro-seen'
/** Fired when the curtain begins to lift, so the hero can start its entrance. */
export const INTRO_DONE_EVENT = 'asy:intro-done'
const HOLD_MS = 1250

const ease = [0.16, 1, 0.3, 1] as const

type Phase = 'hidden' | 'in' | 'out' | 'done'

/**
 * A brief dark opening: greeting → monogram → a growing hairline, held for
 * ~1.25s, then the whole panel slides away to reveal the site. Shows once per
 * session and never under prefers-reduced-motion. Driven by an explicit phase
 * machine (no AnimatePresence) so the unmount is always deterministic.
 */
export function Intro() {
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('hidden')

  useEffect(() => {
    let seen = true
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === '1'
    } catch {
      seen = false
    }

    if (seen || reduceMotion) {
      window.dispatchEvent(new Event(INTRO_DONE_EVENT))
      setPhase('done')
      return
    }

    setPhase('in')
    document.body.style.overflow = 'hidden'

    const timer = window.setTimeout(() => {
      document.body.style.overflow = ''
      window.dispatchEvent(new Event(INTRO_DONE_EVENT))
      try {
        sessionStorage.setItem(SEEN_KEY, '1')
      } catch {
        /* private mode — it will simply show again next load */
      }
      setPhase('out')
    }, HOLD_MS)

    return () => {
      window.clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [reduceMotion])

  // Safety net: unmount even if the slide-up transition never reports complete.
  useEffect(() => {
    if (phase !== 'out') return
    const t = window.setTimeout(() => setPhase('done'), 1400)
    return () => window.clearTimeout(t)
  }, [phase])

  if (phase === 'hidden' || phase === 'done') return null

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink text-paper"
      initial={{ y: 0 }}
      animate={{ y: phase === 'out' ? '-101%' : 0 }}
      transition={{ duration: 0.66, ease }}
      onAnimationComplete={() => {
        if (phase === 'out') setPhase('done')
      }}
      style={{ pointerEvents: phase === 'out' ? 'none' : 'auto' }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease }}
        className="mb-6 text-xs tracking-[0.32em] text-paper/45 uppercase"
      >
        Здравствуйте
      </motion.span>

      <motion.div
        initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ delay: 0.12, duration: 0.6, ease }}
      >
        <Logo className="h-8 w-auto text-paper sm:h-9" />
      </motion.div>

      <motion.div
        className="mt-7 h-px w-44 origin-left bg-paper/25"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.25, duration: 0.85, ease }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.5, ease }}
        className="mt-6 flex items-center gap-4 text-sm font-extrabold tracking-[-0.02em] text-paper/85"
      >
        <span>Wildberries</span>
        <span className="text-paper/25">×</span>
        <span>OZON</span>
      </motion.div>

      <Seal className="absolute right-6 bottom-6 h-20 w-20 text-paper/30 sm:right-10 sm:bottom-10 sm:h-24 sm:w-24" />
    </motion.div>
  )
}
