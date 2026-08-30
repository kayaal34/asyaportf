import { Reveal } from './Reveal'
import { cn } from '../lib/cn'

type SectionHeadingProps = {
  kicker: string
  title: string
  className?: string
  /** Use on inverted (light) sections so the kicker keeps contrast. */
  invert?: boolean
}

/** Small tracked kicker over an oversized display title. Opens every section. */
export function SectionHeading({ kicker, title, className, invert = false }: SectionHeadingProps) {
  return (
    <div className={cn('max-w-4xl', className)}>
      <Reveal>
        <p
          className={cn(
            'text-xs font-medium tracking-[0.22em] uppercase',
            invert ? 'text-paper/45' : 'text-ink-faint',
          )}
        >
          {kicker}
        </p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="mt-6 text-headline text-balance">{title}</h2>
      </Reveal>
    </div>
  )
}
