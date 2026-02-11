import fs from "fs"
import path from "path"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import storiesData from "@/data/stories.json"
import type { Story } from "@/types"
import { ArticleContent } from "@/components/ArticleContent"
import { MarkSeen } from "@/components/MarkSeen"

type Params = Promise<{ slug: string }>

const stories = storiesData as Story[]

export function generateStaticParams() {
  return stories.filter((s) => s.slug).map((s) => ({ slug: s.slug! }))
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const { slug } = await params
  const story = stories.find((s) => s.slug === slug)
  if (!story) return { title: "Not Found" }
  return {
    title: story.headline,
    description: story.summary,
  }
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params
  const story = stories.find((s) => s.slug === slug)
  if (!story) notFound()

  const articlePath = path.join(
    process.cwd(),
    "src",
    "data",
    "articles",
    `${slug}.md`
  )

  let content: string
  try {
    content = fs.readFileSync(articlePath, "utf-8")
  } catch {
    notFound()
  }

  return (
    <>
      <MarkSeen storyId={story.id} />
      <ArticleContent story={story} content={content} />
    </>
  )
}
