import { cn } from '../lib/cn'

type LogoProps = {
  className?: string
  title?: string
}

/**
 * "Ася" wordmark. Plain text in the display face so it uses the loaded font
 * and scales with `text-*` utilities.
 */
export function Logo({ className, title = 'Ася' }: LogoProps) {
  return (
    <span
      role="img"
      aria-label={title}
      className={cn(
        'inline-block font-display font-extrabold leading-none tracking-[-0.04em] select-none',
        className,
      )}
    >
      Ася
      <span className="text-accent">.</span>
    </span>
  )
}
