import { renderWithUserEvents } from '@packages/test/utils/RenderWithUserEvents'
import { Stacked } from './Stacked'

describe('#SkeletonImage', () => {
  it('should render', async () => {
    const { getByText } = await renderWithUserEvents(<Stacked height={10}>Test</Stacked>)
    const element = getByText('Test')

    expect(element).toBeInTheDocument()
    const styles = getComputedStyle(element)
    expect(styles.height).toBe('10px')
    expect(styles.justifyItems).toBe('center')
    expect(styles.alignItems).toBe('flex-end')
  })

  it('should render with vertical alignment top', async () => {
    const { getByText } = await renderWithUserEvents(
      <Stacked $vAlign='start' height={10}>
        Test
      </Stacked>,
    )
    const element = getByText('Test')

    const styles = getComputedStyle(element)
    expect(styles.alignItems).toBe('flex-start')
  })

  it('should render with vertical alignment center', async () => {
    const { getByText } = await renderWithUserEvents(
      <Stacked $vAlign='center' height={10}>
        Test
      </Stacked>,
    )
    const element = getByText('Test')

    const styles = getComputedStyle(element)
    expect(styles.alignItems).toBe('center')
  })
})
