import { RenderResult, act, render, waitFor } from '@testing-library/react'
import { ThemeModeProvider } from '../../contexts/theme/ThemeModeProvider'
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
  window.innerWidth = x
  window.innerHeight = y
  act(() => {
    window.dispatchEvent(new Event('resize'))
  })
}

describe('#Header', () => {
  beforeEach(() => {
    mocks.useLocation.mockImplementation(() => ({ pathname: '/' }))
  })

  it('should render the header without dropdown menu on a large window', async () => {
    const { getByTestId } = await waitFor<RenderResult>(() =>
      render(
        <ThemeModeProvider>
          <Header />
        </ThemeModeProvider>,
      ),
    )

    const element = getByTestId('nav-menu')

    expect(element).not.toBeInTheDocument()
  })
  it('should render the header with dropdown menu on a small window', async () => {
    resizeWindow(640, 320)
    const { getByTestId } = await waitFor<RenderResult>(() =>
      render(
        <ThemeModeProvider>
          <Header />
        </ThemeModeProvider>,
      ),
    )

    const element = getByTestId('nav-menu')

    expect(element).toBeInTheDocument()
  })
})
