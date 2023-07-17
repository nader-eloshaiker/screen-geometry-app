import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  createItemAction,
  deleteItemAction,
  editItemAction,
  favouriteAction,
  itemLoader,
  listLoader,
} from '../components/api/screenAPI'
import Contact from '../pages/Contacts'
import EditContact from '../pages/EditContact'
import ErrorManager from '../pages/ErrorManger'
import Home from '../pages/Home'
import Root from '../pages/Root'
import { routes } from './RouteSchema'

export default function AppRouterProvider() {
  const router = createBrowserRouter([
    {
      path: routes.root.path,
      element: <Root />,
      errorElement: <ErrorManager />,
      loader: listLoader,
      action: createItemAction,
      children: [
        {
          errorElement: <ErrorManager />,
          children: [
            { index: true, element: <Home /> },
            {
              path: routes.screens.path + '/' + routes.screens.actions.create,
              element: <Home />,
              loader: listLoader,
              action: createItemAction,
            },
            {
              path: routes.screens.path + '/' + routes.screens.key,
              element: <Contact />,
              loader: itemLoader,
              action: favouriteAction,
            },
            {
              path: routes.screens.path + '/' + routes.screens.key + '/' + routes.screens.actions.edit,
              element: <EditContact />,
              loader: itemLoader,
              action: editItemAction,
            },
            {
              path: routes.screens.path + routes.screens.key + '/' + routes.screens.actions.delete,
              action: deleteItemAction,
              errorElement: <div>Oops! There was an error.</div>,
            },
          ],
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}
