import { cn } from '../lib/cn'

type ColossalProps = {
  word: string
  sub?: string
  /** Optional faint image behind the word. */
  image?: string
  className?: string
}

/**
 * A full-viewport typographic beat: one colossal word. Used as a hard cut
 * between sections. Static by design so it renders identically everywhere;
 * a scroll-driven scale is layered on via CSS `animation-timeline` where the
 * browser supports it, and simply not applied otherwise.
 */
export function Colossal({ word, sub, image, className }: ColossalProps) {
  return (
    <section
      className={cn(
        'relative flex min-h-[85svh] items-center justify-center overflow-hidden bg-paper',
        className,
      )}
    >
      {image && (
        <img
          src={image}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-[0.12]"
        />
      )}
      <div className="colossal-zoom relative text-center">
        <span className="block text-colossal font-extrabold text-ink">{word}</span>
        {sub && (
          <span className="mt-4 block text-sm tracking-[0.3em] text-ink-faint uppercase">{sub}</span>
        )}
      </div>
    </section>
  )
}
