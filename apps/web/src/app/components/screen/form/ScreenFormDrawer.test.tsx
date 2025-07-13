import { QueryProvider } from '@/app/hooks/query/QueryProvider'
import { ScreenProvider } from '@/app/hooks/screen/ScreenProvider'
import { useScreenContext } from '@/app/hooks/screen/useScreenContext'
import { ScreenItemRender } from '@/app/models/screenItemRender'
import { initMSW } from '@/lib/serviceworker/NodeServiceWorker'
import { screenInputFixture } from '@/lib/support/test/fixtures/ScreenFixtures'
import { renderWithUserEvents } from '@/lib/support/test/utils/RenderWithUserEvents'
import { useElementSizeMock } from '@/lib/ui/hooks/useElementSize.mock'
import { toScreenItemRender, transformScreenInput } from '@/lib/utils'
import { getScreenListServiceMock, getScreenServiceMock, getSearchServiceMock } from '@screengeometry/lib-api/spec'
import { Toaster } from '@screengeometry/lib-ui/toaster'
import { render, waitFor } from '@testing-library/react'
import { act, useState } from 'react'
import { FormModeTypes, ScreenFormDrawer } from './ScreenFormDrawer'

const ListComponent = () => {
  const {
    state: { screens },
  } = useScreenContext()

  return (
    <div>
      <h1>ScreenList</h1>
      <ul>
        {screens.map((screen) => (
          <li aria-label={'ScreenList:{screen.id}'} id={screen.id} key={screen.id}>
            {JSON.stringify(screen)}
          </li>
        ))}
      </ul>
    </div>
  )
}

type ParentProps = {
  initialise?: Array<ScreenItemRender>
  mode?: FormModeTypes
  id?: string
}

const RootTestComponent = ({ initialise, mode = FormModeTypes.Create, id }: ParentProps) => {
  const [open, setOpen] = useState(true)

  return (
    <QueryProvider>
      <ScreenProvider initialise={{ screens: initialise ?? [], query: '' }}>
        <h1>formState:{open ? 'open' : 'close'}</h1>
        <ListComponent />
        <ScreenFormDrawer id={id} mode={mode} open={open} setOpen={setOpen} />
      </ScreenProvider>
      <Toaster />
    </QueryProvider>
  )
}

describe('#ScreenFormDrawer', () => {
  const mswObj = initMSW([...getSearchServiceMock(), ...getScreenServiceMock(), ...getScreenListServiceMock()])

  beforeAll(async () => {
    mswObj.start()
  })

  afterAll(async () => {
    mswObj.stop()
  })

  beforeEach(() => {
    useElementSizeMock()
    mswObj.reset()
  })

  describe('#close', () => {
    test('close button', async () => {
      const test = await renderWithUserEvents(<RootTestComponent />)

      expect(test.getByText('formState:open')).toBeTruthy()

      await act(async () => await test.user.keyboard('{Escape}'))

      expect(await test.findByText('formState:close')).toBeTruthy()
    })
  })

  // testing load state is proplematic with MSW response is pending
  describe('#LoadingMode', () => {
    test('show loading when updating a screen', async () => {
      const editId = '5HjERJbH'
      const test = await renderWithUserEvents(<RootTestComponent id={editId} mode={FormModeTypes.Edit} />)

      const inputScreenSize = test.getByLabelText('Screen Size')
      await waitFor(() => expect(inputScreenSize).toHaveValue(38))

      // const inputScreenSize = test.getByLabelText('Screen Size')
      await act(async () => await test.user.clear(inputScreenSize))

      await act(async () => await test.user.type(inputScreenSize, '27'))

      const submitButton = test.getByText('Update')
      await act(async () => await test.user.click(submitButton))

      expect(test.getByTestId('busySubmitButton')).toBeInTheDocument()
    })

    test('show loading when creating a screen', async () => {
      const test = await renderWithUserEvents(<RootTestComponent />)

      const inputScreenSize = test.getByLabelText('Screen Size')
      await act(async () => await test.user.type(inputScreenSize, '27'))

      const ratioElement = test.getByLabelText('Aspect Ratio')
      await act(async () => await test.user.type(ratioElement, '32:9'))

      const hResElement = test.getByLabelText('Horizontal Res')
      await act(async () => await test.user.type(hResElement, '5120'))

      const vResElement = test.getByLabelText('Vertical Res')
      await act(async () => await test.user.type(vResElement, '1440'))

      const submitButton = test.getByText('Create')
      await act(async () => await test.user.click(submitButton))

      expect(test.getByTestId('busySubmitButton')).toBeInTheDocument()
    })
  })

  describe('#EditMode', () => {
    test('renders the screen form', async () => {
      const editId = '5HjERJbH'

      const test = render(<RootTestComponent mode={FormModeTypes.Edit} id={editId} />)

      const inputScreenSize = test.getByLabelText('Screen Size')
      await waitFor(() => expect(inputScreenSize).toHaveValue(38))

      expect(test.getByText('Edit Screen')).toBeDefined()
      expect(test.getByLabelText('Screen Size')).toHaveValue(38)
      expect(test.getByLabelText('Aspect Ratio')).toHaveValue('21:9')
      expect(test.getByLabelText('Horizontal Res')).toHaveValue(3840)
      expect(test.getByLabelText('Vertical Res')).toHaveValue(1600)

      expect(test.getByLabelText('Light Color')).toHaveValue('#F6693C')
      expect(test.getByLabelText('Dark Color')).toHaveValue('#C33609')

      expect(test.getByRole('button', { name: 'Update' })).toBeDisabled()
      expect(test.getByRole('button', { name: 'Reset' })).toBeDisabled()
      expect(test.getByRole('button', { name: 'Close' })).toBeEnabled()
    })

    test('reset screen form', async () => {
      const editId = '5HjERJbH'

      const test = await renderWithUserEvents(<RootTestComponent id={editId} mode={FormModeTypes.Edit} />)

      const inputScreenSize = test.getByLabelText('Screen Size')
      await waitFor(() => expect(inputScreenSize).toHaveValue(38))

      const resetButton = test.getByText('Reset')

      await act(async () => await test.user.clear(inputScreenSize))
      await act(async () => await test.user.type(inputScreenSize, '27'))

      expect(inputScreenSize).toHaveValue(27)

      await act(async () => await test.user.click(resetButton))
      expect(inputScreenSize).toHaveValue(38)
    })

    test('change screen theme colors', async () => {
      const editId = '5HjERJbH'

      const test = await renderWithUserEvents(<RootTestComponent mode={FormModeTypes.Edit} id={editId} />)

      const inputScreenSize = test.getByLabelText('Screen Size')
      await waitFor(() => expect(inputScreenSize).toHaveValue(38))

      const changeButton = test.getByTestId('generate-color-btn')
      const lightColor = test.getByLabelText('Light Color')
      const darkColor = test.getByLabelText('Dark Color')

      expect(lightColor).toHaveValue('#F6693C')
      expect(darkColor).toHaveValue('#C33609')

      await act(async () => await test.user.click(changeButton))

      expect(lightColor).not.toHaveValue('#F6693C')
      expect(darkColor).not.toHaveValue('#C33609')
    })

    test('update a screen from list and populate form', async () => {
      const editId = '5HjERJbH'
      const initialise: Array<ScreenItemRender> = [
        toScreenItemRender({ ...transformScreenInput(screenInputFixture), id: editId }),
      ]

      const test = await renderWithUserEvents(
        <RootTestComponent mode={FormModeTypes.Edit} id={editId} initialise={initialise} />
      )

      const inputScreenSize = test.getByLabelText('Screen Size')
      await waitFor(() => expect(inputScreenSize).toHaveValue(38))

      await act(async () => await test.user.clear(inputScreenSize))
      await act(async () => await test.user.type(inputScreenSize, '34'))

      const updateButton = test.getByText('Update')
      expect(updateButton).toBeEnabled()
      await act(async () => await test.user.click(updateButton))

      await waitFor(() => expect(updateButton).not.toBeEnabled())
    })
  })

  describe('#CreateMode', () => {
    test('renders the screen form', async () => {
      const test = render(<RootTestComponent />)

      expect(test.getByText('Create Screen')).toBeDefined()
      expect(test.getByLabelText('Screen Size')).toHaveValue(null)
      expect(test.getByLabelText('Aspect Ratio')).toHaveValue('')
      expect(test.getByLabelText('Horizontal Res')).toHaveValue(null)
      expect(test.getByLabelText('Vertical Res')).toHaveValue(null)

      expect(test.getByLabelText('Light Color')).toBeInTheDocument()
      expect(test.getByLabelText('Dark Color')).toBeInTheDocument()

      expect(test.getByRole('button', { name: 'Create' })).toBeDisabled()
      expect(test.getByRole('button', { name: 'Reset' })).toBeDisabled()
      expect(test.getByRole('button', { name: 'Close' })).toBeEnabled()
    })

    test('select a screen from list and populate form', async () => {
      const test = await renderWithUserEvents(<RootTestComponent />)

      window.HTMLElement.prototype.scrollIntoView = function () {}

      const searchButton = test.getByText(/Select Screen/i)
      await act(async () => await test.user.click(searchButton))

      const listElement = test.getByText(/WQHD 34" 3440x1440 21:9/i)
      await act(async () => await test.user.click(listElement))

      expect(test.getByLabelText('Screen Size')).toHaveValue(34)
      expect(test.getByLabelText('Aspect Ratio')).toHaveValue('21:9')
      expect(test.getByLabelText('Horizontal Res')).toHaveValue(3440)
      expect(test.getByLabelText('Vertical Res')).toHaveValue(1440)

      expect(test.getByLabelText('Light Color')).toBeInTheDocument()
      expect(test.getByLabelText('Dark Color')).toBeInTheDocument()

      expect(test.getByRole('button', { name: 'Create' })).toBeEnabled()
      expect(test.getByRole('button', { name: 'Reset' })).toBeEnabled()
      expect(test.getByRole('button', { name: 'Close' })).toBeEnabled()
    })

    test('create a screen from list and populate form', async () => {
      const test = await renderWithUserEvents(<RootTestComponent initialise={[]} />)
      window.HTMLElement.prototype.scrollIntoView = function () {}

      const searchButton = test.getByText(/Select Screen/i)
      await act(async () => await test.user.click(searchButton))

      const inputElement = test.getByPlaceholderText(/Search Screen list/i)
      await act(async () => await test.user.type(inputElement, 'WQHD+'))

      await waitFor(() => expect(mswObj.apiEventStack.length).toBe(1))
      expect(mswObj.apiEventStack[0]).toContain('http://dev.api.screengeometry.com/v1/search?term=')

      const listElement = test.getByText(/WQHD 34" 3440x1440 21:9/i)
      await act(async () => await test.user.click(listElement))

      const createButton = test.getByText('Create')
      await waitFor(() => expect(createButton).toBeEnabled())

      await act(async () => await test.user.click(createButton))

      await waitFor(() => expect(createButton).not.toBeEnabled())
    })
  })
})
