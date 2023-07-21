import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  createItemAction,
  deleteItemAction,
  editItemAction,
  favouriteAction,
  getScreen,
} from '../components/api/db/indexApi'
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
      // loader: getScreenList,
      action: createItemAction,
      children: [
        {
          errorElement: <ErrorManager />,
          children: [
            { index: true, element: <Home /> },
            {
              path: routes.screens.path + '/' + routes.screens.actions.create,
              element: <Home />,
              // loader: getScreenList,
              action: createItemAction,
            },
            {
              path: routes.screens.path + '/' + routes.screens.key,
              element: <Contact />,
              loader: getScreen,
              action: favouriteAction,
            },
            {
              path: routes.screens.path + '/' + routes.screens.key + '/' + routes.screens.actions.edit,
              element: <EditContact />,
              loader: getScreen,
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
