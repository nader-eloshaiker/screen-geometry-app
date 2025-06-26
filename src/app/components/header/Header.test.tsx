import { createMemoryHistory, createRootRoute, createRoute, createRouter, RouterProvider } from '@tanstack/react-router'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { useMemo } from 'react'
import Header from './Header'

const resizeWindow = async (x: number, y: number) => {
  await waitFor(() => {
    window.innerWidth = x
    window.innerHeight = y
    fireEvent(window, new Event('resize'))
  })
}

const TestRouter = (props: React.PropsWithChildren) => {
  const memoryHistory = useMemo(
    () =>
      createMemoryHistory({
        initialEntries: ['/'],
        initialIndex: 0,
      }),
    []
  )
  const rootRoute = useMemo(
    () =>
      createRootRoute({
        component: () => props.children,
      }),
    [props.children]
  )
  const router = useMemo(
    () =>
      createRouter({
        history: memoryHistory,
        defaultPendingMinMs: 0,
        routeTree: rootRoute.addChildren([
          createRoute({
            path: '*',
            component: () => props.children,
            getParentRoute: () => rootRoute,
          }),
        ]),
      }),
    [memoryHistory, props.children, rootRoute]
  )

  return <RouterProvider<typeof router> router={router} />
}

describe('#Header', () => {
  it('should render the header without dropdown menu on a large window', async () => {
    const { getByTestId } = render(<Header />, { wrapper: TestRouter })

    await resizeWindow(1000, 1000)
    const element = getByTestId('large-header')

    expect(element).toBeVisible()
  })

  it('should render the header with dropdown menu on a small window', async () => {
    const { getByTestId } = render(<Header />, { wrapper: TestRouter })

    resizeWindow(400, 1000)
    const element = getByTestId('small-header')

    expect(element).toBeVisible()
  })
})
