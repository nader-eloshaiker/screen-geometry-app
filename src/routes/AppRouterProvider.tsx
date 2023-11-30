import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { About } from '../pages/About'
import { BoundyErrorManager } from '../pages/BoundryErrorManger'
import { Contact } from '../pages/Contact'
import ErrorManager from '../pages/ErrorManger'
import { Help } from '../pages/Help'
import Root from '../pages/Root'
import Screens from '../pages/Screens'
import { appRoutes } from './AppRouteSchema'

export default function AppRouterProvider() {
  const router = createBrowserRouter([
    {
      path: appRoutes.root.path,
      element: <Root />,
      errorElement: <BoundyErrorManager />,
      children: [
        {
          errorElement: <ErrorManager />,
          children: [
            { index: true, element: <About /> },
            {
              path: appRoutes.screens.path,
              element: <Screens />,
            },
            {
              path: appRoutes.help.path,
              element: <Help />,
            },
            {
              path: appRoutes.contact.path,
              element: <Contact />,
            },
          ],
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}
