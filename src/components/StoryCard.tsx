import type { Story, Category } from "@/types"

const CATEGORY_COLORS: Record<Category, string> = {
  tech: "text-tech",
  science: "text-science",
  world: "text-world",
  economy: "text-economy",
  policy: "text-policy",
  health: "text-health",
  culture: "text-culture",
}

export function StoryCard({ story }: { story: Story }) {
  return (
    <article className="py-6">
      <div className="mb-3">
        <span
          className={`font-mono text-[11px] tracking-wider uppercase ${CATEGORY_COLORS[story.category] || "text-tertiary"}`}
        >
          {story.category}
        </span>
      </div>

      <h3 className="font-serif text-xl leading-snug text-primary mb-3">
        {story.headline}
      </h3>

      <p className="font-serif text-[15px] leading-relaxed text-secondary mb-4">
        {story.summary}
      </p>

      {story.why_it_matters && (
        <div className="border-l-2 border-gold-dim pl-4 mb-4">
          <span className="font-mono text-[10px] tracking-widest uppercase text-gold block mb-1">
            Why it matters
          </span>
          <p className="font-serif text-sm leading-relaxed text-secondary">
            {story.why_it_matters}
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-x-3">
        {story.sources.map((source, i) => (
          <a
            key={i}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] text-tertiary hover:text-gold transition-colors"
          >
            {source.name} ↗
          </a>
        ))}
      </div>
    </article>
  )
}
