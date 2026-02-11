"use client"

import { useEffect } from "react"

const STORAGE_KEY = "downlink-seen"

export function MarkSeen({ storyId }: { storyId: string }) {
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      const seen: string[] = stored ? JSON.parse(stored) : []
      if (!seen.includes(storyId)) {
        seen.push(storyId)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seen))
      }
    } catch {}
  }, [storyId])

  return null
}
