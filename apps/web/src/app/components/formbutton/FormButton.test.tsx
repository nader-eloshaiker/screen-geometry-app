import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { FormButton } from './FormButton'

vi.mock('react-dom', () => ({
  useFormStatus: vi.fn(),
}))

import { useFormStatus } from 'react-dom'

describe('FormButton', () => {
  beforeEach(() => {
    vi.mocked(useFormStatus).mockReturnValue({
      pending: false,
      data: null,
      method: null,
      action: null,
    })
  })
  it('renders the children if loadingContent is not provided', () => {
    const children = <div>Test children</div>
    render(<FormButton loading={true}>{children}</FormButton>)
    expect(screen.getByText('Test children')).toBeInTheDocument()
  })

  it('renders the loadingContent if loadingContent is provided', () => {
    const loadingContent = <div>Loading...</div>
    render(<FormButton loadingContent={loadingContent} loading={true} />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('disables the button if status is pending', () => {
    vi.mocked(useFormStatus).mockReturnValue({
      pending: true,
      data: new FormData(),
      method: 'post',
      action: 'submit',
    })
    render(<FormButton />)
    expect(screen.getByRole('button').classList).toContain('pointer-events-none')
  })

  it('disables the button if loading', () => {
    vi.mocked(useFormStatus).mockReturnValue({
      pending: false,
      data: null,
      method: null,
      action: null,
    })
    render(<FormButton loading={true} />)
    expect(screen.getByRole('button').classList).toContain('pointer-events-none')
  })

  it('enables the button if loading or status is not pending', () => {
    render(<FormButton />)
    expect(screen.getByRole('button').classList).not.toContain('pointer-events-none')
  })

  it('renders the spinner if showSpinner is true and loading or status is pending', () => {
    render(<FormButton showSpinner={true} loading={true} />)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('does not render the spinner if showSpinner is false or loading or status is not pending', () => {
    render(<FormButton showSpinner={false} loading={true} />)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })
})
