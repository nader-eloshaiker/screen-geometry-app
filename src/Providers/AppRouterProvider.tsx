import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  contactLoader,
  contactsLoader as rootLoader,
  createAction,
  destroyAction,
  editAction,
  favouriteAction,
} from '../components/api/contactAPI'
import Contact from '../pages/Contacts'
import EditContact from '../pages/EditContact'
import ErrorManager from '../pages/ErrorManger'
import Home from '../pages/Home'
import Root from '../pages/Root'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorManager />,
    loader: rootLoader,
    action: createAction,
    children: [
      {
        errorElement: <ErrorManager />,
        children: [
          { index: true, element: <Home /> },
          {
            path: 'contacts/:contactId',
            element: <Contact />,
            loader: contactLoader,
            action: favouriteAction,
          },
          {
            path: 'contacts/:contactId/edit',
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: 'contacts/:contactId/destroy',
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
])

export default function AppRouterProvider() {
  return <RouterProvider router={router} />
}
