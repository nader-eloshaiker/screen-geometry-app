import { NotificationProvider } from '@contexts/Notification/NotificationProvider'
import { render } from '@testing-library/react'
import Footer from './Footer'

describe('#Footer', () => {
  beforeAll(() => {
    vi.stubEnv('VITE_PACKAGE_VERSION', '1.2.3')
  })

  it('should render the version in the footer', async () => {
    const { getByText } = render(
      <NotificationProvider>
        <Footer />
      </NotificationProvider>,
    )

    const element = getByText('Version 1.2.3')

    expect(element).toBeInTheDocument()
  })
})
