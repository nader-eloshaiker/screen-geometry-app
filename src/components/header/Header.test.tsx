import { act, fireEvent, render, renderHook } from '@testing-library/react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ThemeModeProvider } from '../../contexts/theme/ThemeModeProvider'
import { useWindowSize } from '../../tests/utils/useWindowsSize'
import Header from './Header'

const mocks = vi.hoisted(() => ({
  useLocation: vi.fn(),
}))

vi.mock('react-router-dome', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(actual as any),
    useLocation: mocks.useLocation,
  }
})

const resizeWindow = (x: number, y: number) => {
  act(() => {
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

  beforeEach(() => {
    mocks.useLocation.mockImplementation(() => ({ pathname: '/' }))
  })

  // cannot be tested due to tailwindcss not getting parsed
  it.skip('should render the header without dropdown menu on a large window', () => {
    const { result } = renderHook(() => useWindowSize())
    console.log(result.current)
    const { getByTestId } = render(
      <ThemeModeProvider>
        <RouterProvider router={browserRouter} />
      </ThemeModeProvider>,
    )

    resizeWindow(1000, 640)
    const element = getByTestId('nav-menu')

    expect(element).not.toBeVisible()
  })

  it('should render the header with dropdown menu on a small window', () => {
    const { getByTestId } = render(
      <ThemeModeProvider>
        <RouterProvider router={browserRouter} />
      </ThemeModeProvider>,
    )

    resizeWindow(1000, 320)
    const element = getByTestId('nav-menu')

    expect(element).toBeVisible()
  })
})
