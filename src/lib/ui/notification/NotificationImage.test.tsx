import { render } from '@testing-library/react'
import { NotificationImage, NotificationType } from '.'

describe('NotificationImage', () => {
  it('renders error icon when type is ERROR', () => {
    const { container } = render(<NotificationImage type={NotificationType.ERROR} />)
    expect(container.querySelector('title')).toHaveTextContent('Error')
  })

  it('renders warning icon when type is WARNING', () => {
    const { container } = render(<NotificationImage type={NotificationType.WARNING} />)
    expect(container.querySelector('title')).toHaveTextContent('Warning')
  })

  it('renders success icon when type is SUCCESS', () => {
    const { container } = render(<NotificationImage type={NotificationType.SUCCESS} />)
    expect(container.querySelector('title')).toHaveTextContent('Success')
  })
})
