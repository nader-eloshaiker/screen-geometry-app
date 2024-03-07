import { useInteractComponent } from '@screengeometry/utils'
import { SkeletonImage } from './SkeletonImage'

describe('#SkeletonImage', () => {
  it('should render', () => {
    const { getByTestId } = useInteractComponent(<SkeletonImage />)
    const element = getByTestId('SkeletonImage')

    expect(element).toBeInTheDocument()
    expect(element.classList).toContain('skeleton')
  })
})
