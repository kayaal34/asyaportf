/** Brand-flavoured wordmark for a known marketplace; plain ink text otherwise. */
export function PlatformMark({ name }: { name: string }) {
  const key = name.trim().toLowerCase()

  if (key === 'wildberries' || key === 'wb') {
    return (
      <span className="font-display text-base font-extrabold tracking-[-0.02em] text-[#7d2ae8] sm:text-lg">
        Wild<span className="text-[#cb11ab]">berries</span>
      </span>
    )
  }
  if (key === 'ozon') {
    return (
      <span className="font-display text-base font-extrabold tracking-[-0.04em] text-[#005bff] sm:text-lg">
        OZON
      </span>
    )
  }
  if (key === 'яндекс маркет' || key === 'yandex market') {
    return (
      <span className="font-display text-base font-extrabold tracking-[-0.02em] text-[#fc3f1d] sm:text-lg">
        Яндекс&nbsp;Маркет
      </span>
    )
  }
  return (
    <span className="font-display text-base font-extrabold tracking-[-0.02em] sm:text-lg">{name}</span>
  )
}
