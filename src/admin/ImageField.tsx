import { useState } from 'react'
import { uploadWorkImage } from '../lib/contentIo'
import { Field, TextInput } from './fields'

/**
 * Image picker for a Work item: shows the current image, uploads a new file to
 * Supabase Storage, and also allows pasting a URL directly.
 */
export function ImageField({
  value,
  onChange,
}: {
  value: string
  onChange: (url: string) => void
}) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFile(file: File | undefined) {
    if (!file) return
    setBusy(true)
    setError(null)
    try {
      const url = await uploadWorkImage(file)
      onChange(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки')
    } finally {
      setBusy(false)
    }
  }

  return (
    <Field label="Изображение" hint="Портрет ~4:5. Загрузите файл или вставьте ссылку.">
      <div className="flex items-start gap-4">
        <div className="h-28 w-[5.6rem] shrink-0 overflow-hidden rounded-lg border border-line bg-paper">
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="grid h-full w-full place-items-center text-xs text-ink-faint">
              нет
            </span>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <TextInput value={value} onChange={onChange} placeholder="/work/1.svg или https://…" />
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-line px-3 py-1.5 text-xs text-ink-soft transition-colors hover:border-ink hover:text-ink">
            {busy ? 'Загрузка…' : 'Загрузить файл'}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={busy}
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </label>
          {error && <p className="text-xs text-accent">{error}</p>}
        </div>
      </div>
    </Field>
  )
}
