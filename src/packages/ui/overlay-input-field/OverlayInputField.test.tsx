import { renderWithUserEvents } from '@packages/test/utils/RenderWithUserEvents'
import { OverlayInputField } from './OverlayInputField'

describe('#OverlayInputField', () => {
  test('renders overlay input field component with a input and overlays', async () => {
    const test = await renderWithUserEvents(
      <OverlayInputField overlays={[{ overlay: 'px', overlayClassName: 'pl10' }]} />,
    )

    const inputElement = test.getByRole('textbox')
    expect(inputElement).toBeInTheDocument()

    const overlayElement = test.getByText('px')
    expect(overlayElement).toBeInTheDocument()
  })
})
