import { Screens } from '@/app/pages/Screens'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/screens')({
  component: Screens,
})
