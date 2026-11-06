import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { cn } from '../lib/cn'

/**
 * Global editorial chrome for the public site: film grain, faint column rules
 * and a custom cursor. Nothing here renders in the admin.
 */
export function SiteChrome() {
  const { pathname } = useLocation()
  if (pathname.startsWith('/admin')) return null
  return (
    <>
      <GridLines />
      <div aria-hidden className="grain" />
      <Cursor />
    </>
  )
}

/** Four hairline columns behind everything — the layout shows its bones. */
function GridLines() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 px-5 sm:px-8 lg:px-12">
      <div className="mx-auto grid h-full max-w-[100rem] grid-cols-2 border-x border-line/60 sm:grid-cols-4">
        <span className="border-r border-line/60" />
        <span className="hidden border-r border-line/60 sm:block" />
        <span className="hidden border-r border-line/60 sm:block" />
        <span />
      </div>
    </div>
  )
}

/**
 * The native pointer stays as it is. Over elements tagged `data-cursor="…"`
 * (the work cards) a small label pill trails just below-right of it.
 * Fine pointers only.
 */
function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState('')
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const sx = useSpring(x, { stiffness: 600, damping: 45, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 600, damping: 45, mass: 0.5 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return
    setEnabled(true)
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const target = (e.target as HTMLElement | null)?.closest?.('[data-cursor]') as HTMLElement | null
      setLabel(target?.dataset.cursor ?? '')
    }
    const leave = () => setLabel('')
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <motion.div aria-hidden className="pointer-events-none fixed top-0 left-0 z-[100]" style={{ x: sx, y: sy }}>
      <span
        className={cn(
          'ml-4 mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 font-mono text-[0.66rem] tracking-[0.08em] whitespace-nowrap text-accent-ink uppercase shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)] transition-[opacity,scale] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
          label ? 'scale-100 opacity-100' : 'scale-50 opacity-0',
        )}
      >
        {label} <span>↗</span>
      </span>
    </motion.div>
  )
}
