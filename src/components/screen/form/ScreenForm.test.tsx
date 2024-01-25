import { NotificationProvider } from '@contexts/Notification/NotificationProvider'
import { ScreenState } from '@contexts/Screen/ScreenManager'
import { ScreenProvider } from '@contexts/Screen/ScreenProvider'
import { useScreenContext } from '@contexts/Screen/useScreenContext'
import { useElementSizeMock } from '@hooks/useElementSize.mock'
import { screenInputFixture } from '@openapi/fixtures/ScreenFixtures'
import { ScreenInput, ScreenItem } from '@openapi/generated/models'
import { getSearchListServiceMock } from '@openapi/generated/services/search-list-service'
import { CreateScreenMock, useCreateScreenMock } from '@openapi/mocks/useCreateScreen.mock'
import { UpdateScreenMock, useUpdateScreenMock } from '@openapi/mocks/useUpdateScreen.mock'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useInteractComponent } from '@test/utils/useInteractComponent'
import { resetMSWEventStack, useMSWEventStack } from '@test/utils/useMSWEventStack'
import { render, waitFor } from '@testing-library/react'
import { transformScreenInput } from '@utils/ScreenTransformation'
import { setupServer } from 'msw/node'
import { useEffect, useState } from 'react'
import { ScreenForm } from './ScreenForm'

type Props = {
  defaultValues: ScreenInput | undefined
  editId?: string | undefined
  isLoading?: boolean
  initialise?: ScreenItem[]
  onCloseAction?: () => void
}
const TestComponent = ({ defaultValues, editId, isLoading = false, onCloseAction }: Props) => {
  const {
    state: { screens },
  } = useScreenContext()

  return (
    <>
      <ScreenForm defaultValues={defaultValues} editId={editId} isLoading={isLoading} onClose={onCloseAction} />
      <div>
        <h1>Screens</h1>
        {screens.map((screen) => (
          <h2 key={screen.id}>{JSON.stringify(screen)}</h2>
        ))}
      </div>
    </>
  )
}

const RootTestComponent = ({
  defaultValues,
  editId,
  initialise,
  isLoading = false,
  onCloseAction = () => {},
}: Props) => {
  const queryClient = new QueryClient()
  const [state, setState] = useState<ScreenState>()

  useEffect(() => {
    if (editId && initialise) {
      setState({ screens: initialise, query: '' })
    }
  }, [editId, initialise])

  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <ScreenProvider initialise={state}>
          <TestComponent
            defaultValues={defaultValues}
            editId={editId}
            isLoading={isLoading}
            onCloseAction={onCloseAction}
          />
        </ScreenProvider>
      </NotificationProvider>
    </QueryClientProvider>
  )
}

describe('#ScreenForm', () => {
  let createScreenSpy: CreateScreenMock
  let updateScreenSpy: UpdateScreenMock

  const server = setupServer(...getSearchListServiceMock())
  // const mswRequestEventSpy = useMSWEventStack(server)
  useMSWEventStack(server)

  beforeAll(() => {
    server.listen()
  })

  afterAll(() => {
    server.close()
  })

  beforeEach(() => {
    useElementSizeMock()
    resetMSWEventStack()

    createScreenSpy = useCreateScreenMock()
    updateScreenSpy = useUpdateScreenMock()
  })
  afterEach(() => {
    vi.clearAllMocks()
    server.resetHandlers()
    server.restoreHandlers()
  })

  describe('#close', () => {
    test('close button', async () => {
      const onCloseAction = vi.fn()
      const test = useInteractComponent(
        <RootTestComponent defaultValues={screenInputFixture} onCloseAction={onCloseAction} />,
      )

      const closeButton = await test.findByText('Close')
      expect(closeButton).toBeEnabled()

      await test.user.click(closeButton)
      expect(onCloseAction).toHaveBeenCalledTimes(1)
    })
  })

  describe('#LoadingMode', () => {
    test('show loading when updating a screen', async () => {
      const editId = '1'
      updateScreenSpy.override({ opt: { isPending: true } })

      const { container } = useInteractComponent(
        <RootTestComponent defaultValues={screenInputFixture} editId={editId} />,
      )

      const spinners = await waitFor(() =>
        container.getElementsByClassName('loading loading-spinner items-center justify-center'),
      )
      expect(spinners).toHaveLength(1)
    })

    test('show loading when creating a screen', async () => {
      const editId = undefined
      createScreenSpy.override({ opt: { isPending: true } })

      const { container } = render(<RootTestComponent defaultValues={undefined} editId={editId} />)

      const spinners = await waitFor(() =>
        container.getElementsByClassName('loading loading-spinner items-center justify-center'),
      )
      expect(spinners).toHaveLength(1)
    })
  })

  describe('#EditMode', () => {
    test('renders the screen form', async () => {
      const editId = '1'

      const test = render(<RootTestComponent defaultValues={screenInputFixture} editId={editId} />)

      const element = await test.findByText('Edit Screen')
      expect(element).toBeDefined()

      expect(await test.findByLabelText('Screen Size')).toHaveValue(49)
      expect(await test.findByLabelText('Aspect Ratio')).toHaveValue('32:9')
      expect(await test.findByLabelText('Horizontal Res')).toHaveValue(5120)
      expect(await test.findByLabelText('Vertical Res')).toHaveValue(1440)

      expect(await test.findByText('Light')).toHaveStyle({ backgroundColor: '#000000' })
      expect(await test.findByText('Dark')).toHaveStyle({ backgroundColor: '#FFFFFF' })

      expect(await test.findByText('Update')).toBeDisabled()
      expect(await test.findByText('Reset')).toBeEnabled()
      expect(await test.findByText('Close')).toBeEnabled()
    })

    test('reset screen form', async () => {
      const editId = '1'

      const test = useInteractComponent(<RootTestComponent defaultValues={screenInputFixture} editId={editId} />)
      const resetButton = await test.findByText('Reset')

      const inputScreenSize = await test.findByLabelText('Screen Size')
      await test.user.clear(inputScreenSize)
      await test.user.type(inputScreenSize, '27')
      expect(inputScreenSize).toHaveValue(27)

      await test.user.click(resetButton)
      expect(inputScreenSize).toHaveValue(49)
    })

    test('change screen theme colors', async () => {
      const editId = '1'

      const test = useInteractComponent(<RootTestComponent defaultValues={screenInputFixture} editId={editId} />)
      const changeButton = await test.findByText('Change')
      const lightColor = await test.findByText('Light')
      const darkColor = await test.findByText('Dark')

      expect(lightColor).toHaveStyle({ backgroundColor: '#000000' })
      expect(darkColor).toHaveStyle({ backgroundColor: '#FFFFFF' })

      await test.user.click(changeButton)

      expect(lightColor).not.toHaveStyle({ backgroundColor: '#000000' })
      expect(darkColor).not.toHaveStyle({ backgroundColor: '#FFFFFF' })
    })

    test('update a screen from list and populate form', async () => {
      const modifiedValues: ScreenInput = { ...screenInputFixture, diagonalSize: 32 }
      const editId = '1'
      updateScreenSpy.override({ screenInput: modifiedValues, id: editId })
      const initialise = [{ ...transformScreenInput(screenInputFixture), id: editId }]

      const test = useInteractComponent(
        <RootTestComponent defaultValues={screenInputFixture} editId={editId} initialise={initialise} />,
      )

      const inputScreenSize = await test.findByLabelText('Screen Size')
      await test.user.type(inputScreenSize, '38')

      const updateButton = await test.findByText('Update')
      expect(updateButton).toBeEnabled()
      await test.user.click(updateButton)

      expect(updateButton).toBeEnabled()
      const h2Element = test.container.querySelectorAll('h2')
      expect(h2Element).toHaveLength(1)
      expect(h2Element[0]).toHaveTextContent('"diagonalSize":32')
    })
  })

  describe('#CreateMode', () => {
    test('renders the screen form', async () => {
      const test = render(<RootTestComponent defaultValues={undefined} />)

      const element = await test.findByText('Add Screen')

      expect(element).toBeDefined()
      expect(await test.findByLabelText('Screen Size')).toHaveValue(null)
      expect(await test.findByLabelText('Aspect Ratio')).toHaveValue('')
      expect(await test.findByLabelText('Horizontal Res')).toHaveValue(null)
      expect(await test.findByLabelText('Vertical Res')).toHaveValue(null)

      expect(await test.findByText('Light')).toBeInTheDocument()
      expect(await test.findByText('Dark')).toBeInTheDocument()

      expect(await test.findByText('Create')).toBeDisabled()
      expect(await test.findByText('Reset')).toBeEnabled()
      expect(await test.findByText('Close')).toBeEnabled()
    })

    test('select a screen from list and populate form', async () => {
      const test = useInteractComponent(<RootTestComponent defaultValues={undefined} />)

      const inputElement = await test.findByPlaceholderText('Type to filter list...')
      await test.user.type(inputElement, 'WQHD+')

      const listElement = test.container.querySelectorAll('li')[0]
      await test.user.click(listElement)

      expect(await test.findByLabelText('Screen Size')).toHaveValue(34)
      expect(await test.findByLabelText('Aspect Ratio')).toHaveValue('21:9')
      expect(await test.findByLabelText('Horizontal Res')).toHaveValue(3440)
      expect(await test.findByLabelText('Vertical Res')).toHaveValue(1440)

      expect(await test.findByText('Light')).toBeInTheDocument()
      expect(await test.findByText('Dark')).toBeInTheDocument()

      expect(await test.findByText('Create')).toBeEnabled()
      expect(await test.findByText('Reset')).toBeEnabled()
      expect(await test.findByText('Close')).toBeEnabled()
    })

    test('create a screen from list and populate form', async () => {
      const test = useInteractComponent(<RootTestComponent defaultValues={undefined} />)

      const inputElement = await test.findByPlaceholderText('Type to filter list...')
      await test.user.type(inputElement, 'WQHD+')

      const listElement = test.container.querySelectorAll('li')[0]
      await test.user.click(listElement)

      const createButton = await test.findByText('Create')
      expect(createButton).toBeEnabled()
      await test.user.click(createButton)

      expect(test.getByText('Create')).toBeEnabled()
      const h2Element = test.container.querySelectorAll('h2')
      expect(h2Element).toHaveLength(1)
      expect(h2Element[0]).toHaveTextContent('"diagonalSize":49')
    })
  })
})
