import type { Story, Category } from "@/types"

export function groupByDate(stories: Story[]): [string, Story[]][] {
  const groups: Record<string, Story[]> = {}
  for (const story of stories) {
    if (!groups[story.date]) groups[story.date] = []
    groups[story.date].push(story)
  }
  return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a))
}

export function filterByCategory(
  stories: Story[],
  category: Category | "all"
): Story[] {
  if (category === "all") return stories
  return stories.filter((s) => s.category === category)
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00")
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" })
  const month = date.toLocaleDateString("en-US", { month: "long" })
  const day = date.getDate()
  return `${weekday}, ${month} ${day}`
}

export function getNextId(stories: Story[], date: string): string {
  const todayStories = stories.filter((s) => s.date === date)
  const seq = String(todayStories.length + 1).padStart(3, "0")
  return `${date}-${seq}`
}

export const CATEGORIES: Category[] = [
  "tech",
  "science",
  "world",
  "economy",
  "policy",
  "health",
  "culture",
]

export const CATEGORY_COLORS: Record<Category, string> = {
  tech: "text-tech",
  science: "text-science",
  world: "text-world",
  economy: "text-economy",
  policy: "text-policy",
  health: "text-health",
  culture: "text-culture",
}
