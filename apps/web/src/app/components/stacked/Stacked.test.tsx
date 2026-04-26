import { renderWithUserEvents } from '@/test/utils/RenderWithUserEvents'
import { Stacked } from './Stacked'

describe('#Stacked', () => {
  it('should render', async () => {
    const { getByText } = await renderWithUserEvents(<Stacked height={10}>Test</Stacked>)
    const element = getByText('Test')

    expect(element).toBeInTheDocument()
    expect(element).toHaveStyle({ height: '10px' })
    expect(element.className).toContain('justify-items-center')
    expect(element.className).toContain('items-end')
  })

  it('should render with vertical alignment top', async () => {
    const { getByText } = await renderWithUserEvents(
      <Stacked $vAlign='start' height={10}>
        Test
      </Stacked>
    )
    const element = getByText('Test')

    expect(element.className).toContain('items-start')
  })

  it('should render with vertical alignment center', async () => {
    const { getByText } = await renderWithUserEvents(
      <Stacked $vAlign='center' height={10}>
        Test
      </Stacked>
    )
    const element = getByText('Test')

    expect(element.className).toContain('items-center')
  })
})
