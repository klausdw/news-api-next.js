export interface Artikel {
  id: number
  title: string
  description: string
  url: string
  urlToImage: string
  source: {
    name: string
  }
  publishedAt:string
}