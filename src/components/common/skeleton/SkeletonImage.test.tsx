import { useInteractComponent } from '@test/utils/useInteractComponent'
import { SkeletonImage } from './SkeletonImage'
import { ImageIcon } from './assets/ImageIcon'

describe('#SkeletonImage', () => {
  it('should render', () => {
    const { getByTestId } = useInteractComponent(<SkeletonImage image={<ImageIcon />} />)
    const element = getByTestId('SkeletonImage')

    expect(element).toBeInTheDocument()
    expect(element.classList).toContain('skeleton')
  })
})
