import { useCallback, useEffect, useState } from 'react'

const KEY = 'hanip:favorites'
const EVENT = 'hanip:favorites-changed'

function read(): string[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]')
  } catch {
    return []
  }
}

// 즐겨찾기는 계정 없이 기기에 저장됩니다 (웹 localStorage / 앱 WebView 저장소).
export function useFavorites() {
  const [ids, setIds] = useState<string[]>([])

  useEffect(() => {
    const sync = () => setIds(read())
    sync()
    window.addEventListener(EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const toggle = useCallback((id: string) => {
    const cur = read()
    const next = cur.includes(id) ? cur.filter((x) => x !== id) : [id, ...cur]
    localStorage.setItem(KEY, JSON.stringify(next))
    window.dispatchEvent(new Event(EVENT))
  }, [])

  return { ids, has: (id: string) => ids.includes(id), toggle }
}
