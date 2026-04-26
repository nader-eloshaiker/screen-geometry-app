import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/preset/')({
  beforeLoad: () => {
    throw redirect({ to: '/preset/popular', replace: true })
  },
})
