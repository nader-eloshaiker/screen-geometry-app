import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ReactElement } from 'react'

export const useInteractComponent = (jsx: ReactElement) => {
  return {
    user: userEvent.setup(),
    // Import `render` from the framework library of your choice.
    // See https://testing-library.com/docs/dom-testing-library/install#wrappers
    ...render(jsx),
  }
}
