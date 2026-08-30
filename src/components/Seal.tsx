import { useId } from 'react'
import { cn } from '../lib/cn'
import { SEAL_TEXT } from '../content/site'

type SealProps = {
  /** Text that circles the badge. Empty string renders nothing. */
  text?: string
  className?: string
}

/**
 * A slowly rotating circular text badge — an identity "stamp". Common on
 * high-end portfolios. Returns null when there is no text, so it can be
 * switched off from the admin panel.
 */
export function Seal({ text = SEAL_TEXT, className }: SealProps) {
  const pathId = useId()
  const trimmed = text.trim()
  if (!trimmed) return null

  const loop = `${trimmed} `.repeat(2)

  return (
    <span className={cn('pointer-events-none block', className)} aria-hidden>
      <svg viewBox="0 0 200 200" className="h-full w-full text-current">
        <defs>
          <path
            id={pathId}
            fill="none"
            d="M100,100 m-70,0 a70,70 0 1,1 140,0 a70,70 0 1,1 -140,0"
          />
        </defs>
        <g className="motion-safe:animate-seal" style={{ transformOrigin: '100px 100px' }}>
          <text
            fontFamily="var(--font-display)"
            fontSize="12.5"
            fontWeight={700}
            letterSpacing="2.5"
            fill="currentColor"
          >
            <textPath href={`#${pathId}`}>{loop}</textPath>
          </text>
        </g>
        <circle cx="100" cy="100" r="4.5" fill="currentColor" />
      </svg>
    </span>
  )
}
