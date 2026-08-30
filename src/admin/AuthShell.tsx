import type { ReactNode } from 'react'
import { Logo } from '../components/Logo'

export const authInput =
  'w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-ink'

/** Centered card used by every admin auth screen. */
export function AuthShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="grid min-h-screen place-items-center bg-paper px-5 text-ink">
      <div className="w-full max-w-sm">
        <a href="/" className="mb-8 inline-flex" aria-label="На сайт">
          <Logo className="h-5 w-auto text-ink" />
        </a>
        <h1 className="mb-6 font-display text-2xl font-extrabold tracking-[-0.02em]">{title}</h1>
        {children}
      </div>
    </div>
  )
}
