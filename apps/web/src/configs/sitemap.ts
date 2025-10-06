import { type FileRouteTypes } from '@/app/routetree/routeTree.gen'
import { Sitemap } from 'tanstack-router-sitemap'

// This will become a string literal union of all your routes
export type TRoutes = FileRouteTypes['fullPaths']
const now = new Date()

// Define your sitemap
export const SiteMap: Sitemap<TRoutes> = {
  siteUrl: 'https://screengeometry.com',
  defaultPriority: 0.5,
  routes: {
    '/': {
      priority: 1,
      changeFrequency: 'weekly',
      lastModified: now,
    },
    '/screens': {
      priority: 0.4,
      changeFrequency: 'weekly',
      lastModified: now,
    },
    '/help': {
      priority: 0.8,
      changeFrequency: 'weekly',
      lastModified: now,
    },
    '/contact': {
      priority: 0.6,
      changeFrequency: 'weekly',
      lastModified: now,
    },
  },
}
