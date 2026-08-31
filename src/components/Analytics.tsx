import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView } from '../lib/contentIo'

const seen = new Set<string>()

/** Records one page view per path per session (admin routes excluded). */
export function Analytics() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname.startsWith('/admin')) return
    if (seen.has(pathname)) return
    seen.add(pathname)
    void trackPageView(pathname)
  }, [pathname])

  return null
}
