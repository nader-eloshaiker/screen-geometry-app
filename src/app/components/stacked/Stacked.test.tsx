import { renderWithUserEvents } from '@packages/test/utils/RenderWithUserEvents'
import { Stacked } from './Stacked'

describe('#SkeletonImage', () => {
  it('should render', async () => {
    const { getByText } = await renderWithUserEvents(<Stacked height={10}>Test</Stacked>)
    const element = getByText('Test')

    expect(element).toBeInTheDocument()
    const styles = getComputedStyle(element)
    expect(styles.height).toBe('10px')
  })
})
