import { About } from '@local/pages/About'
import { BoundyErrorManager } from '@local/pages/BoundryErrorManger'
import { Contact } from '@local/pages/Contact'
import { ErrorManager } from '@local/pages/ErrorManger'
import { Help } from '@local/pages/Help'
import { Root } from '@local/pages/Root'
import { Screens } from '@local/pages/Screens'
import { RouteSchema } from './RouteSchema'

export const AppRoutes = [
  {
    path: RouteSchema.root.path,
    element: <Root />,
    errorElement: <BoundyErrorManager />,
    children: [
      {
        errorElement: <ErrorManager />,
        children: [
          { index: true, element: <About /> },
          {
            path: RouteSchema.screens.path,
            element: <Screens />,
          },
          {
            path: RouteSchema.help.path,
            element: <Help />,
          },
          {
            path: RouteSchema.contact.path,
            element: <Contact />,
          },
        ],
      },
    ],
  },
]
