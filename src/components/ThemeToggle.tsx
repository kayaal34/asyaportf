import { useRef } from 'react'
import { useTheme } from '../hooks/useTheme'
import { cn } from '../lib/cn'

const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

/** Sun ↔ moon toggle. Wipes the theme in via a circle expanding from the button. */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const ref = useRef<HTMLButtonElement>(null)

  function onClick() {
    const rect = ref.current?.getBoundingClientRect()
    const origin = rect ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } : undefined
    toggle(origin)
  }

  const isDark = theme === 'dark'

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-label={isDark ? 'Включить светлую тему' : 'Включить тёмную тему'}
      className={cn(
        'relative grid size-9 shrink-0 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:border-ink hover:text-ink',
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className={cn(
          'absolute size-[1.1rem] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
          isDark ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100',
        )}
        {...strokeProps}
      >
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.5v2.3M12 19.2v2.3M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.3M19.2 12h2.3M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        className={cn(
          'absolute size-[1.1rem] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
          isDark ? 'scale-100 rotate-0 opacity-100' : '-rotate-90 scale-0 opacity-0',
        )}
        {...strokeProps}
      >
        <path d="M20.2 14.4A8.4 8.4 0 1 1 9.6 3.8a6.7 6.7 0 0 0 10.6 10.6Z" />
      </svg>
    </button>
  )
}
