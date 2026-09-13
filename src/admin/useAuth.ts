import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

type AuthState = {
  session: Session | null
  loading: boolean
}

/** Tracks the Supabase auth session for the admin area. */
export function useAuth(): AuthState {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next)
    })

    return () => sub.subscription.unsubscribe()
  }, [])

  return { session, loading }
}

export async function signIn(email: string, password: string) {
  if (!supabase) throw new Error('Supabase не настроен')
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
}

/** Sends a "set new password" email with a link back to /admin/reset. */
export async function requestPasswordReset(email: string) {
  if (!supabase) throw new Error('Supabase не настроен')
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
    redirectTo: `${window.location.origin}/admin/reset`,
  })
  if (error) throw error
}

/** Sets a new password for the session opened by the reset-password email link. */
export async function updatePassword(password: string) {
  if (!supabase) throw new Error('Supabase не настроен')
  const { error } = await supabase.auth.updateUser({ password })
  if (error) throw error
}

export async function signOut() {
  if (!supabase) return
  await supabase.auth.signOut()
}
