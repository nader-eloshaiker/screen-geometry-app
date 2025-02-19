import { AppRouterProvider } from '@/app/contexts/router/AppRouterProvider'
import { fireEvent, render, renderHook, waitFor } from '@testing-library/react'
import { useWindowSize } from '../../../lib/support/test/mocks/useWindowsSize'
import { ThemeProvider } from '../../contexts/theme/ThemeProvider'

const resizeWindow = async (x: number, y: number) => {
  await waitFor(() => {
    window.innerWidth = x
    window.innerHeight = y
    fireEvent(window, new Event('resize'))
  })
}

describe('#Header', () => {
  // cannot be tested due to tailwindcss not getting parsed
  it.todo('should render the header without dropdown menu on a large window', async () => {
    const { result } = renderHook(() => useWindowSize())
    const { getByTestId } = render(
      <ThemeProvider>
        <AppRouterProvider />
      </ThemeProvider>
    )

    await resizeWindow(1000, 1000)
    console.log(result.current)

    const element = getByTestId('small-header')

    expect(element).toHaveClass('a')
  })

  it('should render the header with dropdown menu on a small window', async () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <AppRouterProvider />
      </ThemeProvider>
    )

    resizeWindow(1000, 320)
    const element = getByTestId('small-header')

    expect(element).toBeVisible()
  })
})
