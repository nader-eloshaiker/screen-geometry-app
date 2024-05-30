import { act, render, RenderOptions, RenderResult } from '@testing-library/react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { ReactElement } from 'react'

export type InteractComponent = RenderResult & { user: UserEvent }

export const renderWithUserEvents = async (jsx: ReactElement, options?: RenderOptions) => {
  const renderedResult = await act(() => render(jsx, options))

  const comp: InteractComponent = {
    user: userEvent.setup(),
    // Import `render` from the framework library of your choice.
    // See https://testing-library.com/docs/dom-testing-library/install#wrappers
    ...renderedResult,
  }

  return comp
}
