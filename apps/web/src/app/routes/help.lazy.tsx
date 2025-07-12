import { Help } from '@/app/pages/Help'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/help')({
  component: Help,
})
