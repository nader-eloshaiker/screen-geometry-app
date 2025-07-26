import { TestEnvironment } from '@/lib/support/test/utils/TestEnvironment'
import { render } from '@testing-library/react'
import Footer from './Footer'

describe('#Footer', () => {
  beforeAll(() => {
    vi.stubEnv('VITE_PACKAGE_VERSION', '1.2.3')
  })

  it('should render the version in the footer', async () => {
    const { getByText } = render(<Footer />, { wrapper: TestEnvironment })

    const element = getByText('Version 1.2.3')

    expect(element).toBeInTheDocument()
  })
})
