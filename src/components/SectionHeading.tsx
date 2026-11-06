import type { CSSProperties } from 'react'
import { Reveal } from './Reveal'
import { MaskWords } from './fx'
import { cn } from '../lib/cn'

type SectionHeadingProps = {
  kicker: string
  title: string
  className?: string
  /** Use on inverted (dark) sections so the kicker keeps contrast. */
  invert?: boolean
}

/**
 * Editorial opener: a mono kicker parked in the first grid column, the title
 * spanning the rest — set huge, tight, with its last word in italic serif.
 */
export function SectionHeading({ kicker, title, className, invert = false }: SectionHeadingProps) {
  return (
    <Reveal group className={cn('grid gap-6 lg:grid-cols-4 lg:gap-8', className)}>
      <p
        className={cn(
          'flex items-start gap-3 pt-2 font-mono text-[0.7rem] tracking-[0.1em] uppercase',
          invert ? 'text-paper/50' : 'text-ink-faint',
        )}
      >
        <span aria-hidden className="sr-c mt-[0.55em] h-px w-6 shrink-0 bg-accent" data-sr="line" />
        <span className="sr-c" data-sr="fade" style={{ '--d': '0.15s' } as CSSProperties}>
          {kicker}
        </span>
      </p>
      <h2 className="text-headline font-bold text-balance lg:col-span-3">
        <MaskWords text={title} baseDelay={0.2} accentLast />
      </h2>
    </Reveal>
  )
}
