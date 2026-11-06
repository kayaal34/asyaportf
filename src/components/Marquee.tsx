import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'
import { useContent } from '../content/store'
import { cn } from '../lib/cn'

const wrap = (min: number, max: number, v: number) => {
  const r = max - min
  return ((((v - min) % r) + r) % r) + min
}

/**
 * Two strips of tape slapped across the page in an X — one signal-orange, one
 * ink. They run in opposite directions and answer the scroll: faster scrolling
 * speeds them up and leans them, scrolling back reverses them.
 */
export function Marquee() {
  const { marquee: MARQUEE } = useContent()
  const reduce = !!useReducedMotion()
  if (MARQUEE.length === 0) return null

  return (
    <div className="relative my-10 h-[11rem] overflow-x-clip sm:my-16 sm:h-[15rem] lg:h-[18rem]">
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[4deg] bg-ink text-paper">
        <Row words={[...MARQUEE].reverse()} baseVelocity={2} reduce={reduce} serif />
      </div>
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 -rotate-[3deg] bg-accent text-accent-ink shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)]">
        <Row words={MARQUEE} baseVelocity={-2} reduce={reduce} />
      </div>
      <span className="sr-only">{MARQUEE.join(', ')}</span>
    </div>
  )
}

function Row({
  words,
  baseVelocity,
  reduce,
  serif = false,
}: {
  words: string[]
  baseVelocity: number
  reduce: boolean
  serif?: boolean
}) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 })
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false })
  const skewX = useTransform(smooth, [-2500, 2500], [-8, 8])
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)
  const direction = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    let moveBy = direction.current * baseVelocity * (delta / 1000)
    const f = factor.get()
    if (f < 0) direction.current = -1
    else if (f > 0) direction.current = 1
    moveBy += direction.current * moveBy * f
    baseX.set(baseX.get() + moveBy)
  })

  const track = (
    <ul className="flex shrink-0 items-center" aria-hidden>
      {words.map((word, i) => (
        <li key={`${word}-${i}`} className="flex items-center">
          <span
            className={cn(
              'px-5 whitespace-nowrap sm:px-8',
              serif
                ? 'font-serif text-3xl font-medium tracking-[-0.02em] italic sm:text-5xl lg:text-6xl'
                : 'font-display text-3xl font-extrabold tracking-[-0.045em] uppercase sm:text-5xl lg:text-6xl',
            )}
          >
            {word}
          </span>
          <span className="font-mono text-sm opacity-70 sm:text-base">✳</span>
        </li>
      ))}
    </ul>
  )

  return (
    <div className="flex overflow-hidden py-3 sm:py-4">
      <motion.div className="flex w-max" style={reduce ? undefined : { x, skewX }}>
        {track}
        {track}
      </motion.div>
    </div>
  )
}
