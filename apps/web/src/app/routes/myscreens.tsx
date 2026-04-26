import { ScreenItemRender } from '@/app/models/screenItemRender'
import { createFileRoute } from '@tanstack/react-router'

export type MyScreensLocationState = {
  screens?: ScreenItemRender[]
}

export const Route = createFileRoute('/myscreens')({})
