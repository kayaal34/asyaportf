import { MARQUEE } from '../content/site'

/**
 * A slow horizontal ticker of keywords. Pure editorial texture between the hero
 * and the first content section — gives the page a pulse without adding clutter.
 * Two identical tracks slide as one so the loop is seamless.
 */
export function Marquee() {
  const track = (
    <ul className="flex shrink-0 items-center gap-0" aria-hidden>
      {MARQUEE.map((word, i) => (
        <li key={`${word}-${i}`} className="flex items-center">
          <span className="px-6 py-6 font-display text-lg font-bold tracking-[-0.01em] whitespace-nowrap sm:px-10 sm:text-xl">
            {word}
          </span>
          <span className="text-ink-faint">/</span>
        </li>
      ))}
    </ul>
  )

  return (
    <div className="overflow-hidden border-y border-line bg-paper-raised">
      <div className="flex w-max motion-safe:animate-marquee">
        {track}
        {track}
      </div>
      <span className="sr-only">{MARQUEE.join(', ')}</span>
    </div>
  )
}
