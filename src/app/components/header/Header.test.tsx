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
    await resizeWindow(1000, 1000)

    const { result } = renderHook(() => useWindowSize())
    const { getByTestId } = render(
      <ThemeProvider>
        <AppRouterProvider />
      </ThemeProvider>
    )

    console.log('>> renderHook(() => useWindowSize()) : ', result.current)

    const element = getByTestId('large-header')

    expect(element).toHaveClass('a')
  })

  it.todo('should render the header with dropdown menu on a small window', async () => {
    await resizeWindow(400, 400)

    const { result } = renderHook(() => useWindowSize())
    const { getByTestId } = await render(
      <ThemeProvider>
        <AppRouterProvider />
      </ThemeProvider>
    )

    console.log('>> renderHook(() => useWindowSize()) : ', result.current)

    await waitFor(() => {
      expect(getByTestId('small-header')).toBeVisible()
    })
  })
})
