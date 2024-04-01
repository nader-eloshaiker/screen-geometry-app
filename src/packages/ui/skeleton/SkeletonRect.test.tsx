import { renderWithUserEvents } from '@packages/test/utils/RenderWithUserEvents'
import { SkeletonRect } from './SkeletonRect'

describe('#SkeletonRect', () => {
  it('should render', () => {
    const { getByTestId } = renderWithUserEvents(<SkeletonRect />)
    const element = getByTestId('SkeletonRect')

    expect(element).toBeInTheDocument()
    expect(element.classList).toContain('skeleton')
  })
})
