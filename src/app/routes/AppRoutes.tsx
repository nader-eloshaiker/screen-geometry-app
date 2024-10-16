import { BoundyErrorManager } from '@/app/pages/BoundryErrorManger'
import { ErrorManager } from '@/app/pages/ErrorManger'
import { Root } from '@/app/pages/Root'
import { RouteObject } from 'react-router-dom'
import { RouteSchema } from './RouteSchema'

export const AppRoutes: RouteObject[] = [
  {
    path: RouteSchema.root.path,
    element: <Root />,
    errorElement: <BoundyErrorManager />,
    children: [
      {
        errorElement: <ErrorManager />,
        children: [
          {
            index: true,
            async lazy() {
              const { About } = await import('@/app/pages/About')
              return { Component: About }
            },
          },
          {
            path: RouteSchema.screens.path,
            async lazy() {
              const { Screens } = await import('@/app/pages/Screens')
              return { Component: Screens }
            },
          },
          {
            path: RouteSchema.help.path,
            async lazy() {
              const { Help } = await import('@/app/pages/Help')
              return { Component: Help }
            },
          },
          {
            path: RouteSchema.contact.path,
            async lazy() {
              const { Contact } = await import('@/app/pages/Contact')
              return { Component: Contact }
            },
          },
        ],
      },
    ],
  },
]
