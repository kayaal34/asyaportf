import { useEffect, useState } from 'react'
import { Logo } from './Logo'
import { cn } from '../lib/cn'

const SEEN_KEY = 'asy-intro-seen'
/** Fired when the curtain begins to lift, so the hero can start its entrance. */
export const INTRO_DONE_EVENT = 'asy:intro-done'
const HOLD_MS = 2400
const SLIDE_MS = 900

type Phase = 'hidden' | 'in' | 'out' | 'done'

/**
 * A dark opening: the spark mark unfurls, the name and a drawn line follow, held
 * ~1.9s, then the whole panel slides away to reveal the site. Once per session,
 * never under prefers-reduced-motion. CSS-only so it can't stall; an explicit
 * phase machine plus timeouts guarantee it always unmounts.
 */
export function Intro() {
  const [phase, setPhase] = useState<Phase>('hidden')

  useEffect(() => {
    let seen = true
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === '1'
    } catch {
      seen = false
    }
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    if (seen || reduce) {
      window.dispatchEvent(new Event(INTRO_DONE_EVENT))
      setPhase('done')
      return
    }

    setPhase('in')
    document.body.style.overflow = 'hidden'

    const toOut = window.setTimeout(() => {
      document.body.style.overflow = ''
      window.dispatchEvent(new Event(INTRO_DONE_EVENT))
      try {
        sessionStorage.setItem(SEEN_KEY, '1')
      } catch {
        /* private mode — it will just show again next load */
      }
      setPhase('out')
    }, HOLD_MS)

    return () => {
      window.clearTimeout(toOut)
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (phase !== 'out') return
    const t = window.setTimeout(() => setPhase('done'), SLIDE_MS + 150)
    return () => window.clearTimeout(t)
  }, [phase])

  if (phase === 'hidden' || phase === 'done') return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex flex-col items-center justify-center bg-paper text-ink',
        'transition-transform ease-[cubic-bezier(0.16,1,0.3,1)]',
        phase === 'out' ? '-translate-y-full' : 'translate-y-0',
      )}
      style={{ transitionDuration: `${SLIDE_MS}ms`, pointerEvents: phase === 'out' ? 'none' : 'auto' }}
    >
      <Logo className="intro-up h-9 w-auto text-ink sm:h-11" />
      <span className="intro-up mt-8 h-px w-24 origin-left bg-line [animation-delay:0.6s]" />
    </div>
  )
}
