import { FormDrawerMode } from '@/app/contexts/FormDrawer/FormDrawerManager'
import { FormDrawerProvider } from '@/app/contexts/FormDrawer/FormDrawerProvider'
import { getSearchServiceMock } from '@/lib/openapi/generated'
import { mswWithSpy, startMSW, stopMSW } from '@/lib/serviceworker/NodeServiceWorker'
import { renderWithUserEvents } from '@/lib/test/utils/RenderWithUserEvents'
import { act } from '@testing-library/react'
import { CreateScreenButton } from './CreateButton'

const TestComponent = ({ formDrawerState = false }: { formDrawerState: boolean }) => {
  return (
    <FormDrawerProvider initialise={{ open: formDrawerState, mode: FormDrawerMode.Close, id: undefined }}>
      <CreateScreenButton />
    </FormDrawerProvider>
  )
}

describe('CreateScreenButton', () => {
  mswWithSpy([...getSearchServiceMock()])

  beforeAll(() => {
    startMSW()
  })

  afterAll(() => {
    stopMSW()
  })

  test('renders screen table component with a table and rows', async () => {
    const test = await renderWithUserEvents(<TestComponent formDrawerState={false} />)

    const createButton = await test.findByText('Create Screen')
    expect(createButton).toBeEnabled()

    await act(async () => {
      await test.user.click(createButton)
    })

    expect(createButton).toBeDisabled()
  })
})
