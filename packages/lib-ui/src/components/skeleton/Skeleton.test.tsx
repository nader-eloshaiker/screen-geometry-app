import { renderWithUserEvents } from '../../lib/support/test/utils/RenderWithUserEvents'
import { Skeleton } from './Skeleton'

describe('#Skeleton', () => {
  it('should render an empty skeleton', async () => {
    const { getByTestId } = await renderWithUserEvents(<Skeleton />)
    const element = getByTestId('Skeleton')

    expect(element).toBeInTheDocument()
  })

  it('should render an image skeleton', async () => {
    const { getByTestId } = await renderWithUserEvents(<Skeleton mode='image' />)
    const element = getByTestId('Skeleton')

    expect(element).toBeInTheDocument()
  })
})
