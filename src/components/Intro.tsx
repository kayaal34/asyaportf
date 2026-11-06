import { useEffect, useState } from 'react'

const SEEN_KEY = 'asy-intro-seen'
/** Fired when the curtain begins to lift, so the hero can start its entrance. */
export const INTRO_DONE_EVENT = 'asy:intro-done'
/** Fired when the curtain comes down (scroll should hold still). */
export const INTRO_START_EVENT = 'asy:intro-start'
const HOLD_MS = 2100

let introActive = false
let introDone = false
/** True while the curtain is covering the page. */
export const isIntroActive = () => introActive
/** True once the curtain has lifted (or was skipped) this page load. */
export const isIntroDone = () => introDone

function finishIntro() {
  introActive = false
  introDone = true
  window.dispatchEvent(new Event(INTRO_DONE_EVENT))
}

/** `true` once the hero may play its entrance. */
export function useIntroDone() {
  const [done, setDone] = useState(introDone)
  useEffect(() => {
    if (introDone) {
      setDone(true)
      return
    }
    const on = () => setDone(true)
    window.addEventListener(INTRO_DONE_EVENT, on)
    return () => window.removeEventListener(INTRO_DONE_EVENT, on)
  }, [])
  return done
}
const SLIDE_MS = 1000

type Phase = 'hidden' | 'in' | 'out' | 'done'

/**
 * A quiet opening: the name rises letter by letter, the dot drops in, and the
 * curtain lifts. Once per session,
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
      finishIntro()
      setPhase('done')
      return
    }

    setPhase('in')
    // The reveal opens onto the hero, so always start from the top.
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    introActive = true
    window.dispatchEvent(new Event(INTRO_START_EVENT))
    document.body.style.overflow = 'hidden'

    const toOut = window.setTimeout(() => {
      document.body.style.overflow = ''
      finishIntro()
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
      if (introActive) finishIntro()
    }
  }, [])

  useEffect(() => {
    if (phase !== 'out') return
    const t = window.setTimeout(() => setPhase('done'), SLIDE_MS + 150)
    return () => window.clearTimeout(t)
  }, [phase])

  if (phase === 'hidden' || phase === 'done') return null

  const out = phase === 'out'
  const ease = 'cubic-bezier(0.76,0,0.24,1)'

  return (
    <div
      className="fixed inset-0 z-[100] bg-ink text-paper"
      style={{
        transform: out ? 'translateY(calc(-100% - 16vh))' : 'translateY(0)',
        transition: `transform ${SLIDE_MS}ms ${ease}`,
        pointerEvents: out ? 'none' : 'auto',
      }}
    >
      {/* soft arched edge that flattens as the curtain lifts */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-full h-[16vh] origin-top bg-ink"
        style={{
          borderRadius: '0 0 50% 50% / 0 0 100% 100%',
          transform: out ? 'scaleY(0.15)' : 'scaleY(1)',
          transition: `transform ${SLIDE_MS}ms ${ease}`,
        }}
      />

      <div
        className="absolute inset-0 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={out ? { transform: 'translateY(-8vh)', opacity: 0 } : undefined}
      >
        {/* corner marks */}
        <div className="absolute inset-0 flex flex-col justify-between px-5 py-5 font-mono text-[0.66rem] tracking-[0.1em] text-paper/55 uppercase sm:px-8 lg:px-12 lg:py-6">
          <div className="flex justify-between gap-6">
            <span className="intro-up" style={{ animationDelay: '0.15s' }}>Ася — портфолио</span>
            <span className="intro-up" style={{ animationDelay: '0.25s' }}>© {new Date().getFullYear()}</span>
          </div>
          <div className="flex justify-between gap-6 pb-3">
            <span className="intro-up" style={{ animationDelay: '0.35s' }}>Wildberries · Ozon</span>
            <span className="intro-up hidden sm:block" style={{ animationDelay: '0.45s' }}>Аналитика · Дизайн · Реклама</span>
          </div>
        </div>

        {/* centre */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="flex flex-col items-center">
            <span
              aria-label="Ася"
              className="flex items-baseline font-display text-[clamp(4.5rem,15vw,11rem)] leading-none font-extrabold tracking-[-0.06em]"
            >
              {['А', 'с', 'я'].map((ch, i) => (
                <span key={ch} aria-hidden className="inline-block overflow-hidden pb-[0.08em]">
                  <span className="intro-rise inline-block" style={{ animationDelay: `${0.15 + i * 0.08}s` }}>
                    {ch}
                  </span>
                </span>
              ))}
              <span aria-hidden className="intro-pop inline-block text-accent" style={{ animationDelay: '0.55s' }}>
                .
              </span>
            </span>
            <span
              aria-hidden
              className="intro-line mt-2 block h-px w-[min(20rem,62vw)] origin-center bg-paper/25" style={{ animationDelay: '0.7s' }}
            />
            <span className="mt-3 block overflow-hidden pb-[0.15em]">
              <span className="intro-rise block font-serif text-[clamp(1.5rem,3.2vw,2.4rem)] leading-none font-medium text-accent italic" style={{ animationDelay: '0.85s' }}>
                менеджер маркетплейсов
              </span>
            </span>
          </div>
        </div>

        {/* hairline that fills while the curtain holds */}
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-paper/10">
          <span
            className="block h-full origin-left bg-accent"
            style={{ animation: `intro-line ${HOLD_MS}ms cubic-bezier(0.65,0,0.35,1) both` }}
          />
        </span>
      </div>
    </div>
  )
}
