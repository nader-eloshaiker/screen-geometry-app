import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TestRoutingComponent } from './TestRoutingComponent'

export const renderWithRouter = async () => {
  const testComponent = await waitFor(() => render(<TestRoutingComponent />))

  return {
    user: userEvent.setup(),
    ...testComponent,
  }
}
