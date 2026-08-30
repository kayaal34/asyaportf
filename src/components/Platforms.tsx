import { useContent } from '../content/store'
import { cn } from '../lib/cn'

/** Brand-flavoured wordmark for a known marketplace; plain ink text otherwise. */
export function PlatformMark({ name }: { name: string }) {
  const key = name.trim().toLowerCase()

  if (key === 'wildberries' || key === 'wb') {
    return (
      <span className="font-display text-lg font-extrabold tracking-[-0.02em] text-[#7d2ae8] sm:text-xl">
        Wild<span className="text-[#cb11ab]">berries</span>
      </span>
    )
  }
  if (key === 'ozon') {
    return (
      <span className="font-display text-lg font-extrabold tracking-[-0.04em] text-[#005bff] sm:text-xl">
        OZON
      </span>
    )
  }
  if (key === 'яндекс маркет' || key === 'yandex market') {
    return (
      <span className="font-display text-lg font-extrabold tracking-[-0.02em] text-[#fc3f1d] sm:text-xl">
        Яндекс Маркет
      </span>
    )
  }
  return (
    <span className="font-display text-lg font-extrabold tracking-[-0.02em] sm:text-xl">{name}</span>
  )
}

/** Thin "platforms I work on" strip. */
export function Platforms({ className }: { className?: string }) {
  const { platforms } = useContent()
  if (platforms.length === 0) return null

  return (
    <div className={cn('border-y border-line', className)}>
      <div className="mx-auto flex max-w-[80rem] flex-wrap items-center gap-x-8 gap-y-3 px-6 py-6 sm:px-10">
        <span className="text-xs font-medium tracking-[0.22em] text-ink-faint uppercase">
          Работаю на площадках
        </span>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
          {platforms.map((p) => (
            <PlatformMark key={p} name={p} />
          ))}
        </div>
      </div>
    </div>
  )
}
