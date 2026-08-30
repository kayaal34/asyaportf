import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { cn } from '../lib/cn'

type ScrollSceneProps = {
  image: string
  children: ReactNode
  id?: string
  /** How dark the image sits under the text. 0–1. */
  dim?: number
  /** Vertical alignment of the content. */
  align?: 'center' | 'end'
  className?: string
  /** Pin the content while the image scrolls past. */
  sticky?: boolean
}

/**
 * A full-bleed section whose background image zooms in and parallax-drifts as it
 * moves through the viewport, with content floating over a dark scrim. The core
 * cinematic building block of the site.
 */
export function ScrollScene({
  image,
  children,
  id,
  dim = 0.62,
  align = 'center',
  className,
  sticky = false,
}: ScrollSceneProps) {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1])
  const y = useTransform(scrollYProgress, [0, 1], ['-4%', '8%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        'relative flex min-h-[100svh] overflow-hidden',
        align === 'center' ? 'items-center' : 'items-end',
        className,
      )}
    >
      <motion.img
        src={image}
        alt=""
        aria-hidden
        style={reduceMotion ? undefined : { scale, y }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, rgba(10,10,11,${dim * 0.9}), rgba(10,10,11,${dim}) 45%, rgba(10,10,11,${Math.min(dim + 0.25, 0.95)}))`,
        }}
      />
      <motion.div
        style={reduceMotion || sticky ? undefined : { y: textY }}
        className={cn(
          'relative z-10 mx-auto w-full max-w-[80rem] px-6 py-28 sm:px-10',
          sticky && 'sticky top-0 flex min-h-[100svh] flex-col justify-center',
        )}
      >
        {children}
      </motion.div>
    </section>
  )
}
