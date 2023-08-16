import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Contact from '../pages/Contacts'
import EditContact from '../pages/EditContact'
import ErrorManager from '../pages/ErrorManger'
import Geometry from '../pages/Geometry'
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
              path: routes.screens.path + '/' + routes.screens.actions.create,
              element: <Geometry />,
            },
            {
              path: routes.screens.path + '/' + routes.screens.key,
              element: <Contact />,
            },
            {
              path: routes.screens.path + '/' + routes.screens.key + '/' + routes.screens.actions.edit,
              element: <EditContact />,
            },
            {
              path: routes.screens.path + routes.screens.key + '/' + routes.screens.actions.delete,
              errorElement: <div>Oops! There was an error.</div>,
            },
          ],
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}
