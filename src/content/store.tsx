import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { DEFAULT_CONTENT, mergeContent, type SiteContent } from './site'
import { supabase, isSupabaseConfigured, CONTENT_ROW_ID } from '../lib/supabase'

type ContentState = {
  content: SiteContent
  /** True while the first fetch from Supabase is in flight. */
  loading: boolean
  /** Non-fatal: the site keeps running on defaults. */
  error: string | null
  refetch: () => Promise<void>
}

const ContentContext = createContext<ContentState>({
  content: DEFAULT_CONTENT,
  loading: false,
  error: null,
  refetch: async () => {},
})

/**
 * Provides the live site content. Renders children immediately with the bundled
 * defaults, then swaps in the Supabase document once it arrives. If Supabase is
 * not configured, this is a no-op wrapper around the defaults.
 */
export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT)
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    if (!supabase) return
    setLoading(true)
    setError(null)
    try {
      const { data, error: fetchError } = await supabase
        .from('site_content')
        .select('data')
        .eq('id', CONTENT_ROW_ID)
        .maybeSingle()

      if (fetchError) throw fetchError
      if (data?.data) {
        setContent(mergeContent(DEFAULT_CONTENT, data.data as Partial<SiteContent>))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось загрузить контент')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refetch()
  }, [refetch])

  const value = useMemo(
    () => ({ content, loading, error, refetch }),
    [content, loading, error, refetch],
  )

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

/** The live content document. Safe to call anywhere under <ContentProvider>. */
export function useContent(): SiteContent {
  return useContext(ContentContext).content
}

/** Loading / error / refetch, for the admin panel and status UI. */
export function useContentMeta(): Omit<ContentState, 'content'> {
  const { loading, error, refetch } = useContext(ContentContext)
  return { loading, error, refetch }
}
