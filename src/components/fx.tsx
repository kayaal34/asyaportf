import { Fragment, useRef, type CSSProperties, type ReactNode } from 'react'
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { cn } from '../lib/cn'

/** The signature move: one word per headline in a high-contrast italic serif. */
export const SERIF_ACCENT =
  'pr-[0.06em] font-serif text-[1.14em] leading-[0.8] font-medium tracking-[-0.03em] text-accent italic'

/**
 * Words that slide up out of a mask, one after another. Must sit inside a
 * revealed group (`<Reveal group>` or any `[data-shown]` ancestor).
 */
export function MaskWords({
  text,
  baseDelay = 0,
  step = 0.055,
  accentLast = false,
}: {
  text: string
  baseDelay?: number
  step?: number
  /** Set the final word in the italic serif, in the accent colour. */
  accentLast?: boolean
}) {
  const words = text.split(/\s+/).filter(Boolean)
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-top">
            <span
              className={cn('sr-c inline-block', accentLast && i === words.length - 1 && i > 0 && SERIF_ACCENT)}
              data-sr="mask"
              style={{ '--d': `${baseDelay + i * step}s` } as CSSProperties}
            >
              {w}
            </span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </>
  )
}

/**
 * Apple-style reading highlight: every word starts dimmed and lights up as the
 * paragraph travels through the viewport, so the sentence "fills in" with the
 * scroll.
 */
export function ScrollWords({
  text,
  className,
  dim = 0.16,
}: {
  text: string
  className?: string
  dim?: number
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.55'] })
  const words = text.split(/\s+/).filter(Boolean)

  if (reduce) return <p className={className}>{text}</p>

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <Word progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} dim={dim}>
            {w}
          </Word>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </p>
  )
}

function Word({
  progress,
  range,
  dim,
  children,
}: {
  progress: MotionValue<number>
  range: [number, number]
  dim: number
  children: ReactNode
}) {
  const opacity = useTransform(progress, range, [dim, 1])
  return <motion.span style={{ opacity }}>{children}</motion.span>
}

/**
 * An image that opens from a clipped inset as it scrolls in, then drifts inside
 * its frame (parallax) for the rest of its trip through the viewport.
 */
export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  radius = '1rem',
}: {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  radius?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const inset = useTransform(scrollYProgress, [0, 0.38], [12, 0])
  const clipPath = useMotionTemplate`inset(${inset}% ${inset}% ${inset}% ${inset}% round ${radius})`
  const scale = useTransform(scrollYProgress, [0, 0.38], [1.32, 1.14])
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <motion.div
      ref={ref}
      className={cn('overflow-hidden', className)}
      style={reduce ? undefined : { clipPath }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        className={cn('w-full object-cover', imgClassName)}
        style={reduce ? undefined : { scale, y }}
      />
    </motion.div>
  )
}
