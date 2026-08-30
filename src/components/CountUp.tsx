import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'
import { cn } from '../lib/cn'

type CountUpProps = {
  value: number
  from?: number
  decimals?: number
  /** Suffix rendered right after the number, e.g. "%", "М ₽". */
  suffix?: string
  durationMs?: number
  className?: string
}

const nf = (decimals: number) =>
  new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

/**
 * A number that eases from `from` to `value` the first time it scrolls into
 * view. Uses an expo-out curve so it decelerates hard at the end — the "settle"
 * that makes the figure feel typeset rather than tallied.
 */
export function CountUp({
  value,
  from = 0,
  decimals = 0,
  suffix,
  durationMs = 2000,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' })
  const reduceMotion = useReducedMotion()
  const formatter = nf(decimals)
  const [current, setCurrent] = useState(reduceMotion ? value : from)

  useEffect(() => {
    if (!inView || reduceMotion) return
    const controls = animate(from, value, {
      duration: durationMs / 1000,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setCurrent(v),
    })
    return () => controls.stop()
  }, [inView, reduceMotion, from, value, durationMs])

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {formatter.format(current)}
      {suffix ? <span className="whitespace-nowrap">{` ${suffix}`}</span> : null}
    </span>
  )
}
