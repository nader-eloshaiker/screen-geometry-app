import { About } from '@app/pages/About'
import { BoundyErrorManager } from '@app/pages/BoundryErrorManger'
import { Contact } from '@app/pages/Contact'
import { ErrorManager } from '@app/pages/ErrorManger'
import { Help } from '@app/pages/Help'
import { Root } from '@app/pages/Root'
import { Screens } from '@app/pages/Screens'
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
          { path: RouteSchema.about.path, element: <About /> },
          { path: RouteSchema.screens.path, element: <Screens /> },
          { path: RouteSchema.help.path, element: <Help /> },
          { path: RouteSchema.contact.path, element: <Contact /> },
        ],
      },
    ],
  },
]
