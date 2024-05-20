import { act, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ReactElement } from 'react'

export const renderWithRouter = async (jsx: ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)
  const renderedResult = await act(() => render(jsx))

  return {
    user: userEvent.setup(),
    ...renderedResult,
  }
}
