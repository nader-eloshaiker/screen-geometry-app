import { AppRoutes } from '@/app/routes/AppRoutes'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter } from 'react-router-dom'
import { TestRoutingComponent } from './TestRoutingComponent'

export const renderWithRouter = async (initialPath = '/') => {
  // window.history.pushState({}, 'About Page', routes[0] ?? '/')

  const router = createMemoryRouter([...AppRoutes], {
    initialEntries: [initialPath],
  })

  const testComponent = await waitFor(() => render(<TestRoutingComponent router={router} />))

  return {
    user: userEvent.setup(),
    ...testComponent,
  }
}

// export const renderWithRouter = (ui: ReactElement | RouteObject, routes: Array<RouteObject> = []) => {
//   // window.history.pushState({}, 'About Page', routes[0] ?? '/')

//   const options: RouteObject = isValidElement(ui) ? ({ element: ui, path: '/' } as RouteObject) : (ui as RouteObject)

//   const router = createMemoryRouter([{ ...options }, ...routes], {
//     initialEntries: [options.path ?? '/'],
//     initialIndex: 1,
//   })

//   return {
//     user: userEvent.setup(),
//     ...render(<RouterProvider router={router} />),
//   }
// }
