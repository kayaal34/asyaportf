import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { INTRO_DONE_EVENT, INTRO_START_EVENT, isIntroActive } from './Intro'

/**
 * Inertial wheel scrolling (Lenis) for the public site — the buttery, weighted
 * feel that makes scroll-linked motion read as one continuous gesture. Touch
 * keeps native scrolling. Off for the admin and under prefers-reduced-motion.
 */
export function SmoothScroll() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')

  useEffect(() => {
    if (isAdmin) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: true,
      allowNestedScroll: true,
    })

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // Hold still while the intro curtain is down.
    const stop = () => lenis.stop()
    const start = () => lenis.start()
    if (isIntroActive()) stop()
    window.addEventListener(INTRO_START_EVENT, stop)
    window.addEventListener(INTRO_DONE_EVENT, start)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener(INTRO_START_EVENT, stop)
      window.removeEventListener(INTRO_DONE_EVENT, start)
      lenis.destroy()
    }
  }, [isAdmin])

  return null
}
