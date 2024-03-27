import { useInteractComponent } from '@packages/test/utils/useInteractComponent'
import { Stacked } from './Stacked'

describe('#SkeletonImage', () => {
  it('should render', () => {
    const { getByText } = useInteractComponent(<Stacked height={10}>Test</Stacked>)
    const element = getByText('Test')

    expect(element).toBeInTheDocument()
    const styles = getComputedStyle(element)
    expect(styles.height).toBe('10px')
  })
})
