import Link from "next/link"
import ReactMarkdown from "react-markdown"
import type { Story } from "@/types"
import { formatDate, CATEGORY_COLORS } from "@/lib/stories"

export function ArticleContent({
  story,
  content,
}: {
  story: Story
  content: string
}) {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-2xl px-5 sm:px-8 py-16">
        <Link
          href="/"
          className="font-mono text-[11px] text-tertiary hover:text-gold transition-colors"
        >
          ← Back to briefing
        </Link>

        <header className="mt-10 mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`font-mono text-[11px] tracking-wider uppercase ${CATEGORY_COLORS[story.category]}`}
            >
              {story.category}
            </span>
            <span className="font-mono text-[11px] text-tertiary">
              {formatDate(story.date)}
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl leading-snug text-primary">
            {story.headline}
          </h1>
        </header>

        <article className="prose-downlink">
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>

        <footer className="mt-12 pt-8 border-t border-line-subtle">
          <span className="font-mono text-[10px] tracking-widest uppercase text-gold block mb-3">
            Sources
          </span>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
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

          <div className="mt-10">
            <Link
              href="/"
              className="font-mono text-[11px] text-tertiary hover:text-gold transition-colors"
            >
              ← Back to briefing
            </Link>
          </div>
        </footer>
      </div>
    </main>
  )
}
