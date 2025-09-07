import { render, type RenderOptions, type RenderResult, waitFor } from '@testing-library/react'
import userEvent, { type UserEvent } from '@testing-library/user-event'
import type { ReactElement } from 'react'

export type InteractComponent = RenderResult & { user: UserEvent }

export const renderWithUserEvents = async (jsx: ReactElement, options?: RenderOptions) => {
  const renderedResult = await waitFor(() => render(jsx, options))

  return {
    user: userEvent.setup(),
    // Import `render` from the framework library of your choice.
    // See https://testing-library.com/docs/dom-testing-library/install#wrappers
    ...renderedResult,
  }
}
