import storiesData from "@/data/stories.json"
import overviewsData from "@/data/overviews.json"
import type { Story } from "@/types"
import { Header } from "@/components/Header"
import { StoryFeed } from "@/components/StoryFeed"
import { Footer } from "@/components/Footer"

export default function Home() {
  const stories = storiesData as Story[]
  const overviews = overviewsData as Record<string, string>

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-2xl px-5 sm:px-8">
        <Header />
        <StoryFeed stories={stories} overviews={overviews} />
        <Footer />
      </div>
    </main>
  )
}
