import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from 'react'
import { animate, motion, useInView, useMotionTemplate, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import { Reveal } from './Reveal'
import { cn } from '../lib/cn'

/**
 * Drag-to-compare: the same product card before and after the rework. The
 * "before" layer is clipped to the left of the handle. Drag (mouse or finger),
 * tap anywhere, or use the arrow keys. It sweeps once on its own the first
 * time it scrolls into view, to show that it moves.
 */
export function BeforeAfter() {
  const ref = useRef<HTMLDivElement>(null)
  const pos = useMotionValue(50)
  const [dragging, setDragging] = useState(false)
  const touched = useRef(false)
  const inView = useInView(ref, { once: true, margin: '0px 0px -30% 0px' })
  const reduce = useReducedMotion()

  const clip = useMotionTemplate`inset(0 ${useTransform(pos, (v) => 100 - v)}% 0 0)`
  const left = useMotionTemplate`${pos}%`
  const beforeTag = useTransform(pos, [6, 22], [0, 1])
  const afterTag = useTransform(pos, [78, 94], [1, 0])
  const [value, setValue] = useState(50)
  useEffect(() => pos.on('change', (v) => setValue(Math.round(v))), [pos])

  useEffect(() => {
    if (!inView || reduce || touched.current) return
    const controls = animate(pos, [50, 22, 78, 50], { duration: 2.6, ease: 'easeInOut', delay: 0.4 })
    return () => controls.stop()
  }, [inView, reduce, pos])

  const setFromX = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    pos.set(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)))
  }
  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    touched.current = true
    pos.stop()
    setDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
    setFromX(e.clientX)
  }
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging) setFromX(e.clientX)
  }
  const onKey = (e: KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 4
    if (e.key === 'ArrowLeft') pos.set(Math.max(0, pos.get() - step))
    else if (e.key === 'ArrowRight') pos.set(Math.min(100, pos.get() + step))
    else return
    touched.current = true
    e.preventDefault()
  }

  return (
    <Reveal className="mt-16 lg:mt-24">
      <div className="grid gap-8 lg:grid-cols-4 lg:gap-8">
        <div className="flex flex-col gap-5">
          <p className="font-mono text-[0.7rem] tracking-[0.1em] text-ink-faint uppercase">
            (до / после) — карточка
          </p>
          <p className="text-lead text-ink">
            Один и тот же товар. Слева — как было, справа — после переработки.
          </p>
          <ul className="flex flex-col border-t border-line font-mono text-[0.72rem] tracking-[0.04em] text-ink-soft uppercase">
            {['Инфографика под возражения', 'Выноски с выгодами', 'Понятное название', 'Цена и скидка на виду'].map(
              (t, i) => (
                <li key={t} className="flex gap-3 border-b border-line py-2.5">
                  <span className="text-accent">{String(i + 1).padStart(2, '0')}</span>
                  {t}
                </li>
              ),
            )}
          </ul>
          <p className="hidden font-mono text-[0.68rem] tracking-[0.08em] text-ink-faint uppercase lg:block">
            ← Потяните ползунок →
          </p>
        </div>

        <div className="lg:col-span-3">
          <div
            ref={ref}
            className="relative aspect-[3/4] cursor-ew-resize touch-pan-y overflow-hidden rounded-sm border border-line select-none sm:aspect-[16/10]"
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={() => setDragging(false)}
            onPointerCancel={() => setDragging(false)}
          >
            <CardMock variant="after" />
            <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
              <CardMock variant="before" />
            </motion.div>

            <motion.span
              style={{ opacity: beforeTag }}
              className="pointer-events-none absolute top-3 left-3 rounded-full bg-ink px-3 py-1 font-mono text-[0.66rem] tracking-[0.1em] text-paper uppercase"
            >
              До
            </motion.span>
            <motion.span
              style={{ opacity: afterTag }}
              className="pointer-events-none absolute top-3 right-3 rounded-full bg-accent px-3 py-1 font-mono text-[0.66rem] tracking-[0.1em] text-accent-ink uppercase"
            >
              После
            </motion.span>

            {/* handle */}
            <motion.div className="pointer-events-none absolute inset-y-0 w-0" style={{ left }}>
              <span className="absolute inset-y-0 -left-px w-0.5 bg-ink" />
              <span
                role="slider"
                tabIndex={0}
                aria-label="Сравнить карточку до и после"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={value}
                onKeyDown={onKey}
                className={cn(
                  'pointer-events-auto absolute top-1/2 left-0 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink text-paper shadow-[0_8px_30px_-8px_rgba(0,0,0,0.5)] transition-transform',
                  dragging && 'scale-110',
                )}
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M9 6 L3 12 L9 18 M15 6 L21 12 L15 18" />
                </svg>
              </span>
            </motion.div>
          </div>
          <p className="mt-3 font-mono text-[0.66rem] tracking-[0.08em] text-ink-faint uppercase lg:hidden">
            ← Потяните ползунок →
          </p>
        </div>
      </div>
    </Reveal>
  )
}

/* ------------------------------------------------------------------ */

function Bottle({ after }: { after: boolean }) {
  return (
    <svg viewBox="0 0 120 240" className="h-full w-auto" aria-hidden>
      <rect x="44" y="6" width="32" height="22" rx="5" fill={after ? 'var(--ink)' : '#8f8b84'} />
      <rect x="38" y="26" width="44" height="12" rx="3" fill={after ? 'var(--ink)' : '#a29e97'} />
      <rect x="26" y="36" width="68" height="196" rx="24" fill={after ? 'var(--ink)' : '#b7b3ab'} />
      {after && <rect x="26" y="96" width="68" height="34" fill="var(--accent)" />}
      {after && <rect x="36" y="48" width="8" height="150" rx="4" fill="#fff" opacity="0.12" />}
    </svg>
  )
}

function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'absolute rounded-full border border-ink bg-paper-raised px-2.5 py-1 font-mono text-[0.6rem] tracking-[0.04em] whitespace-nowrap text-ink uppercase shadow-sm sm:text-[0.66rem]',
        className,
      )}
    >
      {children}
    </span>
  )
}

/** The listing mock. Both variants share one layout so the split lines up. */
function CardMock({ variant }: { variant: 'before' | 'after' }) {
  const after = variant === 'after'
  return (
    <div className={cn('absolute inset-0 grid grid-rows-[1.15fr_1fr] gap-4 p-4 sm:grid-cols-[1fr_1fr] sm:grid-rows-1 sm:gap-8 sm:p-8', after ? 'bg-paper-raised' : 'bg-[#e9e6df] dark:bg-[#24221f]')}>
      {/* photo */}
      <div
        className={cn(
          'relative flex items-center justify-center overflow-hidden rounded-sm',
          after ? 'bg-[radial-gradient(circle_at_50%_60%,var(--accent-wash),transparent_70%)]' : 'bg-[#dcd8d0] dark:bg-[#2e2c28]',
        )}
      >
        {after ? (
          <>
            <div className="h-[72%] drop-shadow-[0_24px_24px_rgba(0,0,0,0.25)]">
              <Bottle after />
            </div>
            <span className="absolute top-3 left-3 rounded-sm bg-accent px-2 py-1 font-display text-xs font-extrabold text-accent-ink sm:text-sm">
              −30%
            </span>
            <span className="absolute right-3 bottom-3 font-mono text-[0.6rem] tracking-[0.08em] text-ink uppercase sm:text-[0.66rem]">
              Хит продаж
            </span>
            <Chip className="top-[24%] left-[4%]">24 ч тепла</Chip>
            <Chip className="top-[46%] right-[4%]">Без BPA</Chip>
            <Chip className="bottom-[14%] left-[8%]">500 мл</Chip>
          </>
        ) : (
          <div className="h-[46%] translate-x-[18%] translate-y-[10%] -rotate-[9deg] opacity-80 blur-[0.6px]">
            <Bottle after={false} />
          </div>
        )}
      </div>

      {/* info */}
      <div className="flex min-w-0 flex-col justify-center gap-2 sm:gap-3">
        {after ? (
          <>
            <p className="font-mono text-[0.62rem] tracking-[0.08em] text-accent uppercase sm:text-[0.7rem]">
              Топ-10 в выдаче
            </p>
            <p className="text-xl leading-tight font-extrabold tracking-[-0.03em] sm:text-3xl">
              Термобутылка Steel, 500 мл
            </p>
            <p className="text-xs text-ink-soft sm:text-sm">Держит тепло 24 часа · без BPA</p>
            <p className="text-xs text-ink sm:text-sm">
              <span className="text-accent">★★★★★</span> 4,9 · 1 284 отзыва
            </p>
            <p className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-extrabold tracking-[-0.03em] sm:text-4xl">990 ₽</span>
              <span className="text-xs text-ink-faint line-through sm:text-sm">1 290 ₽</span>
            </p>
            <span className="mt-1 inline-flex w-fit rounded-full bg-accent px-5 py-2 text-xs font-semibold text-accent-ink sm:px-6 sm:py-2.5 sm:text-sm">
              В корзину
            </span>
          </>
        ) : (
          <>
            <p className="font-mono text-[0.62rem] tracking-[0.08em] text-ink-faint uppercase sm:text-[0.7rem]">
              Стр. 9 в выдаче
            </p>
            <p className="text-[0.72rem] leading-snug text-ink-soft sm:text-sm">
              термос бутылка для воды металл 500мл черный подарок спорт туризм школа офис
            </p>
            <p className="text-[0.7rem] text-ink-faint sm:text-xs">★ 3,9 · 12 отзывов</p>
            <p className="text-sm text-ink-soft sm:text-lg">1 290 ₽</p>
            <span className="mt-1 inline-flex w-fit rounded-sm bg-ink/15 px-4 py-1.5 text-[0.7rem] text-ink-soft sm:text-xs">
              В корзину
            </span>
          </>
        )}
      </div>
    </div>
  )
}
