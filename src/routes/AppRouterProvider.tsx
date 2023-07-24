import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Contact from '../pages/Contacts'
import EditContact from '../pages/EditContact'
import ErrorManager from '../pages/ErrorManger'
import Home from '../pages/Home'
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
            { index: true, element: <Home /> },
            {
              path: routes.screens.path + '/' + routes.screens.actions.create,
              element: <Home />,
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
