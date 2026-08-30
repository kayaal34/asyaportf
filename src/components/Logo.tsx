type LogoProps = {
  className?: string
  /** Accessible name. */
  title?: string
}

/**
 * A four-point spark mark. Geometric, scales cleanly from favicon to full
 * screen, and reads as "growth / a bright result" without spelling anything out.
 * `currentColor` driven.
 */
export function Logo({ className, title = 'Ася' }: LogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label={title}
      className={className}
      fill="currentColor"
    >
      <path d="M12 0c1.15 8.05 3.9 10.85 12 12-8.1 1.15-10.85 3.95-12 12-1.15-8.05-3.9-10.85-12-12C8.1 10.85 10.85 8.05 12 0Z" />
    </svg>
  )
}
