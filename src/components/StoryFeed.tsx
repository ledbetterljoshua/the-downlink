"use client"

import { useState, useMemo } from "react"
import type { Story, Category } from "@/types"
import {
  groupByDate,
  filterByCategory,
  formatDate,
  CATEGORIES,
} from "@/lib/stories"
import { useSeenStories } from "@/hooks/useSeenStories"
import { StoryCard } from "./StoryCard"

export function StoryFeed({
  stories,
  overviews,
}: {
  stories: Story[]
  overviews: Record<string, string>
}) {
  const [active, setActive] = useState<Category | "all">("all")
  const { seen, markSeen, isSeen } = useSeenStories()

  const filtered = useMemo(
    () => filterByCategory(stories, active),
    [stories, active]
  )

  const grouped = useMemo(() => {
    const groups = groupByDate(filtered)
    return groups.map(([date, dateStories]) => {
      const sorted = [...dateStories].sort((a, b) => {
        const aSeen = seen.has(a.id) ? 1 : 0
        const bSeen = seen.has(b.id) ? 1 : 0
        return aSeen - bSeen
      })
      return [date, sorted] as [string, Story[]]
    })
  }, [filtered, seen])

  return (
    <div>
      <div className="sticky-nav mb-8">
        <nav className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-[11px]">
          <button
            onClick={() => setActive("all")}
            className={`uppercase tracking-wider transition-colors ${
              active === "all"
                ? "text-gold"
                : "text-tertiary hover:text-secondary"
            }`}
          >
            all
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`uppercase tracking-wider transition-colors ${
                active === cat
                  ? "text-gold"
                  : "text-tertiary hover:text-secondary"
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>
      </div>

      <button
        onClick={() => window.location.reload()}
        className="fixed z-50 w-11 h-11 rounded-full bg-surface border border-line flex items-center justify-center font-mono text-base text-tertiary active:text-gold active:border-gold-dim transition-colors"
        style={{
          right: "calc(env(safe-area-inset-right, 0px) + 1.25rem)",
          bottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)",
        }}
        aria-label="Refresh"
      >
        ↻
      </button>

      {grouped.length === 0 ? (
        <p className="font-serif italic text-tertiary text-center py-20">
          No signals in this frequency. Try another band.
        </p>
      ) : (
        grouped.map(([date, dateStories]) => (
          <section key={date} className="mb-12">
            <div className="flex items-center gap-4 mb-1">
              <time className="font-mono text-[11px] text-tertiary tracking-wider shrink-0">
                {formatDate(date)}
              </time>
              <div className="flex-1 h-px bg-line" />
            </div>

            {overviews[date] && (
              <p className="font-serif italic text-secondary text-[15px] leading-relaxed mt-4 mb-2">
                {overviews[date]}
              </p>
            )}

            <div className="divide-y divide-line-subtle">
              {dateStories.map((story, i) => (
                <div
                  key={story.id}
                  className="animate-signal-in"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <StoryCard
                    story={story}
                    isSeen={isSeen(story.id)}
                    onMarkSeen={() => markSeen(story.id)}
                  />
                </div>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  )
}
