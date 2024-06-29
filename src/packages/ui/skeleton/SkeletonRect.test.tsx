import { renderWithUserEvents } from '@packages/test/utils/RenderWithUserEvents'
import { SkeletonRect } from './SkeletonRect'

describe('#SkeletonRect', () => {
  it('should render', async () => {
    const { getByTestId } = await renderWithUserEvents(<SkeletonRect />)
    const element = getByTestId('SkeletonRect')

    expect(element).toBeInTheDocument()
    expect(element.classList).toContain('skeleton')
  })
})
