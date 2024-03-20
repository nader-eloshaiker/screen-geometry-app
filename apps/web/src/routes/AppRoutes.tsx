import { About } from '@pages/About'
import { BoundyErrorManager } from '@pages/BoundryErrorManger'
import { Contact } from '@pages/Contact'
import { ErrorManager } from '@pages/ErrorManger'
import { Help } from '@pages/Help'
import { Root } from '@pages/Root'
import { Screens } from '@pages/Screens'
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
