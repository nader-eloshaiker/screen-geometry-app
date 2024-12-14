import { renderWithUserEvents } from '@/lib/test/utils/RenderWithUserEvents'
import { Input } from './Input'

describe('#OverlayInputField', () => {
  test('renders overlay input field component with a input and overlays', async () => {
    const test = await renderWithUserEvents(<Input endAdornment='px' />)

    const inputElement = test.getByRole('textbox')
    expect(inputElement).toBeInTheDocument()

    const overlayElement = test.getByText('px')
    expect(overlayElement).toBeInTheDocument()
  })
})