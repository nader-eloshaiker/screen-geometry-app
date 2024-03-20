import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppRoutes } from './AppRoutes'

export default function AppRouterProvider() {
  const router = createBrowserRouter(AppRoutes, { basename: import.meta.env.BASE_URL })

  return <RouterProvider router={router} />
}
