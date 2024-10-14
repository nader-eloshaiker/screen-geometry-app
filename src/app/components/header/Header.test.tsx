import { fireEvent, render, renderHook, waitFor } from '@testing-library/react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { useWindowSize } from '../../../packages/test/mocks/useWindowsSize'
import { ThemeProvider } from '../../contexts/theme/ThemeProvider'
import Header from './Header'

const resizeWindow = async (x: number, y: number) => {
  await waitFor(() => {
    window.innerWidth = x
    window.innerHeight = y
    fireEvent(window, new Event('resize'))
  })
}

describe('#Header', () => {
  let browserRouter: ReturnType<typeof createBrowserRouter>

  beforeAll(() => {
    browserRouter = createBrowserRouter([
      {
        path: '/',
        element: <Header />,
      },
    ])
  })

  // cannot be tested due to tailwindcss not getting parsed
  it.todo('should render the header without dropdown menu on a large window', async () => {
    const { result } = renderHook(() => useWindowSize())
    console.log(result.current)
    const { getByTestId } = render(
      <ThemeProvider>
        <RouterProvider router={browserRouter} />
      </ThemeProvider>,
    )

    await resizeWindow(1000, 1000)
    console.log(result.current)

    const element = getByTestId('small-header')

    expect(element).toHaveClass('a')
  })

  it('should render the header with dropdown menu on a small window', async () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <RouterProvider router={browserRouter} />
      </ThemeProvider>,
    )

    resizeWindow(1000, 320)
    const element = getByTestId('small-header')

    expect(element).toBeVisible()
  })
})
