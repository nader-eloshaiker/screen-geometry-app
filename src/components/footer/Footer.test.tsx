import { RenderResult, render, waitFor } from '@testing-library/react'
import Footer from './Footer'

describe('# Footer', () => {
  beforeAll(() => {
    vi.stubEnv('PACKAGE_VERSION', '1.2.3')
  })

  it('should render the version in the footer', async () => {
    const { getByText } = await waitFor<RenderResult>(() => render(<Footer />))

    const element = getByText('Version 1.2')

    expect(element).toBeInTheDocument()
  })
})
