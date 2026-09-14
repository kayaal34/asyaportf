import type { JSX } from 'react'

/** Small line-art badges for the "Экспертиза" cards — one per index. */
const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

function SeoIcon() {
  return (
    <svg viewBox="0 0 32 32" className="size-6" {...strokeProps}>
      <rect x="5" y="6" width="16" height="20" rx="2.5" />
      <path d="M9 12h8M9 16h8M9 20h5" />
      <circle cx="23" cy="23" r="4" />
      <path d="M26.2 26.2 29 29" />
    </svg>
  )
}

function DesignIcon() {
  return (
    <svg viewBox="0 0 32 32" className="size-6" {...strokeProps}>
      <rect x="4" y="8" width="16" height="20" rx="2.5" />
      <rect x="12" y="4" width="16" height="20" rx="2.5" />
      <path d="M16 10h6M16 14h6M16 18h4" />
    </svg>
  )
}

function AnalyticsIcon() {
  return (
    <svg viewBox="0 0 32 32" className="size-6" {...strokeProps}>
      <path d="M5 27V5" />
      <path d="M5 27h22" />
      <rect x="9" y="17" width="4" height="10" rx="1" />
      <rect x="16" y="11" width="4" height="16" rx="1" />
      <rect x="23" y="7" width="4" height="20" rx="1" />
    </svg>
  )
}

function AdsIcon() {
  return (
    <svg viewBox="0 0 32 32" className="size-6" {...strokeProps}>
      <circle cx="14" cy="18" r="10" />
      <circle cx="14" cy="18" r="5.5" />
      <circle cx="14" cy="18" r="1.3" fill="currentColor" stroke="none" />
      <path d="M20 12 28 4M28 4h-6M28 4v6" />
    </svg>
  )
}

function OpsIcon() {
  return (
    <svg viewBox="0 0 32 32" className="size-6" {...strokeProps}>
      <rect x="4" y="6" width="9" height="9" rx="1.5" />
      <rect x="19" y="6" width="9" height="9" rx="1.5" />
      <rect x="4" y="17" width="9" height="9" rx="1.5" />
      <rect x="19" y="17" width="9" height="9" rx="1.5" />
    </svg>
  )
}

export const EXPERTISE_ICONS: Record<string, () => JSX.Element> = {
  '01': SeoIcon,
  '02': DesignIcon,
  '03': AnalyticsIcon,
  '04': AdsIcon,
  '05': OpsIcon,
}
