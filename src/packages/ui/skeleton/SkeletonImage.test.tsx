import { renderWithUserEvents } from '@packages/test/utils/RenderWithUserEvents'
import { SkeletonImage } from './SkeletonImage'
import { ImageIcon } from './assets/ImageIcon'

describe('#SkeletonImage', () => {
  it('should render', async () => {
    const { getByTestId } = await renderWithUserEvents(<SkeletonImage image={<ImageIcon />} />)
    const element = getByTestId('SkeletonImage')

    expect(element).toBeInTheDocument()
    expect(element.classList).toContain('skeleton')
  })
})
