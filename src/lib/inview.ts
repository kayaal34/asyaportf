import { useEffect, useRef, useState } from 'react'

/**
 * One shared IntersectionObserver for every scroll reveal on the page. When an
 * element enters the viewport it gets `data-shown`, and CSS transitions do the
 * rest (see `.sr` in index.css). One-shot: once shown, it stays shown.
 */
let observer: IntersectionObserver | null = null

function getObserver() {
  if (observer) return observer
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        ;(entry.target as HTMLElement).dataset.shown = ''
        observer?.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.01 },
  )
  return observer
}

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      el.dataset.shown = ''
      return
    }
    const io = getObserver()
    io.observe(el)
    return () => io.unobserve(el)
  }, [])
  return ref
}

/** True when the viewport is at least `lg` (1024px). */
export function useIsDesktop() {
  const query = '(min-width: 1024px)'
  const [match, setMatch] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  )
  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatch(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])
  return match
}
