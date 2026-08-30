type LogoProps = {
  className?: string
  /** Accessible name. */
  title?: string
}

/**
 * "ASY" wordmark. Rendered as SVG text in the display face so it scales with
 * `h-*` / `w-auto` like an icon while still using the site's type.
 */
export function Logo({ className, title = 'Ася' }: LogoProps) {
  return (
    <svg
      viewBox="0 0 116 40"
      role="img"
      aria-label={title}
      className={className}
      fill="currentColor"
    >
      <text
        x="0"
        y="32"
        fontFamily="var(--font-display), 'Manrope', system-ui, sans-serif"
        fontSize="40"
        fontWeight="800"
        letterSpacing="-3"
      >
        ASY
      </text>
    </svg>
  )
}
