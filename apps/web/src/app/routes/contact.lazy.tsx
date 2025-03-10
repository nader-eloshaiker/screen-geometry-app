import { Contact } from '@/app/pages/Contact'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/contact')({
  component: Contact,
})
