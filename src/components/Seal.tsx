import { useId } from 'react'
import { cn } from '../lib/cn'

type SealProps = {
  text?: string
  className?: string
}

/**
 * A slowly rotating circular text badge — the "premium portfolio" signature
 * mark. Reads as an identity stamp for a marketplace manager.
 */
export function Seal({
  text = 'МЕНЕДЖЕР МАРКЕТПЛЕЙСОВ · WB × OZON · ',
  className,
}: SealProps) {
  const pathId = useId()
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
            fontSize="13"
            fontWeight={700}
            letterSpacing="3"
            fill="currentColor"
          >
            <textPath href={`#${pathId}`}>{text.repeat(2)}</textPath>
          </text>
        </g>
        <circle cx="100" cy="100" r="5" fill="currentColor" />
      </svg>
    </span>
  )
}
