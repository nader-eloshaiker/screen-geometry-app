import { useInteractComponent } from '@screengeometry/utils'
import { SkeletonRect } from './SkeletonRect'

describe('#SkeletonRect', () => {
  it('should render', () => {
    const { getByTestId } = useInteractComponent(<SkeletonRect />)
    const element = getByTestId('SkeletonRect')

    expect(element).toBeInTheDocument()
    expect(element.classList).toContain('skeleton')
  })
})
