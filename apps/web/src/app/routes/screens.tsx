import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/screens')({
  beforeLoad: () => {
    throw redirect({ to: '/myscreens', replace: true })
  },
})
