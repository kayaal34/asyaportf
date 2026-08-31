import { cn } from '../lib/cn'

type LogoProps = {
  className?: string
  title?: string
}

/**
 * "ася" wordmark — lowercase, the personal name rather than initials, to match
 * the first-person voice of the site. Plain text in the display face so it uses
 * the loaded font and scales with `text-*` utilities.
 */
export function Logo({ className, title = 'Ася' }: LogoProps) {
  return (
    <span
      role="img"
      aria-label={title}
      className={cn(
        'inline-block font-display font-extrabold lowercase leading-none tracking-[-0.04em] select-none',
        className,
      )}
    >
      ася
      <span className="text-accent">.</span>
    </span>
  )
}
