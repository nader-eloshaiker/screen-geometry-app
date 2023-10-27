import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { About } from '../pages/About'
import { Contact } from '../pages/Contact'
import ErrorManager from '../pages/ErrorManger'
import Geometry from '../pages/Geometry'
import { Help } from '../pages/Help'
import Root from '../pages/Root'
import { routes } from './AppRouteSchema'

export default function AppRouterProvider() {
  const router = createBrowserRouter([
    {
      path: routes.root.path,
      element: <Root />,
      errorElement: <ErrorManager />,
      children: [
        {
          errorElement: <ErrorManager />,
          children: [
            { index: true, element: <Geometry /> },
            {
              path: routes.about.path,
              element: <About />,
            },
            {
              path: routes.help.path,
              element: <Help />,
            },
            {
              path: routes.contact.path,
              element: <Contact />,
            },
          ],
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}
