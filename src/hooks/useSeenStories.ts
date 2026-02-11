"use client"

import { useState, useEffect, useCallback } from "react"

const STORAGE_KEY = "downlink-seen"

export function useSeenStories() {
  const [seen, setSeen] = useState<Set<string>>(new Set())

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setSeen(new Set(JSON.parse(stored)))
    } catch {}
  }, [])

  const markSeen = useCallback((id: string) => {
    setSeen((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
      return next
    })
  }, [])

  const isSeen = useCallback((id: string) => seen.has(id), [seen])

  return { seen, markSeen, isSeen }
}
