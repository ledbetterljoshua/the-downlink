export type Category =
  | "tech"
  | "science"
  | "world"
  | "economy"
  | "policy"
  | "health"
  | "culture"

export interface Source {
  name: string
  url: string
}

export interface Story {
  id: string
  date: string
  headline: string
  summary: string
  why_it_matters: string
  category: Category
  sources: Source[]
  added_at: string
  slug?: string
}
