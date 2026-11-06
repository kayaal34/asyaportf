import { useMemo, useRef, useState, type PointerEvent, type ReactNode } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { CountUp } from './CountUp'
import { Section } from './Section'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'
import { useContent } from '../content/store'
import type { GrowthMilestone, GrowthPoint } from '../content/site'

const nf0 = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 })
const nf1 = new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 1, maximumFractionDigits: 1 })

export function GrowthChart() {
  const { growth } = useContent()
  const points = growth.points
  if (points.length < 2) return null

  const first = points[0]
  const last = points[points.length - 1]

  return (
    <Section id="growth">
      <SectionHeading kicker={growth.intro.kicker} title={growth.intro.title} />
      <Reveal className="mt-6 max-w-xl lg:ml-[25%]" delay={0.05}>
        <p className="text-sm text-ink-soft">{growth.intro.caption}</p>
      </Reveal>

      <Reveal className="mt-14 lg:mt-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:ml-[25%] lg:gap-8">
          <HeadlineDelta
            label="Заказов в месяц"
            from={nf0.format(first.orders)}
            to={<CountUp from={first.orders} value={last.orders} durationMs={2200} />}
          />
          <HeadlineDelta
            label="Выручка в месяц"
            from={`${nf1.format(first.revenue)} млн ₽`}
            to={<CountUp from={first.revenue} value={last.revenue} decimals={1} suffix="млн ₽" durationMs={2200} />}
          />
        </div>
      </Reveal>

      <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-8">
        <MiniChart
          points={points}
          valueKey="orders"
          title="Заказы, шт / мес"
          format={(v) => nf0.format(v)}
          milestones={growth.milestones}
        />
        <MiniChart
          points={points}
          valueKey="revenue"
          title="Выручка, млн ₽ / мес"
          format={(v) => nf1.format(v)}
        />
      </div>

      {growth.milestones.length > 0 && (
        <Reveal className="mt-10">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {growth.milestones.map((m, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-ink-soft">
                <span className="font-display text-xs font-bold text-accent tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {m.label}
                <span className="text-ink-faint">· {points[m.at]?.label ?? '—'}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </Section>
  )
}

function HeadlineDelta({ label, from, to }: { label: string; from: string; to: ReactNode }) {
  return (
    <div className="border-t border-ink pt-5">
      <p className="font-mono text-[0.68rem] tracking-[0.1em] text-ink-faint uppercase">{label}</p>
      <p className="mt-5 font-display text-[clamp(2.8rem,6.5vw,6.5rem)] leading-[0.88] font-bold tracking-[-0.055em]">
        {to}
      </p>
      <p className="mt-4 font-mono text-[0.72rem] tracking-[0.04em] text-ink-faint uppercase">
        было {from} <span className="text-accent">↗</span>
      </p>
    </div>
  )
}

const W = 560
const H = 320
const PAD = { l: 16, r: 16, t: 30, b: 40 }
const INNER_W = W - PAD.l - PAD.r
const INNER_H = H - PAD.t - PAD.b

function MiniChart({
  points,
  valueKey,
  title,
  format,
  milestones = [],
}: {
  points: GrowthPoint[]
  valueKey: 'orders' | 'revenue'
  title: string
  format: (v: number) => string
  milestones?: GrowthMilestone[]
}) {
  const svgRef = useRef<SVGSVGElement>(null)
  const figRef = useRef<HTMLElement>(null)
  const [hover, setHover] = useState<number | null>(null)
  const reduce = useReducedMotion()
  // The line draws itself as the chart scrolls up into view.
  const { scrollYProgress } = useScroll({ target: figRef, offset: ['start 0.95', 'center 0.5'] })
  const eased = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 })
  const full = useMotionValue(1)
  const draw = reduce ? full : eased
  const areaOpacity = useTransform(draw, [0.35, 1], [0, 0.12])
  const endOpacity = useTransform(draw, [0.92, 1], [0, 1])

  const geom = useMemo(() => {
    const values = points.map((p) => p[valueKey])
    const vmax = Math.max(...values)
    const vmin = Math.min(...values)
    const span = vmax - vmin || 1
    const lo = vmin - span * 0.15
    const hi = vmax + span * 0.15
    const n = points.length

    const px = (i: number) => PAD.l + (i / (n - 1)) * INNER_W
    const py = (v: number) => PAD.t + (1 - (v - lo) / (hi - lo)) * INNER_H
    const baseY = PAD.t + INNER_H

    const coords = points.map((p, i) => ({ x: px(i), y: py(p[valueKey]), v: p[valueKey], label: p.label }))
    const line = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`).join(' ')
    const area = `${line} L ${coords[n - 1].x.toFixed(1)} ${baseY} L ${coords[0].x.toFixed(1)} ${baseY} Z`
    const grid = [0, 0.5, 1].map((t) => ({ y: PAD.t + t * INNER_H, v: lo + (hi - lo) * (1 - t) }))

    return { coords, line, area, grid, baseY }
  }, [points, valueKey])

  function handleMove(e: PointerEvent<SVGSVGElement>) {
    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width) * W
    let nearest = 0
    let best = Infinity
    geom.coords.forEach((c, i) => {
      const d = Math.abs(c.x - x)
      if (d < best) {
        best = d
        nearest = i
      }
    })
    setHover(nearest)
  }

  const active = hover != null ? geom.coords[hover] : null

  return (
    <figure ref={figRef} className="rounded-sm border border-line bg-paper-raised p-5 sm:p-6">
      <figcaption className="mb-3 font-mono text-[0.68rem] tracking-[0.1em] text-ink-faint uppercase">
        {title}
      </figcaption>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full touch-none select-none"
        role="img"
        aria-label={`${title}: с ${format(geom.coords[0].v)} до ${format(geom.coords[geom.coords.length - 1].v)}`}
        onPointerMove={handleMove}
        onPointerLeave={() => setHover(null)}
      >
        {/* gridlines */}
        {geom.grid.map((g, i) => (
          <g key={i}>
            <line x1={PAD.l} x2={W - PAD.r} y1={g.y} y2={g.y} stroke="var(--line)" strokeWidth={1} />
            <text x={PAD.l} y={g.y - 6} fill="var(--ink-faint)" fontSize={13} fontFamily="var(--font-sans)">
              {format(g.v)}
            </text>
          </g>
        ))}

        {/* milestones */}
        {milestones.map((m, i) => {
          const c = geom.coords[m.at]
          if (!c) return null
          return (
            <MilestoneLine
              key={i}
              x={c.x}
              y2={geom.baseY}
              at={m.at / (geom.coords.length - 1)}
              draw={draw}
            />
          )
        })}

        {/* area + line */}
        <motion.path d={geom.area} fill="var(--accent)" style={{ fillOpacity: areaOpacity }} />
        <motion.path
          d={geom.line}
          style={{ pathLength: draw }}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* endpoint markers */}
        {[geom.coords[0], geom.coords[geom.coords.length - 1]].map((c, i) => (
          <motion.circle
            key={i}
            cx={c.x}
            cy={c.y}
            r={4.5}
            fill="var(--accent)"
            stroke="var(--paper-raised)"
            strokeWidth={2}
            style={i === 1 ? { opacity: endOpacity } : undefined}
          />
        ))}

        {/* x labels */}
        {geom.coords.map((c, i) => (
          <text
            key={i}
            x={c.x}
            y={H - 14}
            textAnchor={i === 0 ? 'start' : i === geom.coords.length - 1 ? 'end' : 'middle'}
            fill="var(--ink-faint)"
            fontSize={12}
            fontFamily="var(--font-sans)"
          >
            {c.label}
          </text>
        ))}

        {/* hover crosshair + tooltip */}
        {active && (
          <g>
            <line x1={active.x} x2={active.x} y1={PAD.t} y2={geom.baseY} stroke="var(--ink)" strokeWidth={1} opacity={0.35} />
            <circle cx={active.x} cy={active.y} r={5} fill="var(--ink)" stroke="var(--paper-raised)" strokeWidth={2} />
            <g transform={`translate(${Math.min(Math.max(active.x, PAD.l + 56), W - PAD.r - 56)}, ${Math.max(active.y - 46, PAD.t + 2)})`}>
              <rect x={-56} y={-16} width={112} height={42} rx={8} fill="var(--ink)" />
              <text x={0} y={-1} textAnchor="middle" fill="var(--paper)" fontSize={12} fontFamily="var(--font-sans)" opacity={0.7}>
                {active.label}
              </text>
              <text x={0} y={17} textAnchor="middle" fill="var(--paper)" fontSize={14} fontWeight={700} fontFamily="var(--font-display)">
                {format(active.v)}
              </text>
            </g>
          </g>
        )}
      </svg>
    </figure>
  )
}

function MilestoneLine({
  x,
  y2,
  at,
  draw,
}: {
  x: number
  y2: number
  at: number
  draw: MotionValue<number>
}) {
  const opacity = useTransform(draw, [Math.max(0, at - 0.06), at], [0, 0.55])
  return (
    <motion.line
      x1={x}
      x2={x}
      y1={PAD.t}
      y2={y2}
      stroke="var(--accent)"
      strokeWidth={1}
      strokeDasharray="3 4"
      style={{ opacity }}
    />
  )
}
