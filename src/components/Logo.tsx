type LogoProps = {
  className?: string
  /** Accessible name; the mark is a monogram of "Ася". */
  title?: string
}

/**
 * ASY — a monoline three-letter monogram for Asya. Drawn as paths so it stays
 * crisp at any size and is independent of font loading. `currentColor` driven,
 * so it inherits text colour (ink on light, paper on the intro).
 */
export function Logo({ className, title = 'Ася' }: LogoProps) {
  return (
    <svg
      viewBox="0 0 98 32"
      fill="none"
      role="img"
      aria-label={title}
      className={className}
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* A */}
      <path d="M2 30 L14 2 L26 30 M7 20 L21 20" />
      {/* S */}
      <path d="M60 8.5 C60 2.5 44 2 44 11 C44 18 60 16.5 60 23.5 C60 32 44 31.5 40.5 24" />
      {/* Y */}
      <path d="M72 2 L83 16 L94 2 M83 16 L83 30" />
    </svg>
  )
}
