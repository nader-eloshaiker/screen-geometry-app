import { AppRoutes } from '@app/routes/AppRoutes'
import { act, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter } from 'react-router-dom'
import { InteractComponent } from './RenderWithUserEvents'
import { TestRoutingComponent } from './TestRoutingComponent'

export const renderWithRouter = (initialPath = '/') => {
  // window.history.pushState({}, 'About Page', routes[0] ?? '/')

  const router = createMemoryRouter([...AppRoutes], {
    initialEntries: [initialPath],
  })

  const a = act(() => {
    const testRender = render(<TestRoutingComponent router={router} />)
    const comp: InteractComponent = {
      user: userEvent.setup(),
      ...testRender,
    }
    return comp
  })

  return a
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
