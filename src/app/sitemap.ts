import { MetadataRoute } from 'next'
import { getSortedArticlesData } from '@/lib/articles'

export const dynamic = 'force-static'

const BASE_URL = 'https://pranaywank.github.io/fourg.dev'

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getSortedArticlesData()

  const articleUrls: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/${article.slug}/`,
    lastModified: new Date(article.date),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...articleUrls,
  ]
}

