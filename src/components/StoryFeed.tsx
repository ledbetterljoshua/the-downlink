"use client"

import { useState, useMemo } from "react"
import type { Story, Category } from "@/types"
import { groupByDate, filterByCategory, formatDate, CATEGORIES } from "@/lib/stories"
import { StoryCard } from "./StoryCard"

export function StoryFeed({ stories }: { stories: Story[] }) {
  const [active, setActive] = useState<Category | "all">("all")

  const filtered = useMemo(
    () => filterByCategory(stories, active),
    [stories, active]
  )

  const grouped = useMemo(() => groupByDate(filtered), [filtered])

  return (
    <div>
      <nav className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-[11px] mb-10">
        <button
          onClick={() => setActive("all")}
          className={`uppercase tracking-wider transition-colors ${
            active === "all" ? "text-gold" : "text-tertiary hover:text-secondary"
          }`}
        >
          all
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`uppercase tracking-wider transition-colors ${
              active === cat ? "text-gold" : "text-tertiary hover:text-secondary"
            }`}
          >
            {cat}
          </button>
        ))}
      </nav>

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

            <div className="divide-y divide-line-subtle">
              {dateStories.map((story, i) => (
                <div
                  key={story.id}
                  className="animate-signal-in"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <StoryCard story={story} />
                </div>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  )
}
