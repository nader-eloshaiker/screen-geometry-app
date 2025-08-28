import { ScreenProvider } from '@/app/hooks/screen/ScreenProvider'
import { useScreenContext } from '@/app/hooks/screen/useScreenContext'
import { type ScreenItemRender } from '@/app/models/screenItemRender'
import { initMSW } from '@/lib/serviceworker/NodeServiceWorker'
import { screenInputFixture } from '@/lib/support/test/fixtures/ScreenFixtures'
import { TestEnvironment } from '@/lib/support/test/utils/TestEnvironment'
import { toScreenItemRender, transformScreenInput } from '@/lib/utils'
import { getScreenListServiceMock, getScreenServiceMock, getSearchServiceMock } from '@screengeometry/lib-api/spec'
import { Toaster } from '@screengeometry/lib-ui/toaster'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act, useState } from 'react'
import { FormModeTypes } from './FormMode'
import { ScreenFormDrawer } from './ScreenFormDrawer'

vi.mock('@/lib/ui/hooks/useElementSize', () => ({
  __esModule: true,
  useElementSize: () => [() => {}, { width: 1024, height: 1024 }],
}))

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const RootTestComponent = ({ initialise, mode = FormModeTypes.create, id }: ParentProps) => {
  const [open, setOpen] = useState(true)

  return (
    <QueryClientProvider client={queryClient}>
      <TestEnvironment>
        <ScreenProvider initialise={{ screens: initialise ?? [], query: '' }}>
          <h1>formState:{open ? 'open' : 'close'}</h1>
          <ListComponent />
          <ScreenFormDrawer id={id} mode={mode} open={open} setOpen={setOpen} />
        </ScreenProvider>
        <Toaster />
      </TestEnvironment>
    </QueryClientProvider>
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
    mswObj.reset()
  })

  describe('#close', () => {
    test('close button', async () => {
      const test = render(<RootTestComponent />)
      const user = userEvent.setup()

      expect(test.getByText('formState:open')).toBeTruthy()

      await user.keyboard('{Escape}')

      expect(await test.findByText('formState:close')).toBeTruthy()
    })
  })

  // testing load state is proplematic with MSW response is pending
  describe('#LoadingMode', () => {
    test('show loading when updating a screen', async () => {
      const editId = '5HjERJbH'

      const test = render(<RootTestComponent mode={FormModeTypes.edit} id={editId} />)
      const user = userEvent.setup()

      const submitButton = test.getByText('Update')
      expect(submitButton).not.toBeEnabled()

      const inputScreenSize = test.getByLabelText('Screen Size')
      await waitFor(() => expect(inputScreenSize).toHaveValue(38))

      // const inputScreenSize = test.getByLabelText('Screen Size')
      await user.clear(inputScreenSize)
      await user.type(inputScreenSize, '27')

      expect(submitButton).toBeEnabled()
      await act(async () => user.click(submitButton))

      waitFor(() => {
        expect(test.getByTestId('busySubmitButton')).toBeInTheDocument()
      })
    })

    test('show loading when creating a screen', async () => {
      const test = render(<RootTestComponent />)
      const user = userEvent.setup()

      const submitButton = test.getByText('Create')
      expect(submitButton).not.toBeEnabled()

      const inputScreenSize = test.getByLabelText('Screen Size')
      await user.type(inputScreenSize, '27')

      const ratioElement = test.getByLabelText('Aspect Ratio')
      await user.type(ratioElement, '32:9')

      const hResElement = test.getByLabelText('Horizontal Res')
      await user.type(hResElement, '5120')

      const vResElement = test.getByLabelText('Vertical Res')
      await user.type(vResElement, '1440')

      expect(submitButton).toBeEnabled()
      await act(async () => user.click(submitButton))

      await waitFor(() => {
        expect(test.getByTestId('busySubmitButton')).toBeInTheDocument()
      })
    })
  })

  describe('#EditMode', () => {
    test('renders the screen form', async () => {
      const editId = '5HjERJbH'

      const test = render(<RootTestComponent mode={FormModeTypes.edit} id={editId} />)

      const inputScreenSize = test.getByLabelText('Screen Size')
      await waitFor(() => expect(inputScreenSize).toHaveValue(38))

      expect(test.getByText('Edit Screen')).toBeDefined()
      expect(test.getByLabelText('Screen Size')).toHaveValue(38)
      expect(test.getByLabelText('Aspect Ratio')).toHaveValue('21:9')
      expect(test.getByLabelText('Horizontal Res')).toHaveValue(3840)
      expect(test.getByLabelText('Vertical Res')).toHaveValue(1600)

      expect(test.getByLabelText('Light Color')).toHaveStyle('background-color: rgb(246, 105, 60)')
      expect(test.getByLabelText('Dark Color')).toHaveStyle('background-color: rgb(195, 54, 9)')

      expect(test.getByRole('button', { name: 'Update' })).toBeDisabled()
      expect(test.getByRole('button', { name: 'Reset' })).toBeDisabled()

      const closeButtons = test.getAllByRole('button', { name: 'Close' })
      expect(closeButtons).toHaveLength(2)
      expect(closeButtons[0]).toBeEnabled()
      expect(closeButtons[1]).toBeEnabled()
    })

    test('reset screen form', async () => {
      const editId = '5HjERJbH'

      const test = render(<RootTestComponent id={editId} mode={FormModeTypes.edit} />)
      const user = userEvent.setup()

      const inputScreenSize = test.getByLabelText('Screen Size')
      await waitFor(() => expect(inputScreenSize).toHaveValue(38))

      const resetButton = test.getByText('Reset')

      await user.clear(inputScreenSize)
      await user.type(inputScreenSize, '27')

      expect(inputScreenSize).toHaveValue(27)

      await user.click(resetButton)
      await waitFor(() => expect(inputScreenSize).toHaveValue(38))
    })

    test('change screen theme colors', async () => {
      const editId = '5HjERJbH'

      const test = render(<RootTestComponent mode={FormModeTypes.edit} id={editId} />)
      const user = userEvent.setup()

      const inputScreenSize = test.getByLabelText('Screen Size')
      await waitFor(() => expect(inputScreenSize).toHaveValue(38))

      const changeButton = test.getByTestId('generate-color-btn')

      expect(test.getByLabelText('Light Color')).toHaveStyle('background-color: rgb(246, 105, 60)')
      expect(test.getByLabelText('Dark Color')).toHaveStyle('background-color: rgb(195, 54, 9)')

      await user.click(changeButton)

      expect(test.getByLabelText('Light Color')).not.toHaveStyle('background-color: rgb(246, 105, 60)')
      expect(test.getByLabelText('Dark Color')).not.toHaveStyle('background-color: rgb(195, 54, 9)')
    })

    test('update a screen from list and populate form', async () => {
      const editId = '5HjERJbH'
      const initialise: Array<ScreenItemRender> = [
        toScreenItemRender({ ...transformScreenInput(screenInputFixture), id: editId }),
      ]

      const test = render(<RootTestComponent mode={FormModeTypes.edit} id={editId} initialise={initialise} />)
      const user = userEvent.setup()

      const inputScreenSize = test.getByLabelText('Screen Size')
      await waitFor(() => expect(inputScreenSize).toHaveValue(38))

      await user.clear(inputScreenSize)
      await user.type(inputScreenSize, '34')

      const updateButton = test.getByText('Update')
      expect(updateButton).toBeEnabled()
      await waitFor(async () => await user.click(updateButton))

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

      const closeButtons = test.getAllByRole('button', { name: 'Close' })
      expect(closeButtons).toHaveLength(2)
      expect(closeButtons[0]).toBeEnabled()
      expect(closeButtons[1]).toBeEnabled()
    })

    test('select a screen from list and populate form', async () => {
      const test = render(<RootTestComponent />)
      const user = userEvent.setup()

      window.HTMLElement.prototype.scrollIntoView = function () {}

      const searchButton = test.getByText(/Select Screen/i)
      await user.click(searchButton)

      const listElement = test.getByText(/WQHD 34" 3440x1440 21:9/i)
      await user.click(listElement)

      expect(test.getByLabelText('Screen Size')).toHaveValue(34)
      expect(test.getByLabelText('Aspect Ratio')).toHaveValue('21:9')
      expect(test.getByLabelText('Horizontal Res')).toHaveValue(3440)
      expect(test.getByLabelText('Vertical Res')).toHaveValue(1440)

      expect(test.getByLabelText('Light Color')).toBeInTheDocument()
      expect(test.getByLabelText('Dark Color')).toBeInTheDocument()

      expect(test.getByRole('button', { name: 'Create' })).toBeEnabled()
      expect(test.getByRole('button', { name: 'Reset' })).toBeEnabled()

      const closeButtons = test.getAllByRole('button', { name: 'Close' })
      expect(closeButtons).toHaveLength(2)
      expect(closeButtons[0]).toBeEnabled()
      expect(closeButtons[1]).toBeEnabled()
    })

    test('create a screen from list and populate form', async () => {
      const test = render(<RootTestComponent initialise={[]} />)
      const user = userEvent.setup()

      window.HTMLElement.prototype.scrollIntoView = function () {}

      const searchButton = test.getByText(/Select Screen/i)
      await user.click(searchButton)

      const inputElement = test.getByPlaceholderText(/Search Screen list/i)
      await user.type(inputElement, 'WQHD+')

      await waitFor(() => expect(mswObj.apiEventStack.length).toBe(1))
      expect(mswObj.apiEventStack[0]).toContain('/v1/search?term=WQHD')

      const listElement = test.getByText(/WQHD 34" 3440x1440 21:9/i)
      await user.click(listElement)

      const createButton = test.getByText('Create')
      expect(createButton).toBeEnabled()

      await user.click(createButton)

      await waitFor(() => expect(mswObj.apiEventStack.length).toBe(2))
      expect(mswObj.apiEventStack[1]).toContain('/v1/screen')

      await waitFor(() => {
        expect(test.queryByText('Create')).not.toBeInTheDocument()
        expect(test.queryAllByText('Screen specifications has been added to list').length).toBeGreaterThan(0)
      })
    })
  })
})
