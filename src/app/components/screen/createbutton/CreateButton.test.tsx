import { renderWithUserEvents } from '@/lib/support/test/utils/RenderWithUserEvents'
import { CreateScreenButton } from './CreateButton'

describe('CreateScreenButton', () => {
  test('renders screen table component with a table and rows', async () => {
    const test = await renderWithUserEvents(<CreateScreenButton />)

    const createButton = await test.findByText('Create Screen')
    expect(createButton).toBeInTheDocument()
    expect(createButton).toBeVisible()
    expect(createButton).toBeEnabled()
  })
})
