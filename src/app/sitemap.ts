import { MetadataRoute } from 'next'
import { getSortedArticlesData } from '@/lib/articles'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getSortedArticlesData()
  const baseUrl = 'https://pranaywank.github.io/fourg.dev'

  const articleUrls = articles.map((article) => ({
    url: `${baseUrl}/${article.slug}/`,
    lastModified: new Date(article.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    ...articleUrls,
  ]
}
