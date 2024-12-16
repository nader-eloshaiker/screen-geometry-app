import { renderWithUserEvents } from '@/lib/support/test/utils/RenderWithUserEvents'
import { OverlayInputField } from './OverlayInputField'

describe('#OverlayInputField', () => {
  test('renders overlay input field component with a input and overlays', async () => {
    const test = await renderWithUserEvents(
      <OverlayInputField
        formKey='test'
        overlays={[
          {
            overlay: (
              <span key='1' className='text-sm opacity-70'>
                px
              </span>
            ),
            location: 'right',
          },
        ]}
      />,
    )

    const inputElement = test.getByRole('textbox')
    expect(inputElement).toBeInTheDocument()

    const overlayElement = test.getByText('px')
    expect(overlayElement).toBeInTheDocument()
  })
})
