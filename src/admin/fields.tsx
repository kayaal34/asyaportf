import { type ReactNode } from 'react'

const inputBase =
  'w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-ink'

export function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium tracking-[0.12em] text-ink-faint uppercase">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-ink-faint">{hint}</span>}
    </label>
  )
}

export function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <input
      type="text"
      className={inputBase}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export function TextArea({
  value,
  onChange,
  rows = 3,
}: {
  value: string
  onChange: (v: string) => void
  rows?: number
}) {
  return (
    <textarea
      className={`${inputBase} resize-y leading-relaxed`}
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export function NumberInput({
  value,
  onChange,
  step = 'any',
}: {
  value: number
  onChange: (v: number) => void
  step?: string
}) {
  return (
    <input
      type="number"
      step={step}
      className={inputBase}
      value={Number.isFinite(value) ? value : ''}
      onChange={(e) => onChange(e.target.value === '' ? 0 : Number(e.target.value))}
    />
  )
}

export function Toggle({
  value,
  onChange,
  label,
}: {
  value: boolean
  onChange: (v: boolean) => void
  label: string
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className="inline-flex items-center gap-2 text-sm text-ink"
      aria-pressed={value}
    >
      <span
        className={`grid size-5 place-items-center rounded border ${
          value ? 'border-ink bg-ink text-paper' : 'border-line bg-paper'
        }`}
      >
        {value ? '✓' : ''}
      </span>
      {label}
    </button>
  )
}

/** Editable list of plain strings. */
export function StringList({
  values,
  onChange,
  addLabel = 'Добавить',
}: {
  values: string[]
  onChange: (next: string[]) => void
  addLabel?: string
}) {
  const set = (i: number, v: string) => onChange(values.map((x, idx) => (idx === i ? v : x)))
  const remove = (i: number) => onChange(values.filter((_, idx) => idx !== i))
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir
    if (j < 0 || j >= values.length) return
    const next = [...values]
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
  }

  return (
    <div className="space-y-2">
      {values.map((v, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            type="text"
            className={inputBase}
            value={v}
            onChange={(e) => set(i, e.target.value)}
          />
          <RowButtons
            onUp={() => move(i, -1)}
            onDown={() => move(i, 1)}
            onRemove={() => remove(i)}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...values, ''])}
        className="rounded-lg border border-line px-3 py-1.5 text-xs text-ink-soft transition-colors hover:border-ink hover:text-ink"
      >
        + {addLabel}
      </button>
    </div>
  )
}

/** Reorder-only list of fixed items (no add/remove) — used for section order. */
export function ReorderList<T extends string>({
  items,
  onChange,
  labels,
}: {
  items: T[]
  onChange: (next: T[]) => void
  labels: Record<T, string>
}) {
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir
    if (j < 0 || j >= items.length) return
    const next = [...items]
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
  }

  return (
    <div className="space-y-2">
      {items.map((key, i) => (
        <div
          key={key}
          className="flex items-center justify-between gap-2 rounded-lg border border-line bg-paper px-3 py-2 text-sm"
        >
          <span>{labels[key]}</span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="grid size-7 shrink-0 place-items-center rounded border border-line text-ink-soft transition-colors enabled:hover:border-ink enabled:hover:text-ink disabled:opacity-30"
              onClick={() => move(i, -1)}
              disabled={i === 0}
              aria-label="Выше"
            >
              ↑
            </button>
            <button
              type="button"
              className="grid size-7 shrink-0 place-items-center rounded border border-line text-ink-soft transition-colors enabled:hover:border-ink enabled:hover:text-ink disabled:opacity-30"
              onClick={() => move(i, 1)}
              disabled={i === items.length - 1}
              aria-label="Ниже"
            >
              ↓
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

/** Editable list of objects. `render` draws one item's fields. */
export function Repeater<T>({
  items,
  onChange,
  render,
  create,
  addLabel = 'Добавить элемент',
  title,
}: {
  items: T[]
  onChange: (next: T[]) => void
  render: (item: T, update: (patch: Partial<T>) => void) => ReactNode
  create: () => T
  addLabel?: string
  title?: (item: T, index: number) => string
}) {
  const update = (i: number, patch: Partial<T>) =>
    onChange(items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)))
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i))
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir
    if (j < 0 || j >= items.length) return
    const next = [...items]
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
  }

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="rounded-xl border border-line bg-paper-raised p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-medium tracking-[0.12em] text-ink-faint uppercase">
              {title ? title(item, i) : `#${i + 1}`}
            </span>
            <RowButtons
              onUp={() => move(i, -1)}
              onDown={() => move(i, 1)}
              onRemove={() => remove(i)}
            />
          </div>
          <div className="space-y-3">{render(item, (patch) => update(i, patch))}</div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, create()])}
        className="rounded-lg border border-line px-3 py-1.5 text-xs text-ink-soft transition-colors hover:border-ink hover:text-ink"
      >
        + {addLabel}
      </button>
    </div>
  )
}

function RowButtons({
  onUp,
  onDown,
  onRemove,
}: {
  onUp: () => void
  onDown: () => void
  onRemove: () => void
}) {
  const btn =
    'grid size-7 shrink-0 place-items-center rounded border border-line text-ink-soft transition-colors hover:border-ink hover:text-ink'
  return (
    <div className="flex items-center gap-1">
      <button type="button" className={btn} onClick={onUp} aria-label="Выше">
        ↑
      </button>
      <button type="button" className={btn} onClick={onDown} aria-label="Ниже">
        ↓
      </button>
      <button
        type="button"
        className="grid size-7 shrink-0 place-items-center rounded border border-line text-ink-soft transition-colors hover:border-accent hover:text-accent"
        onClick={onRemove}
        aria-label="Удалить"
      >
        ✕
      </button>
    </div>
  )
}
