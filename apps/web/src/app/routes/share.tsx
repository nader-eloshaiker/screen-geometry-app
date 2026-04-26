import { createFileRoute } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
import { z } from 'zod'

// Zod schema for ScreenItemRender object
const ScreenSchema = z.object({
  size: z.number().min(0),
  ratio: z.string().min(3),
  h: z.number().min(1),
  v: z.number().min(1),
})

// Zod schema for search parameters (array of ScreenItemUrl)
// URL example: /share?screens=%5B%7B%22size%22:24,%22ratio%22:%2216:9%22,%22h%22:1920,%22v%22:1080%7D%5D
const SearchParamsSchema = z.object({
  screens: z.array(ScreenSchema).optional().default([]),
})

export type ScreenParam = z.infer<typeof ScreenSchema>
// export type ScreenSearchParams = z.infer<typeof SearchParamsSchema>

export const Route = createFileRoute('/share')({
  validateSearch: zodValidator(SearchParamsSchema),
})
